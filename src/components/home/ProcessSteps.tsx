"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll } from "motion/react";
import type { ProcessStage } from "@/types/content";

/** Vertical timeline whose accent line draws itself as the reader moves down it. */
export function ProcessSteps({ stages }: { stages: ProcessStage[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <LazyMotion features={domAnimation} strict>
      <ol ref={ref} className="relative pl-10 md:pl-16">
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[7px]" />
        <m.span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent md:left-[7px]"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
        {stages.map((stage, i) => (
          <li key={stage.name} className="relative pb-14 last:pb-0" data-reveal="fade">
            <span
              aria-hidden
              className="absolute top-2 -left-10 size-[11px] rounded-full border border-line-strong bg-bg md:-left-16 md:size-[15px]"
            />
            <div className="grid gap-x-(--grid-gap) gap-y-3 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="font-mono text-mono text-muted">
                  0{i + 1} / {stage.duration}
                </p>
                <h3 className="mt-2 text-subheading font-medium">{stage.name}</h3>
              </div>
              <div>
                <p className="text-fg-2">{stage.description}</p>
                <p className="mt-3 text-meta text-accent">{stage.outcome}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </LazyMotion>
  );
}
