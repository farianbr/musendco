import { Quote } from "lucide-react";
import { home } from "@/content/home";
import type { Testimonial } from "@/types/content";
import { SplitWords } from "@/components/ui/SplitWords";
import { cn } from "@/lib/cn";
import { MediaGate } from "@/components/ui/MediaGate";
import { TestimonialWall } from "./TestimonialWall";

/** How far each plaque hangs off true, cycled through the wall. */
const TILTS = [-1.1, 0.7, -0.4, 1, -0.8, 0.45];

type Placed = { item: Testimonial; index: number; featured: boolean };

/**
 * Deals the quotes into columns. Every third plaque on a diagonal is
 * featured (larger type), so each column gets its share of big ones.
 */
function columns(items: Testimonial[], count: number) {
  const cols: Placed[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => {
    const col = index % count;
    const row = Math.floor(index / count);
    cols[col].push({ item, index, featured: (row + col) % 3 === 0 });
  });
  return cols;
}

/**
 * Testimonials as a wall of fame: plaques of praise hung slightly off true on
 * a dotted wall, drifting slowly up and down in alternating columns and
 * fading out at the top and bottom edges. Hover straightens a plaque and
 * slows the wall to a stop; a mouse can grab and throw it (TestimonialWall).
 * Phones get a swipeable row instead. Under reduced motion the columns stand
 * still. Shared by Home and About.
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
      <ul className="mt-(--space-block) flex snap-x snap-mandatory scroll-px-(--gutter) gap-3 overflow-x-auto px-(--gutter) py-3 [scrollbar-width:none] md:hidden">
        {items.map((item, index) => (
          <li key={item.id} className="w-[84vw] max-w-[22rem] shrink-0 snap-start">
            <Card item={item} index={index} featured={index % 3 === 0} />
          </li>
        ))}
      </ul>

      {/* Tablet (two columns) and desktop (three). Not built on phones: the
          walls hold four more copies of every quote, ~700 DOM nodes that a
          phone only ever hid. */}
      <MediaGate query="(min-width: 768px)">
      {[2, 3].map((count) => (
        <TestimonialWall
          key={count}
          className={cn(
            "testimonial-wall shell mt-(--space-block) hidden gap-5",
            count === 2 ? "md:grid md:grid-cols-2 lg:hidden" : "lg:grid lg:grid-cols-3",
          )}
        >
          {columns(items, count).map((column, c) => (
            <div key={c} className="testimonial-col">
              <div data-wall-track data-reverse={c % 2 === 1 || undefined} data-duration={46 + c * 8} className="testimonial-track">
                {[0, 1].map((copy) => (
                  <ul key={copy} aria-hidden={copy === 1 || undefined} className="testimonial-copy flex flex-col gap-5 px-1.5 pb-5">
                    {column.map(({ item, index, featured }) => (
                      <li key={item.id}>
                        <Card item={item} index={index} featured={featured} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </TestimonialWall>
      ))}
      </MediaGate>
    </section>
  );
}

function Card({ item, index, featured }: { item: Testimonial; index: number; featured: boolean }) {
  return (
    <figure
      className="quote-card flex flex-col rounded-card border border-line bg-surface p-6 md:p-7"
      style={{ "--tilt": `${TILTS[index % TILTS.length]}deg` } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-mono text-accent-ink uppercase">{item.company}</span>
        <Quote aria-hidden strokeWidth={1.5} className="size-6 shrink-0 -scale-x-100 text-accent-ink" />
      </div>
      <blockquote
        className={cn(
          "mt-5 font-medium",
          featured ? "text-[1.375rem] leading-[1.28] tracking-[-0.03em]" : "text-[1.0625rem] leading-[1.45] tracking-[-0.02em]",
        )}
      >
        <p>{item.quote}</p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        <span aria-hidden className="h-px w-6 shrink-0 bg-accent" />
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-medium">{item.name}</span>
          <span className="block text-meta text-muted">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
