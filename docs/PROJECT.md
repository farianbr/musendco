# Project — Musendco website

Official portfolio website for **Musendco**, a creative agency. Intended domain: `musendco.com` (configurable, not yet confirmed as the production host).

## Objectives

1. Present Musendco's work as the main evidence of its ability.
2. Communicate services, approach and process quickly and without generic agency language.
3. Make starting a project straightforward (clear contact paths and a working inquiry form).
4. Ship a fast, accessible, SEO-ready Next.js site that is easy to update when real content arrives.

## Status at a glance

See "Current implementation status" below. Last updated: 2026-10-30.

## Confirmed information

Only the following has been supplied by the agency:

- Brand name: **Musendco** (one word). `MUSENDCO` may be used in uppercase compositions.
- Intended domain: `musendco.com`.
- Required stack and quality bar (from the project brief).

Nothing else about the business has been confirmed. The repository started empty (a one-line README), with no logo, fonts, photography, project material, service list, team information or copy.

## Business assumptions (unconfirmed — must be reviewed)

| Assumption | Where it lives | Action needed |
| --- | --- | --- |
| Services: Brand identity, Digital product design, Websites & development, Art direction & content | `src/content/services.ts` | Confirm, rename, add or remove |
| Contact email `hello@musendco.com` | `src/content/site.ts` | Confirm the mailbox exists |
| Five-stage process (Discovery → Support) | `src/content/process.ts` | Replace with the real workflow |
| Studio principles and About copy | `src/content/about.ts` | Rewrite in the agency's own voice |
| Hero and section copy | `src/content/site.ts`, `src/content/home.ts` | Approve or rewrite |
| Budget ranges on the inquiry form | `src/content/contact.ts` | Confirm ranges and currency, or remove the field |
| Testimonials and FAQ | `src/content/people.ts` | **Fictional demo content.** Replace before launch |
| Client permissions | `src/content/people.ts` | Confirm each name may be shown before launch |

All draft copy is original and makes no claims about clients, awards, results, headcount, location or history.

## Outstanding questions for the agency

1. Which services does Musendco actually sell, and how are they described internally?
2. Real projects: names, clients (with permission), year, industry, scope, credits, imagery, verified outcomes.
3. Logo files (SVG) and any brand typeface licences.
4. Verified contact email, phone (optional), and social profiles.
5. Studio location(s), if they should be public.
6. Team members and photography, if they should be public.
7. Testimonials, awards or client logos that may be published (with permission).
8. Email delivery provider preference (the form ships with a Resend integration).
9. Privacy policy text (needed before collecting inquiries in production).
10. Production domain and hosting target.

## Page inventory

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Hero, selected work, services, approach, process, closing invitation | Built |
| `/work` | Index of all projects with scannable metadata | Built |
| `/work/[slug]` | Case study, block-based and per-project | Built (sample content) |
| `/services` | Services in detail and process | Built |
| `/about` | Studio point of view, principles, collaboration | Built (draft copy) |
| `/contact` | Inquiry form and direct contact | Built |
| `/sitemap.xml`, `/robots.txt` | SEO | Built |
| `/opengraph-image` | Generated social card | Built |
| Testimonials / credibility | Omitted until real evidence exists | Not built (intentional) |
| `/privacy` | Privacy policy | Not built — needs real policy text |

## Feature checklist

- [x] Next.js 16 App Router, strict TypeScript, Tailwind CSS 4
- [x] Centralised design tokens (`src/app/globals.css`)
- [x] Responsive header with section-aware light/dark treatment, hide-on-scroll
- [x] Accessible mobile menu (focus trap, Escape, scroll lock, focus restore)
- [x] Project-led hero with interactive index
- [x] Data-driven projects with varied editorial layouts
- [x] Block-based case studies with next/previous navigation
- [x] Services, approach and process sections
- [x] Contact form: server action, server-side validation, honeypot, timing check, rate limit, Resend delivery, honest fallback
- [x] Metadata, canonical URLs, Open Graph, sitemap, robots, JSON-LD (Organization)
- [x] Reduced-motion support and no-JS-safe reveals
- [x] Demo photography fetcher (`scripts/fetch-demo-images.mjs`)
- [x] Dark theme (default) and light theme toggle
- [x] Page transitions, shared-element morphs and scroll-driven motion system
- [ ] Real project content and imagery (agency)
- [ ] Real logo (agency)
- [ ] Privacy policy page (agency)
- [ ] Email delivery credentials (deployment)

## Current implementation status

As of 2026-10-30: real projects, Websites category, site menu, stats and rebuilt About. Every route builds; type check and lint pass; reviewed in a browser at 390 and 1440px. **Not** launch-ready: testimonials are fictional, client permissions and About copy need confirming, and email delivery must be configured.

See `docs/CHANGELOG.md` for the history and `docs/TESTING.md` for checks that were actually run.

## Known limitations

- All projects, clients, people, quotes, outcomes and photography are **fictional demo content**, disclosed by a footer notice.
- Demo photography is generic stock (picsum), graded to match; it is not project work.
- The rate limiter is in-memory: it resets on redeploy and is per-instance on serverless hosts.
- Without `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`, the form validates input and then hands the visitor a prefilled email instead of sending (it never claims a message was sent).
- The wordmark is typeset text, not a supplied logo.

## Next steps

1. Collect the information in "Outstanding questions".
2. Replace sample projects and imagery (see `docs/CONTENT.md` and `docs/ASSETS.md`).
3. Configure email delivery and test the form end-to-end in the target environment.
4. Add a privacy policy page and link it from the footer and form.
5. Run Lighthouse against the deployed site and record the results in `docs/TESTING.md`.
6. Screen-reader and axe audit; test on real iOS Safari and Android devices.
7. Add a Content Security Policy once third-party scripts (analytics) are decided.
