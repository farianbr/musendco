import { home } from "@/content/home";
import { clients } from "@/content/people";
import { ClientMark } from "@/components/ui/ClientMark";
import { cn } from "@/lib/cn";

const ROWS = [
  { start: 0, reverse: false, duration: "46s" },
  { start: 3, reverse: true, duration: "54s" },
  { start: 5, reverse: false, duration: "50s" },
];

/** Stacked rows drift in opposite directions and fade out at both edges. */
export function ClientMarquee() {
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
        {ROWS.map((row) => {
          const ordered = [...clients.slice(row.start), ...clients.slice(0, row.start)];
          return (
            <div
              key={row.start}
              className={cn("marquee", row.reverse && "marquee-reverse")}
              style={{ "--marquee-duration": row.duration } as React.CSSProperties}
            >
              <div className="marquee-track flex w-max">
                {[0, 1, 2, 3].map((copy) => (
                  <div key={copy} className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20">
                    {ordered.map((client) => (
                      <span key={client.name} className="text-muted transition-colors duration-(--dur) hover:text-fg">
                        <ClientMark client={client} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
