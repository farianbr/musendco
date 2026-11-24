"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Frame whose contents settle out of a zoom and drift against the scroll as
 * it passes. The frame keeps the content's natural size, so nothing is cropped
 * once it is in view. Static under reduced motion.
 */
export function ParallaxFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Drifts down inside the frame while settling, so it reads as depth, not zoom.
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.16, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["-5%", "0%"]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <LazyMotion features={domAnimation} strict>
        <m.div className="origin-center" style={reduce ? undefined : { scale, y }}>
          {children}
        </m.div>
      </LazyMotion>
    </div>
  );
}
