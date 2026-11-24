import type { CaseStudyBlock, Discipline, ImageAsset, Project, ProjectKind } from "@/types/content";
import galleries from "./project-galleries.json";

/**
 * Muse projects, curated to fifteen: quality over quantity. Two sources:
 *
 * Websites: https://www.farian.me/projects (copy and screenshots from each
 * project page, images via scripts/fetch-website-projects.mjs). merQetia is the
 * platform built for https://www.merqetia.nl.
 *
 * Everything else: https://www.behance.net/shuvo24. Taglines and
 * `about` use each gallery's own text and what its images show. `kind` is only
 * set where that text supports it: academic, concept, sample and client are
 * stated on Behance; "Self-initiated" covers personal art and redesigns.
 * Images via scripts/fetch-behance-covers.mjs and fetch-behance-galleries.mjs.
 */

const DESIGNER = "Showaeb Bhuyan Shuvo";
const DEVELOPER = "Farian Bin Rahman";

function screen(slug: string, name: string, alt: string): ImageAsset {
  return { src: `/projects/${slug}/${name}.webp`, alt, width: 1800, height: 1125 };
}

function phone(slug: string, name: string, alt: string): ImageAsset {
  return { src: `/projects/${slug}/${name}.webp`, alt, width: 828, height: 1792 };
}

function websiteProject(p: {
  slug: string;
  title: string;
  year: number;
  tagline: string;
  stack: string[];
  coverAlt: string;
  links: { label: string; href: string }[];
  blocks: CaseStudyBlock[];
  client?: string;
  kind: ProjectKind;
  tint?: string;
  featured?: boolean;
}): Project {
  return {
    slug: p.slug,
    title: p.title,
    client: p.client,
    discipline: "SaaS & Websites",
    year: p.year,
    tagline: p.tagline,
    tools: p.stack,
    cover: { src: `/projects/${p.slug}/cover.webp`, alt: p.coverAlt, width: 1800, height: 1125 },
    portrait: { src: `/projects/${p.slug}/portrait.webp`, alt: p.coverAlt, width: 1400, height: 1750 },
    links: p.links,
    tint: p.tint,
    kind: p.kind,
    blocks: p.blocks,
    credits: [{ role: "Product, design and development", name: DEVELOPER }],
    featured: p.featured ?? false,
  };
}

const websites: Project[] = [
  websiteProject({
    slug: "think-space",
    title: "Think Space",
    year: 2025,
    kind: "Self-initiated",
    tagline: "A real-time collaborative whiteboard: infinite canvas, sticky notes, shapes, connectors and ink, where every edit reaches everyone at once.",
    stack: ["React 19", "Vite", "react-konva", "Socket.IO", "PostgreSQL"],
    coverAlt: "A user-journey board with stage chips, sticky notes, pain-point notes and a hand-drawn emotion curve",
    links: [
      { label: "Open it", href: "https://think-space.onrender.com/" },
      { label: "Read the source", href: "https://github.com/farianbr/think-space" },
    ],
    tint: "#d9ccff",
    featured: true,
    blocks: [
      { type: "features", items: [
        "Notes, text, shapes, lines, arrows and pen strokes are rows in one table, so a marquee catches mixed types and drags, resizes and undoes them as one group.",
        "Edits render locally and reconcile with the server's acknowledgement, so a note being typed into is never remounted. Roles are resolved on join and re-checked on every message.",
        "Threaded comments and reactions anchor to items on the canvas. Boards export at true scale, and eight templates are built from the same items you would draw by hand.",
      ] },
      { type: "image", image: screen("think-space", "dashboard", "The Think Space dashboard showing board stats, recent boards with previews and an activity feed") },
      { type: "image", image: screen("think-space", "board-flowchart", "A sign-in flowchart with ellipses, rectangles, a decision diamond and labelled yes/no branches") },
      { type: "image", image: screen("think-space", "templates", "The template gallery with eight starter boards grouped by category") },
      { type: "pair", images: [
        phone("think-space", "mobile-dashboard", "The dashboard on a phone, with stats stacked and board previews at full width"),
        phone("think-space", "mobile-landing", "The landing page on a phone with the demo board rendered below the hero"),
      ] },
    ],
  }),
  websiteProject({
    slug: "merqetia",
    title: "merQetia",
    client: "merQetia",
    year: 2026,
    kind: "Client",
    tagline: "The order platform behind merQetia, a Dutch brand and growth agency: clients order work, admins price and assign it, employees deliver it, and all three follow the same order in real time.",
    stack: ["React 19", "Vite", "React Router", "Socket.IO"],
    coverAlt: "The admin order board grouped into new and active orders with status, payment and due-date columns",
    links: [
      { label: "Visit merqetia.nl", href: "https://www.merqetia.nl/" },
      { label: "Read the source", href: "https://github.com/farianbr/merQetia" },
    ],
    blocks: [
      { type: "text", body: ["merQetia runs brand strategy, web design, performance marketing and social media work for its clients from the Netherlands. This platform, still in progress, runs that work from order to invoice."] },
      { type: "features", items: [
        "Every route has one of three role layouts, each with its own navigation, command palette and notifications. The same order is a project to a client, a job to an employee and a line item to an admin.",
        "Each lifecycle transition is its own endpoint that checks the current status first. Invoices come from an atomic counter and are capped at the remaining balance, so the total can never exceed the price.",
        "Order and chat attachments live in a private bucket and stream through a route that checks the caller is on that order.",
      ] },
      { type: "image", image: screen("merqetia", "order-detail", "An order page with core information, project brief, questionnaire answers and a lifecycle tracker") },
      { type: "image", image: screen("merqetia", "client-dashboard", "The client dashboard with an attention banner, active projects and quick actions") },
      { type: "pair", images: [
        screen("merqetia", "reports", "A profit and loss summary with expense breakdown, orders by status and top services"),
        screen("merqetia", "invoices", "The invoice list with full, advance and partial invoices and their payment status"),
      ] },
      { type: "pair", images: [
        screen("merqetia", "employee-board", "The employee My Work board with new requests, active orders, completed and declined groups"),
        screen("merqetia", "support", "The support centre with tickets, a threaded conversation and inline scheduled meetings"),
      ] },
    ],
  }),
  websiteProject({
    slug: "kendro",
    title: "Kendro",
    year: 2025,
    kind: "Self-initiated",
    tagline: "A virtual co-working space: take a desk, say what you are working on, and work the block alongside your team, your friends or whoever else is in the room.",
    stack: ["React 18", "Vite", "Tailwind v4"],
    coverAlt: "A room with two desks, each showing a person, their current task and a running clock, with a session panel alongside",
    links: [
      { label: "Open it", href: "https://kendro-hq.vercel.app/" },
      { label: "Read the source", href: "https://github.com/farianbr/kendro" },
    ],
    blocks: [
      { type: "features", items: [
        "Sessions are the unit and rooms are optional, so people can sign up and start working without waiting to be admitted anywhere.",
        "Every person is a nameplate carrying their name, work topic and a clock since they sat down. Camera-off is the common case in co-working, so it gets a real state rather than a black rectangle.",
        "Durations are derived on the server with breaks subtracted, and a throttled sweep closes any session that stops sending a heartbeat. Every finished session fills a square on a contribution grid.",
      ] },
      { type: "image", image: { ...screen("kendro", "dashboard", "The dashboard with weekly hours, a contribution grid, live presence and rooms and teams"), width: 1440, height: 900 } },
      { type: "pair", images: [
        { ...screen("kendro", "session-running", "A running session with a countdown, task checklist and a note field"), width: 1440, height: 900 },
        { ...screen("kendro", "team-detail", "A team page showing live presence, team rooms and members with hours and roles"), width: 1440, height: 900 },
      ] },
      { type: "pair", images: [
        { ...phone("kendro", "mobile-dashboard", "The dashboard on a phone with stats, contribution grid and rooms stacked"), width: 375, height: 812 },
        { ...phone("kendro", "mobile-room", "A room floor on a phone with one desk and the call controls docked at the bottom"), width: 375, height: 812 },
      ] },
    ],
  }),
];

type Entry = {
  slug: string;
  title: string;
  behanceId: number;
  behanceSlug: string;
  year: number;
  discipline: Discipline;
  tagline: string;
  /** Longer case-study text, where the gallery has any. */
  about?: string[];
  tools?: string[];
  client?: string;
  kind?: ProjectKind;
  /** Cover pixel size as downloaded. */
  size: [number, number];
  alt: string;
  featured?: boolean;
  tint?: string;
};

const PS = "Adobe Photoshop";
const AI = "Adobe Illustrator";

const entries: Entry[] = [
  { slug: "furki-branding", title: "Furki Branding", behanceId: 253950065, behanceSlug: "Furki-Branding", year: 2026, discipline: "Branding", kind: "Academic", tools: [AI, PS], tagline: "Brand guidelines for Furki, an academic branding project.", size: [2000, 1125], alt: "Furki brand guidelines cover with the Furki wordmark between colour stripes", featured: true, tint: "#ffe3bd" },
  { slug: "premium-packaging", title: "Premium Packaging & Social Media Post", behanceId: 244006089, behanceSlug: "Premium-Packaging-Social-Media-Post", year: 2026, discipline: "Packaging", kind: "Client", client: "SKRP Group", tools: [AI], tagline: "Packaging and social media posts for SKRP Group's premium gold and silver mirror gang switches.", size: [2000, 2000], alt: "Gold mirror gang switch plates displayed on a dark stone plinth", featured: true, tint: "#ffd3c4" },
  { slug: "chikfi-packaging", title: "ChikFi Snack Packaging", behanceId: 220388341, behanceSlug: "Packaging-Design", year: 2025, discipline: "Packaging", kind: "Sample", tools: [AI, PS], tagline: "Snack bags for ChikFi chicken chips, with a print-ready dieline: fire, spice and a loud wordmark built to win the shelf.", size: [2000, 1333], alt: "Red ChikFi snack packets, front and back, on a teal background" },
  { slug: "natural-organic-packaging", title: "Natural Organic Essential Oil", behanceId: 220388341, behanceSlug: "Packaging-Design", year: 2025, discipline: "Packaging", kind: "Sample", tools: [AI, PS], tagline: "A carton for a mixed-flower essential oil: gold line botanicals on deep green, a bilingual English and Dutch panel and a full die-cut.", size: [1400, 1092], alt: "Dark green essential oil carton with gold botanical line art and its reflection" },
  { slug: "character-portfolio", title: "Character Portfolio", behanceId: 243981729, behanceSlug: "Character-Portfolio", year: 2026, discipline: "Illustration", kind: "Academic", tools: [PS], tagline: "Original character designs, made for a university Character Design course.", about: ["A portfolio developed for a university Character Design course, collecting original character designs. This edition is concise, with an expanded version planned."], size: [2000, 1500], alt: "Character turnaround sheet of an armoured figure shown from several angles" },
  { slug: "digital-detox-campaign", title: "Digital Detox Campaign", behanceId: 240794711, behanceSlug: "Digital-Detox-Campaign", year: 2025, discipline: "Social Media & Thumbnails", tools: [PS], tagline: "Two campaign visuals that ask different generations to unplug: \"Scroll away or break away\" and \"Escape the screen\".", about: ["Campaign visuals made to inspire different generations to unplug and reconnect with real life.", "In the first, a young man breaks free of a rope of endless scrolling and steps onto a floodlit football pitch. \"Scroll away or break away\" sets out the choice: leave the loop behind for physical activity and real experience.", "The second speaks to an older audience. A person meditates on their bed beside a phone with no connection, as a portal opens onto a sunlit forest. \"Escape the screen\" is about finding quiet by stepping away."], size: [2000, 1167], alt: "Campaign visual of a footballer bursting out of a smartphone screen into a stadium", featured: true, tint: "#ecd5f7" },
  { slug: "digital-paintings", title: "Digital Paintings", behanceId: 240735001, behanceSlug: "Digital-paintings", year: 2025, discipline: "Illustration", kind: "Self-initiated", tools: [PS], tagline: "A freedom fighter stands with the red and green flag at the dawn of victory.", size: [2000, 2400], alt: "Digital painting of a lone figure raising a flag before a burning red landscape" },
  { slug: "cities-of-bangladesh", title: "Cities of Bangladesh", behanceId: 240603057, behanceSlug: "Citis-of-Bangladesh", year: 2025, discipline: "Illustration", kind: "Self-initiated", tools: [PS], tagline: "An ongoing poster series capturing Dhaka, Sylhet, Chattogram and Rajshahi as miniature worlds. Purchased by SKRP Group.", about: ["A series highlighting the cities of Bangladesh, starting with four so far and trying to capture the essence of each. It is an ongoing project, and SKRP Group has purchased the work."], size: [2000, 2857], alt: "Collage of a hill town on a floating island above a road, titled Chattogram in Bangla", featured: true, tint: "#ffe3bd" },
  { slug: "carclinic-stationery", title: "CarClinic Stationery Design", behanceId: 212348757, behanceSlug: "CarClinic-Stationery-Design", year: 2024, discipline: "Branding", kind: "Client", client: "CarClinic", tools: [PS, AI], tagline: "Brand stationery for CarClinic: flyer, business cards, ID cards and letterhead.", size: [1400, 1050], alt: "Black CarClinic business cards with red accents on a dark surface" },
  { slug: "thumbnails", title: "Thumbnails", behanceId: 200259907, behanceSlug: "Thumbnails", year: 2024, discipline: "Social Media & Thumbnails", tools: [PS], tagline: "YouTube thumbnails built around big type and a strong portrait.", size: [1705, 1330], alt: "Thumbnail with red Bangla lettering about 2024 next to a man's portrait" },
  { slug: "foods", title: "Foods", behanceId: 198287599, behanceSlug: "FOODS", year: 2024, discipline: "Social Media & Thumbnails", tools: [PS], tagline: "Food and drink ads for pizza, Asian dishes, sleep gummies and a soft drink.", size: [1080, 1080], alt: "Red Mojo drink can bursting through ice against snowy mountains" },
  { slug: "electronics", title: "Electronics", behanceId: 198298019, behanceSlug: "ELECTRONICS", year: 2024, discipline: "Social Media & Thumbnails", tools: [PS], tagline: "Product ads for water purifiers, a gaming laptop and headphones.", size: [1184, 1184], alt: "Grid of social posts for a laptop, headphones and a water purifier" },
];

function cover(e: Entry): ImageAsset {
  return { src: `/projects/${e.slug}/cover.webp`, alt: e.alt, width: e.size[0], height: e.size[1] };
}

function portrait(e: Entry): ImageAsset {
  return { src: `/projects/${e.slug}/portrait.webp`, alt: e.alt, width: 1400, height: 1750 };
}

/** Wide images run full width; neighbouring upright images share a row. */
function galleryBlocks(e: Entry): CaseStudyBlock[] {
  const list = (galleries as Record<string, { name: string; width: number; height: number }[]>)[e.slug] ?? [];
  const images: ImageAsset[] = list.map((image, i) => ({
    src: `/projects/${e.slug}/${image.name}.webp`,
    alt: `${e.title}, image ${i + 1} of ${list.length}`,
    width: image.width,
    height: image.height,
  }));
  // The cover is often the first image; do not show the same picture twice.
  const [first] = images;
  if (first && Math.abs(first.width / first.height - e.size[0] / e.size[1]) < 0.02) images.shift();

  const upright = (image: ImageAsset) => image.height >= image.width * 0.95;

  const blocks: CaseStudyBlock[] = [];
  for (let i = 0; i < images.length; i++) {
    const next = images[i + 1];
    if (upright(images[i]) && next && upright(next)) {
      blocks.push({ type: "pair", images: [images[i], next] });
      i += 1;
    } else {
      blocks.push({ type: "image", image: images[i] });
    }
  }
  return blocks;
}

/** Curated running order: disciplines interleave so no two neighbours match. */
const ORDER = [
  "think-space",
  "furki-branding",
  "premium-packaging",
  "digital-detox-campaign",
  "cities-of-bangladesh",
  "merqetia",
  "chikfi-packaging",
  "thumbnails",
  "carclinic-stationery",
  "digital-paintings",
  "kendro",
  "natural-organic-packaging",
  "electronics",
  "character-portfolio",
  "foods",
];

export const projects: Project[] = [
  ...websites,
  ...entries.map((e): Project => ({
    slug: e.slug,
    title: e.title,
    client: e.client,
    discipline: e.discipline,
    year: e.year,
    tagline: e.tagline,
    tools: e.tools,
    cover: cover(e),
    portrait: portrait(e),
    behanceUrl: `https://www.behance.net/gallery/${e.behanceId}/${e.behanceSlug}`,
    kind: e.kind,
    blocks: [
      ...(e.about ? [{ type: "text" as const, body: e.about }] : []),
      ...galleryBlocks(e),
    ],
    credits: [{ role: "Design", name: DESIGNER }],
    featured: e.featured ?? false,
    tint: e.tint,
  })),
].sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export { disciplines } from "./disciplines";

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Same discipline first, then the most recent work, so a page always gets three. */
export function getRelatedProjects(project: Project) {
  const others = projects.filter((p) => p.slug !== project.slug);
  const same = others.filter((p) => p.discipline === project.discipline);
  const rest = others.filter((p) => p.discipline !== project.discipline);
  return [...same, ...rest].slice(0, 3);
}

export const featuredProjects = projects.filter((p) => p.featured);
