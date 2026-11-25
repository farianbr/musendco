# Assets

## Inventory

| Asset | Location | Status |
| --- | --- | --- |
| Projects (15, curated) | `public/projects/<slug>/{cover,portrait,NN}.webp`; gallery sizes in `src/content/project-galleries.json` | **Real** (Behance and farian.me). Add new ones by hand; the old fetch scripts were removed |
| Founder photo | `public/about/showaeb-bhuyan-shuvo.webp` (2469×2087, full resolution of the supplied file; served as-is, unoptimised) | **Real**, supplied |
| 3D mark | `public/brand/muse-3d.webp` (offline three.js render, transparent) | Live |
| Service images (4) | `public/services/<slug>.webp` | **Demo** |
| Client logos | `public/clients/<slug>.png`, full colour on transparent, shown by `src/components/ui/ClientMark.tsx`. Where a logo differs per theme, `<slug>.png` is the light-theme file and `<slug>-dark.png` the dark one (swapped in CSS, `.client-logo`). Sony and Hitachi are one-colour wordmarks, kept as black masks (`mono`) painted in the text colour. Sources: Sony, UNICEF, Hitachi (2025), Domino's (2025 symbol), MSI wordmark: Wikimedia Commons; MSI dragon: Simple Icons; KENT: the brand's own site; merQetia: its own wordmark file; Hindware (red wordmark), Kelinto (teal wordmark) and Cellshoppe: supplied by the studio (Cellshoppe's dark twin lifts its black and navy so it reads on the dark theme). Brand colours re-applied to the masks: UNICEF cyan #1CABE2, Domino's red #E31837 / blue #006491, KENT blue #10347C with magenta #E80088 tagline, MSI red dragon #E4002B, merQetia sky-blue Q #5EBCF0. Revenant, Tojo Global, 1 ms, Ashol, NT Blu Ray, SKRP Group, CarClinic, The BlackBoard, Bonoya, Baby Basket, Azeel and TechnoTrack Solutions BD: supplied by the studio (`all logos.pdf`, light and dark artboards, backgrounds keyed out). | **Real** |
| Tool logos | `public/tools/*.svg`, full colour, current marks from svgl.app (React recoloured to a mid blue that reads on both themes); Cinema 4D is the official full-colour mark as a transparent `cinema4d.webp`. One-colour marks (Socket.IO, Framer, OpenAI, Midjourney, GitHub Copilot) are drawn in the text colour as masks | Live |
| Wordmark | `src/components/ui/Wordmark.tsx` (supplied logo, inline SVG) | Live |
| Icon | `src/app/icon.svg` (orange mark on a white circle) | Live |
| Social card | `src/app/opengraph-image.tsx` (generated, dark) | Live |
| Fonts | Helvetica Neue via the system font stack (`--font-sans` in globals.css). Licensed, so not bundled: Apple devices render it. Everywhere else the bundled TeX Gyre Heros (free Helvetica clone, GUST Font License, files and licence in `src/app/fonts/`, from CTAN) stands in via `next/font/local` in `layout.tsx`. Heros has only 400/700, so 500 renders as 400 and 600 as 700. To ship real Helvetica Neue everywhere, buy a webfont licence and swap the files. | Heros bundled; Helvetica Neue webfont needs licence |
| Logo | `public/brand/muse-logo-dark.svg` (dark letters, light backgrounds), `muse-logo-light.svg` (white letters), `muse-icon.svg` | Supplied |

## Demo photography

Downloaded once from picsum.photos (seeded, so re-runs return the same frames) and stored locally, so the site has no runtime dependency on a third party. The script applies one shared grade (saturation 0.82, slight contrast) so unrelated frames read as one set. The photos are generic stock frames, **not** project work.

- Swap one image: replace the file in `public/services/` (same name) or update `src/content/services.ts`.
- Alt text in `src/content/*.ts` describes what each photo actually shows. Update it when an image changes.

## Sizes for real imagery

| File | Ratio | Size | Used in |
| --- | --- | --- | --- |
| `cover` | 16:10 | 2000×1250 min | Stack card (3:2), work grid (4:3), case-study cover (morph target), next project |
| `portrait` | 4:5 | 1400×1750 min | Hero gallery, menu card |
| Case-study screens | any | 1800 wide | Case-study blocks; tall phone screens stay phone-sized |
| Service image | 4:5 | 1200×1500 | Services explorer (4:3) and page (1:1) |

Images are cropped by `object-cover` at several ratios, so keep subjects central.

## Optimisation

`next/image` serves AVIF/WebP at the needed width. Only the first hero reel image, the about-page lead image and case-study covers use `preload`; everything else lazy-loads. Frames have fixed aspect ratios, so there is no layout shift.

## Still needed

Logo (SVG, both themes), real service imagery, permitted client logos.
