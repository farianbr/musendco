"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "done";

/** A navigation faster than this shows nothing, so quick ones never flash a bar. */
const SHOW_AFTER = 120;
/** Give up on a navigation that never lands (offline, aborted). */
const GIVE_UP = 10_000;

/**
 * Thin accent bar across the top while a page is on its way (see
 * `.nav-progress` in globals.css). Without it a tap on a link (say "Start a
 * project") left the old page sitting still until the next one appeared, which
 * read as nothing happening.
 *
 * Starts on any click on an internal link to another page and finishes when
 * the pathname changes. Same-page links (hash or query only) are instant and
 * skipped. Also marks back/forward navigations on <html> (data-nav="history")
 * so page view transitions stay off for them.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    const root = document.documentElement;

    // Capture phase: Next's <Link> calls preventDefault on its own click.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      delete root.dataset.nav;
      clearTimers();
      const from = window.location.pathname;
      // Timers can fire late on a busy phone, after the page already landed:
      // only show (or give up) while we are still on the page we left from.
      const stillLeaving = () => window.location.pathname === from;
      later(() => stillLeaving() && setState("loading"), SHOW_AFTER);
      later(() => stillLeaving() && setState("done"), GIVE_UP);
    };

    const onPopState = () => {
      root.dataset.nav = "history";
      // Kept until the transition has been set up, then cleared so the next
      // link click animates again (a click clears it straight away too).
      window.setTimeout(() => {
        if (root.dataset.nav === "history") delete root.dataset.nav;
      }, 1500);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      clearTimers();
    };
  }, []);

  // The new page has committed: cancel a bar that has not shown yet (and the
  // give-up timer), and finish one that has. After the commit, not during the
  // render: a show timer firing in the same instant as the commit otherwise
  // slipped in after the check and left the bar crawling on the new page.
  // (Any timer firing later finds the URL changed and does nothing.)
  const landedPath = useRef(pathname);
  useEffect(() => {
    if (landedPath.current === pathname) return;
    landedPath.current = pathname;
    clearTimers();
    setState((current) => (current === "idle" ? "idle" : "done"));
  }, [pathname]);

  // Let the finish (fill + fade) play, then reset for the next navigation.
  useEffect(() => {
    if (state !== "done") return;
    const id = window.setTimeout(() => setState("idle"), 450);
    return () => window.clearTimeout(id);
  }, [state]);

  return <div aria-hidden className="nav-progress" data-state={state} />;
}
