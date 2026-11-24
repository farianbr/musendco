import type { Client, Faq, Testimonial } from "@/types/content";

/**
 * Clients. Marks are generated until real logos are supplied. Confirm
 * permission to show each name before launch.
 */
export const clients: Client[] = [
  { name: "Sony", glyph: "square", case: "upper" },
  { name: "KENT", glyph: "ring", case: "upper" },
  { name: "UNICEF", glyph: "circle", case: "upper" },
  { name: "Domino's", glyph: "diamond", case: "title" },
  { name: "Kelinto", glyph: "half", case: "title" },
  { name: "merQetia", glyph: "bars", case: "title" },
  { name: "Cellshoppe", glyph: "arc", case: "title" },
  { name: "Hindware", glyph: "triangle", case: "title" },
  { name: "Hitachi", glyph: "square", case: "upper" },
  { name: "NT Blu Ray", glyph: "ring", case: "title" },
  { name: "1 ms", glyph: "bars", case: "lower" },
  { name: "Revenant eSports", glyph: "triangle", case: "title" },
  { name: "MSI", glyph: "diamond", case: "upper" },
  { name: "Ashol Incorporated", glyph: "half", case: "title" },
  { name: "SKRP Group", glyph: "diamond", case: "upper" },
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
      "Muse gave us a brand that looks expensive and feels honest. Retailers asked about the packaging before they asked about the product.",
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
  {
    id: "northvale",
    quote:
      "The packaging did the selling for us. Our first run sold out in eleven days, and every reorder since has come with a photo of the box.",
    name: "Priya Raman",
    role: "Founder",
    company: "Northvale Tea Co.",
  },
  {
    id: "brightloop",
    quote:
      "Our thumbnails finally look like one channel instead of five freelancers. Click-through went up and stayed up.",
    name: "Marcus Webb",
    role: "Head of Content",
    company: "Brightloop Media",
  },
  {
    id: "kilnworks",
    quote:
      "Shuvo asked better questions in the first call than we had asked ourselves in a year. The identity came straight out of those answers.",
    name: "Elena Novak",
    role: "Managing Director",
    company: "Kilnworks Studio",
  },
  {
    id: "harbourline",
    quote:
      "Clear timelines, no surprises, and work that was ready the day they said it would be. That is rarer than it should be.",
    name: "Tom Hartley",
    role: "Operations Lead",
    company: "Harbourline Logistics",
  },
  {
    id: "saffron-sage",
    quote:
      "The illustrations gave our menu a personality people talk about. Guests photograph the walls now.",
    name: "Aisha Karim",
    role: "Owner",
    company: "Saffron & Sage",
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
