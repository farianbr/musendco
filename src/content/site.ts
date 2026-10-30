import type { SocialLink } from "@/types/content";

/**
 * Global brand and contact information.
 * Anything marked UNCONFIRMED must be verified before launch (docs/CONTENT.md).
 */
export const site = {
  name: "Musendco",
  tagline: "Brand identity, digital products and websites",
  description:
    "Musendco is a creative agency for brand identity, digital products and websites. Strategy, design and engineering in one team.",
  /** UNCONFIRMED: verify this mailbox exists before launch. */
  email: "hello@musendco.com",
  /** From the Behance profile (https://www.behance.net/shuvo24). */
  location: "Dhaka, Bangladesh",
  social: [
    { label: "Behance", href: "https://www.behance.net/shuvo24" },
    { label: "Instagram", href: "https://www.instagram.com/cripto_arts_" },
    { label: "Facebook", href: "https://www.facebook.com/Shuvo.bhuiya180" },
  ] as SocialLink[],
  /**
   * While true, the footer states that testimonials are placeholders. Set to
   * false once src/content/people.ts holds approved quotes.
   */
  demoContent: true,
} as const;

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
