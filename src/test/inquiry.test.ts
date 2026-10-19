import { describe, expect, it } from "vitest";
import { appendQuestion, inquirySchema, suggestionSchema } from "@/lib/inquiry-schema";
import { splitTitle } from "@/components/MixedTitle";

describe("Inquiry fields", () => {
  it("requires a visitor name", () => expect(inquirySchema.safeParse({ name: "", email: "visitor@example.com", message: "A project inquiry" }).success).toBe(false));
  it("requires a valid visitor email", () => expect(inquirySchema.safeParse({ name: "Visitor", email: "not-an-email", message: "A project inquiry" }).success).toBe(false));
  it("requires a visitor message", () => expect(inquirySchema.safeParse({ name: "Visitor", email: "visitor@example.com", message: " " }).success).toBe(false));
  it("accepts names up to 100 characters, not 101", () => {
    const base = { email: "visitor@example.com", message: "A project inquiry" };
    expect(inquirySchema.safeParse({ ...base, name: "a".repeat(100) }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...base, name: "a".repeat(101) }).success).toBe(false);
  });
  it("requires at least 10 message characters", () => {
    const base = { name: "Visitor", email: "visitor@example.com" };
    expect(inquirySchema.safeParse({ ...base, message: "a".repeat(9) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...base, message: "a".repeat(10) }).success).toBe(true);
  });
  it("limits messages to 2000 characters", () => {
    const base = { name: "Visitor", email: "visitor@example.com" };
    expect(inquirySchema.safeParse({ ...base, message: "a".repeat(2000) }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...base, message: "a".repeat(2001) }).success).toBe(false);
  });
  it("appends a question without exceeding the message limit", () => {
    expect(appendQuestion("A project inquiry", "What is the timeline?")).toBe("A project inquiry\n\nWhat is the timeline?");
    expect(appendQuestion("a".repeat(1999), "Scope?")).toBe(null);
  });
  it("requires follow-up questions in suggestions", () => {
    expect(suggestionSchema.safeParse({ category: "general", summary: "Inquiry", suggestion: "Thank you" }).success).toBe(false);
  });
});
describe("Mixed title splitting", () => {
  it("keeps apostrophes and commas in the sans remainder", () => {
    const parts = splitTitle("Hi, I'm Erisa").filter(p => p.initial);
    expect(parts).toEqual([{ prefix: "", initial: "H", rest: "i," }, { prefix: "", initial: "I", rest: "'m" }, { prefix: "", initial: "E", rest: "risa" }]);
  });
});