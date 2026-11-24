# Assets

## Inventory

| Asset | Location | Status |
| --- | --- | --- |
| Projects (15, curated) | `public/projects/<slug>/{cover,portrait,NN}.webp`; gallery sizes in `src/content/project-galleries.json` | **Real** (Behance and farian.me). Add new ones by hand; the old fetch scripts were removed |
| Founder photo | `public/about/showaeb-bhuyan-shuvo.webp` | **Real**, supplied |
| 3D mark | `public/brand/muse-3d.webp` (offline three.js render, transparent) | Live |
| Service images (4) | `public/services/<slug>.webp` | **Demo** |
| Client marks | `src/components/ui/ClientMark.tsx` (geometric glyph + name) | **Demo**, generated |
| Wordmark | `src/components/ui/Wordmark.tsx` (supplied logo, inline SVG) | Live |
| Icon | `src/app/icon.svg` (orange mark on a white circle) | Live |
| Social card | `src/app/opengraph-image.tsx` (generated, dark) | Live |
| Fonts | Helvetica Neue via the system font stack (`--font-sans` in globals.css). Licensed, so not bundled: Apple devices render it, others fall back to Helvetica/Arial. To ship it everywhere, add licensed woff2 files in `src/app/fonts/` and load them with `next/font/local`. | Needs licence for webfont |
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
