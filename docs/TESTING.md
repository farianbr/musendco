# Testing

No automated suite yet. The checks below were run manually; results are recorded with their date.

## Commands

| Command | Purpose |
| --- | --- |
| `npx tsc --noEmit` | Type check (needs route types: run `npm run build` or `npx next typegen` first) |
| `npm run lint` | ESLint |
| `npm run build` | Production build and prerender |
| `PORT=3210 npm start` | Serve the build |

## Results — 2026-10-30 (dark redesign)

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Pass |
| `eslint` | Pass |
| `next build` | Pass; 20 static outputs, 8 case studies via `generateStaticParams`, Proxy compiled |
| Routes (curl) | 200: `/`, `/work`, `/work/think-space`, `/work/furki-branding`, `/services`, `/about`, `/contact`, `/sitemap.xml`, `/opengraph-image`. 404: `/work/nope` |
| Browser console (home, work, contact) | 0 errors, 0 warnings |

## Visual and interaction checks (Playwright, headless Chromium)

| Area | Width | Result |
| --- | --- | --- |
| Home, full scroll | 1440 | Hero fits viewport; stack cards pin, scale and dim; explorer, manifesto, process line, testimonials, closing card, footer wordmark render |
| Home | 390 | No horizontal overflow (`scrollWidth` 390); header shows wordmark + menu only (after fix) |
| `/work` filter | 1440 | Pill moves, grid re-flows to 2 items for "Brand identity" and back |
| Card → case study | 1440 | Screenshot at 260ms shows the image morphing between positions with blur while the page fades; lands on `/work/tidewater` |
| Theme toggle | 1440 | Circular wipe captured mid-transition; `data-theme="light"` and `localStorage.theme="light"` set |
| Case study lower half, services, contact | 1440 | Outcome tiles, quote, deliverables, form render as designed |
| Contact: invalid submit | 1440 | Server errors for email, project type, message; name value kept |
| Contact: valid submit, no email env | 1440 | "Your message has not been sent yet" + prefilled mailto; no false success |

Bug found and fixed: theme toggle and header CTA appeared on mobile because the component's own `inline-flex` overrode the passed `hidden` class; moved visibility to a wrapper.

## Not yet checked

- Real Safari and Firefox (View Transitions behave differently in Safari; without support, navigation still works, just without animation).
- Physical iOS/Android devices (sticky stack, swipe on testimonials).
- Screen reader pass and axe audit.
- Lighthouse / Core Web Vitals on a deployed URL. The home page now loads more client JS (Motion) and ~4 hero images; measure LCP before launch.
- Resend delivery (no credentials).
