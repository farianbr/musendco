import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { about } from "@/content/about";
import { testimonials } from "@/content/people";
import { site } from "@/content/site";
import { PageTransition } from "@/components/motion/PageTransition";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitWords } from "@/components/ui/SplitWords";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCta } from "@/components/home/ClosingCta";
import { AboutBento } from "@/components/about/AboutBento";
import { Toolbox } from "@/components/about/Toolbox";
import { MuseLogo } from "@/components/ui/Brand";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Muse is, the work so far, and where we work from: Luton, UK, with clients worldwide.",
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
                  aspectRatio: `${image.width} / ${image.height}`,
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
            <SplitWords parts={[{ text: "Behind the work:" }, { text: "Muse", em: true }]} />
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
          <div className="absolute right-[6%] bottom-0 aspect-[375/812] w-[20%] overflow-hidden rounded-[14px] border border-line bg-surface shadow-2xl">
            <Image src={about.collage[2].src} alt={about.collage[2].alt} fill sizes="(min-width: 768px) 9vw, 20vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      <section aria-labelledby="numbers-heading" className="shell pt-(--space-section)">
        <Eyebrow>About us</Eyebrow>
        <h2 id="numbers-heading" data-reveal="words" className="mt-4 max-w-[24ch] text-title font-medium">
          <SplitWords parts={[{ text: about.partnership.lead }, { text: about.partnership.emphasis, em: true }, { text: about.partnership.tail }]} />
        </h2>

        <div className="mt-(--space-block)">
          <AboutBento />
        </div>

        {/* The founder. Side by side only where the text fits within the
            portrait's height (xl, fixed card width); the text column is taken
            out of flow there so the portrait alone sets the row height. */}
        <article
          aria-labelledby="founder-heading"
          data-reveal="fade"
          className="mt-3 grid gap-6 rounded-card border border-line bg-surface p-3 md:mt-4 xl:grid-cols-2 xl:gap-8"
        >
          <div
            className="relative overflow-hidden rounded-[calc(var(--radius-card)-6px)]"
            style={{ aspectRatio: `${about.founder.image.width} / ${about.founder.image.height}` }}
          >
            <Image
              src={about.founder.image.src}
              alt={about.founder.image.alt}
              fill
              sizes="(min-width: 1280px) 600px, 100vw"
              className="object-cover"
            />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-subheading font-medium">{about.founder.name}</p>
              <p className="mt-1 font-mono text-mono text-white/75 uppercase">
                {about.founder.role} of {site.legalName}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="flex flex-col px-3 pb-4 xl:absolute xl:inset-0 xl:overflow-hidden xl:px-0 xl:py-4 xl:pr-6">
              <h3 id="founder-heading" className="text-subheading font-medium">
                The Founder
              </h3>
              <div className="mt-4 space-y-3 text-[0.875rem] leading-[1.6] text-fg-2">
                {about.founder.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <MuseLogo title={site.legalName} className="mt-6 h-6 w-auto self-start xl:mt-auto" />
            </div>
          </div>
        </article>

        <Toolbox />
      </section>

      <section aria-labelledby="story-heading" className="shell section-y">
        <div className="grid-12 gap-y-8 border-t border-line pt-(--space-block)">
          <div className="col-span-4 md:col-span-3">
            <p data-reveal="fade" className="font-mono text-mono text-muted uppercase">
              ( Our story )
            </p>
          </div>
          <div className="col-span-4 md:col-span-9">
            <h2 id="story-heading" data-reveal="words" className="max-w-[18ch] text-title font-medium">
              <SplitWords parts={[...about.story.heading]} />
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-[60ch] text-lead text-fg-2">
              {about.story.body}
            </p>
          </div>
        </div>

        <ol data-reveal="stagger" className="mt-(--space-block) grid gap-3 md:grid-cols-3 md:gap-4">
          {about.story.pillars.map((pillar, i) => (
            <li key={pillar.title} className="flex flex-col rounded-card border border-line bg-surface p-6 md:p-8">
              <span className="font-mono text-mono text-accent-ink tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-subheading font-medium md:mt-16">{pillar.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Testimonials items={testimonials} />

      <ClosingCta />
    </PageTransition>
  );
}
