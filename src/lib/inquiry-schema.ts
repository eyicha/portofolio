import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  message: z.string().trim().min(1, "Please write a message.").max(3000),
});
export const suggestionSchema = z.object({ category: z.string(), summary: z.string(), suggestion: z.string() });
export type Suggestion = z.infer<typeof suggestionSchema>;