import "server-only";
import nodemailer from "nodemailer";
import { formatInquiry, type InquiryFields } from "./validation";

type DeliveryConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  from: string;
};

const DEFAULT_SMTP_PORT = 465;
const TIMEOUT_MS = 10_000;

/**
 * Email delivery is configured through environment variables (see .env.example).
 * Returns null when any value is missing so the caller can fall back honestly.
 */
export function getDeliveryConfig(): DeliveryConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || DEFAULT_SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!host || !Number.isInteger(port) || !user || !pass || !to || !from) return null;
  return { host, port, user, pass, to, from };
}

/** Sends the inquiry through the configured SMTP mailbox. Throws on any failure. */
export async function deliverInquiry(fields: InquiryFields, config: DeliveryConfig) {
  const name = fields.name.replace(/[\r\n]+/g, " ");
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // Port 465 uses TLS from the start; other ports such as 587 must upgrade with STARTTLS.
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: fields.email,
    subject: `New project inquiry from ${name}`,
    text: formatInquiry(fields),
  });
}
