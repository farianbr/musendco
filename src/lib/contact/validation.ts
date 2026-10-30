import { budgetRanges, projectTypes } from "@/content/contact";

export type InquiryFields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryFields, string>>;

export type InquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: InquiryErrors; values: InquiryFields }
  | { status: "error"; message: string; values: InquiryFields }
  | { status: "unconfigured"; mailto: string; values: InquiryFields }
  | { status: "success" };

export const LIMITS = {
  name: 120,
  email: 254,
  company: 120,
  messageMin: 20,
  messageMax: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function readInquiry(formData: FormData): InquiryFields {
  return {
    name: text(formData, "name"),
    email: text(formData, "email"),
    company: text(formData, "company"),
    projectType: text(formData, "projectType"),
    budget: text(formData, "budget"),
    message: text(formData, "message"),
  };
}

export function validateInquiry(fields: InquiryFields): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!fields.name) errors.name = "Please enter your name.";
  else if (fields.name.length > LIMITS.name) errors.name = `Please keep this under ${LIMITS.name} characters.`;

  if (!fields.email) errors.email = "Please enter your email address.";
  else if (fields.email.length > LIMITS.email || !EMAIL_PATTERN.test(fields.email))
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (fields.company.length > LIMITS.company)
    errors.company = `Please keep this under ${LIMITS.company} characters.`;

  if (!projectTypes.includes(fields.projectType))
    errors.projectType = "Please choose the kind of project.";

  if (fields.budget && !budgetRanges.includes(fields.budget))
    errors.budget = "Please choose one of the listed ranges.";

  if (fields.message.length < LIMITS.messageMin)
    errors.message = `Please tell us a little more (at least ${LIMITS.messageMin} characters).`;
  else if (fields.message.length > LIMITS.messageMax)
    errors.message = `Please keep this under ${LIMITS.messageMax} characters.`;

  return errors;
}

/** Plain-text body used for both the delivered email and the mailto fallback. */
export function formatInquiry(fields: InquiryFields): string {
  const details = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company && `Company: ${fields.company}`,
    `Project type: ${fields.projectType}`,
    fields.budget && `Budget: ${fields.budget}`,
  ].filter(Boolean);
  return `${details.join("\n")}\n\n${fields.message}`;
}
