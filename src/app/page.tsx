import { home } from "@/content/home";
import { services } from "@/content/services";
import { processStages } from "@/content/process";
import { testimonials } from "@/content/people";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitWords } from "@/components/ui/SplitWords";
import { Hero } from "@/components/home/Hero";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Stats } from "@/components/home/Stats";
import { ServicesExplorer } from "@/components/home/ServicesExplorer";
import { Manifesto } from "@/components/home/Manifesto";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <ClientMarquee />
      <SelectedWork />
      <Stats />

      <section aria-labelledby="services-heading" className="shell section-y">
        <h2 id="services-heading" data-reveal="words" className="mb-(--space-block) text-title font-medium">
          <SplitWords parts={home.services.heading} />
        </h2>
        <ServicesExplorer services={services} />
      </section>

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

      <section aria-labelledby="testimonials-heading" className="shell pb-(--space-section)">
        <h2 id="testimonials-heading" className="mb-8 font-mono text-mono text-muted uppercase">
          {home.testimonials.heading}
        </h2>
        <Testimonials items={testimonials} />
      </section>

      <ClosingCta />
    </PageTransition>
  );
}
