import type { SocialLink } from "@/types/content";

/**
 * Global brand and contact information.
 * Anything marked UNCONFIRMED must be verified before launch (docs/CONTENT.md).
 */
export const site = {
  /** Brand name everywhere except the footer's legal line. */
  name: "Muse",
  /** Footer and copyright only. */
  legalName: "Muse & Co.",
  tagline: "Brand identity, packaging, social and websites",
  description:
    "Muse is a creative studio for brand identity, packaging, social content, illustration and websites. Based in Luton, UK, working with clients worldwide.",
  /** UNCONFIRMED: verify this mailbox exists before launch. */
  email: "hello@musendco.com",
  location: "Luton, UK",
  availability: "Available worldwide",
  /** Studio coordinates for the About globe. */
  coordinates: [51.8787, -0.42] as [number, number],
  social: [
    { label: "Behance", href: "https://www.behance.net/shuvo24" },
    { label: "Instagram", href: "https://www.instagram.com/cripto_arts_" },
    { label: "Facebook", href: "https://www.facebook.com/Shuvo.bhuiya180" },
  ] as SocialLink[],
} as const;

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
