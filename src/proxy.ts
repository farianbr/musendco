import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

const knownSlugs = new Set(projects.map((project) => project.slug));

/**
 * Case-study routes stream a static shell before `notFound()` can run, which
 * would answer unknown slugs with a 200. Checking here first lets unknown
 * project URLs return a real 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_unknown-project", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/work/:slug",
};
