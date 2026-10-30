import { ViewTransition } from "react";
import { RevealObserver } from "./RevealObserver";

/**
 * Wraps a page's content so route changes cross-fade with a soft lift and
 * blur (see `.page` in globals.css). Lives in each page, not the layout,
 * because layouts persist across navigations and never enter or exit.
 *
 * RevealObserver sits here (after the content) rather than in the root
 * layout: its effect then runs only once this page has hydrated, so the
 * `data-revealed` attributes it adds can never race hydration.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>
        {children}
        <RevealObserver />
      </div>
    </ViewTransition>
  );
}

/** Names a project image so it morphs between the card and the case study. */
export function ProjectMorph({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={`project-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
