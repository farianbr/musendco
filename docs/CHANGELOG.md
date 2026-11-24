# Changelog

## 2026-11-25 — Wall of fame, founder photo, hero contrast

- **Toolbox**: no more doubled logos. React is one file in a mid blue that reads on both themes; Socket.IO is drawn in the text colour. The per-theme logo pairs and their CSS are gone.
- **Testimonials**: now a wall of fame. No avatars; each quote is a plaque (company, quote, name and role) hung slightly off true on a dotted wall, with every third plaque on a diagonal set in larger type. Hover straightens a plaque. Drag, throw and drift are unchanged. Eyebrow reads "Wall of fame".
- **Founder photo**: the original file in public/about is served as-is (`unoptimized`): full resolution, no re-compression, and "Open image in new tab" opens it instead of downloading. Optimised images are also served inline now (`images.contentDispositionType: "inline"`); `images.qualities` is back to the default.
- **Hero**: "Start a project" is drawn in the text colour (white on dark, black on light) with an orange arrow chip, so it stands off the orange field.
- **Clients**: Revenant Esports logo removed (wrong mark); the name is typeset until a file is supplied.

## 2026-11-25 — Logos, hero CTA, menu theme, testimonials

- **Founder photo**: re-exported at the supplied file's full resolution (2469px) and served at quality 90 (`images.qualities: [75, 90]`).
- **Menu**: the panel follows the site theme (it was locked to the light palette); the Close pill inverts with it.
- **Hero**: "Start a project" is the primary action (orange, glow, arrow chip); "View projects" is a quiet outline. Neither follows the cursor any more.
- **Founder role**: Founder & Creative Head.
- **Testimonials**: every card shares one surface. The wall is driven by `TestimonialWall`: drag it with a mouse or pen and throw it; hover slows it to a stop; touch still scrolls the page.
- **Clients**: real logos for Sony, KENT, UNICEF, Domino's, Kelinto, merQetia, Hindware, Hitachi, Revenant Esports and MSI, as one-colour masks; the rest are typeset names (see ASSETS.md). The generated glyphs are gone. Stats card label is now "Brand partners".
- **Toolbox**: full-colour current logos (new Vite mark, current Adobe tiles, Figma, Blender, etc.) instead of single-colour icons. `simple-icons` removed.

## 2026-11-24 — Titles, toolbox tooltips, footer, our story

- **Titles**: "Muse & Co." on Home, "Page - Muse & Co." elsewhere (case studies use the project name). Open Graph site name is Muse & Co.
- **Toolbox**: tooltips are hidden until their tile is hovered (pure utilities) and are no longer clipped by the card.
- **Footer**: the wordmark no longer runs the scroll reveal; its opacity, transform and blur made the backdrop blur jump on first view.
- **About, Our story**: rebuilt with room to breathe: label column, heading and intro, then three pillars (Design, Build, One team). The unrelated image is gone.

## 2026-11-24 — Services merge, globe, toolbox, testimonial wall

- **Work is now Services**: the project index moved from `/work` to `/services` (case studies at `/services/<slug>`), presented by service. The old services page, the home "What we do" accordion, the FAQ list and `src/content/services.ts` were removed. 308 redirects keep `/work` and `/work/<slug>` working. Menu, footer, sitemap, proxy and the contact form's project types now use the five services (`src/content/disciplines.ts`). `/services#packaging` opens with that filter selected.
- **Email once per view**: the closing card no longer repeats the email shown in the footer.
- **Testimonials**: nine quotes (five new placeholders) on a wall of slowly drifting columns that pause on hover; two feature cards in brand orange and violet; swipeable row on phones. New heading without the asterisk device.
- **About on Home**: "A studio in Luton, working with the world" section with the studio mark, the globe tile and the toolbox. About page uses the same shared `AboutBento` and `Toolbox`.
- **Globe**: rebuilt after wearestokt.com on canvas: solid sphere, graticule, dotted land, crisp 1:50m coastlines, pulsing Luton marker; auto-rotates, drag on both axes with throw momentum, slows on hover. Geometry is precomputed as unit vectors (about 170fps where the d3 per-frame version ran at 22). Map data in `public/geo/land-50m.json` (Natural Earth via world-atlas). `cobe` removed; `d3-geo`, `topojson-client`, `simple-icons` added.
- **Toolbox**: "Everyday toolbox" row of tool tiles drifting past, each naming itself on hover. Edit the list in `src/components/about/Toolbox.tsx`.

## 2026-11-24 — Services, process and testimonials

- **What we do**: rebuilt as full-width accordion rows (number, name, value, toggle). The open row shows the related project image, the approach, deliverables and a link. Service images now use real project covers; the stock photos in `public/services/` were removed.
- **Process**: each timeline dot fills (with a single ring bloom) the moment the drawing line reaches it. Positions are measured, so they stay in sync at any width.
- **Testimonials**: "Don't take our word for it* / *Take theirs" heading with a staggered wall of quote cards; the first is a feature card on brand orange. Used on Home and About. The footer's placeholder notice and the `demoContent` flag were removed.

## 2026-11-24 — 3D mark, founder fit, favicon, footer blur, cleanup

- **Hero**: the mark is now a real 3D render (three.js offline, copper walls, brushed dark-metal face) saved as `public/brand/muse-3d.webp`. No pointer interaction.
- **About**: founder text sits within the portrait's height (side by side from 1280px, stacked below); smaller type; logo in place of the link; punctuation fixed.
- **Favicon**: mark enlarged and optically centred on the white circle.
- **Footer**: progressive blur rebuilt with eight overlapping backdrop-filter bands and a soft orange underglow behind solid letters.
- **Cleanup**: removed 22 unused project image folders, `public/team/`, the one-off fetch scripts and the unused hero components.

## 2026-11-24 — Hero, founder, image fit, clients, footer

- **Hero**: rebuilt after wearestokt.com: warm orange field, extruded 3D Muse mark that leans toward the pointer, bracket label, two-line uppercase headline, scroll cue and founding year.
- **About**: founder card for Showaeb Bhuyan Shuvo (photo at `public/about/`), below the About us bento.
- **Images**: no more cropping. `FitImage` shows the whole artwork in fixed frames with a blurred fill behind (project cards, work stack, case-study cover). About gallery, collage and story image, menu tiles and service photos use each image's own proportions.
- **Clients**: original marquee design restored, now with the full roster (19 names).
- **Favicon**: orange mark on a white circle.
- **Footer**: wordmark blur is now progressive (six bands), letters stay solid with a thin orange fringe.

## 2026-11-24 — Muse rebrand and rework

- **Brand**: renamed to **Muse** (footer legal line: **Muse & Co.**). Supplied logo and icon added under `public/brand/`; `MuseLogo`, `MuseLetters` and `MuseMark` in `src/components/ui/Brand.tsx` (letters follow the theme colour, mark is always orange). New favicon and social card.
- **Colour**: accent is brand orange `#ff5931`; violet `#4900ea`, purple `#ab5bd4` and amber `#ffb658` added as supporting tokens. `text-accent` became `text-accent-ink` (deepened to `#c2330f` on light for contrast).
- **Type**: Helvetica Neue system stack replaces Schibsted Grotesk and Geist Mono (licensed font, not bundled).
- **Header**: menu button moved to the right, replacing "Start a project"; now an orange pill with a glow.
- **Hero**: rebuilt as a full-viewport typographic hero on a brand-colour aura. No project cards.
- **Clients**: new roster (Sony, KENT, UNICEF, Domino's, Kelinto, merQetia, Cellshoppe, Hindware, Hitachi, NT Blu Ray, 1 ms, Revenant eSports, MSI, Ashol Incorporated, SKRP Group) as a typeset client wall, replacing the marquee.
- **Projects**: cut to 15 (Branding 2, SaaS & Websites 3, Packaging 3, Social Media & Thumbnails 4, Illustration 3). The old "Packaging Design" gallery was split into ChikFi and Natural Organic.
- **Work and case studies**: cards use an auxinlab-style hover (image blurs and darkens, details rise in). `/work` runs two-up, two-up, full-width. Case-study galleries compose varied rows (bleed, offset pair, split with caption, trio, inset), each with its own entrance.
- **About**: team section removed; "About us" bento with a WebGL globe (`cobe`) marking Luton, UK, available worldwide (after wearestokt.com).
- **Footer**: larger, high-contrast links and email; full-width wordmark that dissolves into an orange-lit blur.

## 2026-11-01 — Contact form email over SMTP

- **Contact**: delivery moved from Resend to Nodemailer over SMTP, sending through the Namecheap Private Email mailbox. Replaces `RESEND_API_KEY` with `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS`.

## 2026-10-30 — Menu close and cards, project page layout, team photos

- **Menu**: close now matches the reference (panel lifts out of the top while scaling to 0.95, 0.5s). New cards: scattered project collage, tilted whole poster, client screen.
- **Project pages**: rebuilt on the Design Monks structure: rounded hero with breadcrumb, centred title and facts, overlapping cover, centred description, feature cards, one 1040px column, related projects. Artwork is never cropped in the gallery.
- **Team**: photos supplied by the studio.

## 2026-10-30 — Behance galleries, menu motion, real clients and photos

- **Behance**: read all 31 gallery pages. Added 147 images, project text and tools; rewrote every tagline and alt text from the galleries. Added `kind` (Client, Self-initiated, Academic, Concept, Sample), unset where the source is silent.
- **Clients**: only those named on the sources: SKRP Group, merQetia, CarClinic, Baby Basket, The BlackBoard, Bonoya. Furki (academic), Cripto Digital (concept) and ChikFi (sample) are no longer listed.
- **merQetia**: now client work for merqetia.nl.
- **Menu**: rebuilt from timings sampled per frame on the reference: 3D sheet drop, card rise with tilt, link settle, horizontal label wipe, fade on close.
- **About**: real team photos. **Contact**: dropdown options now use theme colours.
- **Removed**: `public/studio/`, 5 unused screenshots, unused block types, testimonial links, `demo`, `industry`, `summary`, `--scrim`, `--dur-slow`.

## 2026-10-30 — Websites category, site menu, stats, About rebuild, sizing pass

- **Websites**: new discipline with 4 projects from farian.me (Think Space, merQetia, Kendro, Subscription Manager), including copy, screenshots, stack and live/source links. Images via `scripts/fetch-website-projects.mjs`.
- **Home**: hero is now an equal-height expanding gallery with its own `hero` projects, so nothing repeats in Selected work. Trusted-by section has three opposing marquee rows. Selected work is colour-blocked sticky cards with one 3:2 image frame. New `Stats` section; all figures are computed from content files.
- **Menu**: `SiteMenu` replaces the nav links and `MobileMenu`: centre pill, panel grows out of it, promo cards pop in, links rise from masks. Same on every width.
- **About**: rebuilt as breadcrumb and centred title, drifting work gallery, who-we-are collage, number cards, story, team, reviews.
- **Sizing**: smaller type scale, 1240px container, tighter section rhythm; `/work` is a uniform grid; offset image layouts removed.
- **Content**: fictional client names replaced with brands named on the Behance projects (unconfirmed); fictional team replaced with the two named people (titles unconfirmed). Corrected the Premium Packaging tagline and alt text to match the image. About copy is a draft.
- Old demo project photos removed from `public/projects/` (moved to the Recycle Bin).


## 2026-10-30 — Real projects from Behance; dev warnings fixed

- Replaced the 8 demo projects with Musendco's 31 Behance projects (title, URL, year, cover). Six real disciplines; self-initiated tag; case studies show the native-ratio cover and a Behance link; project links prefetch. Covers via `scripts/fetch-behance-covers.mjs`.
- Social links and location from the profile. Footer notice now covers only placeholder clients, testimonials and team.
- Fixed dev-only issues: `key` after spread on contact selects (key warning); hydration mismatch from `RevealObserver` racing page hydration (moved into `PageTransition`); `params` outside Suspense on case studies (`instant = false`, documented); LCP image not preloaded on /services; smooth-scroll warning (`data-scroll-behavior`).
- Not collected: Behance gallery pages are access-restricted, so descriptions and gallery images still need supplying.

## 2026-10-30 — Dark redesign, motion system, demo content

**What changed**

- Visual direction rebuilt with the taste-skill and Emil Kowalski design-engineering guidance: dark-first palette (near-black, off-white, emerald accent) with an optional light theme; serif accent removed in favour of same-family italics; Geist Mono for metadata; pill controls, rounded media and cards.
- Motion: React `<ViewTransition>` page transitions and shared project-image morphs; word-mask headlines; CSS scroll reveals (fade, stagger, clip, words); hero reel; sticky stacking work cards; services explorer; scroll-lit manifesto; self-drawing process line; swipeable testimonials; filter layout animations; magnetic CTAs; copy-email and theme icon morphs; circular theme wipe; header hide/hover pill via Motion values.
- Content: 8 fictional projects with outcomes, credits and quotes; 8 client marks; team; FAQ; services with images. Demo photography downloaded locally by `scripts/fetch-demo-images.mjs` (replaces the generated placeholder compositions). Site-wide demo notice in the footer.
- New pages and sections: filterable `/work`, FAQ on `/services`, team and studio images on `/about`, outcomes/quote/credits on case studies.

**Why**

The first version read as too plain. The user asked for richer motion, a darker theme and full demo content.

**Files**

`src/app/globals.css`, `src/app/layout.tsx`, all of `src/components/`, `src/content/*`, `src/types/content.ts`, `scripts/fetch-demo-images.mjs`, all docs.

**Decisions**

- Theme locked per page (no light sections inside the dark page).
- Errors get their own `danger` token so the green accent never signals failure.
- Header theme detection by `elementsFromPoint` removed (no longer needed with one theme per page).
- Demo projects use `demo: true` (noindex, out of sitemap). Per-card "sample" labels replaced by one footer notice.

**Remaining**

Real content, logo and imagery; email credentials; Lighthouse and device testing.

## 2026-10-30 — Initial build

**What changed**

- Scaffolded Next.js 16.4 (App Router, TypeScript strict, Tailwind 4, ESLint) into the previously empty repository. Added `motion`, `lucide-react`, `server-only`.
- Design system: tokens, fluid type scale, grid and motion rules in `src/app/globals.css`; `surface-night` utility remaps tokens for dark sections.
- Layout: section-aware fixed header with hide-on-scroll, accessible mobile menu, footer with cached copyright year, skip link, JSON-LD.
- Home: project-led hero with interactive index, dark selected-work sequence with four layout variants, services index, approach, process timeline, closing invitation.
- Routes: `/work`, `/work/[slug]` (block-based case studies, previous/next), `/services`, `/about`, `/contact`, not-found, sitemap, robots, generated Open Graph image, SVG icon.
- Contact: Server Action with shared validation, honeypot, timing check, in-memory rate limit, Resend delivery, and a mailto fallback when delivery isn't configured.
- Five sample projects with generated, labelled placeholder imagery (`scripts/generate-placeholders.mjs`).
- Documentation set in `docs/`, README, `.env.example`.

**Why**

Musendco needed a complete portfolio site; no content or assets existed, so everything business-specific is either draft copy or clearly labelled sample content (see `CONTENT.md`).

**Decisions**

- Kept the scaffold's `cacheComponents` + `partialPrefetching`. Consequences: footer year uses `'use cache'`; `dynamicParams` is unsupported, so `src/proxy.ts` returns 404 for unknown project slugs.
- `priority` on `next/image` is deprecated in v16; `preload` is used for LCP images.
- CSS handles entrance and reveal motion; `motion` handles only parallax and menu presence.
- Sample projects are `noindex` and excluded from the sitemap.

**Fixes during QA**

- Footer links enlarged to meet 24px minimum target size.
- Link underline anchored to the text centre so tall touch targets don't push it away from the glyphs.
- Shortened hero intro; added a right-aligned descriptor to balance the headline on wide screens.
- Unknown `/work/<slug>` returned 200 (streamed shell) → fixed with Proxy.

**Remaining**

See `PROJECT.md` → Next steps.
