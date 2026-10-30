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
  /** Primary discipline. Also drives the filter on /work. */
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
  /** Shown in the hero gallery. Never also featured, so the home page does not repeat itself. */
  hero?: boolean;
  /** How the work came about. Left unset where the source does not say. */
  kind?: ProjectKind;
  blocks: CaseStudyBlock[];
  credits: { role: string; name: string }[];
  featured: boolean;
};

export type ProjectKind = "Client" | "Self-initiated" | "Academic" | "Concept" | "Sample";

export type Discipline =
  | "Websites"
  | "Branding"
  | "Packaging"
  | "Print & editorial"
  | "Illustration & type"
  | "Social & campaign"
  | "Photo & retouching";

export type Service = {
  slug: string;
  name: string;
  value: string;
  description: string[];
  deliverables: string[];
  image: ImageAsset;
};

export type ProcessStage = {
  name: string;
  description: string;
  outcome: string;
  duration: string;
};

export type Client = {
  name: string;
  /** Simple geometric glyph rendered next to the wordmark. */
  glyph: "circle" | "half" | "ring" | "square" | "triangle" | "bars" | "arc" | "diamond";
  case: "upper" | "lower" | "title";
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  photo: ImageAsset;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
