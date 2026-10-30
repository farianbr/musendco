# Design system

Tokens live in `src/app/globals.css` (`:root` for the dark default, `[data-theme="light"]` for light, exposed to Tailwind through `@theme inline`). Do not hard-code colours, radii or easings in components; add a token.

## Direction

Dark, high-craft agency portfolio. Near-black canvas, off-white type, one emerald accent. The work carries the colour; the interface stays quiet so motion and imagery can lead. Built with the `design-taste-frontend` (taste-skill) and `emil-design-eng` guidance.

Dials (taste-skill): **variance 8, motion 8, density 3**.

Rules taken from those guides and enforced here:

- **One theme per page.** Sections never flip between light and dark. Depth comes from `surface`/`raised` tints within the theme.
- **One accent**, used for primary actions, focus, active state and the first outcome tile. Never decorative fills elsewhere.
- **Emphasis = italic of the same family**, never a second typeface.
- **No section-number eyebrows**, no decorative dots (the only dot marks the active nav item, which is real state), no em-dashes in copy, one marquee per page.
- **Every animation has a job**: orientation (page transitions, morphs), hierarchy (reveals), feedback (press, copy, filter), or pacing (manifesto).

## Colour

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `bg` | `#0b0b0c` | `#f3f3f0` | Page |
| `surface` | `#131315` | `#eaeae5` | Cards, alternate sections, image wells |
| `raised` | `#1c1c1f` | `#e0e0da` | Hover pill, raised controls |
| `fg` | `#ecece7` | `#121214` | Primary text (16.6:1 / 16.8:1) |
| `fg-2` | `#b5b5af` | `#3b3b3f` | Body copy (≥ 8.2:1) |
| `muted` | `#8a8a84` | `#5e5e62` | Metadata (≥ 4.9:1 on every surface) |
| `line` / `line-strong` | 10% / 22% fg | 12% / 26% fg | Hairlines, outlines |
| `accent` | `#3ddc97` | `#076b45` | Primary CTA, focus, active (≥ 9.6:1 dark) |
| `on-accent` | `#06140d` | `#f3f3f0` | Text on accent |
| `danger` | `#ff7a6b` | `#b42318` | Form errors only |

Dark is the default. The toggle (header and mobile menu) stores `light` in `localStorage`; an inline script applies it before first paint.

## Typography

- **Schibsted Grotesk** (variable, roman + italic): everything.
- **Geist Mono**: small metadata (indexes, years, labels) only.

| Token | Size | Use |
| --- | --- | --- |
| `text-display` | 2.6 → 6.5rem, lh 0.98, -0.045em | Home hero |
| `text-title` | 2.5 → 5.75rem | Page and section titles |
| `text-heading` | 2 → 4rem | Sub-section headings, project names in cards |
| `text-subheading` | 1.375 → 2.125rem | Card titles, list items |
| `text-lead` | 1.125 → 1.4375rem | Intros |
| `text-body` | 1.0625rem / 1.6 | Paragraphs |
| `text-meta` | 0.8125rem | Captions, nav |
| `text-mono` | 0.75rem mono | Indexes, years, labels |

## Layout

- Container 1240px + gutter `clamp(1.25rem, 0.5rem + 3vw, 3rem)`. `.shell`.
- `.grid-12`: 4 columns under 768px, 12 above.
- Section rhythm `--space-section` (4.5 → 7.5rem), inner `--space-block`.
- Header 64px / 76px (lg).

Home section families (no family repeats): asymmetric split hero · client marquee · sticky stacking cards · service explorer · scroll-lit manifesto · sticky-heading timeline · quote carousel · closing card.

## Shape

Documented rule: **interactive controls are full pills** (buttons, filters, icon buttons). **Media** uses `--radius-media` (14px). **Cards** use `--radius-card` (20px). Inputs are underline-only.

## Motion

Easing tokens (strong curves, never `ease-in`):

| Token | Curve | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrances, hover, reveals |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | On-screen movement, image wipes, morphs |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Header slide, mobile menu |

Durations: press 160ms, fast 200ms, standard 420ms, slow 900ms. Exits are always faster than entrances.

| Moment | Technique | Where |
| --- | --- | --- |
| Page change | React `<ViewTransition>`: old page out 220ms (lift + blur), new page in 640ms | `PageTransition` in every page |
| Project image morph | Shared `ViewTransition` name `project-<slug>`, 640ms with mid-flight blur | Stack cards, work grid, case-study cover, next project |
| Headline entrance | Words rise from masks, 40-45ms stagger (CSS) | `SplitWords` + `.enter-words` / `data-reveal="words"` |
| Section reveals | Opacity + 28px + blur(6px), once (CSS + IntersectionObserver) | `data-reveal="fade" | "stagger" | "clip"` |
| Image reveal | `clip-path` wipe up + settle from 1.04 | `data-reveal="clip"` |
| Hero gallery | Equal-height frames; hovered or focused frame widens and shows its caption | `HeroReel` (CSS) |
| Selected work | Colour-blocked sticky stack: pinned card scales back as the next arrives | `WorkStack` (Motion `useScroll`) |
| Stats | Chart clip reveal, odometer digits, staggered cards | `Stats`, `StatsMotion` |
| Site menu | Timings measured from the reference: sheet drops from -152% with rotateX 8.6deg, cards rise 900px 200ms apart with -5.7deg tilt, links settle 90ms apart, divider draws from the left, close lifts the panel -100% while scaling to 0.95 over 0.5s | `SiteMenu` |
| Services | Spring indicator (`layoutId`), blur crossfade of image and copy | `ServicesExplorer` |
| Manifesto | Words light up with scroll progress | `Manifesto` |
| Process | Accent line draws down the timeline | `ProcessSteps` |
| Testimonials | Direction-aware blur slide; swipe with velocity | `Testimonials` |
| Filters | Spring pill, layout re-flow, popLayout exits | `WorkGrid` |
| Header | Hides on scroll down, returns on up; hover pill follows pointer | `Header` |
| Theme | Circular `clip-path` wipe from the toggle (View Transitions API) | `ThemeToggle` |
| Feedback | `scale(0.97)` on press, icon morph (copy → check, sun ↔ moon), magnetic CTAs | `pressable`, `CopyEmail`, `Magnetic` |

Performance: transforms, opacity, clip-path and filter only. Scroll-linked work uses Motion motion values (no React re-render per frame, no raw `scroll` listeners). Motion is loaded through `LazyMotion` + `m` components.

Reduced motion: all reveals, parallax, stacking scale, manifesto, reel autoplay and view-transition animations are disabled; opacity changes remain where they aid comprehension. Content is never hidden without JavaScript.

## Accessibility

- WCAG 2.2 AA colour contrast in both themes (table above).
- Focus ring: 2px accent, 3px offset.
- Hover never gates information: service explorer also works on focus and click, and below `lg` every service is shown stacked.
- `SplitWords` renders an sr-only copy of the sentence; the animated words are `aria-hidden`.
- Mobile menu: dialog semantics, focus trap, Escape, `inert` page, scroll lock.
