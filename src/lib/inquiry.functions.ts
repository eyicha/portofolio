import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "./inquiry-schema";

export const classifyInquiry = createServerFn({ method: "POST" })
  .inputValidator(data => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { suggestInquiry } = await import("./inquiry.server");
    return suggestInquiry(data);
  });