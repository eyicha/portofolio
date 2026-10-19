import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(2000, "Please keep your message within 2000 characters."),
});
export const suggestionSchema = z.object({ category: z.string(), summary: z.string(), questions: z.array(z.string()), suggestion: z.string() });
export function appendQuestion(message: string, question: string) {
  const next = `${message.trimEnd()}\n\n${question.trim()}`;
  return next.length <= 2000 ? next : null;
}
export type Suggestion = z.infer<typeof suggestionSchema>;