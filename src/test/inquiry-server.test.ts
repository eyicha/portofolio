import { afterEach, describe, expect, it, vi } from "vitest";

const { maybeSingle, upsert } = vi.hoisted(() => ({ maybeSingle: vi.fn(), upsert: vi.fn() }));
vi.mock("@tanstack/react-start/server", () => ({ getRequest: () => new Request("http://localhost") }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle }) }),
      upsert,
    }),
  },
}));

import { suggestInquiry } from "@/lib/inquiry.server";

const inquiry = { name: "Visitor", email: "visitor@example.com", message: "I would like to discuss a project." };
const suggestion = {
  category: "project inquiry",
  summary: "A visitor wants to discuss a project.",
  questions: ["What is the project scope?", "What is your timeline?"],
  suggestion: "Thank you for reaching out. I would be glad to learn more.",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  maybeSingle.mockReset();
  upsert.mockReset();
});

describe("Gemini inquiry suggestions", () => {
  it("uses the native Gemini endpoint and validates the JSON response", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-gemini-key");
    maybeSingle.mockResolvedValue({ data: null, error: null });
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify(suggestion) }] } }],
    }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await suggestInquiry(inquiry);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);

    expect(response.result).toEqual(suggestion);
    expect(url).toBe("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent");
    expect(init.headers).toEqual({ "Content-Type": "application/json", "x-goog-api-key": "test-gemini-key" });
    expect(body.systemInstruction.parts[0].text).toContain("Classify a portfolio inquiry");
    expect(body.contents[0]).toEqual({ role: "user", parts: [{ text: JSON.stringify({ name: inquiry.name, message: inquiry.message }) }] });
    expect(body.generationConfig).toEqual({ responseMimeType: "application/json" });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("returns a friendly retry message for rate limits and logs provider details", async () => {
    vi.stubEnv("GEMINI_API_KEY", "test-gemini-key");
    maybeSingle.mockResolvedValue({ data: null, error: null });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: { message: "Quota exceeded" } }), { status: 429 })));
    const logError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(await suggestInquiry(inquiry)).toMatchObject({
      result: null,
      error: "AI is busy right now. Please wait a moment and try again.",
      status: 429,
    });
    expect(logError).toHaveBeenCalledWith("[inquiry] Gemini request failed:", { status: 429, detail: "Quota exceeded" });
    expect(upsert).not.toHaveBeenCalled();
  });
});
