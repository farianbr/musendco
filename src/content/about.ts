/** About copy. DRAFT, to be rewritten in Muse's own voice. */
export const about = {
  whoWeAre:
    "A creative studio in Luton, UK, making brands, packaging, social and websites that hold up to a second look, for clients anywhere.",
  partnership: {
    lead: "Every number below is",
    emphasis: "counted from the work",
    tail: "on this site.",
  },
  story: {
    heading: [{ text: "Where design" }, { text: "meets the build", em: true }],
    body: "Muse brings two practices together: identity, packaging and campaign design on one side, web products built end to end on the other. One team takes an idea from the first mark to the finished product, so nothing gets lost in a handover.",
    pillars: [
      { title: "Design", body: "Identity, packaging, campaigns and illustration, built as systems people recognise and remember." },
      { title: "Build", body: "Websites and web products made end to end, from the interface to the server behind it." },
      { title: "One team", body: "The same people from the first mark to launch day, so nothing is lost in translation." },
    ],
  },
  founder: {
    name: "Showaeb Bhuyan Shuvo",
    role: "Founder & Creative Head",
    image: {
      src: "/about/showaeb-bhuyan-shuvo.webp",
      alt: "Portrait of Showaeb Bhuyan Shuvo in sunglasses and a dark jacket against an orange and violet gradient",
      width: 2469,
      height: 2087,
    },
    body: [
      "Showaeb Bhuyan Shuvo is the founder and creative head of Muse & Co. A United Kingdom-based Creative Agency built around clear ideas, distinctive visual systems, and work with purpose.",
      "His practice spans brand identity, campaigns, packaging, illustration, and digital design. Shuvo approaches each project as a process of translation: taking a business ambition, a product, or a story and giving it a visual form people can recognise and remember. The work is thoughtful, expressive, and grounded in the belief that good design should do more than look polished: it should make the right thing clear.",
      "At Muse, Shuvo works closely with clients from the first conversation through to the final detail. The studio partners with people and businesses looking to build brands with substance, creating identities and communications that feel relevant now and stay useful as they grow. Every decision is considered, every element has a role, and the aim is always the same: work that feels original, useful, and made to last.",
    ],
  },
  /** Project images for the gallery rows and the who-we-are collage. */
  galleryTop: [
    { src: "/projects/furki-branding/cover.webp", alt: "", width: 2000, height: 1125 },
    { src: "/projects/think-space/cover.webp", alt: "", width: 1800, height: 1125 },
    { src: "/projects/premium-packaging/cover.webp", alt: "", width: 2000, height: 2000 },
    { src: "/projects/digital-detox-campaign/cover.webp", alt: "", width: 2000, height: 1167 },
    { src: "/projects/natural-organic-packaging/cover.webp", alt: "", width: 1400, height: 1092 },
    { src: "/projects/kendro/cover.webp", alt: "", width: 1800, height: 1125 },
  ],
  galleryBottom: [
    { src: "/projects/thumbnails/cover.webp", alt: "", width: 1705, height: 1330 },
    { src: "/projects/carclinic-stationery/cover.webp", alt: "", width: 1400, height: 1050 },
    { src: "/projects/merqetia/cover.webp", alt: "", width: 1800, height: 1125 },
    { src: "/projects/chikfi-packaging/cover.webp", alt: "", width: 2000, height: 1333 },
    { src: "/projects/electronics/cover.webp", alt: "", width: 1184, height: 1184 },
    { src: "/projects/character-portfolio/cover.webp", alt: "", width: 2000, height: 1500 },
  ],
  collage: [
    { src: "/projects/think-space/dashboard.webp", alt: "The Think Space dashboard" },
    { src: "/projects/premium-packaging/portrait.webp", alt: "Gold mirror switch packaging for SKRP Group" },
    { src: "/projects/kendro/mobile-dashboard.webp", alt: "Kendro on a phone" },
  ],
} as const;
