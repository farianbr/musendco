import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { about } from "@/content/about";
import { clients, team, testimonials } from "@/content/people";
import { disciplines, projects } from "@/content/projects";
import { PageTransition } from "@/components/motion/PageTransition";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitWords } from "@/components/ui/SplitWords";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCta } from "@/components/home/ClosingCta";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Musendco is, the work so far, and the people who do it.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

function GalleryRow({
  images,
  reverse,
  duration,
  height,
}: {
  images: readonly { src: string; width: number; height: number }[];
  reverse?: boolean;
  duration: string;
  height: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("marquee overflow-hidden", reverse && "marquee-reverse")}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3 pr-3">
            {images.map((image) => (
              <div
                key={image.src}
                className="relative overflow-hidden rounded-media bg-surface"
                style={{
                  height: `clamp(${height * 0.55}px, ${height / 14.4}vw, ${height}px)`,
                  aspectRatio: `${Math.min(image.width / image.height, 1.6)}`,
                }}
              >
                <Image src={image.src} alt="" fill sizes="560px" className="object-cover" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const years = new Set(projects.map((p) => p.year));
  const firstYear = Math.min(...years);
  const stats = [
    { label: "Projects", value: String(projects.length), body: "Published work across brand, print, campaigns and the web." },
    { label: "Disciplines", value: String(disciplines.length), body: "From a logo on a card to a full web product." },
    { label: "Publishing since", value: String(firstYear), body: `${years.size} years of work on record, and still adding to it.` },
    { label: "Named clients", value: String(clients.length), body: "Businesses in Bangladesh and the Netherlands." },
  ];

  return (
    <PageTransition>
      {/* Centred opening over two drifting rows of real work. */}
      <section aria-labelledby="about-heading" className="pt-[calc(var(--header-h)+clamp(1.5rem,1rem+2vw,3rem))]">
        <div className="shell text-center">
          <nav aria-label="Breadcrumb" className="enter-fade" style={{ "--delay": "0ms" } as React.CSSProperties}>
            <ol className="inline-flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-mono">
              <li>
                <Link href="/" className="text-muted hover:text-fg">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={2} className="size-3 text-muted" />
              </li>
              <li aria-current="page">About</li>
            </ol>
          </nav>
          <h1 id="about-heading" className="enter-words mx-auto mt-5 max-w-[20ch] text-display font-medium">
            <SplitWords parts={[{ text: "Behind the work:" }, { text: "Musendco", em: true }]} />
          </h1>
        </div>
        <div className="enter-fade mt-(--space-block) space-y-3" style={{ "--delay": "420ms" } as React.CSSProperties}>
          <GalleryRow images={about.galleryTop} duration="70s" height={340} />
          <GalleryRow images={about.galleryBottom} duration="80s" height={220} reverse />
        </div>
      </section>

      <section aria-labelledby="who-heading" className="shell grid-12 items-center gap-y-10 pt-(--space-section)">
        <div className="col-span-4 md:col-span-6">
          <Eyebrow>Who we are</Eyebrow>
          <h2 id="who-heading" data-reveal="words" className="mt-4 text-title font-medium">
            <SplitWords parts={about.whoWeAre} />
          </h2>
          <div data-reveal="fade" className="mt-7">
            <ButtonLink href="/contact" arrow>
              Book a call
            </ButtonLink>
          </div>
        </div>

        {/* Overlapping screens and print, anchored to one shared frame. */}
        <div data-reveal="fade" className="relative col-span-4 aspect-[5/4] md:col-span-5 md:col-start-8">
          <div className="absolute top-0 right-0 aspect-[8/5] w-[82%] overflow-hidden rounded-media border border-line bg-surface shadow-2xl">
            <Image src={about.collage[0].src} alt={about.collage[0].alt} fill sizes="(min-width: 768px) 34vw, 80vw" className="object-cover object-top" />
          </div>
          <div className="absolute bottom-0 left-0 aspect-[4/5] w-[38%] overflow-hidden rounded-media border border-line bg-surface shadow-2xl">
            <Image src={about.collage[1].src} alt={about.collage[1].alt} fill sizes="(min-width: 768px) 16vw, 38vw" className="object-cover" />
          </div>
          <div className="absolute right-[6%] bottom-0 aspect-[9/19] w-[20%] overflow-hidden rounded-[14px] border border-line bg-surface shadow-2xl">
            <Image src={about.collage[2].src} alt={about.collage[2].alt} fill sizes="(min-width: 768px) 9vw, 20vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      <section aria-labelledby="numbers-heading" className="shell pt-(--space-section)">
        <div className="text-center">
          <Eyebrow>By the numbers</Eyebrow>
          <h2 id="numbers-heading" data-reveal="words" className="mx-auto mt-4 max-w-[24ch] text-title font-medium">
            <SplitWords parts={[{ text: about.partnership.lead }, { text: about.partnership.emphasis, em: true }, { text: about.partnership.tail }]} />
          </h2>
        </div>

        <div className="relative mt-(--space-block)">
          <span aria-hidden className="absolute -top-8 left-[18%] size-56 rounded-full bg-accent/20 blur-[80px]" />
          <span aria-hidden className="absolute right-[12%] -bottom-10 size-64 rounded-full bg-accent/15 blur-[90px]" />
          <ul data-reveal="stagger" className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <li key={stat.label} className="flex flex-col rounded-card border border-line-strong bg-bg/80 p-6 backdrop-blur-sm">
                <h3 className="text-[0.9375rem] font-medium">{stat.label}</h3>
                <p className="mt-8 text-[clamp(2.25rem,1.9rem+1.4vw,3rem)] leading-none font-medium tracking-[-0.04em] tabular">
                  {stat.value}
                </p>
                <p className="mt-4 text-[0.9375rem] text-fg-2">{stat.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="shell grid-12 items-center gap-y-10 pt-(--space-section)">
        <div className="col-span-4 md:col-span-6">
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-heading" data-reveal="words" className="mt-4 text-title font-medium">
            <SplitWords parts={[...about.story.heading]} />
          </h2>
          <p data-reveal="fade" className="mt-5 max-w-[56ch] text-lead text-fg-2">
            {about.story.body}
          </p>
        </div>
        <div data-reveal="clip" className="relative col-span-4 aspect-[4/3] overflow-hidden md:col-span-5 md:col-start-8">
          <Image src={about.storyImage.src} alt={about.storyImage.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="rounded-media object-cover" />
        </div>
      </section>

      <section aria-labelledby="team-heading" className="shell pt-(--space-section)">
        <div className="text-center">
          <Eyebrow>Our team</Eyebrow>
          <h2 id="team-heading" data-reveal="words" className="mt-4 text-title font-medium">
            <SplitWords parts={[{ text: "Collaborative minds," }, { text: "singular focus", em: true }]} />
          </h2>
        </div>
        <ul data-reveal="stagger" className="mx-auto mt-(--space-block) grid max-w-3xl gap-4 sm:grid-cols-2">
          {team.map((member) => (
            <li key={member.name} className="group overflow-hidden rounded-card border border-line bg-surface">
              <div className="relative aspect-square overflow-hidden bg-raised">
                <Image src={member.photo.src} alt={member.photo.alt} fill sizes="(min-width: 640px) 380px, 90vw" className="media-zoom object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-[1.0625rem] font-medium">{member.name}</h3>
                <p className="text-meta text-accent">{member.role}</p>
                <p className="mt-1.5 text-meta text-fg-2">{member.focus}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stories-heading" className="shell pt-(--space-section)">
        <Eyebrow>Customer review</Eyebrow>
        <h2 id="stories-heading" data-reveal="words" className="mt-4 mb-8 text-title font-medium">
          <SplitWords parts={[{ text: "Stories that" }, { text: "inspire us", em: true }]} />
        </h2>
        <Testimonials items={testimonials} />
      </section>

      <ClosingCta />
    </PageTransition>
  );
}
