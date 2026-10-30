import { home } from "@/content/home";
import { clients } from "@/content/people";
import { disciplines, projects } from "@/content/projects";
import { ClientMark } from "@/components/ui/ClientMark";
import { SplitWords } from "@/components/ui/SplitWords";
import { GrowthChart, RollingNumber } from "./StatsMotion";

/** Everything here is derived from the content files, so it cannot drift from the site. */
function getStats() {
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => a - b);
  let total = 0;
  const growth = years.map((year) => {
    total += projects.filter((p) => p.year === year).length;
    return { year, total };
  });
  return { years, growth };
}

function Card({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <li className={`relative flex flex-col overflow-hidden rounded-card border border-line-strong bg-bg p-6 md:p-8 ${className}`}>
      <span aria-hidden className="stat-grid absolute inset-0" />
      <div className="relative flex flex-1 flex-col">{children}</div>
    </li>
  );
}

function Figure({ plain, accent }: { plain: string; accent?: string }) {
  return (
    <p className="text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-medium tracking-[-0.04em] tabular">
      {plain}
      {accent && <span className="text-accent">{accent}</span>}
    </p>
  );
}

function Label({ plain, accent }: { plain: string; accent: string }) {
  return (
    <h3 className="mt-5 text-subheading font-medium">
      {plain} <span className="text-accent">{accent}</span>
    </h3>
  );
}

export function Stats() {
  const { years, growth } = getStats();

  return (
    <section aria-labelledby="stats-heading" className="shell pt-(--space-section)">
      <div className="mx-auto max-w-[62ch] text-center">
        <p data-reveal="fade" className="font-mono text-mono text-muted uppercase">
          {home.stats.eyebrow}
        </p>
        <h2 id="stats-heading" data-reveal="words" className="mt-3 text-title font-medium">
          <SplitWords parts="Results" />
          <span className="text-accent">
            <SplitWords parts="that matter." offset={1} />
          </span>
        </h2>
        <p data-reveal="fade" className="mt-4 text-lead text-fg-2">
          {home.stats.intro}
        </p>
      </div>

      <ul data-reveal="stagger" className="mt-(--space-block) grid gap-4 md:grid-cols-8 lg:gap-6">
        <Card className="md:col-span-5">
          <Figure plain={String(projects.length)} />
          <Label plain="Projects" accent="published" />
          <p className="mt-2 max-w-[44ch] text-[0.9375rem] text-fg-2">
            A running total of the work on this site, from brand systems to full web products.
          </p>
          <div className="mt-auto pt-6">
            <GrowthChart points={growth} />
          </div>
        </Card>

        <Card className="md:col-span-3">
          <Figure plain={String(years.length)} accent=" yrs" />
          <Label plain="Years" accent="on record" />
          <p className="mt-2 text-[0.9375rem] text-fg-2">
            Published every year.
            <br />
            Still going.
          </p>
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-center gap-2 rounded-media bg-raised px-4 py-5">
              <span className="text-meta text-muted">since</span>
              <RollingNumber value={String(years[0])} />
            </div>
          </div>
        </Card>

        <Card className="md:col-span-3">
          <Figure plain={String(disciplines.length).padStart(2, "0")} />
          <Label plain="Core" accent="disciplines" />
          <p className="mt-2 text-[0.9375rem] text-fg-2">One team, so nothing gets lost between them.</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {disciplines.map((discipline) => (
              <li key={discipline} className="rounded-full bg-raised px-3 py-1.5 text-mono text-fg-2">
                {discipline}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="md:col-span-5">
          <Figure plain={String(clients.length).padStart(2, "0")} />
          <Label plain="Named" accent="clients" />
          <p className="mt-2 max-w-[44ch] text-[0.9375rem] text-fg-2">
            Packaging, stationery, campaigns and a full order platform for businesses in two countries.
          </p>
          <div aria-hidden className="marquee marquee-fade mt-auto overflow-hidden pt-8">
            <div className="marquee-track flex w-max" style={{ "--marquee-duration": "32s" } as React.CSSProperties}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-12 pr-12 text-fg-2">
                  {clients.map((client) => (
                    <ClientMark key={client.name} client={client} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </ul>
    </section>
  );
}
