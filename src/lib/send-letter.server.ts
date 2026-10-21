import { LETTER_SEND_ERROR, letterEmail, sendLetterSchema } from "./send-letter-schema";

export async function deliverLetter(input: unknown) {
  const data = sendLetterSchema.parse(input);
  if (data.website) return { sent: false, error: LETTER_SEND_ERROR };
  const key = process.env["RESEND_API_KEY"];
  const recipient = process.env["LETTER_RECIPIENT"];
  const sender = process.env["LETTER_FROM"];
  const gatewayKey = process.env["LOVABLE_API_KEY"];
  // Unset credentials stay unset. No fake delivery or credential prompts.
  // Sending remains disabled until the requested durable visitor limit is configured.
  if (!key || !recipient || !sender || !gatewayKey || process.env["LETTER_SENDING_ENABLED"] !== "true") return { sent: false, error: LETTER_SEND_ERROR };
  try {
    const email = letterEmail(data, new Date().toISOString());
    const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${gatewayKey}`, "X-Connection-Api-Key": key },
      body: JSON.stringify({ from: sender, to: [recipient], reply_to: data.email, ...email }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return { sent: false, error: LETTER_SEND_ERROR };
    const result = await response.json() as { id?: string };
    return result.id ? { sent: true, error: null } : { sent: false, error: LETTER_SEND_ERROR };
  } catch { return { sent: false, error: LETTER_SEND_ERROR }; }
}