"use client";

import { useEffect } from "react";

/** Phones and tablets: no hover, or a finger as the main pointer. */
const TOUCH = "(hover: none), (pointer: coarse)";

/**
 * Turns page view transitions off on touch devices.
 *
 * Every route change that mounts a <ViewTransition> makes React call
 * document.startViewTransition, even when its class is "none" (the menu
 * navigations): the browser snapshots the old page, freezes rendering and
 * input while the new page commits, snapshots again, then animates. On a phone
 * that freeze is the heavy part of a navigation (the new page has to be laid
 * out and painted in full before anything moves), and a tap during it lands on
 * nothing, so pages felt laggy or stuck.
 *
 * React commits without a transition when startViewTransition throws, so on
 * touch devices it throws for React's calls. The theme toggle still gets its
 * circular wipe: it marks <html> with `theme-switching` before calling. Checked
 * at call time, so rotating a tablet or emulating a device follows along.
 */
export function TouchTransitions() {
  useEffect(() => {
    const native = Document.prototype.startViewTransition;
    if (typeof native !== "function") return;
    const media = window.matchMedia(TOUCH);
    const root = document.documentElement;

    document.startViewTransition = function (this: Document, ...args: Parameters<typeof native>) {
      if (media.matches && !root.classList.contains("theme-switching")) {
        throw new DOMException("View transitions are off on touch devices", "InvalidStateError");
      }
      return native.apply(this, args);
    } as typeof native;

    return () => {
      // Drops the own property, so the prototype's method is used again.
      delete (document as { startViewTransition?: unknown }).startViewTransition;
    };
  }, []);

  return null;
}
