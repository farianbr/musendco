import { ViewTransition } from "react";
import { RevealObserver } from "./RevealObserver";

/**
 * Wraps a page's content so route changes cross-fade with a soft lift and
 * blur (see `.page` in globals.css). Lives in each page, not the layout,
 * because layouts persist across navigations and never enter or exit.
 *
 * Navigations from the site menu carry the "menu" transition type and get no
 * page animation: the opaque menu panel already covers the swap and lifts onto
 * the new page (see MENU_NAV in SiteMenu).
 *
 * RevealObserver sits here (after the content) rather than in the root
 * layout: its effect then runs only once this page has hydrated, so the
 * `data-revealed` attributes it adds can never race hydration.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={{ menu: "none", default: "page" }} exit={{ menu: "none", default: "page" }} default="none">
      <div>
        {children}
        <RevealObserver />
      </div>
    </ViewTransition>
  );
}

/** Names a project image so it morphs between the card and the case study (not under the menu). */
export function ProjectMorph({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={`project-${slug}`} share={{ menu: "none", default: "morph" }} default="none">
      {children}
    </ViewTransition>
  );
}
