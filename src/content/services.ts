import type { Service } from "@/types/content";

/**
 * DEMO service list. Confirm with Musendco.
 * Every page and the contact form read from this list.
 */
export const services: Service[] = [
  {
    slug: "brand-identity",
    name: "Brand identity",
    value: "A brand people recognise at a glance and your team can use with confidence.",
    description: [
      "We start with what the organisation stands for and who it needs to reach, then build a visual language around it: logotype or symbol, typography, colour, image direction and voice.",
      "The result is a working system, documented so the people who use it every day can apply it well.",
    ],
    deliverables: ["Strategy and positioning", "Logotype and symbol", "Type and colour system", "Guidelines", "Launch assets"],
    image: { src: "/services/brand-identity.webp", alt: "Green valley framed by cliffs", width: 1200, height: 1500 },
  },
  {
    slug: "digital-product",
    name: "Digital product",
    value: "Products that are clear on day one and fast on day one hundred.",
    description: [
      "We map the journeys that matter, test structure before polish, and design interfaces that hold up across states, screen sizes and edge cases.",
      "Design ships as a component system with documented behaviour, so engineering can build it accurately.",
    ],
    deliverables: ["Discovery and journeys", "Information architecture", "Interface design", "Prototypes", "Design systems"],
    image: { src: "/services/digital-product.webp", alt: "Red rock spires under a blue sky", width: 1200, height: 1500 },
  },
  {
    slug: "websites",
    name: "Websites",
    value: "A fast, accessible site your team can update without breaking it.",
    description: [
      "Design and engineering work side by side, so ideas are tested in the browser early and the finished site behaves the way it was designed.",
      "Performance, accessibility and search are part of the build from the first commit.",
    ],
    deliverables: ["Content design", "Visual and interaction design", "Front-end and CMS", "Performance and SEO", "Launch and handover"],
    image: { src: "/services/websites.webp", alt: "Sunlight at the end of a narrow city street", width: 1200, height: 1500 },
  },
  {
    slug: "art-direction",
    name: "Art direction",
    value: "Material across every channel that clearly comes from the same place.",
    description: [
      "We direct photography, motion and layout so every piece of communication feels considered and consistent.",
      "Useful for launches, campaigns and keeping an established brand sharp.",
    ],
    deliverables: ["Campaign concepts", "Photography direction", "Motion and social", "Editorial and print"],
    image: { src: "/services/art-direction.webp", alt: "Hand tools laid out on a wooden workbench", width: 1200, height: 1500 },
  },
];
