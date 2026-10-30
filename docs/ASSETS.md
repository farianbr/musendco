# Assets

## Inventory

| Asset | Location | Status |
| --- | --- | --- |
| Behance projects (31) | `public/projects/<slug>/{cover,portrait,NN}.webp` | **Real**, covers and galleries from Behance |
| Team photos | `public/team/<name>.webp` | **Real**, supplied by the studio |
| Behance gallery fetcher | `scripts/fetch-behance-galleries.mjs` | Tooling: writes `NN.webp` and `src/content/project-galleries.json` |
| Behance cover fetcher | `scripts/fetch-behance-covers.mjs` | Tooling: cover.webp (max 2000px) + portrait.webp (4:5 attention crop) |
| Website projects (4) | `public/projects/{think-space,merqetia,kendro,subscription-manager}/` | **Real**, from farian.me via `scripts/fetch-website-projects.mjs` |
| Service images (4) | `public/services/<slug>.webp` | **Demo** |
| Demo fetch script | `scripts/fetch-demo-images.mjs` | Service images only |
| Client marks | `src/components/ui/ClientMark.tsx` (geometric glyph + name) | **Demo**, generated |
| Wordmark | `src/components/ui/Wordmark.tsx` (typeset) | Temporary |
| Icon | `src/app/icon.svg` | Temporary |
| Social card | `src/app/opengraph-image.tsx` (generated, dark) | Live |
| Fonts | Schibsted Grotesk, Geist Mono via `next/font/google` (self-hosted at build, SIL OFL) | Approved for build |

## Demo photography

Downloaded once from picsum.photos (seeded, so re-runs return the same frames) and stored locally, so the site has no runtime dependency on a third party. The script applies one shared grade (saturation 0.82, slight contrast) so unrelated frames read as one set. The photos are generic stock frames, **not** project work.

- Re-download: `node scripts/fetch-demo-images.mjs`
- Swap one image: add an entry to `SEEDS` in the script (key `"<slug>/<name>"`) and re-run.
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
