import { inquirySchema, suggestionSchema } from "./inquiry-schema";
import { z } from "zod";

export const sendLetterSchema = inquirySchema.extend({
  website: z.string().max(255).optional().default(""),
  aiSuggestion: suggestionSchema.extend({
    category: z.string().max(80), summary: z.string().max(500),
    questions: z.array(z.string().max(100)).max(3), suggestion: z.string().max(2000),
  }).nullable().optional(),
});
export const LETTER_SEND_ERROR = "The letter could not be sent. Please try again in a moment.";
export function escapeEmailHtml(text: string) {
  return text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}
export function letterEmail(data: z.infer<typeof sendLetterSchema>, sentAt: string) {
  const draft = data.aiSuggestion;
  const lines = ["Name: " + data.name, "Email: " + data.email, "Date and time: " + sentAt, "", data.message];
  if (draft) lines.push("", "AI suggestion: " + draft.category, draft.summary, ...draft.questions, "AI draft reply (for Erisa)", draft.suggestion);
  return { subject: `Pesan baru dari ${data.name.replace(/[\r\n]/g, " ")}`, text: lines.join("\n"), html: lines.map(line => `<p>${escapeEmailHtml(line)}</p>`).join("") };
}