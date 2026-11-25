export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudyBlock =
  | { type: "text"; body: string[] }
  | { type: "features"; items: string[] }
  | { type: "image"; image: ImageAsset }
  | { type: "pair"; images: [ImageAsset, ImageAsset] };

export type Project = {
  slug: string;
  title: string;
  /** Only set when the source names the client. */
  client?: string;
  /** Primary discipline. Also the service filter on /services. */
  discipline: Discipline;
  year: number;
  /** One line used on cards. */
  tagline: string;
  /** Design software, or the stack for web projects. */
  tools?: string[];
  cover: ImageAsset;
  portrait: ImageAsset;
  /** The full project, where it is published. */
  behanceUrl?: string;
  /** Live site and source links, for web projects. */
  links?: { label: string; href: string }[];
  /** Solid card colour on the home page's selected-work stack. Dark ink sits on it. */
  tint?: string;
  /** How the work came about. Left unset where the source does not say. */
  kind?: ProjectKind;
  blocks: CaseStudyBlock[];
  credits: { role: string; name: string }[];
  featured: boolean;
};

export type ProjectKind = "Client" | "Self-initiated" | "Academic" | "Concept" | "Sample";

export type Discipline =
  | "Branding"
  | "SaaS & Websites"
  | "Packaging"
  | "Social Media & Thumbnails"
  | "Illustration";

export type ProcessStage = {
  name: string;
  description: string;
  outcome: string;
  duration: string;
};

export type Client = {
  name: string;
  /**
   * The client's own logo in full colour (transparent PNG in public/clients),
   * `src` for the light theme and `dark` for the dark theme when the two
   * differ. A logo that is one colour of ink (black on white) is set `mono`:
   * `src` is then a mask painted in the text colour, so it follows the theme.
   * Without a logo, the name is typeset. `scale` nudges the optical size.
   */
  logo?: { src: string; dark?: string; width: number; height: number; scale?: number; mono?: boolean };
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
