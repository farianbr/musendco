"use client";

import { useRef } from "react";
import { m, LazyMotion, domAnimation, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Pulls its child gently toward the pointer. Motion values only, so the React
 * tree never re-renders while the pointer moves. Fine pointers only; static
 * under reduced motion and on touch.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ x: springX, y: springY }}
        className={className ?? "inline-block"}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
