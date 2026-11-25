"use client";

import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Mounts its children only while a media query matches. For parts of a page
 * that CSS would hide anyway at other sizes: hidden with `display: none` they
 * still cost DOM nodes, hydration and commit time on every visit.
 *
 * The server renders them (`serverValue`, default true) so wide screens get
 * them in the HTML; where the query does not match they are dropped after
 * hydration, and on client navigations they are never built at all.
 */
export function MediaGate({
  query,
  serverValue = true,
  children,
}: {
  query: string;
  serverValue?: boolean;
  children: React.ReactNode;
}) {
  return useMediaQuery(query, serverValue) ? children : null;
}
