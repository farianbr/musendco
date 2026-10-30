"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Line that draws itself once in view, with a pill and a year at each point. */
export function GrowthChart({ points }: { points: { year: number; total: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const shown = reduce || inView;

  const max = Math.max(...points.map((p) => p.total));
  const coords = points.map((p, i) => ({
    ...p,
    x: 8 + (i / Math.max(points.length - 1, 1)) * 84,
    y: 86 - (p.total / max) * 66,
  }));
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x} ${c.y}`).join(" ");

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        ref={ref}
        role="img"
        aria-label={`Projects published to date: ${points.map((p) => `${p.total} by ${p.year}`).join(", ")}`}
        className="relative h-44"
      >
        {/* Revealed by a clip: pathLength dashes break under a non-scaling stroke. */}
        <m.svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          initial={false}
          animate={{ clipPath: shown ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </m.svg>
        {coords.map((c, i) => (
          <m.div
            key={c.year}
            aria-hidden
            className="absolute"
            style={{ left: `${c.x}%`, top: `${c.y}%`, x: "-50%", y: "-50%" }}
            initial={false}
            animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.7 }}
            transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.2 + i * 0.35 }}
          >
            <span className="block size-2 rounded-full bg-accent" />
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-full bg-raised px-2.5 py-1 font-mono text-mono text-accent tabular">
              {c.total}
            </span>
            <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 font-mono text-mono text-muted tabular">
              {c.year}
            </span>
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}

/** Digits spin like an odometer and settle on the value once in view. */
export function RollingNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const shown = reduce || inView;

  return (
    <span ref={ref} className="inline-flex text-[clamp(2.25rem,1.9rem+1.4vw,3rem)] leading-none font-medium tracking-[-0.03em] text-accent tabular">
      <span className="sr-only">{value}</span>
      {[...value].map((digit, i) => (
        <span key={i} aria-hidden className="relative block h-[1em] overflow-hidden">
          <span
            className="block transition-transform duration-[1600ms] ease-out motion-reduce:transition-none"
            style={{
              transform: `translateY(-${shown ? Number(digit) : 0}em)`,
              transitionDelay: `${i * 120}ms`,
            }}
          >
            {"0123456789".split("").map((n) => (
              <span key={n} className="block h-[1em]">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
