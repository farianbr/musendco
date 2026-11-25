"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements as they enter the viewport.
 *
 * Hiding only starts once this runs (it adds `.reveal-ready` to <html>), and
 * anything already on screen is marked revealed first, so content is never
 * invisible without JavaScript and nothing above the fold flickers.
 * CSS disables the effect entirely under prefers-reduced-motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
    );
    // All reads, then all writes: setting an attribute between two
    // getBoundingClientRect calls invalidates style, so each read forced a
    // fresh style + layout pass (dozens per page, as the new page arrives).
    const viewport = window.innerHeight;
    const onScreen = elements.filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < viewport && rect.bottom > 0;
    });
    for (const el of onScreen) el.setAttribute("data-revealed", "");
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of elements) {
      if (!el.hasAttribute("data-revealed")) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
