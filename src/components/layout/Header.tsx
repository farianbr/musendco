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
import { SiteMenu } from "./SiteMenu";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Fixed header. Gains a translucent backing once the page scrolls (for
 * legibility over imagery) and slides away while scrolling down, returning on
 * the way up. Navigation lives in the site menu behind the orange pill on
 * the right, which stays put while the menu is open so it can close it.
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
        <div className="shell relative flex h-(--header-h) items-center justify-between gap-4">
          <div
            className={cn(
              "transition-opacity duration-(--dur-fast)",
              menuOpen && "pointer-events-none opacity-0",
            )}
            inert={menuOpen}
          >
            <Wordmark />
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                "hidden transition-opacity duration-(--dur-fast) sm:block",
                menuOpen && "pointer-events-none opacity-0",
              )}
              inert={menuOpen}
            >
              <ThemeToggle className="size-11" />
            </div>
            <SiteMenu open={menuOpen} onOpenChange={setMenuOpen} containerRef={headerRef} />
          </div>
        </div>
      </m.header>
    </LazyMotion>
  );
}
