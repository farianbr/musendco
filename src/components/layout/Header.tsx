"use client";

import { useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SiteMenu } from "./SiteMenu";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Fixed header. Gains a translucent backing once the page scrolls (for
 * legibility over imagery) and slides away while scrolling down, returning on
 * the way up. Navigation lives in the site menu behind the centre pill.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    if (Math.abs(y - previous) > 4) setHidden(y > previous && y > 240);
  });

  const isHidden = hidden && !menuOpen;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.header
        ref={headerRef}
        onFocusCapture={() => setHidden(false)}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="site-header fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-(--dur) ease-out",
            scrolled && !menuOpen
              ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent",
          )}
        />
        <div className="shell relative grid h-(--header-h) grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div
            className={cn(
              "justify-self-start transition-opacity duration-(--dur-fast)",
              menuOpen && "pointer-events-none opacity-0",
            )}
            inert={menuOpen}
          >
            <Wordmark />
          </div>

          <SiteMenu open={menuOpen} onOpenChange={setMenuOpen} containerRef={headerRef} />

          <div
            className={cn(
              "flex items-center gap-2 justify-self-end transition-opacity duration-(--dur-fast)",
              menuOpen && "pointer-events-none opacity-0",
            )}
            inert={menuOpen}
          >
            <span className="hidden sm:contents">
              <ThemeToggle />
            </span>
            <span className="hidden md:contents">
              <ButtonLink href="/contact" size="small" arrow>
                Start a project
              </ButtonLink>
            </span>
          </div>
        </div>
      </m.header>
    </LazyMotion>
  );
}
