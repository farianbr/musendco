# Architecture

## Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack) | `cacheComponents` + `partialPrefetching` on |
| UI | React 19.3 | Server Components by default; `<ViewTransition>` for page and shared-element transitions |
| Language | TypeScript 5, strict | No `any` |
| Styling | Tailwind CSS 4 | Tokens in `src/app/globals.css` |
| Motion | `motion` 14 (`motion/react`) | `LazyMotion` + `m.*` only; `domMax` where layout/drag is needed |
| Icons | `lucide-react` | Kept because the project already depended on it |
| Fonts | `next/font/google` | Schibsted Grotesk (roman + italic), Geist Mono |
| Email | Nodemailer over SMTP (Namecheap Private Email) | Optional; honest mailto fallback |

The bundled docs in `node_modules/next/dist/docs/` are the reference for Next 16 behaviour (see `AGENTS.md`).

## Structure

```text
src/
├── app/
│   ├── layout.tsx              Fonts, theme pre-paint script, metadata, JSON-LD, Header, Footer, RevealObserver
│   ├── page.tsx                Home
│   ├── globals.css             Tokens (dark + light), utilities, reveal system, view-transition choreography
│   ├── work/page.tsx           Filterable index
│   ├── work/[slug]/page.tsx    Case study (generateStaticParams)
│   ├── services/, about/, contact/ (+ actions.ts)
│   ├── not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
├── proxy.ts                    404 status for unknown /work/<slug>
├── components/
│   ├── layout/   Header*, SiteMenu*, ThemeToggle*, Footer, PageHeader
│   ├── home/     Hero, HeroReel, ClientMarquee, SelectedWork, WorkStack*, Stats, StatsMotion*, ServicesExplorer*, Manifesto*, ProcessSteps*, Testimonials*, ClosingCta
│   ├── work/     WorkGrid*, CaseStudyBlocks
│   ├── services/ FaqList*
│   ├── contact/  ContactForm*
│   ├── motion/   PageTransition (ViewTransition wrappers), ParallaxImage*, Magnetic*, RevealObserver*
│   └── ui/       ButtonLink, ArrowLink, SplitWords, ClientMark, CopyEmail*, Wordmark
├── content/      site, home, projects, people, services, process, about, contact
├── lib/          cn, site-url, contact/{validation, deliver, rate-limit}
└── types/content.ts
scripts/fetch-demo-images.mjs
```

`*` = Client Component. Every client component is a leaf that receives plain data as props.

## Motion architecture

Three layers, chosen by cost:

1. **CSS** (runs off the main thread, works before hydration): load-in word masks (`.enter-words`), fades (`.enter-fade`), image wipes (`.enter-clip`), and the scroll-reveal system. `RevealObserver` (one IntersectionObserver per route) sets `data-revealed`; CSS does the animation. Elements already on screen are marked before `.reveal-ready` is added, so nothing flickers, and nothing is hidden without JS.
2. **Motion values** for anything tied to scroll or pointer: `WorkStack`, `Manifesto`, `ProcessSteps`, `ParallaxImage`, `Magnetic`, header hide. No React state per frame; no `window` scroll listeners.
3. **React `<ViewTransition>`** for navigation. `PageTransition` wraps each page (`enter`/`exit` class `page`); `ProjectMorph` names project images `project-<slug>` with `share="morph"`, so a card image morphs into the case-study cover. The header carries `view-transition-name: site-header` and is not animated, except during a theme switch where it joins the root snapshot so the circular wipe covers it.

Rule: one element per page may carry a given `project-<slug>` name. The hero gallery therefore has no names; the stack, grid, cover and next-project link do.

## Theme

Dark is the default (`:root`). `[data-theme="light"]` on `<html>` switches palettes. An inline script in `<head>` reads `localStorage.theme` before paint; `<html>` has `suppressHydrationWarning` for that attribute. `ThemeToggle` reads the attribute with `useSyncExternalStore` (MutationObserver), and uses `document.startViewTransition` + a WAAPI `clip-path` circle on `::view-transition-new(root)` when available.

## Rendering

All pages prerender. The footer year uses `'use cache'` + `cacheLife('days')` (Cache Components forbids `new Date()` during prerender), which gives pages a 1-day revalidate. `dynamicParams` is unsupported with Cache Components, so `src/proxy.ts` returns a real 404 for unknown project slugs.

## Contact form

```
ContactForm (client) ──form action──▶ submitInquiry (server action)
  honeypot filled → silent success (sends nothing)
  first interaction < 2.5s ago → friendly error
  validateInquiry() → field errors, values returned so they survive React's form reset
  isRateLimited(ip) → 5 per 10 min, in memory, per instance
  no SMTP_HOST / SMTP_USER / SMTP_PASS / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL → "not sent yet" + prefilled mailto
  deliverInquiry() → Nodemailer SMTP (10s timeouts) → success panel, or error with direct email
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (falls back to `https://musendco.com` if missing or invalid) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Form delivery (server only) |

## Security

Secrets only in `server-only` modules. Security headers in `next.config.ts`. The two `dangerouslySetInnerHTML` uses are static strings (theme script, JSON-LD with `<` escaped). External links use `rel="noopener noreferrer"`. No CSP yet.
