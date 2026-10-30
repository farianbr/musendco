"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domMax, m, useReducedMotion } from "motion/react";
import type { Discipline, Project } from "@/types/content";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | Discipline;

/**
 * Filterable project grid. The selected filter is marked by a pill that
 * springs between options; cards that stay re-flow with layout animation,
 * cards that leave shrink away quickly, and new ones settle in.
 */
export function WorkGrid({ projects, disciplines }: { projects: Project[]; disciplines: Discipline[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const filters: Filter[] = ["All", ...disciplines];
  const visible = filter === "All" ? projects : projects.filter((p) => p.discipline === filter);

  return (
    <LazyMotion features={domMax} strict>
      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="-mx-1 flex gap-1 overflow-x-auto pb-2 [scrollbar-width:none]"
      >
        {filters.map((option) => {
          const selected = option === filter;
          const count = option === "All" ? projects.length : projects.filter((p) => p.discipline === option).length;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(option)}
              className={cn(
                "pressable relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-meta font-medium",
                selected ? "text-on-accent" : "text-fg-2 hover:text-fg",
              )}
            >
              {selected && (
                <m.span
                  layoutId="work-filter"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                />
              )}
              <span className="relative">{option}</span>
              <span className={cn("relative font-mono text-mono", selected ? "opacity-70" : "text-muted")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <m.ul layout className="mt-8 grid gap-x-(--grid-gap) gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <m.li
              key={project.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: reduce ? 0 : (i % 3) * 0.05 }}
            >
              <ProjectCard project={project} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </LazyMotion>
  );
}
