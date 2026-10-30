"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domMax, m, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/types/content";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * One quote at a time. Arrows, the index buttons, or a horizontal swipe move
 * between quotes. A quick flick is enough: velocity counts, not just distance.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const item = items[index];

  const paginate = (step: number) =>
    setState(([i]) => [(i + step + items.length) % items.length, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400;
    if (swipe) paginate(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <LazyMotion features={domMax} strict>
      <div className="grid-12 gap-y-10">
        <div className="relative col-span-4 min-h-[15rem] md:col-span-10 md:min-h-[11rem]" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <m.figure
              key={item.id}
              custom={direction}
              variants={{
                enter: (d: number) =>
                  reduce ? { opacity: 0 } : { opacity: 0, x: d * 48, filter: "blur(8px)" },
                center: { opacity: 1, x: 0, filter: "blur(0px)" },
                exit: (d: number) =>
                  reduce
                    ? { opacity: 0, transition: { duration: 0.15 } }
                    : { opacity: 0, x: d * -32, filter: "blur(6px)", transition: { duration: 0.25, ease: EASE_OUT } },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE_OUT }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              className="cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <blockquote className="max-w-[46ch] text-heading font-medium select-none">
                <p>&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 text-meta">
                <span className="font-medium text-fg">{item.name}</span>
                <span className="text-muted">
                  {item.role}, {item.company}
                </span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>

        <div className="col-span-4 flex items-center justify-between gap-6 md:col-span-12">
          <div className="flex gap-1.5" role="group" aria-label="Choose testimonial">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Quote from ${t.name}`}
                aria-pressed={i === index}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="flex h-8 w-9 items-center"
              >
                <span
                  className={`block h-0.5 w-full rounded-full transition-colors duration-(--dur) ${i === index ? "bg-fg" : "bg-line-strong hover:bg-muted"}`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous quote"
              className="pressable inline-flex size-12 items-center justify-center rounded-full border border-line-strong hover:border-fg"
            >
              <ArrowLeft aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next quote"
              className="pressable inline-flex size-12 items-center justify-center rounded-full border border-line-strong hover:border-fg"
            >
              <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
