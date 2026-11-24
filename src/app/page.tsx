import { home } from "@/content/home";
import { processStages } from "@/content/process";
import { testimonials } from "@/content/people";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitWords } from "@/components/ui/SplitWords";
import { Hero } from "@/components/home/Hero";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Stats } from "@/components/home/Stats";
import { Manifesto } from "@/components/home/Manifesto";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCta } from "@/components/home/ClosingCta";
import { AboutBento } from "@/components/about/AboutBento";
import { Toolbox } from "@/components/about/Toolbox";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <ClientMarquee />
      <SelectedWork />
      <Stats />

      <section aria-label="Our approach" className="border-y border-line bg-surface">
        <div className="shell py-(--space-section)">
          <Manifesto text={home.manifesto} />
        </div>
      </section>

      <section aria-labelledby="process-heading" className="shell section-y grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <h2 id="process-heading" data-reveal="words" className="text-title font-medium">
              <SplitWords parts={home.process.heading} />
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-[34ch] text-lead text-fg-2">
              {home.process.intro}
            </p>
          </div>
        </div>
        <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
          <ProcessSteps stages={processStages} />
        </div>
      </section>

      <section aria-labelledby="about-intro-heading" className="shell pb-(--space-section)">
        <div className="mb-(--space-block) flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <p data-reveal="fade" className="font-mono text-mono text-muted uppercase">
              ( {home.about.eyebrow} )
            </p>
            <h2 id="about-intro-heading" data-reveal="words" className="mt-4 max-w-[18ch] text-title font-medium">
              <SplitWords parts={[{ text: home.about.lead }, { text: home.about.emphasis, em: true }]} />
            </h2>
          </div>
          <div data-reveal="fade">
            <ButtonLink href="/about" variant="secondary" arrow>
              More about Muse
            </ButtonLink>
          </div>
        </div>
        <AboutBento stats={false} />
        <Toolbox />
      </section>

      <Testimonials items={testimonials} />

      <ClosingCta />
    </PageTransition>
  );
}
