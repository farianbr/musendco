import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/about", "/contact"].map((path) => ({
    url: absoluteUrl(path),
  }));
  const caseStudies = projects.map((project) => ({ url: absoluteUrl(`/services/${project.slug}`) }));
  return [...pages, ...caseStudies];
}
