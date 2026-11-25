"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const ENTRANCES = ".enter-fade, .enter-clip, .enter-words .word > span";

/**
 * A page Next keeps for back/forward is hidden by React with an inline
 * `display: none !important` on its top elements. Matching that attribute
 * tells a hidden page from the one on screen without measuring anything, so
 * none of this forces a layout while a page is arriving.
 */
const HIDDEN_PAGE = '[style*="display: none"]';

/** Entrances that have been on screen (so have played, or begun to). Never touches the DOM. */
const seen = new WeakSet<Element>();

function recordShown() {
  for (const el of document.querySelectorAll(`:is(${ENTRANCES}):not([data-entered])`)) {
    if (!el.closest(HIDDEN_PAGE)) seen.add(el);
  }
}

/** Marks every entrance that has been seen and now sits in a hidden page: a page that was left. */
function markLeft() {
  const left = Array.from(
    document.querySelectorAll(`${HIDDEN_PAGE} :is(${ENTRANCES}):not([data-entered])`),
  ).filter((el) => seen.has(el));
  for (const el of left) el.setAttribute("data-entered", "");
}

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
 * The mark is set once a page has been left (it is hidden), not when its
 * entrance ends. The CSS runs on the server HTML, so an entrance can end
 * before React has hydrated that part of the page (streamed sections, a slow
 * phone, dev mode), and an attribute added then made hydration fail
 * ("attributes of the server rendered HTML didn't match"). By the time a page
 * is left it has hydrated.
 *
 * Scroll reveals already behave this way (`data-revealed` sticks).
 */
export function EntrancesOnce() {
  const pathname = usePathname();

  // After each route commit, before paint: mark the page just left, and note
  // what is on screen now. Again a frame later, in case the old page was
  // hidden in a later commit than the one that changed the path.
  useLayoutEffect(() => {
    markLeft();
    recordShown();
    const frame = requestAnimationFrame(() => {
      markLeft();
      recordShown();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // Leaving: note what is on screen first (sections streamed in after the
  // last route commit were never recorded). Back/forward also marks right
  // away, before the router shows the cached page again.
  useEffect(() => {
    const onPopState = () => {
      recordShown();
      markLeft();
    };
    document.addEventListener("click", recordShown, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", recordShown, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
