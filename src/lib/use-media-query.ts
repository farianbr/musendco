"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Whether a media query matches, kept in sync as it changes.
 *
 * Hydration-safe: the server cannot know the viewport, so it renders with
 * `serverValue`, and React keeps that value while hydrating before switching
 * to the real one. On a client navigation the real value is used from the
 * first render, so nothing is built only to be thrown away.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Phones and tablets: no hover, or a finger as the main pointer. Matches TouchTransitions and the CSS. */
export const TOUCH_QUERY = "(hover: none), (pointer: coarse)";
