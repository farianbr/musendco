# Musendco

Portfolio website for **Musendco**, a creative agency. Built with Next.js 16 (App Router), React 19 view transitions, TypeScript, Tailwind CSS 4 and Motion. Dark theme by default, with a light theme toggle.

> Projects are real. Testimonials and service photos are still **demo content**; a footer notice flags the testimonials while `demoContent` is true in `src/content/site.ts`. See [docs/CONTENT.md](docs/CONTENT.md).

## Requirements

- Node.js 20.9 or newer (developed on Node 24)
- npm

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values (all optional for local development)
npm run dev                  # http://localhost:3000
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also generates route types) |
| `npm start` | Serve the production build (`PORT=4000 npm start` to change port) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |
| `node scripts/fetch-demo-images.mjs` | Re-download the demo photography into `public/` |
| `node scripts/fetch-website-projects.mjs` | Re-download website project screenshots from farian.me |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin for canonical URLs, Open Graph and sitemap (defaults to `https://musendco.com`) |
| `SMTP_HOST` | SMTP server for the contact form, e.g. `mail.privateemail.com` |
| `SMTP_PORT` | SMTP port (optional, defaults to `465`) |
| `SMTP_USER` | Full mailbox address used to log in to SMTP |
| `SMTP_PASS` | Mailbox password |
| `CONTACT_TO_EMAIL` | Inbox that receives inquiries |
| `CONTACT_FROM_EMAIL` | Sender address; must be the SMTP mailbox or one of its aliases |

Without the required email variables the contact form still validates input, then gives the visitor a prefilled email to send themselves. It never reports a message as sent unless delivery succeeded.

## Deployment

Any Node.js host that supports Next.js 16 works; Vercel needs no extra configuration.

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Set the email variables using the mailbox's SMTP details.
3. Deploy, then submit a test inquiry and confirm it arrives.
4. Run Lighthouse against the live URL and record results in `docs/TESTING.md`.

The site is fully prerendered except for the contact Server Action and a small Proxy that returns 404s for unknown project URLs.

## Updating content

All copy and project data live in `src/content/`. Images live in `public/projects/<slug>/`. Step-by-step instructions for replacing sample projects are in [docs/CONTENT.md](docs/CONTENT.md).

## Documentation

- [docs/PROJECT.md](docs/PROJECT.md) — scope, assumptions, status, next steps
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — tokens, typography, layout, motion, accessibility rules
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — structure, component boundaries, contact flow, env vars
- [docs/CONTENT.md](docs/CONTENT.md) — every piece of copy and its status
- [docs/ASSETS.md](docs/ASSETS.md) — imagery, sizes, what is temporary
- [docs/TESTING.md](docs/TESTING.md) — checks run and their results
- [docs/CHANGELOG.md](docs/CHANGELOG.md)
