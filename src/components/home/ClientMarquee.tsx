import { home } from "@/content/home";
import { clients } from "@/content/people";
import { ClientMark } from "@/components/ui/ClientMark";
import { cn } from "@/lib/cn";

/**
 * Three rows, each its own slice of the client list (the list order is
 * curated for this, see people.ts), so every brand appears in one row only and
 * the rows never show the same logos at once. Speed is per logo, so a row's
 * pace stays the same however many brands it holds.
 */
const ROWS = [
  { reverse: false, secondsPerLogo: 3.2 },
  { reverse: true, secondsPerLogo: 3.7 },
  { reverse: false, secondsPerLogo: 3.45 },
];

/** Stacked rows drift in opposite directions and fade out at both edges. */
export function ClientMarquee() {
  const rows = ROWS.map((row, i) => ({
    ...row,
    items: clients.slice(Math.round((i * clients.length) / ROWS.length), Math.round(((i + 1) * clients.length) / ROWS.length)),
  }));

  return (
    <section aria-labelledby="trusted-heading" className="shell pt-(--space-block)">
      <h2 id="trusted-heading" data-reveal="fade" className="text-center text-subheading font-medium">
        {home.trusted.heading}
      </h2>
      <ul className="sr-only">
        {clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>

      <div aria-hidden data-reveal="fade" className="marquee-fade mt-8 space-y-7 overflow-hidden md:mt-10">
        {rows.map((row, i) => (
          <div
            key={i}
            className={cn("marquee", row.reverse && "marquee-reverse")}
            style={{ "--marquee-duration": `${(row.items.length * row.secondsPerLogo).toFixed(1)}s` } as React.CSSProperties}
          >
            <div className="marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center gap-14 pr-14 md:gap-28 md:pr-28">
                  {row.items.map((client) => (
                    <ClientMark key={client.name} client={client} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
