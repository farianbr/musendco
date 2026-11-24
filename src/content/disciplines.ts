import type { Discipline } from "@/types/content";

/** The services Muse offers. Also the project categories and the filters on /services. */
export const disciplines: Discipline[] = [
  "Branding",
  "SaaS & Websites",
  "Packaging",
  "Social Media & Thumbnails",
  "Illustration",
];

/** URL fragment for a service, e.g. "SaaS & Websites" -> "saas-websites". */
export function disciplineSlug(discipline: string) {
  return discipline
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
