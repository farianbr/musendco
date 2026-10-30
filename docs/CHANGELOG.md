# Changelog

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
