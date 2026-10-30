"use client";

import Image from "next/image";
import { useRef } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Image in a fixed frame that drifts against the scroll and eases out of a
 * slight zoom as it passes. Static under reduced motion.
 */
export function ParallaxImage({
  image,
  aspect,
  sizes,
  preload,
  className,
}: {
  image: ImageAsset;
  aspect: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1.04]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-media bg-surface", className)}
      style={{ aspectRatio: aspect }}
    >
      <LazyMotion features={domAnimation} strict>
        <m.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>
          <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} className="object-cover" />
        </m.div>
      </LazyMotion>
    </div>
  );
}
