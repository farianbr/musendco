import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { SplitWords } from "@/components/ui/SplitWords";
import { Magnetic } from "@/components/motion/Magnetic";

const smallButton =
  "pressable group/btn inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-meta font-semibold tracking-[0.04em] uppercase";

/**
 * Full-viewport hero (after wearestokt.com): a warm field that burns from the
 * canvas colour into brand orange, the Muse mark rendered as a solid 3D
 * object on the right (public/brand/muse-3d.webp), and a short statement on the left. Scroll cue and founding year sit
 * on the bottom edge.
 */
export function Hero() {
  const { eyebrow, headline, intro } = home.hero;
  const founded = Math.min(...projects.map((p) => p.year));

  return (
    <section aria-labelledby="hero-heading" className="hero-field relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden className="hero-grain" />

      <div
        aria-hidden
        className="enter-fade pointer-events-none absolute -right-[18%] bottom-[12%] -z-10 w-[88vw] opacity-55 sm:-right-[6%] sm:w-[64vw] lg:top-1/2 lg:right-[4%] lg:bottom-auto lg:w-[min(38vw,660px)] lg:-translate-y-[46%] lg:opacity-100"
        style={{ "--delay": "200ms" } as React.CSSProperties}
      >
        <Image
          src="/brand/muse-3d.webp"
          alt=""
          width={1680}
          height={1591}
          preload
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="hero-mark h-auto w-full"
        />
      </div>

      <div className="shell relative flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+2rem)] pb-28">
        <div className="max-w-[50rem]">
          <p
            className="enter-fade inline-flex items-center gap-2 font-mono text-mono text-fg-2 uppercase"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            [ {eyebrow} ]
            <ArrowRight aria-hidden strokeWidth={2} className="size-3.5" />
          </p>

          <h1
            id="hero-heading"
            className="enter-words mt-5 text-[clamp(2.5rem,1.2rem+4.4vw,5.75rem)] leading-[0.94] font-medium tracking-[-0.045em] uppercase"
          >
            <SplitWords parts={headline.lead} />
            <br />
            <SplitWords parts={headline.emphasis} offset={3} />
          </h1>

          <p
            className="enter-fade mt-6 max-w-[42ch] text-lead text-fg-2"
            style={{ "--delay": "480ms" } as React.CSSProperties}
          >
            {intro}
          </p>

          <div
            className="enter-fade mt-8 flex flex-wrap items-center gap-2.5"
            style={{ "--delay": "580ms" } as React.CSSProperties}
          >
            <Magnetic>
              <Link href="/services" className={`${smallButton} bg-fg text-bg hover:opacity-90`}>
                View projects
                <ArrowRight aria-hidden strokeWidth={2.25} className="size-3.5 transition-transform duration-(--dur) ease-out group-hover/btn:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link href="/contact" className={`${smallButton} bg-accent text-on-accent hover:brightness-110`}>
              Start a project
              <ArrowRight aria-hidden strokeWidth={2.25} className="size-3.5 transition-transform duration-(--dur) ease-out group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="enter-fade shell absolute inset-x-0 bottom-0 flex items-center justify-between pb-[clamp(1.25rem,0.75rem+1.5vw,2.25rem)] text-[0.9375rem] text-fg"
        style={{ "--delay": "700ms" } as React.CSSProperties}
      >
        <a href="#trusted-heading" className="group inline-flex min-h-11 items-center gap-1.5">
          Scroll for more
          <ArrowDown aria-hidden strokeWidth={2} className="size-4 transition-transform duration-(--dur) ease-out group-hover:translate-y-0.5" />
        </a>
        <p className="tabular">Est. in {founded}</p>
      </div>
    </section>
  );
}
