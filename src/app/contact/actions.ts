"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { deliverInquiry, getDeliveryConfig } from "@/lib/contact/deliver";
import { isRateLimited } from "@/lib/contact/rate-limit";
import {
  formatInquiry,
  readInquiry,
  validateInquiry,
  type InquiryState,
} from "@/lib/contact/validation";

/** Submissions faster than this after the first interaction are treated as automated. */
const MIN_FILL_MS = 2500;

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values = readInquiry(formData);

  // Honeypot: real visitors never see or fill this field. Respond as if it
  // worked so automated senders get no signal, but send nothing.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return { status: "success" };
  }

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || startedAt <= 0 || Date.now() - startedAt < MIN_FILL_MS) {
    return {
      status: "error",
      message: "That was very quick. Please check your details and send again.",
      values,
    };
  }

  const errors = validateInquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const requestHeaders = await headers();
  const clientKey =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(clientKey)) {
    return {
      status: "error",
      message: `Too many messages in a short time. Please try again later or email ${site.email}.`,
      values,
    };
  }

  const config = getDeliveryConfig();
  if (!config) {
    // No delivery service configured: never pretend the message was sent.
    // Hand the visitor a prefilled email instead.
    const body = formatInquiry(values).slice(0, 1800);
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project inquiry from ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Delivery not configured; returned mailto fallback.");
    }
    return { status: "unconfigured", mailto, values };
  }

  try {
    await deliverInquiry(values, config);
    return { status: "success" };
  } catch (error) {
    console.error("[contact] Delivery failed", error);
    return {
      status: "error",
      message: `Your message could not be sent. Please try again, or email ${site.email} directly.`,
      values,
    };
  }
}
