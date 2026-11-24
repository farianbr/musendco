import { Quote } from "lucide-react";
import { home } from "@/content/home";
import type { Testimonial } from "@/types/content";
import { SplitWords } from "@/components/ui/SplitWords";
import { cn } from "@/lib/cn";

type Tone = "orange" | "violet" | "plain";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/, "")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/** Two cards carry brand colour; everything else sits on the surface. */
function toneFor(index: number): Tone {
  if (index === 0) return "orange";
  if (index === 4) return "violet";
  return "plain";
}

function columns(items: Testimonial[], count: number) {
  const cols: { item: Testimonial; index: number }[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => cols[index % count].push({ item, index }));
  return cols;
}

/**
 * Testimonials as a living wall: columns of quote cards drift slowly up and
 * down in alternating directions, fading out at the top and bottom edges,
 * and pause while hovered so any card can be read. Phones get a swipeable
 * row instead. Under reduced motion the columns simply stand still.
 * Shared by Home and About.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const { eyebrow, lead, emphasis, intro } = home.testimonials;

  return (
    <section aria-labelledby="testimonials-heading" className="pb-(--space-section)">
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div>
          <p data-reveal="fade" className="font-mono text-mono text-muted uppercase">
            ( {eyebrow} )
          </p>
          <h2 id="testimonials-heading" data-reveal="words" className="mt-4 max-w-[18ch] text-title font-medium">
            <SplitWords parts={[{ text: lead }, { text: emphasis, em: true }]} />
          </h2>
        </div>
        <p data-reveal="fade" className="max-w-[38ch] text-lead text-fg-2">
          {intro}
        </p>
      </div>

      {/* Phones: one swipeable row. */}
      <ul className="mt-(--space-block) flex snap-x snap-mandatory scroll-px-(--gutter) gap-3 overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none] md:hidden">
        {items.map((item, index) => (
          <li key={item.id} className="w-[84vw] max-w-[22rem] shrink-0 snap-start">
            <Card item={item} tone={toneFor(index)} />
          </li>
        ))}
      </ul>

      {/* Tablet (two columns) and desktop (three). */}
      {[2, 3].map((count) => (
        <div
          key={count}
          data-reveal="fade"
          className={cn(
            "testimonial-wall shell mt-(--space-block) hidden gap-4",
            count === 2 ? "md:grid md:grid-cols-2 lg:hidden" : "lg:grid lg:grid-cols-3",
          )}
        >
          {columns(items, count).map((column, c) => (
            <div key={c} className="testimonial-col" data-reverse={c % 2 === 1 || undefined}>
              <div className="testimonial-track" style={{ "--wall-duration": `${46 + c * 8}s` } as React.CSSProperties}>
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1 || undefined} className="testimonial-copy flex flex-col gap-4 pb-4">
                    {column.map(({ item, index }) => (
                      <li key={item.id}>
                        <Card item={item} tone={toneFor(index)} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

function Card({ item, tone }: { item: Testimonial; tone: Tone }) {
  const coloured = tone !== "plain";

  return (
    <figure
      className={cn(
        "quote-card relative flex flex-col overflow-hidden rounded-card p-6 md:p-7",
        tone === "orange" && "bg-accent text-on-accent",
        tone === "violet" && "bg-brand-violet text-white",
        tone === "plain" && "border border-line bg-surface",
      )}
    >
      {coloured && <span aria-hidden className="quote-card__shine" />}
      <Quote
        aria-hidden
        strokeWidth={1.5}
        className={cn("relative size-7 -scale-x-100", coloured ? "opacity-60" : "text-accent-ink")}
      />
      <blockquote
        className={cn(
          "relative mt-4 font-medium tracking-[-0.02em]",
          coloured ? "text-[1.3125rem] leading-[1.3]" : "text-[1.0625rem] leading-[1.45]",
        )}
      >
        <p>{item.quote}</p>
      </blockquote>
      <figcaption
        className={cn(
          "relative mt-7 flex items-center gap-3 border-t pt-5",
          tone === "orange" ? "border-black/15" : tone === "violet" ? "border-white/20" : "border-line",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-meta font-semibold",
            tone === "orange" && "bg-on-accent text-accent",
            tone === "violet" && "bg-white text-brand-violet",
            tone === "plain" && "quote-avatar text-white",
          )}
        >
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-medium">{item.name}</span>
          <span className={cn("block font-mono text-mono uppercase", coloured ? "opacity-70" : "text-muted")}>
            {item.role}, {item.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
