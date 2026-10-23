import { describe, expect, it, vi, afterEach } from "vitest";
import { escapeEmailHtml, letterEmail, sendLetterSchema } from "@/lib/send-letter-schema";
const { supabaseRpc } = vi.hoisted(() => ({ supabaseRpc: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: supabaseRpc } }));
import { deliverLetter } from "@/lib/send-letter.server";
const letter = { name: "Visitor", email: "visitor@example.com", message: "A project inquiry", website: "" };
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); supabaseRpc.mockReset(); });
describe("Letter sending safeguards", () => {
  it("keeps sending unsuccessful when the key is unset", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await deliverLetter(letter)).toEqual({ sent: false, error: "The letter could not be sent. Please try again in a moment." });
  });
  it("sends through Resend with the configured recipient and reply address", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "erisa@example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-supabase-key");
    supabaseRpc.mockResolvedValue({ data: true, error: null });
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    expect(await deliverLetter(letter)).toEqual({ sent: true, error: null });
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer test-resend-key" },
      body: expect.any(String),
    }));
    const body = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string);
    expect(body).toMatchObject({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["erisa@example.com"],
      reply_to: "visitor@example.com",
      subject: "Pesan baru dari Visitor",
      text: expect.stringContaining("A project inquiry"),
    });
    expect(supabaseRpc).toHaveBeenCalledWith("claim_letter_send", expect.objectContaining({ p_max_sends: 3, p_window_seconds: 3600 }));
  });
  it("returns a friendly error and logs Resend's rejection on the server", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "erisa@example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-supabase-key");
    supabaseRpc.mockResolvedValue({ data: true, error: null });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "Invalid recipient" }), { status: 422 })));
    const logError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(await deliverLetter(letter)).toEqual({ sent: false, error: "The letter could not be sent. Please try again in a moment." });
    expect(logError).toHaveBeenCalledWith("[send-letter] Resend rejected email:", "Invalid recipient");
  });
  it("does not send when the persistent visitor limit is exhausted", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "erisa@example.com");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-supabase-key");
    supabaseRpc.mockResolvedValue({ data: false, error: null });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    expect(await deliverLetter(letter)).toEqual({ sent: false, error: "The letter could not be sent. Please try again in a moment." });
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("rejects a filled honeypot without sending", async () => expect((await deliverLetter({ ...letter, website: "spam.example" })).sent).toBe(false));
  it("escapes all HTML user text", () => expect(escapeEmailHtml('<img src="x">&\'')).toBe("&lt;img src=&quot;x&quot;&gt;&amp;&#39;"));
  it("includes the specified subject, timestamp and AI draft", () => {
    const data = sendLetterSchema.parse({ ...letter, aiSuggestion: { category: "general", summary: "A project request", questions: ["Scope?", "Timeline?"], suggestion: "Thank you for writing." } });
    const email = letterEmail(data, "2026-10-21T02:45:00.000Z");
    expect(email.subject).toBe("Pesan baru dari Visitor");
    expect(email.text).toContain("2026-10-21T02:45:00.000Z");
    expect(email.text).toContain("AI draft reply (for Erisa)\nThank you for writing.");
  });
});