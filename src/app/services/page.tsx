import type { Metadata } from "next";
import { services } from "@/content/services";
import { processStages } from "@/content/process";
import { faqs } from "@/content/people";
import { home } from "@/content/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SplitWords } from "@/components/ui/SplitWords";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { FaqList } from "@/components/services/FaqList";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, digital products, websites and art direction: what each service involves and what you receive.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader
        title={[{ text: "What we do, and" }, { text: "what you get.", em: true }]}
        intro="Each service runs on its own or as part of a larger engagement. Here is what each one involves and what it delivers."
      >
        <nav aria-label="Services on this page" className="enter-fade mt-12" style={{ "--delay": "520ms" } as React.CSSProperties}>
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="pressable inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-meta hover:border-fg"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="shell space-y-(--space-section) pb-(--space-section)">
        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-heading`}
            className="grid-12 gap-y-10 border-t border-line pt-10"
          >
            <div className={i % 2 === 0 ? "col-span-4 md:col-span-5" : "col-span-4 md:col-span-5 md:col-start-8 md:row-start-1"}>
              <ParallaxImage image={service.image} aspect="1 / 1" sizes="(min-width: 768px) 40vw, 100vw" preload={i === 0} />
            </div>
            <div
              className={
                i % 2 === 0
                  ? "col-span-4 md:col-span-6 md:col-start-7"
                  : "col-span-4 md:col-span-6 md:col-start-1 md:row-start-1"
              }
            >
              <p className="font-mono text-mono text-accent">0{i + 1}</p>
              <h2 id={`${service.slug}-heading`} data-reveal="words" className="mt-4 text-heading font-medium">
                <SplitWords parts={service.name} />
              </h2>
              <p data-reveal="fade" className="mt-6 max-w-[36ch] text-lead">
                {service.value}
              </p>
              <div data-reveal="stagger" className="mt-6 space-y-4">
                {service.description.map((paragraph, j) => (
                  <p key={j} className="max-w-[56ch] text-fg-2">
                    {paragraph}
                  </p>
                ))}
              </div>
              <h3 className="mt-10 font-mono text-mono text-muted uppercase">Deliverables</h3>
              <ul data-reveal="stagger" className="mt-4 grid gap-x-(--grid-gap) sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="border-t border-line py-3 text-[0.9375rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="process-heading" className="border-y border-line bg-surface">
        <div className="shell section-y grid-12 gap-y-12">
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
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="shell section-y grid-12 gap-y-10">
        <h2 id="faq-heading" data-reveal="words" className="col-span-4 text-heading font-medium md:col-span-4">
          <SplitWords parts="Questions we hear often" />
        </h2>
        <div className="col-span-4 md:col-span-7 md:col-start-6" data-reveal="fade">
          <FaqList items={faqs} />
        </div>
      </section>

      <ClosingCta />
    </PageTransition>
  );
}
