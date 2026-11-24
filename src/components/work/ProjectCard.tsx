import Link from "next/link";
import type { Project } from "@/types/content";
import { ProjectMorph } from "@/components/motion/PageTransition";
import { cn } from "@/lib/cn";
import { FitImage } from "@/components/ui/FitImage";

type Size = "half" | "full" | "compact";

const frame: Record<Size, string> = {
  half: "aspect-[4/3] md:aspect-[16/11]",
  full: "aspect-[4/3] md:aspect-[2/1]",
  compact: "aspect-[4/3]",
};

const sizes: Record<Size, string> = {
  half: "(min-width: 768px) 50vw, 100vw",
  full: "(min-width: 1288px) 1240px, 100vw",
  compact: "(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw",
};

/**
 * Project card. On pointer devices the image sinks into a dark blur on hover
 * and the title, tags and tagline rise through it (after auxinlab.com/work).
 * Touch devices get the same details as a caption under the frame instead.
 */
export function ProjectCard({
  project,
  as: Heading = "h2",
  size = "compact",
}: {
  project: Project;
  as?: "h2" | "h3";
  size?: Size;
}) {
  const tags = [project.discipline, project.client ?? project.kind].filter(Boolean) as string[];

  return (
    <Link href={`/services/${project.slug}`} prefetch className="pcard group block rounded-[28px]">
      <Heading className="sr-only">{project.title}</Heading>
      <ProjectMorph slug={project.slug}>
        <div
          className={cn(
            "relative isolate overflow-hidden bg-surface",
            size === "compact" ? "rounded-[22px]" : "rounded-[28px] md:rounded-[36px]",
            frame[size],
          )}
        >
          <FitImage image={project.cover} sizes={sizes[size]} className="pcard-media" />
          <span aria-hidden className="pcard-shade absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

          <div
            aria-hidden
            className={cn(
              "pcard-info absolute inset-x-0 bottom-0 text-white",
              size === "compact" ? "p-5" : "p-6 md:p-9 lg:p-10",
            )}
          >
            <p
              className={cn(
                "font-medium tracking-[-0.04em]",
                size === "compact" ? "text-subheading" : "text-[clamp(1.75rem,1.2rem+2vw,3.25rem)] leading-[1.02]",
              )}
            >
              {project.title}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white/18 px-3.5 py-1.5 text-meta font-medium backdrop-blur-md">
                  {tag}
                </li>
              ))}
              <li className="rounded-full bg-white/18 px-3.5 py-1.5 text-meta font-medium tabular backdrop-blur-md">
                {project.year}
              </li>
            </ul>
            <span aria-hidden className="mt-5 block h-px w-full bg-white/25" />
            <p
              className={cn(
                "mt-4 line-clamp-2 text-white/80",
                size === "compact" ? "text-meta" : "max-w-[60ch] text-[0.9375rem]",
              )}
            >
              {project.tagline}
            </p>
          </div>
        </div>
      </ProjectMorph>

      <div aria-hidden className="pcard-caption mt-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="min-w-0 text-[1.0625rem] leading-snug font-medium">{project.title}</p>
          <p className="shrink-0 font-mono text-mono text-muted tabular">{project.year}</p>
        </div>
        <p className="mt-1 text-meta text-muted">{tags.join(" / ")}</p>
      </div>
    </Link>
  );
}
