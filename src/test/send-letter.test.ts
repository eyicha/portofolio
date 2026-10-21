import { describe, expect, it, vi, afterEach } from "vitest";
import { escapeEmailHtml, letterEmail, sendLetterSchema } from "@/lib/send-letter-schema";
import { deliverLetter } from "@/lib/send-letter.server";
const letter = { name: "Visitor", email: "visitor@example.com", message: "A project inquiry", website: "" };
afterEach(() => vi.unstubAllEnvs());
describe("Letter sending safeguards", () => {
  it("keeps sending unsuccessful when the key is unset", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await deliverLetter(letter)).toEqual({ sent: false, error: "The letter could not be sent. Please try again in a moment." });
  });
  it("rejects a filled honeypot without sending", async () => expect((await deliverLetter({ ...letter, website: "spam.example" })).sent).toBe(false));
  it("escapes all HTML user text", () => expect(escapeEmailHtml('<img src="x">&\'')).toBe("&lt;img src=&quot;x&quot;&gt;&amp;&#39;"));
  it("includes the specified subject, timestamp and AI draft", () => {
    const data = sendLetterSchema.parse({ ...letter, aiSuggestion: { category: "general", summary: "A project request", questions: ["Scope?", "Timeline?"], suggestion: "Thank you for writing." } });
    const email = letterEmail(data, "2026-10-21T02:45:00.000Z");
    expect(email.subject).toBe("New letter from Visitor");
    expect(email.text).toContain("2026-10-21T02:45:00.000Z");
    expect(email.text).toContain("AI draft reply (for Erisa)\nThank you for writing.");
  });
});