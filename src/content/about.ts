/** About copy. DRAFT, to be rewritten in Musendco's own voice. */
export const about = {
  whoWeAre:
    "A creative agency from Dhaka, making brands, print, campaigns and websites that hold up to a second look.",
  partnership: {
    lead: "Every number below is",
    emphasis: "counted from the work",
    tail: "on this site.",
  },
  story: {
    heading: [{ text: "Where design" }, { text: "meets the build", em: true }],
    body: "Musendco brings two practices together. Showaeb Bhuyan Shuvo has published branding, packaging, print and campaign work since 2024. Farian Bin Rahman builds web products end to end, from the canvas and the socket server to the schema behind them. One team takes an idea from the first mark to the finished product.",
  },
  /** Project images for the gallery rows and the who-we-are collage. */
  galleryTop: [
    { src: "/projects/furki-branding/cover.webp", alt: "", width: 2000, height: 1125 },
    { src: "/projects/think-space/cover.webp", alt: "", width: 1800, height: 1125 },
    { src: "/projects/premium-packaging/cover.webp", alt: "", width: 2000, height: 2000 },
    { src: "/projects/digital-detox-campaign/cover.webp", alt: "", width: 2000, height: 1167 },
    { src: "/projects/bangla-typography/cover.webp", alt: "", width: 2000, height: 2000 },
    { src: "/projects/kendro/cover.webp", alt: "", width: 1800, height: 1125 },
  ],
  galleryBottom: [
    { src: "/projects/magazine-layout/cover.webp", alt: "", width: 2000, height: 1867 },
    { src: "/projects/skrp-business-card/cover.webp", alt: "", width: 2000, height: 1422 },
    { src: "/projects/subscription-manager/cover.webp", alt: "", width: 1800, height: 1125 },
    { src: "/projects/packaging-design/cover.webp", alt: "", width: 2000, height: 1333 },
    { src: "/projects/photography/cover.webp", alt: "", width: 2000, height: 1333 },
    { src: "/projects/merqetia/cover.webp", alt: "", width: 1800, height: 1125 },
  ],
  collage: [
    { src: "/projects/think-space/dashboard.webp", alt: "The Think Space dashboard" },
    { src: "/projects/premium-packaging/portrait.webp", alt: "Gold mirror switch packaging for SKRP Group" },
    { src: "/projects/subscription-manager/mobile-dashboard.webp", alt: "Subscription Manager on a phone" },
  ],
  storyImage: { src: "/projects/cities-of-bangladesh/cover.webp", alt: "Collage of a hill town on a floating island, titled Chattogram in Bangla", width: 2000, height: 2857 },
} as const;
