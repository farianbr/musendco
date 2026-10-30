import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";
import { ProjectMorph } from "@/components/motion/PageTransition";

/** Grid card: one 4:3 frame, title and year on a line, discipline below. */
export function ProjectCard({ project, as: Heading = "h2" }: { project: Project; as?: "h2" | "h3" }) {
  return (
    <Link href={`/work/${project.slug}`} prefetch className="group block">
      <ProjectMorph slug={project.slug}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-surface">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
            className="media-zoom object-cover"
          />
        </div>
      </ProjectMorph>
      <div className="mt-3.5 flex items-baseline justify-between gap-4">
        <Heading className="min-w-0 text-[1.0625rem] leading-snug font-medium">
          <span className="link-underline">{project.title}</span>
        </Heading>
        <p className="shrink-0 font-mono text-mono text-muted tabular">{project.year}</p>
      </div>
      <p className="mt-1 text-meta text-muted">
        {project.discipline}
        {project.kind && ` / ${project.kind}`}
      </p>
    </Link>
  );
}
