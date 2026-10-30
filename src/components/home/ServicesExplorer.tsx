"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { Service } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Large screens: a list of services drives a sticky panel. Pointer hover,
 * keyboard focus and click all select, so nothing depends on hover alone.
 * Small screens get every service stacked with its details visible.
 */
export function ServicesExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Desktop */}
      <div className="hidden grid-cols-12 gap-x-(--grid-gap) lg:grid">
        <ul className="col-span-6 self-start" data-reveal="stagger">
          {services.map((service, i) => {
            const selected = i === active;
            return (
              <li key={service.slug} className="relative border-t border-line last:border-b">
                {selected && (
                  <m.span
                    layoutId="service-indicator"
                    aria-hidden
                    className="absolute top-0 left-0 h-px w-full origin-left bg-accent"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
                  />
                )}
                <button
                  type="button"
                  aria-pressed={selected}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span className={cn("font-mono text-mono tabular transition-colors duration-(--dur-fast)", selected ? "text-accent" : "text-muted")}>
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-heading font-medium transition-[color,transform] duration-(--dur) ease-out motion-reduce:transition-none",
                      selected ? "translate-x-2 text-fg" : "text-muted group-hover:text-fg-2",
                    )}
                  >
                    {service.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sticky top-[calc(var(--header-h)+2rem)] col-span-5 col-start-8 self-start" data-reveal="fade">
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-surface">
            <AnimatePresence initial={false} mode="popLayout">
              <m.div
                key={current.slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                <Image src={current.image.src} alt={current.image.alt} fill sizes="40vw" className="object-cover" />
              </m.div>
            </AnimatePresence>
          </div>
          <AnimatePresence initial={false} mode="wait">
            <m.div
              key={current.slug}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4"
            >
              <p className="text-lead">{current.value}</p>
              <p className="mt-3 text-meta text-muted">{current.deliverables.join(" / ")}</p>
              <Link href={`/services#${current.slug}`} className="link-underline mt-4 inline-flex min-h-11 items-center text-meta font-medium">
                More about {current.name.toLowerCase()}
              </Link>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile and tablet */}
      <ul className="space-y-14 lg:hidden">
        {services.map((service, i) => (
          <li key={service.slug} data-reveal="fade">
            <div className="relative aspect-[16/11] overflow-hidden rounded-media bg-surface">
              <Image src={service.image.src} alt={service.image.alt} fill sizes="100vw" className="object-cover" />
            </div>
            <p className="mt-5 font-mono text-mono text-accent">0{i + 1}</p>
            <h3 className="mt-2 text-subheading font-medium">
              <Link href={`/services#${service.slug}`}>{service.name}</Link>
            </h3>
            <p className="mt-2 text-fg-2">{service.value}</p>
            <p className="mt-3 text-meta text-muted">{service.deliverables.join(" / ")}</p>
          </li>
        ))}
      </ul>
    </LazyMotion>
  );
}
