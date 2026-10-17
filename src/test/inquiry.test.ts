import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/inquiry-schema";
import { splitTitle } from "@/components/MixedTitle";

describe("Inquiry fields", () => {
  it("requires a visitor name", () => expect(inquirySchema.safeParse({ name: "", email: "visitor@example.com", message: "A project inquiry" }).success).toBe(false));
  it("requires a valid visitor email", () => expect(inquirySchema.safeParse({ name: "Visitor", email: "not-an-email", message: "A project inquiry" }).success).toBe(false));
  it("requires a visitor message", () => expect(inquirySchema.safeParse({ name: "Visitor", email: "visitor@example.com", message: " " }).success).toBe(false));
});
describe("Mixed title splitting", () => {
  it("keeps apostrophes and commas in the sans remainder", () => {
    const parts = splitTitle("Hi, I'm Erisa").filter(p => p.initial);
    expect(parts).toEqual([{ prefix: "", initial: "H", rest: "i," }, { prefix: "", initial: "I", rest: "'m" }, { prefix: "", initial: "E", rest: "risa" }]);
  });
});