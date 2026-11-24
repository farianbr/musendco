"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Hydration-safe stand-in for Motion's `useReducedMotion`.
 *
 * Motion's hook reads the media query on the client's first render, but the
 * server cannot know the preference, so components that render differently
 * under reduced motion (styles, counters) mismatched the server HTML for those
 * visitors (React error #418). Here the server snapshot is `false` and React
 * uses it during hydration, then re-renders with the real value.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
