"use client";

import { useRef, useSyncExternalStore } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

type Theme = "dark" | "light";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/**
 * Switches between the dark (default) and light palettes. Where the View
 * Transitions API exists, the new theme spreads out from the button as a
 * circle; otherwise, and under reduced motion, it switches instantly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    const root = document.documentElement;
    const apply = () => {
      if (next === "light") root.dataset.theme = "light";
      else delete root.dataset.theme;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // storage unavailable: the choice lasts for this page view only
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || !buttonRef.current) {
      apply();
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add("theme-switching");
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 720,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className={cn(
        "pressable relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-line hover:border-line-strong",
        className,
      )}
    >
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={theme}
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="inline-flex"
          >
            {theme === "dark" ? (
              <Moon aria-hidden strokeWidth={1.75} className="size-4" />
            ) : (
              <Sun aria-hidden strokeWidth={1.75} className="size-4" />
            )}
          </m.span>
        </AnimatePresence>
      </LazyMotion>
    </button>
  );
}
