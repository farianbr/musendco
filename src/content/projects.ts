import type { CaseStudyBlock, Discipline, ImageAsset, Project, ProjectKind } from "@/types/content";
import galleries from "./project-galleries.json";

/**
 * Musendco projects. Two sources:
 *
 * Websites: https://www.farian.me/projects (copy and screenshots from each
 * project page, images via scripts/fetch-website-projects.mjs). merQetia is the
 * platform built for https://www.merqetia.nl.
 *
 * Everything else: https://www.behance.net/shuvo24 (31 projects). Taglines and
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
    discipline: "Websites",
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
    tint: "#c9e4ff",
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
  websiteProject({
    slug: "subscription-manager",
    title: "Subscription Manager",
    year: 2024,
    kind: "Self-initiated",
    tagline: "A tracker for recurring charges that answers what you are spending this month, what is about to hit, and where the money actually goes.",
    stack: ["React 19", "Vite", "Tailwind v4"],
    coverAlt: "The Subscription Manager overview with a monthly outlook card, spend stats and upcoming payments",
    links: [
      { label: "Open it", href: "https://subscription-manager-qgi7.onrender.com/" },
      { label: "Read the source", href: "https://github.com/farianbr/subscription-manager" },
    ],
    blocks: [
      { type: "features", items: [
        "Every amount is stored twice, as entered and normalised at entry time, so a later rate move can never rewrite your history and bills in different currencies stay addable.",
        "A six-month forecast steps each subscription's real billing cycle forward, so an annual renewal shows up as the spike it is rather than a monthly average.",
        "Price-change detection reads the transaction history, a nightly job rolls billing cycles forward and fires reminders, and calendar events update themselves as you edit.",
      ] },
      { type: "image", image: screen("subscription-manager", "spending", "A billed-per-month line chart with top providers and a category breakdown bar") },
      { type: "image", image: screen("subscription-manager", "forecast", "Renewal forecast bar chart for the next six months alongside detected price changes") },
      { type: "pair", images: [
        screen("subscription-manager", "ai-insights", "AI-generated insight cards covering productivity costs, duplicate services and spending variance"),
        screen("subscription-manager", "subscriptions", "The full subscription table with category, amount, next renewal and per-row toggles"),
      ] },
      { type: "pair", images: [
        phone("subscription-manager", "mobile-dashboard", "The overview on a phone, cards stacked into a single column"),
        phone("subscription-manager", "mobile-history", "Month-by-month transaction history on a phone with edit and delete per row"),
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
  hero?: boolean;
  tint?: string;
};

const PS = "Adobe Photoshop";
const AI = "Adobe Illustrator";

const entries: Entry[] = [
  { slug: "furki-branding", title: "Furki Branding", behanceId: 253950065, behanceSlug: "Furki-Branding", year: 2026, discipline: "Branding", kind: "Academic", tools: [AI, PS], tagline: "Brand guidelines for Furki, an academic branding project.", size: [2000, 1125], alt: "Furki brand guidelines cover with the Furki wordmark between colour stripes", featured: true, tint: "#ffe2b8" },
  { slug: "premium-packaging", title: "Premium Packaging & Social Media Post", behanceId: 244006089, behanceSlug: "Premium-Packaging-Social-Media-Post", year: 2026, discipline: "Packaging", kind: "Client", client: "SKRP Group", tools: [AI], tagline: "Packaging and social media posts for SKRP Group's premium gold and silver mirror gang switches.", size: [2000, 2000], alt: "Gold mirror gang switch plates displayed on a dark stone plinth", featured: true, tint: "#e6dfd0" },
  { slug: "brochure-illustration", title: "Brochure Illustration Design", behanceId: 243983631, behanceSlug: "Brochure-Illustration-Design", year: 2026, discipline: "Print & editorial", kind: "Concept", tools: [PS], tagline: "An illustrated tour brochure concept for a Saint Martin treasure hunt, with a pirate scene and an island map.", size: [2000, 1422], alt: "Illustrated tri-fold brochure showing a tropical coast and a pirate, on a red ribbed background" },
  { slug: "bangla-typography", title: "Creative Bangla Typography", behanceId: 243982889, behanceSlug: "Creative-Bangla-Typography", year: 2026, discipline: "Illustration & type", kind: "Self-initiated", tools: [AI], tagline: "Geometric Bangla lettering for the words অমর and জীবন, made to work as a logo, T-shirt print, book cover or poster.", size: [2000, 2000], alt: "Bangla letters built from red, blue and yellow geometric shapes on cream", hero: true },
  { slug: "book-covers", title: "Book Cover Design", behanceId: 243982105, behanceSlug: "Book-cover-Design", year: 2026, discipline: "Print & editorial", kind: "Concept", tools: [PS], tagline: "A concept redesign of the Byomkesh Bakshi book cover.", size: [1650, 2550], alt: "Byomkesh Bakshi book cover with a hand holding a quill against a fiery orange sky, above Bangla title lettering" },
  { slug: "character-portfolio", title: "Character Portfolio", behanceId: 243981729, behanceSlug: "Character-Portfolio", year: 2026, discipline: "Illustration & type", kind: "Academic", tools: [PS], tagline: "Original character designs, made for a university Character Design course.", about: ["A portfolio developed for a university Character Design course, collecting original character designs. This edition is concise, with an expanded version planned."], size: [2000, 1500], alt: "Character turnaround sheet of an armoured figure shown from several angles" },
  { slug: "digital-detox-campaign", title: "Digital Detox Campaign", behanceId: 240794711, behanceSlug: "Digital-Detox-Campaign", year: 2025, discipline: "Social & campaign", tools: [PS], tagline: "Two campaign visuals that ask different generations to unplug: \"Scroll away or break away\" and \"Escape the screen\".", about: ["Campaign visuals made to inspire different generations to unplug and reconnect with real life.", "In the first, a young man breaks free of a rope of endless scrolling and steps onto a floodlit football pitch. \"Scroll away or break away\" sets out the choice: leave the loop behind for physical activity and real experience.", "The second speaks to an older audience. A person meditates on their bed beside a phone with no connection, as a portal opens onto a sunlit forest. \"Escape the screen\" is about finding quiet by stepping away."], size: [2000, 1167], alt: "Campaign visual of a footballer bursting out of a smartphone screen into a stadium", featured: true, tint: "#d5f5c8" },
  { slug: "digital-paintings", title: "Digital Paintings", behanceId: 240735001, behanceSlug: "Digital-paintings", year: 2025, discipline: "Illustration & type", kind: "Self-initiated", tools: [PS], tagline: "A freedom fighter stands with the red and green flag at the dawn of victory.", size: [2000, 2400], alt: "Digital painting of a lone figure raising a flag before a burning red landscape", hero: true },
  { slug: "cities-of-bangladesh", title: "Cities of Bangladesh", behanceId: 240603057, behanceSlug: "Citis-of-Bangladesh", year: 2025, discipline: "Illustration & type", kind: "Self-initiated", tools: [PS], tagline: "An ongoing poster series capturing Dhaka, Sylhet, Chattogram and Rajshahi as miniature worlds. Purchased by SKRP Group.", about: ["A series highlighting the cities of Bangladesh, starting with four so far and trying to capture the essence of each. It is an ongoing project, and SKRP Group has purchased the work."], size: [2000, 2857], alt: "Collage of a hill town on a floating island above a road, titled Chattogram in Bangla", hero: true },
  { slug: "skrp-business-card", title: "Elite Business Card for SKRP Group", behanceId: 236831737, behanceSlug: "Elite-business-card-of-SKRP-GROUP", year: 2025, discipline: "Branding", kind: "Client", client: "SKRP Group", tools: [AI], tagline: "A prestige business card made for the elite members of the SKRP Group of Industries.", size: [2000, 1422], alt: "Black business card with an orange Elite wordmark floating over a dark orange gradient", featured: true, tint: "#ffd4c2" },
  { slug: "taka-banknote-redesign", title: "1000 Taka Banknote Redesign", behanceId: 234917261, behanceSlug: "Bangladeshi-1000-Taka-Banknote-Redesign", year: 2025, discipline: "Print & editorial", kind: "Self-initiated", tagline: "A redesign of Bangladesh's 1000 taka note, with new artwork on the front and back.", size: [2000, 2000], alt: "Front and back of a redesigned pink 1000 taka banknote" },
  { slug: "movie-posters-redesign", title: "Bangladeshi Movie Posters Redesign", behanceId: 234916941, behanceSlug: "Bangladeshi-Movie-Posters-Redesign", year: 2025, discipline: "Print & editorial", kind: "Self-initiated", tagline: "New posters for two Bangladeshi films.", size: [2000, 2800], alt: "Film poster with two actors, scattered photographs and red Bangla title lettering", hero: true },
  { slug: "magazine-layout", title: "Magazine Layout Design", behanceId: 234124435, behanceSlug: "Magazine-Layout-Design", year: 2025, discipline: "Print & editorial", tools: [AI, PS], tagline: "Front and back covers for Untold, a mystery magazine.", size: [2000, 1867], alt: "Mystery magazine titled Untold with a red-toned portrait on the cover, shown with its back cover" },
  { slug: "product-photography", title: "Product Photography", behanceId: 230588291, behanceSlug: "Product-Photography", year: 2025, discipline: "Photo & retouching", tagline: "Blue and amber light studies of a men's perfume.", size: [2000, 3000], alt: "Perfume bottle glowing amber against a dark background", hero: true },
  { slug: "social-media-manipulation", title: "Social Media Manipulation", behanceId: 224507117, behanceSlug: "Social-Media-Manipulation", year: 2025, discipline: "Social & campaign", tools: [PS], tagline: "Composited posts for citizenship investment, study abroad, European residency and a soft drink.", size: [1080, 1500], alt: "Social post with a passport over a city skyline advertising investment citizenship" },
  { slug: "photography", title: "Photography", behanceId: 224355965, behanceSlug: "Photography", year: 2025, discipline: "Photo & retouching", kind: "Self-initiated", tagline: "Low-light car photography under neon, and a street portrait.", size: [2000, 1333], alt: "Sports car under pink and blue neon light at night" },
  { slug: "packaging-design", title: "Packaging Design", behanceId: 220388341, behanceSlug: "Packaging-Design", year: 2025, discipline: "Packaging", kind: "Sample", tools: [AI, PS], tagline: "Sample packaging with dielines: ChikFi snacks, a herbal product box and Shield toothpaste.", size: [2000, 1333], alt: "Red ChikFi snack packets, front and back, on a teal background" },
  { slug: "my-paintings", title: "My Paintings", behanceId: 220403569, behanceSlug: "My-Paintings", year: 2025, discipline: "Illustration & type", kind: "Self-initiated", tools: ["Acrylic paint", "Poster colour"], tagline: "Abstract paintings in acrylic and poster colour, including First Rose, Foggy Ocean and Flow of Mind.", about: ["Abstract paintings: First Rose, Foggy Ocean, The Blank Canvas and Flow of Mind."], size: [2000, 2400], alt: "Abstract painting with a blue form surrounded by red and black textures" },
  { slug: "cripto-digital-logo", title: "Cripto Digital Logo", behanceId: 220157535, behanceSlug: "Cripto-Digital-Logo", year: 2025, discipline: "Branding", kind: "Concept", tools: [AI], tagline: "A concept logo for Cripto Digital, built from a bold C and D monogram.", size: [2000, 1123], alt: "Cripto Digital logo in white on a purple to red gradient" },
  { slug: "posters", title: "Posters", behanceId: 218231587, behanceSlug: "Posters", year: 2025, discipline: "Print & editorial", tagline: "Two posters: a Toyota 86 and a space landscape.", size: [1200, 1680], alt: "Poster of a white Toyota 86 beneath a large number 86" },
  { slug: "carclinic-stationery", title: "CarClinic Stationery Design", behanceId: 212348757, behanceSlug: "CarClinic-Stationery-Design", year: 2024, discipline: "Branding", kind: "Client", client: "CarClinic", tools: [PS, AI], tagline: "Brand stationery for CarClinic: flyer, business cards, ID cards and letterhead.", size: [1400, 1050], alt: "Black CarClinic business cards with red accents on a dark surface" },
  { slug: "thumbnails", title: "Thumbnails", behanceId: 200259907, behanceSlug: "Thumbnails", year: 2024, discipline: "Social & campaign", tools: [PS], tagline: "YouTube thumbnails built around big type and a strong portrait.", size: [1705, 1330], alt: "Thumbnail with red Bangla lettering about 2024 next to a man's portrait" },
  { slug: "baby-basket", title: "Baby Basket", behanceId: 198350321, behanceSlug: "Baby-Basket", year: 2024, discipline: "Social & campaign", kind: "Client", client: "Baby Basket", tools: [PS], tagline: "A Mother's Day post and product posts for baby skincare and mommy bags.", size: [1705, 1148], alt: "Grid of pastel social posts featuring baby care products" },
  { slug: "the-blackboard", title: "The Blackboard", behanceId: 198349771, behanceSlug: "The-BlackBorad", year: 2024, discipline: "Social & campaign", kind: "Client", client: "The BlackBoard", tools: [PS], tagline: "A Mother's Day post and a \"Your Pathway to Success\" post for The BlackBoard.", size: [1200, 1200], alt: "Mother's Day post with a white line illustration of a mother and child on black" },
  { slug: "bonoya-mothers-day", title: "Bonoya Mother's Day", behanceId: 198350023, behanceSlug: "Bonoya-Mothers-day", year: 2024, discipline: "Social & campaign", kind: "Client", client: "Bonoya", tools: [PS], tagline: "A Mother's Day post for Bonoya.", size: [1200, 1200], alt: "Green tree illustration with Bangla Mother's Day text on white" },
  { slug: "manipulations", title: "Manipulations", behanceId: 198293975, behanceSlug: "MANIPULATIONS", year: 2024, discipline: "Photo & retouching", kind: "Self-initiated", tools: [PS, AI], tagline: "Image manipulation artwork, sold as prints on Displate.", size: [2000, 1429], alt: "Composite of a hiker facing a giant moss-covered skull in misty mountains" },
  { slug: "foods", title: "Foods", behanceId: 198287599, behanceSlug: "FOODS", year: 2024, discipline: "Social & campaign", tools: [PS], tagline: "Food and drink ads for pizza, Asian dishes, sleep gummies and a soft drink.", size: [1080, 1080], alt: "Red Mojo drink can bursting through ice against snowy mountains" },
  { slug: "electronics", title: "Electronics", behanceId: 198298019, behanceSlug: "ELECTRONICS", year: 2024, discipline: "Social & campaign", tools: [PS], tagline: "Product ads for water purifiers, a gaming laptop and headphones.", size: [1184, 1184], alt: "Grid of social posts for a laptop, headphones and a water purifier" },
  { slug: "medical", title: "Medical", behanceId: 198298601, behanceSlug: "MEDICAL", year: 2024, discipline: "Social & campaign", kind: "Sample", tools: [PS], tagline: "A sample healthcare post: \"Your health is our concern\".", size: [1400, 1400], alt: "Healthcare post with a smiling doctor beside the words Your health is our concern" },
  { slug: "retouches", title: "Retouches", behanceId: 198290535, behanceSlug: "RETOUCHES", year: 2024, discipline: "Photo & retouching", tools: [PS], tagline: "Portrait skin retouching, shown before and after.", size: [1200, 807], alt: "Before and after retouch of a smiling red-haired woman" },
  { slug: "cars", title: "Cars", behanceId: 198287163, behanceSlug: "CARS", year: 2024, discipline: "Social & campaign", kind: "Sample", tools: [PS], tagline: "A sample automotive post for the BMW X1.", size: [1200, 1200], alt: "Black BMW X1 advertisement on a light grey background" },
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
    hero: e.hero,
    tint: e.tint,
  })),
];

export const disciplines: Discipline[] = [
  "Websites",
  "Branding",
  "Packaging",
  "Print & editorial",
  "Illustration & type",
  "Social & campaign",
  "Photo & retouching",
];

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
export const heroProjects = projects.filter((p) => p.hero);
