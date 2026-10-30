"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * A statement that lights up word by word as it scrolls through the viewport,
 * pacing the reading. Fully lit under reduced motion.
 */
export function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <LazyMotion features={domAnimation} strict>
      <p
        ref={ref}
        className="mx-auto max-w-[30ch] text-center text-[clamp(1.625rem,1.2rem+1.8vw,2.75rem)] leading-[1.15] font-medium tracking-[-0.03em]"
      >
        <span className="sr-only">{text}</span>
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            reduce={!!reduce}
          >
            {word}
          </Word>
        ))}
      </p>
    </LazyMotion>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <m.span aria-hidden style={{ opacity: reduce ? 1 : opacity }}>
        {children}
      </m.span>{" "}
    </>
  );
}
