import type { Client, Faq, TeamMember, Testimonial } from "@/types/content";

/**
 * Clients named on the project sources. Marks are generated until real logos
 * are supplied. Confirm permission to show each name before launch.
 */
export const clients: Client[] = [
  { name: "SKRP Group", glyph: "diamond", case: "upper" },
  { name: "merQetia", glyph: "bars", case: "title" },
  { name: "CarClinic", glyph: "arc", case: "title" },
  { name: "Baby Basket", glyph: "circle", case: "title" },
  { name: "The BlackBoard", glyph: "square", case: "title" },
  { name: "Bonoya", glyph: "half", case: "title" },
];

/** DEMO testimonials. Fictional people; replace with approved quotes. */
export const testimonials: Testimonial[] = [
  {
    id: "ledgerline",
    quote:
      "They spent the first two weeks listening to our customers instead of showing us mood boards. The product we launched is simpler than the one we started with, and it does more.",
    name: "Hana Lindqvist",
    role: "Head of Product",
    company: "Ledgerline",
  },
  {
    id: "ondine",
    quote:
      "Musendco gave us a brand that looks expensive and feels honest. Retailers asked about the packaging before they asked about the product.",
    name: "Céline Moreau",
    role: "Co-founder",
    company: "Ondine Skincare",
  },
  {
    id: "tidewater",
    quote:
      "Bookings on phones went up within the first month. More importantly, the complaints at the terminal stopped.",
    name: "Owen Gallagher",
    role: "Digital Lead",
    company: "Tidewater Ferries",
  },
  {
    id: "aurel",
    quote:
      "Our oldest patients use the app without help. That was the goal, and they got us there without cutting corners on accessibility.",
    name: "Dr. Amara Osei",
    role: "Clinical Director",
    company: "Aurel Health",
  },
];

/** Titles from each person's own profile. */
export const team: TeamMember[] = [
  {
    name: "Showaeb Bhuyan Shuvo",
    role: "Graphic Designer",
    focus: "Branding, packaging, print and campaigns",
    photo: { src: "/team/showaeb-bhuyan-shuvo.webp", alt: "Portrait of Showaeb Bhuyan Shuvo", width: 800, height: 800 },
  },
  {
    name: "Farian Bin Rahman",
    role: "Full-Stack Developer",
    focus: "Websites and web products, end to end",
    photo: { src: "/team/farian-rahman.webp", alt: "Portrait of Farian Bin Rahman", width: 800, height: 800 },
  },
];

/** DEMO answers. Confirm terms with Musendco before launch. */
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
