import type { Client, Faq, Testimonial } from "@/types/content";

/** A supplied logo with a light-theme file and a `-dark` twin. */
const pair = (slug: string, width: number, height: number, scale?: number): Client["logo"] => ({
  src: `/clients/${slug}.png`,
  dark: `/clients/${slug}-dark.png`,
  width,
  height,
  scale,
});

/**
 * Clients, in full colour. Logos come from each brand's own site or Wikimedia
 * Commons, or were supplied by the studio (see docs/ASSETS.md); all live in
 * public/clients. Names without a logo are typeset until a file is supplied.
 * Confirm permission to show each name before launch.
 *
 * Order matters: the homepage splits this list into three equal rows in turn
 * (ClientMarquee), and the stats card runs it as one. Neighbours alternate
 * in colour and style (mono wordmarks, blues, reds, warm tones), and similar
 * logos (Kelinto, merQetia, Cellshoppe) sit in different rows.
 */
export const clients = [
  // Row 1
  { name: "Sony", logo: { src: "/clients/sony.png", width: 909, height: 160, mono: true } },
  { name: "UNICEF", logo: { src: "/clients/unicef.png", width: 667, height: 160 } },
  { name: "Revenant Esports", logo: pair("revenant", 954, 240, 1.25) },
  { name: "Ashol Incorporated", logo: pair("ashol", 979, 240) },
  { name: "Kelinto", logo: { src: "/clients/kelinto.png", width: 1200, height: 175 } },
  { name: "CarClinic", logo: pair("carclinic", 811, 240, 1.25) },
  { name: "Azeel", logo: pair("azeel", 593, 240) },
  // Row 2
  { name: "Hindware", logo: { src: "/clients/hindware.png", width: 1094, height: 233 } },
  { name: "The BlackBoard", logo: pair("blackboard", 624, 240) },
  { name: "merQetia", logo: pair("merqetia", 695, 160) },
  { name: "SKRP Group", logo: pair("skrp-group", 1653, 240) },
  { name: "1 ms", logo: pair("1ms", 549, 240, 0.9) },
  { name: "Tojo Global", logo: pair("tojo-global", 760, 240) },
  { name: "Baby Basket", logo: pair("baby-basket", 185, 240, 1.15) },
  { name: "Hitachi", logo: { src: "/clients/hitachi.png", width: 1033, height: 160, scale: 0.92, mono: true } },
  // Row 3
  { name: "KENT", logo: { src: "/clients/kent.png", width: 301, height: 160 } },
  { name: "MSI", logo: pair("msi", 485, 160, 1.1) },
  { name: "NT Blu Ray", logo: pair("nt-blu-ray", 1192, 240) },
  { name: "Cellshoppe", logo: pair("cellshoppe", 237, 65, 1.3) },
  { name: "Domino's", logo: { src: "/clients/dominos.png", width: 160, height: 160 } },
  { name: "Bonoya", logo: pair("bonoya", 377, 240) },
  { name: "TechnoTrack Solutions BD", logo: pair("technotrack", 375, 240, 1.2) },
] as const satisfies readonly Client[];

/** A brand partner's name, exactly as listed above. */
export type ClientName = (typeof clients)[number]["name"];

/**
 * DEMO testimonials, in each client's voice: what working with Muse was
 * like and what changed, grounded in the real work Muse did for that brand
 * partner (`company` must be a name from `clients`, checked by
 * TypeScript): the projects on this site (merQetia, SKRP Group and its NT Blu
 * Ray switches, CarClinic, and the Electronics and Foods posts for Sony, MSI,
 * Hindware and Domino's) or the logos in the studio's logo folio. The people
 * and their words are placeholders: replace them with real, approved quotes
 * before launch.
 */
export const testimonials: (Testimonial & { company: ClientName })[] = [
  {
    id: "merqetia",
    quote:
      "Muse didn't start with screens. They started by asking how an order actually moves through our agency. Now clients, our team and our admins all follow the same job in one place, and I've stopped chasing updates across chats and spreadsheets.",
    name: "Sanne de Vries",
    role: "Founder",
    company: "merQetia",
  },
  {
    id: "revenant",
    quote:
      "We wanted something that felt like the team: knocked down, back up. Muse came back with the phoenix and we knew straight away. The squad wears it with pride.",
    name: "Zayan Chowdhury",
    role: "Team Manager",
    company: "Revenant Esports",
  },
  {
    id: "sony",
    quote:
      "We needed the XM4 post to feel premium without borrowing the global campaign. Muse got the tone right away, quiet and confident, and turned it around in time for our launch.",
    name: "Arif Rahman",
    role: "Marketing Executive",
    company: "Sony",
  },
  {
    id: "nt-blu-ray",
    quote:
      "Our switches are premium, but the old boxes didn't say so. Muse understood that from the first call. Now the packaging does half the selling at the counter, in Bangla and in English.",
    name: "Nusrat Jahan",
    role: "Brand Manager",
    company: "NT Blu Ray",
  },
  {
    id: "baby-basket",
    quote:
      "I had a name and not much else. Muse listened to what the shop means to me and turned it into a logo parents remember and children point at. I still smile when I see it on a bag.",
    name: "Tasnim Ara",
    role: "Founder",
    company: "Baby Basket",
  },
  {
    id: "dominos",
    quote:
      "Offer posts live or die in the first second on a feed, and Muse knows it. A clear brief went in and a scroll-stopping post came out, with the offer, the delivery promise and the hotline exactly where people look.",
    name: "Sabbir Hossain",
    role: "Digital Marketing Lead",
    company: "Domino's",
  },
  {
    id: "carclinic",
    quote:
      "We came in for a logo and left with an identity we use every day, from business cards and ID cards to the receipts we hand customers. Muse thought of pieces we hadn't. The shop finally looks as professional as the work we do.",
    name: "Tanvir Ahmed",
    role: "Operations Manager",
    company: "CarClinic",
  },
  {
    id: "ashol",
    quote:
      "We asked for something that says trust at a glance. Muse found it in our own name: Bangla letters with a tick running through them. Nobody has to explain it, and that's the best thing you can say about a logo.",
    name: "Mahmudul Hasan",
    role: "Managing Director",
    company: "Ashol Incorporated",
  },
  {
    id: "msi",
    quote:
      "Gaming buyers check the specs before anything else, and most designers bury them. Muse made the Titan look epic and still kept every number readable. Easy to brief and quick to revise.",
    name: "Imran Kabir",
    role: "Channel Marketing",
    company: "MSI",
  },
  {
    id: "skrp-group",
    quote:
      "We first found Muse when we bought their Cities of Bangladesh posters for our office. Since then they've done our packaging and our product posts, and everything finally looks like it comes from one company. They're our first call now.",
    name: "Rafiq Ahmed",
    role: "Director",
    company: "SKRP Group",
  },
  {
    id: "azeel",
    quote:
      "I wanted elegant, not cold. Muse found that balance early and refined it patiently until every curve felt right. Azeel finally looks like the brand I had in my head.",
    name: "Lamia Rahman",
    role: "Founder",
    company: "Azeel",
  },
  {
    id: "hindware",
    quote:
      "Purifier ads tend to look the same. Muse gave ours an idea, clean water you can feel before you read a word, and still kept the price and contact details clear. It stood out in the feed.",
    name: "Farhana Akter",
    role: "Marketing Coordinator",
    company: "Hindware",
  },
  {
    id: "tojo-global",
    quote:
      "We're a local company working with partners abroad, and we needed a mark that says both. Muse asked the right questions, explained every choice, and handed over files for every use we could think of.",
    name: "Kamrul Islam",
    role: "CEO",
    company: "Tojo Global",
  },
  {
    id: "bonoya",
    quote:
      "Bonoya is about roots and nature, and Muse understood that from one conversation. The logo feels hand-made and honest, just like us.",
    name: "Shirin Akhter",
    role: "Owner",
    company: "Bonoya",
  },
  {
    id: "technotrack",
    quote:
      "We needed a mark that says we look out for our clients. Muse kept it simple, an eye at the centre, and made sure it works everywhere from an app icon to a signboard.",
    name: "Rashed Karim",
    role: "Founder",
    company: "TechnoTrack Solutions BD",
  },
];

/** DEMO answers. Confirm terms with Muse before launch. */
export const faqs: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Identity projects usually run six to ten weeks. Websites and product work run eight to sixteen weeks depending on scope. We agree a timeline in the first call.",
  },
  {
    question: "Do you work with early-stage companies?",
    answer:
      "Yes. Around half of our projects are with founders preparing a launch or a raise. We scope the work to what you need now and what you can grow into.",
  },
  {
    question: "Can you work with our in-house team?",
    answer:
      "Often. We can lead the work, embed alongside your designers and engineers, or hand over a documented system for your team to build on.",
  },
  {
    question: "Do you build what you design?",
    answer:
      "For websites, yes: design and development happen in the same team. For products, we deliver production-ready design systems and work closely with your engineers.",
  },
  {
    question: "What does a project cost?",
    answer:
      "It depends on scope. After a first conversation we send a fixed proposal with phases, deliverables and price, so there are no surprises.",
  },
];
