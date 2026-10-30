import { home } from "@/content/home";
import { heroProjects } from "@/content/projects";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SplitWords } from "@/components/ui/SplitWords";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroReel } from "./HeroReel";

export function Hero() {
  const { headline, intro } = home.hero;

  return (
    <section
      aria-labelledby="hero-heading"
      className="shell pt-[calc(var(--header-h)+clamp(2rem,1rem+3vw,3.5rem))] pb-(--space-block)"
    >
      <div className="grid-12 items-end gap-y-6">
        <h1 id="hero-heading" className="enter-words col-span-4 text-display font-medium md:col-span-12 lg:col-span-8">
          <SplitWords parts={[{ text: headline.lead }, { text: headline.emphasis, em: true }]} />
        </h1>
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <p
            className="enter-fade max-w-[44ch] text-lead text-fg-2"
            style={{ "--delay": "450ms" } as React.CSSProperties}
          >
            {intro}
          </p>
          <div
            className="enter-fade mt-6 flex flex-wrap items-center gap-3"
            style={{ "--delay": "560ms" } as React.CSSProperties}
          >
            <Magnetic>
              <ButtonLink href="/contact" arrow>
                Start a project
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/work" variant="secondary">
              View work
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mt-(--space-block)">
        <HeroReel projects={heroProjects} />
      </div>
    </section>
  );
}
