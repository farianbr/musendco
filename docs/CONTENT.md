# Content

All copy and data live in `src/content/`. Components hold only short UI labels.

**Projects are real** (31 from https://www.behance.net/shuvo24, 4 websites from https://www.farian.me/projects). Clients are those named on those sources. Testimonials, FAQ answers, services and process are still placeholders; while `site.demoContent` is `true` the footer flags the testimonials.

## Files

| File | Contents | Status |
| --- | --- | --- |
| `site.ts` | Name, tagline, description, email, location, social links, `demoContent` flag, navigation | Email UNCONFIRMED; location and social links from Behance |
| `home.ts` | Hero, section headings, manifesto, closing copy | Draft |
| `projects.ts` | 31 Behance projects with galleries, 4 websites | **Real**. Taglines come from each gallery. `kind` is unset where the source does not say |
| `people.ts` | 6 named clients (generated marks), 2 team members, 4 testimonials, 5 FAQs | Clients and team **real**; testimonials and FAQs **demo** |
| `services.ts` | 4 services with value, description, deliverables, image | Demo / unconfirmed |
| `process.ts` | 5 stages with duration and outcome | Demo / unconfirmed |
| `about.ts` | Intro, point of view, principles, studio images | Draft |
| `contact.ts` | Project types (from services) and budget ranges | Budget ranges unconfirmed |

## Projects (from Behance)

Gathered from the public profile: title, Behance URL, publish year, cover image, designer name. Behance gallery pages are access-restricted (HTTP 403 / JavaScript challenge), so **descriptions, gallery images, tools and outcomes were not collected** and nothing was invented in their place.

- Taglines describe only what each cover shows.
- Each case study shows the cover at its native ratio, the facts, credits and a "View on Behance" link. Add `blocks` in `projects.ts` when gallery images and copy are supplied.
- **Assumptions to review:** the discipline of each project, and `kind: "Self-initiated"` on personal art and redesigns (banknote, movie posters), which Behance does not state outright.
- No `client` is set: SKRP Group, Baby Basket and The Blackboard appear on the profile as employers, not agency clients.
- Social links (Behance, Instagram, Facebook) and location (Dhaka, Bangladesh) come from the profile.

## Going live with real content

1. Add gallery images and case-study copy per project (`blocks`). Use only verified outcomes and client names.
2. Review the discipline and self-initiated assumptions above.
3. Replace or remove testimonials, clients, team and FAQs in `people.ts`. Remove client marks if no logos may be shown.
4. Set real social links, confirm the email, confirm services, process and budget ranges.
5. Set `site.demoContent` to `false`.
6. Rewrite every Draft string in the agency's voice.

## Copy rules

Plain, specific sentences. No em-dashes, no "elevate / seamless / unleash" vocabulary, quotes max three lines at display size. Emphasis in headlines is italic of the same font (`{ text, em: true }` parts).

## SEO

| Route | Title | Description |
| --- | --- | --- |
| `/` | Musendco: Brand identity, digital products and websites | `site.description` |
| `/work` | Work · Musendco | Projects across brand identity, digital products, websites and art direction |
| `/work/[slug]` | `<title>, <discipline> · Musendco` | Project summary (noindex while demo) |
| `/services` | Services · Musendco | What each service involves and what you receive |
| `/about` | About · Musendco | How Musendco thinks, approaches projects, and who does the work |
| `/contact` | Contact · Musendco | Start a project |

Structured data: `Organization` (name, url, description) only.
