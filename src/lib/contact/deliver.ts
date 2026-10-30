import "server-only";
import { formatInquiry, type InquiryFields } from "./validation";

type DeliveryConfig = { apiKey: string; to: string; from: string };

/**
 * Email delivery is configured through environment variables (see .env.example).
 * Returns null when any value is missing so the caller can fall back honestly.
 */
export function getDeliveryConfig(): DeliveryConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/** Sends the inquiry through the Resend REST API. Throws on any failure. */
export async function deliverInquiry(fields: InquiryFields, config: DeliveryConfig) {
  const name = fields.name.replace(/[\r\n]+/g, " ");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: fields.email,
      subject: `New project inquiry from ${name}`,
      text: formatInquiry(fields),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}
