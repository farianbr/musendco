"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ProcessStage } from "@/types/content";

/**
 * Vertical timeline whose accent line draws itself as the reader moves down
 * it. Each stage's dot fills the moment the line reaches it, with a soft ring
 * that blooms once. Dot positions are measured, so they stay in sync with the
 * line at any text length or viewport width.
 */
export function ProcessSteps({ stages }: { stages: ProcessStage[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const [stops, setStops] = useState<number[]>(() => stages.map(() => 0));

  useLayoutEffect(() => {
    const list = ref.current;
    if (!list) return;
    const measure = () => {
      const line = list.querySelector<HTMLElement>("[data-line]");
      if (!line) return;
      const top = line.offsetTop;
      const height = line.offsetHeight;
      const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-dot]"));
      setStops(
        dots.map((dot) => {
          const item = dot.offsetParent as HTMLElement;
          const centre = item.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
          return Math.min(1, Math.max(0, (centre - top) / height));
        }),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <ol ref={ref} className="relative pl-10 md:pl-16">
        <span aria-hidden data-line className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[7px]" />
        <m.span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent md:left-[7px]"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
        />
        {stages.map((stage, i) => (
          <li key={stage.name} className="relative pb-14 last:pb-0" data-reveal="fade">
            {/* Keyed on the measured stop so its transforms are rebuilt after layout. */}
            <Dot key={stops[i]} progress={scrollYProgress} at={stops[i]} filled={!!reduce} />
            <div className="grid gap-x-(--grid-gap) gap-y-3 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="font-mono text-mono text-muted">
                  0{i + 1} / {stage.duration}
                </p>
                <h3 className="mt-2 text-subheading font-medium">{stage.name}</h3>
              </div>
              <div>
                <p className="text-fg-2">{stage.description}</p>
                <p className="mt-3 text-meta text-accent-ink">{stage.outcome}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </LazyMotion>
  );
}

function Dot({ progress, at, filled }: { progress: MotionValue<number>; at: number; filled: boolean }) {
  // Fill completes over a short stretch as the line arrives; the ring blooms just after.
  const fill = useTransform(progress, [Math.max(0, at - 0.015), at], [0, 1], { clamp: true });
  const ring = useTransform(progress, [at, at + 0.06], [0.6, 2.4], { clamp: true });
  const ringOpacity = useTransform(progress, [at - 0.001, at, at + 0.06], [0, 0.5, 0], { clamp: true });

  return (
    <span
      aria-hidden
      data-dot
      className="absolute top-2 -left-10 size-[11px] md:-left-16 md:size-[15px]"
    >
      <span className="absolute inset-0 rounded-full border border-line-strong bg-bg" />
      <m.span
        className="absolute inset-0 rounded-full bg-accent shadow-[0_0_14px_rgb(255_89_49/0.6)]"
        style={filled ? undefined : { scale: fill, opacity: fill }}
      />
      {!filled && (
        <m.span
          className="absolute inset-0 rounded-full border border-accent"
          style={{ scale: ring, opacity: ringOpacity }}
        />
      )}
    </span>
  );
}
