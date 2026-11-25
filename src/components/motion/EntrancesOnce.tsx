"use client";

import { useEffect } from "react";

const ENTRANCES = ".enter-fade, .enter-clip, .enter-words .word > span";

/**
 * Load-in entrances (`.enter-*`, CSS keyframes) play the first time an element
 * is shown, never again (see `[data-entered]` in globals.css).
 *
 * Next keeps visited pages mounted but hidden (display: none) and shows them
 * again on return, and CSS restarts keyframe animations whenever an element
 * comes back from display: none. So every return replayed the entrances with
 * their delays: on back/forward the page is restored mid-scroll, and the
 * visitor looked at empty space (~500ms on Services) until content faded in.
 *
 * Scroll reveals already behave this way (`data-revealed` sticks).
 */
export function EntrancesOnce() {
  useEffect(() => {
    const onEnd = (event: AnimationEvent) => {
      const el = event.target;
      if (el instanceof Element && el.matches(ENTRANCES)) el.setAttribute("data-entered", "");
    };
    // Back/forward restores a page as it was left: finish every entrance now,
    // including ones cut off before they ended, before the page is shown again.
    const onPopState = () => {
      document.querySelectorAll(ENTRANCES).forEach((el) => el.setAttribute("data-entered", ""));
    };
    document.addEventListener("animationend", onEnd);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("animationend", onEnd);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
