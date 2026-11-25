import Link from "next/link";
import { clients } from "@/content/people";
import { disciplines, projects } from "@/content/projects";
import { site } from "@/content/site";
import { MuseMark } from "@/components/ui/Brand";
import { getRecord } from "@/lib/record";
import { Globe } from "./Globe";

/**
 * About bento (after wearestokt.com): three stat tiles, the studio mark, and
 * the "Based in" tile with the interactive globe. Shared by Home and About.
 */
export async function AboutBento({ stats: showStats = true }: { stats?: boolean }) {
  const { firstYear, yearsOnRecord } = await getRecord();
  const stats = [
    { label: "Projects", value: String(projects.length).padStart(2, "0"), note: "Curated, not counted" },
    { label: "Services", value: String(disciplines.length).padStart(2, "0"), note: "One team across all of them" },
    { label: "Clients", value: `${clients.length}+`, note: "Global names to start-ups" },
  ];

  return (
    <div data-reveal="stagger" className="grid gap-3 md:grid-cols-12 md:gap-4 lg:h-[34rem]">
      {showStats && (
      <ul className="grid grid-cols-3 gap-3 md:col-span-12 md:gap-4 lg:col-span-3 lg:grid-cols-1">
        {stats.map((stat) => (
          <li
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-card border border-line bg-surface px-3 py-6 text-center"
          >
            <p className="text-[clamp(2rem,1.6rem+1.6vw,3rem)] leading-none font-medium tracking-[-0.05em] tabular">
              {stat.value}
            </p>
            <h3 className="mt-2 text-meta text-fg-2">{stat.label}</h3>
            <p className="mt-0.5 hidden text-mono text-muted sm:block">{stat.note}</p>
          </li>
        ))}
      </ul>
      )}

      <div className={`relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-card border border-line bg-surface p-6 md:col-span-5 ${showStats ? "lg:col-span-4" : "lg:col-span-5"}`}>
        <span aria-hidden className="absolute top-[14%] left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand-orange/30 blur-[70px]" />
        <span aria-hidden className="absolute top-[30%] left-[24%] size-40 rounded-full bg-brand-purple/30 blur-[60px]" />
        <MuseMark className="absolute top-[16%] left-1/2 w-[46%] -translate-x-1/2 drop-shadow-[0_24px_40px_rgb(255_89_49/0.45)]" />
        <div className="relative">
          <p className="text-[0.9375rem] font-medium">{site.legalName}</p>
          <p className="mt-0.5 text-meta text-fg-2">
            Publishing work since {firstYear}. {yearsOnRecord} years on record.
          </p>
          <Link href="/services" className="footer-link mt-2 inline-flex min-h-8 items-center text-meta font-medium">
            See the work
          </Link>
        </div>
      </div>

      <div className={`globe-tile relative min-h-[24rem] overflow-hidden rounded-card border border-line bg-surface md:col-span-7 ${showStats ? "lg:col-span-5" : "lg:col-span-7"}`}>
        <div className="pointer-events-none relative z-10 pt-8 text-center">
          <h3 className="text-subheading font-medium">Based in {site.location}</h3>
          <p className="mt-2 inline-flex items-center gap-2.5 font-mono text-mono text-fg-2 uppercase">
            <span aria-hidden className="pulse-dot" />
            {site.availability}
          </p>
        </div>
        <div className="absolute top-[30%] left-1/2 w-[132%] max-w-[48rem] -translate-x-1/2">
          <Globe location={site.coordinates} />
        </div>
      </div>
    </div>
  );
}
