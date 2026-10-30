"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { services } from "@/content/services";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The header element: focus stays inside it while the menu is open. */
  containerRef: React.RefObject<HTMLElement | null>;
};

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_POWER3 = [0.215, 0.61, 0.355, 1] as const;
const EASE_DROP = [0.5, 0, 0.1, 1] as const;

/** Scattered covers around the lead card's title. Offsets are percentages of the card. */
const COLLAGE = [
  { slug: "packaging-design", left: 3, top: 6, turn: -6 },
  { slug: "cripto-digital-logo", left: 29, top: -5, turn: 4 },
  { slug: "brochure-illustration", left: 55, top: -3, turn: -3 },
  { slug: "digital-detox-campaign", left: 78, top: 8, turn: 7 },
  { slug: "magazine-layout", left: 4, top: 66, turn: 5 },
  { slug: "photography", left: 29, top: 78, turn: -4 },
  { slug: "carclinic-stationery", left: 55, top: 76, turn: 5 },
  { slug: "taka-banknote-redesign", left: 78, top: 62, turn: -6 },
];

const posterProject = getProject("cities-of-bangladesh");
const clientProject = getProject("merqetia");

/**
 * Centre pill that opens a full-screen panel. Timings were measured from the
 * reference menu frame by frame: the panel drops in from above while rotating
 * flat in 3D, cards rise from below 200ms apart, links settle out of a slight
 * zoom 90ms apart, and the divider draws from the left. Closing lifts the whole
 * panel out of the top while it shrinks slightly. Rendered inside the Header's
 * LazyMotion boundary.
 */
export function SiteMenu({ open, onOpenChange, containerRef }: Props) {
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    const root = document.documentElement;
    const outside = [document.getElementById("main"), document.getElementById("site-footer")];

    root.style.overflow = "hidden";
    outside.forEach((el) => el?.setAttribute("inert", ""));
    container?.querySelector<HTMLElement>("[data-menu-panel] [data-menu-first]")?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      outside.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange, containerRef]);

  const close = () => onOpenChange(false);

  const card = (index: number) => {
    if (reduce) return {};
    const delay = 0.05 + index * 0.2;
    return {
      initial: { y: 900, rotateX: -5.7 },
      animate: { y: 0, rotateX: 0 },
      transition: {
        y: { duration: 0.7, ease: EASE_EXPO, delay },
        rotateX: { duration: 1.2, ease: EASE_EXPO, delay },
      },
    };
  };

  const settle = (delay: number, from: Record<string, number>) =>
    reduce
      ? {}
      : {
          initial: from,
          animate: { x: 0, y: 0, scale: 1, opacity: 1 },
          transition: { duration: 0.85, ease: EASE_POWER3, delay },
        };

  const explore = [{ label: "Home", href: "/" }, ...navigation];

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            id={panelId}
            data-menu-panel
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="menu-surface fixed inset-2 text-fg"
            exit={reduce ? { opacity: 0, transition: { duration: 0.15 } } : { y: "-100%", scale: 0.95, transition: { duration: 0.5, ease: EASE_POWER3 } }}
          >
            {/* The white sheet moves on its own; the content does not ride on it. */}
            <div aria-hidden className="absolute inset-0 [perspective:1000px]">
              <m.div
                className="h-full origin-bottom rounded-[32px] bg-bg [backface-visibility:hidden]"
                initial={reduce ? { opacity: 0 } : { y: "-152%", rotateX: 8.6 }}
                animate={reduce ? { opacity: 1 } : { y: "0%", rotateX: 0 }}
                transition={
                  reduce
                    ? { duration: 0.15 }
                    : {
                        y: { duration: 0.42, ease: EASE_DROP, delay: 0.05 },
                        rotateX: { duration: 1, ease: EASE_EXPO, delay: 0.05 },
                      }
                }
              />
            </div>

            <m.div {...settle(0.3, { opacity: 0 })} className="absolute top-4 right-4 z-10 lg:top-6 lg:right-6">
              <ThemeToggle />
            </m.div>

            <div className="relative h-full overflow-y-auto rounded-[32px] [scrollbar-width:none] max-lg:[mask-image:linear-gradient(transparent_3rem,black_5rem)]">
              <div className="flex min-h-full flex-col gap-8 px-4 pt-20 pb-5 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:px-5 lg:pt-[99px] lg:pb-0">
                {/* Promo cards. Last on small screens. */}
                <div className="order-3 grid grid-cols-2 grid-rows-[minmax(13rem,1fr)_minmax(11rem,1fr)] gap-3.5 [perspective:1000px] lg:order-none lg:col-span-5 lg:h-[calc(100dvh-144px)] lg:min-h-[28rem]">
                  <m.div {...card(0)} className="col-span-2 min-h-0">
                    <Link
                      href="/work"
                      onClick={close}
                      className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#0c0c0e] p-5 text-center text-white"
                    >
                      {COLLAGE.map((tile) => {
                        const cover = getProject(tile.slug)?.cover.src;
                        if (!cover) return null;
                        return (
                          <span
                            key={tile.slug}
                            aria-hidden
                            className="absolute aspect-[4/3] w-[24%] overflow-hidden rounded-lg shadow-xl transition-transform duration-[900ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
                            style={{ left: `${tile.left}%`, top: `${tile.top}%`, rotate: `${tile.turn}deg` }}
                          >
                            <Image src={cover} alt="" fill sizes="(min-width: 1024px) 10vw, 25vw" className="object-cover" />
                          </span>
                        );
                      })}
                      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0c0c0e_34%,rgb(12_12_14/0.25)_78%)]" />
                      <span className="relative text-mono text-white/70">{projects.length} projects</span>
                      <span className="relative mt-1 text-heading font-medium">Selected work</span>
                      <span className="relative mt-4 inline-flex items-center gap-0.5">
                        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md transition-transform duration-(--dur) ease-out group-hover:translate-x-0.5">
                          <ChevronRight aria-hidden strokeWidth={2} className="size-4" />
                        </span>
                        <span className="inline-flex h-11 items-center rounded-2xl bg-white/15 px-5 text-meta font-medium backdrop-blur-md">
                          Discover
                        </span>
                      </span>
                    </Link>
                  </m.div>
                  {posterProject && (
                    <m.div {...card(1)} className="min-h-0">
                      <Link
                        href={`/work/${posterProject.slug}`}
                        onClick={close}
                        className="group relative block h-full overflow-hidden rounded-[24px] bg-[#e4e3dc] p-4 text-[#0c0c0e]"
                      >
                        <span className="relative z-10 inline-flex min-h-8 items-center rounded-full border border-black/15 px-3.5 text-meta">
                          Poster series
                        </span>
                        {/* The whole poster, tilted and running off the bottom edge. */}
                        <span className="absolute top-[22%] left-1/2 aspect-[7/10] w-[68%] -translate-x-1/2 rotate-[5deg] overflow-hidden rounded-md shadow-2xl transition-transform duration-[900ms] ease-out group-hover:-translate-y-1.5 group-hover:rotate-[3deg] motion-reduce:transition-none">
                          <Image src={posterProject.cover.src} alt="" fill sizes="(min-width: 1024px) 14vw, 34vw" className="object-cover" />
                        </span>
                        <span className="sr-only">{posterProject.title}</span>
                      </Link>
                    </m.div>
                  )}
                  {clientProject && (
                    <m.div {...card(2)} className="min-h-0">
                      <Link
                        href={`/work/${clientProject.slug}`}
                        onClick={close}
                        className="group relative block h-full overflow-hidden rounded-[24px] bg-[#0b3440] p-4 text-white"
                      >
                        <span className="relative z-10 inline-flex min-h-8 items-center rounded-full border border-white/30 px-3.5 text-meta">
                          Client case
                        </span>
                        <span className="relative z-10 mt-3 block text-subheading font-medium">{clientProject.title}</span>
                        <span className="relative z-10 block text-meta text-white/70">Order platform</span>
                        {/* The screen bleeds off the corner so its small text never has to be read. */}
                        <span className="absolute top-[42%] left-4 aspect-[8/5] w-[175%] overflow-hidden rounded-lg shadow-2xl transition-transform duration-[900ms] ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none">
                          <Image src={clientProject.cover.src} alt="" fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover object-left-top" />
                        </span>
                      </Link>
                    </m.div>
                  )}
                </div>

                {/* Explore, with the address block pinned below it. */}
                <div className="order-1 flex flex-col justify-between gap-10 lg:order-none lg:col-span-3 lg:col-start-7 lg:h-[calc(100dvh-144px)] lg:min-h-[28rem] lg:py-6">
                  <nav aria-label="Explore">
                    <m.p {...settle(0.2, { opacity: 0 })} className="text-meta font-medium text-muted uppercase">
                      Explore
                    </m.p>
                    <ul className="group/list mt-3">
                      {explore.map((item, i) => (
                        <li key={item.href} className="overflow-hidden">
                          <m.div {...settle(0.25 + i * 0.09, { y: 47, scale: 1.05 })} className="origin-left">
                            <Link
                              href={item.href}
                              onClick={close}
                              data-menu-first={i === 0 ? "" : undefined}
                              aria-current={pathname === item.href ? "page" : undefined}
                              className="block py-0.5 text-[clamp(1.5rem,1.3rem+0.8vw,1.875rem)] leading-[1.22] font-medium tracking-[-0.02em] transition-opacity duration-(--dur-fast) group-hover/list:opacity-40 hover:opacity-100! focus-visible:opacity-100! aria-[current=page]:text-accent"
                            >
                              {item.label}
                            </Link>
                          </m.div>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="max-lg:hidden">
                    <AddressBlock settle={settle} reduce={!!reduce} />
                  </div>
                </div>

                <nav aria-label="Expertise" className="order-2 lg:order-none lg:col-span-2 lg:col-start-10 lg:pt-6">
                  <m.p {...settle(0.2, { opacity: 0 })} className="text-meta font-medium text-muted uppercase">
                    Expertise
                  </m.p>
                  <ul className="mt-3">
                    {services.map((service, i) => (
                      <m.li key={service.slug} {...settle(0.27 + i * 0.088, { x: 15, scale: 1.05, opacity: 0 })} className="origin-left">
                        <Link
                          href={`/services#${service.slug}`}
                          onClick={close}
                          className="link-underline inline-flex min-h-7 items-center text-[0.9375rem]"
                        >
                          {service.name}
                        </Link>
                      </m.li>
                    ))}
                  </ul>
                  <div className="mt-8 lg:hidden">
                    <AddressBlock settle={settle} reduce={!!reduce} />
                  </div>
                </nav>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "group/menu relative z-10 inline-flex h-11 items-center gap-2.5 rounded-2xl pr-5 pl-4 text-[0.875rem] font-medium backdrop-blur-xl transition-[background-color,color] duration-[370ms] ease-out",
          open ? "bg-[#076b45] text-[#f3f3f0]" : "bg-raised/80 text-fg hover:bg-raised",
        )}
      >
        <MenuDots open={open} />
        <span aria-hidden className="relative block w-[2.6em] whitespace-nowrap text-left leading-5">
          {/* The label wipes across: the old word closes to the left, the new one opens from the right. */}
          <span
            className="block transition-[clip-path] duration-[400ms] ease-out motion-reduce:transition-none"
            style={{ clipPath: open ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            Menu
          </span>
          <span
            className="absolute top-1/2 left-0 block -translate-y-1/2 transition-[clip-path] duration-[400ms] ease-out motion-reduce:transition-none"
            style={{ clipPath: open ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
          >
            Close
          </span>
        </span>
      </button>
    </>
  );
}

function AddressBlock({
  settle,
  reduce,
}: {
  settle: (delay: number, from: Record<string, number>) => object;
  reduce: boolean;
}) {
  return (
    <div>
      <m.div {...settle(0.34, { x: -10, y: -10, scale: 0.95, opacity: 0 })} className="origin-left">
        <a href={`mailto:${site.email}`} className="link-underline inline-flex min-h-7 items-center text-[0.9375rem]">
          {site.email}
        </a>
        <p className="text-meta text-fg-2">{site.location}</p>
      </m.div>
      <m.hr
        className="my-4 origin-left border-line-strong"
        initial={reduce ? false : { scaleX: 0, x: -20, opacity: 0 }}
        animate={{ scaleX: 1, x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.4 }}
      />
      <m.ul {...settle(0.46, { x: -10, opacity: 0 })} className="flex flex-wrap gap-x-5 gap-y-1">
        {site.social.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-7 items-center text-meta">
              {link.label}
            </a>
          </li>
        ))}
      </m.ul>
    </div>
  );
}

/** Three dots that give a small wobbling turn as the state changes. */
function MenuDots({ open }: { open: boolean }) {
  return (
    <span aria-hidden className={cn("relative block size-3.5", open ? "menu-dots-open" : "menu-dots-close")}>
      <span className="absolute top-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current" />
      <span className="absolute right-0 bottom-0.5 size-1 rounded-full bg-current" />
      <span className="absolute bottom-0.5 left-0 size-1 rounded-full bg-current" />
    </span>
  );
}
