import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";

/**
 * A row of equal-height frames sharing one baseline. On large screens the
 * hovered or focused frame widens and shows its caption (CSS in globals.css);
 * on small screens the row becomes a horizontal snap scroller.
 */
export function HeroReel({ projects }: { projects: Project[] }) {
  return (
    <ul className="gallery -mx-(--gutter) flex h-[clamp(20rem,44dvh,30rem)] snap-x snap-mandatory scroll-px-(--gutter) gap-2 overflow-x-auto px-(--gutter) [scrollbar-width:none] md:gap-3 lg:mx-0 lg:overflow-visible lg:px-0">
      {projects.map((project, i) => (
        <li
          key={project.slug}
          className="enter-clip gallery-frame"
          style={{ "--delay": `${200 + i * 90}ms` } as React.CSSProperties}
        >
          <Link
            href={`/work/${project.slug}`}
            prefetch
            aria-label={`${project.title}, ${project.discipline}. View case study`}
            className="group relative block h-full overflow-hidden rounded-media bg-surface"
          >
            <Image
              src={project.portrait.src}
              alt={project.portrait.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 68vw"
              preload={i === 0}
              className="media-zoom scale-[1.03] object-cover"
            />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="gallery-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 whitespace-nowrap text-white md:p-5">
              <span className="min-w-0">
                <span className="block truncate text-[0.9375rem] font-medium">{project.title}</span>
                <span className="block text-mono text-white/70">{project.discipline}</span>
              </span>
              <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
