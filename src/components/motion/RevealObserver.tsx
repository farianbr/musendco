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
    const viewport = window.innerHeight;
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewport && rect.bottom > 0) el.setAttribute("data-revealed", "");
    }
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
