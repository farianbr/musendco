import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProject, getRelatedProjects, projects } from "@/content/projects";
import { CaseStudyBlocks } from "@/components/work/CaseStudyBlocks";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PageTransition, ProjectMorph } from "@/components/motion/PageTransition";
import { SplitWords } from "@/components/ui/SplitWords";
import { ButtonArrow, buttonClasses } from "@/components/ui/ButtonLink";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Allowed to block on navigation instead of streaming a skeleton: the shared
 * image morph only plays when the destination renders in the same commit.
 * Every case study is prerendered and project links prefetch it, so in
 * production the wait is a cache read.
 */
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const path = `/work/${project.slug}`;
  return {
    title: `${project.title}, ${project.discipline}`,
    description: project.tagline,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }],
    },
  };
}

/** Everything below the hero shares this width, so edges line up down the page. */
const column = "mx-auto w-full max-w-[1040px] px-(--gutter)";

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);
  const coverRatio = project.cover.width / project.cover.height;
  const about = project.blocks.flatMap((block) => (block.type === "text" ? block.body : []));
  const gallery = project.blocks.filter((block) => block.type !== "text");

  const facts = [
    { label: "Discipline", value: project.discipline },
    { label: "Year", value: String(project.year) },
    project.client && { label: "Client", value: project.client },
    project.kind && !project.client && { label: "Type", value: project.kind },
    project.tools?.length && {
      label: project.discipline === "Websites" ? "Stack" : "Tools",
      value: project.tools.join(", "),
    },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  const links = [
    ...(project.links ?? []),
    ...(project.behanceUrl ? [{ label: "View on Behance", href: project.behanceUrl }] : []),
  ];

  return (
    <PageTransition>
      <article>
        <header className="rounded-b-[32px] bg-surface pt-[calc(var(--header-h)+clamp(1rem,0.5rem+2vw,2.25rem))] pb-[clamp(7rem,4rem+14vw,15rem)] text-center">
          <div className={column}>
            <nav aria-label="Breadcrumb" className="enter-fade" style={{ "--delay": "0ms" } as React.CSSProperties}>
              <ol className="inline-flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-mono">
                <li>
                  <Link href="/" className="text-muted hover:text-fg">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight strokeWidth={2} className="size-3 text-muted" />
                </li>
                <li>
                  <Link href="/work" className="text-muted hover:text-fg">
                    Work
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight strokeWidth={2} className="size-3 text-muted" />
                </li>
                <li aria-current="page">Project details</li>
              </ol>
            </nav>

            <h1 className="enter-words mx-auto mt-5 max-w-[24ch] text-title font-medium">
              <SplitWords parts={project.title} />
            </h1>

            <dl
              className="enter-fade mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-5 md:gap-x-16"
              style={{ "--delay": "300ms" } as React.CSSProperties}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="max-w-[16rem]">
                  <dt className="text-meta text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-[1.0625rem] leading-snug font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* The cover overlaps the hero. Wide covers fill the frame; upright ones sit whole on a surface. */}
        <div className={`${column} -mt-[clamp(5.5rem,3rem+11vw,12.5rem)]`}>
          <ProjectMorph slug={project.slug}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-raised shadow-2xl">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                preload
                sizes="(min-width: 1088px) 1040px, 100vw"
                className={coverRatio >= 1.25 ? "object-cover" : "object-contain p-4 md:p-6"}
              />
            </div>
          </ProjectMorph>
        </div>

        <section aria-labelledby="description-heading" className={`${column} pt-(--space-section) text-center`}>
          <h2 id="description-heading" data-reveal="words" className="text-title font-medium">
            <SplitWords parts={[{ text: "Project", em: true }, { text: "description" }]} />
          </h2>
          <div data-reveal="stagger" className="mx-auto mt-5 max-w-[46rem] space-y-4">
            <p className="text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-[1.45] tracking-[-0.012em]">{project.tagline}</p>
            {about.map((paragraph) => (
              <p key={paragraph} className="text-lead text-fg-2">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {gallery.length > 0 && (
          <div className={`${column} pt-(--space-block)`}>
            <CaseStudyBlocks blocks={gallery} />
          </div>
        )}

        <section aria-label="Project links and credits" className={`${column} pt-(--space-block) text-center`} data-reveal="fade">
          {links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ variant: i === 0 ? "primary" : "secondary" })}
                >
                  {link.label}
                  <ButtonArrow />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}
          <p className="mt-5 text-meta text-muted">
            {project.credits.map((credit) => `${credit.role} by ${credit.name}`).join(" / ")}
          </p>
        </section>
      </article>

      <section aria-labelledby="related-heading" className="shell pt-(--space-section)">
        <h2 id="related-heading" data-reveal="words" className="text-center text-title font-medium">
          <SplitWords parts={[{ text: "Related", em: true }, { text: "projects" }]} />
        </h2>
        <ul data-reveal="stagger" className="mt-(--space-block) grid gap-x-(--grid-gap) gap-y-10 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <ProjectCard project={item} as="h3" />
            </li>
          ))}
        </ul>
      </section>

      <ClosingCta />
    </PageTransition>
  );
}
