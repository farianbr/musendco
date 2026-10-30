"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectMorph } from "@/components/motion/PageTransition";

/**
 * Colour-blocked project cards in a sticky stack. Each card pins under the
 * header and eases back as the next one slides over it. Every image sits in the
 * same 3:2 frame, so all cards share one alignment. Small screens stack normally.
 */
export function WorkStack({ projects }: { projects: Project[] }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="space-y-4 lg:space-y-6">
        {projects.map((project, i) => (
          <StackCard key={project.slug} project={project} index={i} isLast={i === projects.length - 1} />
        ))}
      </div>
    </LazyMotion>
  );
}

function StackCard({ project, index, isLast }: { project: Project; index: number; isLast: boolean }) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // The card recedes over the screen of scrolling that follows its pinning.
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start 96px", "end 96px"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.95]);
  const { scrollYProgress: enter } = useScroll({ target: cardRef, offset: ["start end", "start 96px"] });
  const imageScale = useTransform(enter, [0, 1], [1.12, 1]);

  return (
    <div
      ref={cardRef}
      className="lg:sticky"
      style={{ top: `calc(var(--header-h) + 1rem + ${index * 10}px)` }}
    >
      <m.article
        style={reduce ? undefined : { scale }}
        className="group relative origin-top overflow-hidden rounded-card text-[#0c0c0e]"
        data-reveal="fade"
      >
        <div
          className="grid grid-cols-[minmax(0,1fr)] gap-5 p-3 md:p-4 lg:grid-cols-2 lg:gap-8"
          style={{ backgroundColor: project.tint ?? "var(--raised)" }}
        >
          <div className="flex flex-col p-3 md:p-4 lg:order-none lg:py-5 lg:pl-6">
            <p className="text-[0.9375rem] font-medium italic">
              {project.discipline}
              {project.kind && ` / ${project.kind}`}
            </p>
            <h3 className="mt-2.5 text-heading font-medium">{project.title}</h3>
            <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-black/70">{project.tagline}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 lg:mt-auto lg:pt-6">
              <div>
                <dt className="text-meta text-black/60">Scope</dt>
                <dd className="mt-1 text-[0.9375rem] font-medium">{project.discipline}</dd>
              </div>
              <div>
                <dt className="text-meta text-black/60">Year</dt>
                <dd className="mt-1 text-[0.9375rem] font-medium tabular">{project.year}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-3 rounded-[14px] bg-white p-2.5 pr-4">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image src={project.portrait.src} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <Link
                  href={`/work/${project.slug}`}
                  prefetch
                  className="block truncate text-[0.875rem] font-medium after:absolute after:inset-0 after:z-10 after:content-['']"
                >
                  View case study
                </Link>
                <span className="block truncate text-meta text-black/60">{project.title}</span>
              </span>
              <ArrowRight
                aria-hidden
                strokeWidth={1.75}
                className="size-4 shrink-0 transition-transform duration-(--dur) ease-out group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </div>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-[calc(var(--radius-card)-6px)] bg-black/10">
            <ProjectMorph slug={project.slug}>
              <div className="absolute inset-0">
                <m.div className="absolute inset-0" style={reduce ? undefined : { scale: imageScale }}>
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="media-zoom object-cover"
                  />
                </m.div>
              </div>
            </ProjectMorph>
          </div>
        </div>
      </m.article>
    </div>
  );
}
