import { createServerFn } from "@tanstack/react-start";
import { sendLetterSchema } from "./send-letter-schema";

export const sendLetter = createServerFn({ method: "POST" })
  .inputValidator(data => sendLetterSchema.parse(data))
  .handler(async ({ data }) => {
    const { deliverLetter } = await import("./send-letter.server");
    return deliverLetter(data);
  });