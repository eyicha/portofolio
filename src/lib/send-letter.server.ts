import { createHmac } from "node:crypto";
import { getRequest } from "@tanstack/react-start/server";
import { LETTER_SEND_ERROR, letterEmail, sendLetterSchema } from "./send-letter-schema";

export async function deliverLetter(input: unknown) {
  console.error("[send-letter] Request received");

  const parsedInput = sendLetterSchema.safeParse(input);
  if (!parsedInput.success) {
    console.error("[send-letter] Invalid input:", parsedInput.error.issues.map(i => i.path.join(".") + ": " + i.message).join(" | "));
    return { sent: false, error: LETTER_SEND_ERROR };
  }
  const data = parsedInput.data;

  if (data.website) {
    console.error("[send-letter] Rejected: honeypot");
    return { sent: false, error: LETTER_SEND_ERROR };
  }

  const key = process.env["RESEND_API_KEY"];
  const recipient = process.env["CONTACT_TO_EMAIL"];
  const supabaseKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  const missing = [
    ...(!key ? ["RESEND_API_KEY"] : []),
    ...(!recipient ? ["CONTACT_TO_EMAIL"] : []),
    ...(!supabaseKey ? ["SUPABASE_SERVICE_ROLE_KEY"] : []),
  ];
  if (missing.length) {
    console.error("[send-letter] Missing server environment variable(s):", missing.join(", "));
    return { sent: false, error: LETTER_SEND_ERROR };
  }

  try {
    let request: Request | undefined;
    try { request = getRequest(); } catch { /* Tests and non-request calls use the email fallback. */ }
    const visitorAddress = request?.headers.get("cf-connecting-ip")
      ?? request?.headers.get("x-real-ip")
      ?? request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const visitor = visitorAddress ? `ip:${visitorAddress}` : `email:${data.email.toLowerCase()}`;
    const visitorHash = createHmac("sha256", supabaseKey as string).update(visitor).digest("hex");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: allowed, error } = await supabaseAdmin.rpc("claim_letter_send", {
      p_visitor_hash: visitorHash,
      p_max_sends: 3,
      p_window_seconds: 3600,
    });
    if (error) {
      console.error("[send-letter] Persistent send limit failed:", { code: error.code, message: error.message });
      return { sent: false, error: LETTER_SEND_ERROR };
    }
    if (allowed !== true) {
      console.error("[send-letter] Rejected: rate limit, allowed =", allowed);
      return { sent: false, error: LETTER_SEND_ERROR };
    }

    const email = letterEmail(data, new Date().toISOString());
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [recipient],
        reply_to: data.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    const raw = await response.text();
    let body: { id?: string; message?: string } = {};
    try { body = JSON.parse(raw); } catch { /* The response may not contain JSON. */ }

    if (!response.ok) {
      console.error("[send-letter] Resend rejected email:", response.status, body.message ?? raw.slice(0, 300));
      return { sent: false, error: LETTER_SEND_ERROR };
    }
    if (!body.id) {
      console.error("[send-letter] Resend response did not include an email id.");
      return { sent: false, error: LETTER_SEND_ERROR };
    }
    console.error("[send-letter] Email sent, id:", body.id);
    return { sent: true, error: null };
  } catch (error) {
    console.error("[send-letter] Resend request failed:", error instanceof Error ? error.message : "Unknown error");
    return { sent: false, error: LETTER_SEND_ERROR };
  }
}