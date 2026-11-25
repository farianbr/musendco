import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/content/site";
import { MuseLetters } from "@/components/ui/Brand";
import { getCurrentYear } from "@/lib/record";

async function CopyrightYear() {
  return <>{await getCurrentYear()}</>;
}

/**
 * Eight overlapping bands from 34% of the wordmark's height to the bottom.
 * Each band ramps in, holds, and ramps out over the next, and the blur grows
 * roughly geometrically, so there is no visible step between bands.
 */
const BLUR_BANDS = [0.025, 0.05, 0.1, 0.18, 0.3, 0.45, 0.65, 0.9].map((vw, i, all) => {
  const start = 34;
  const step = (100 - start) / (all.length + 1);
  const at = (k: number) => `${Math.min(100, start + (i + k) * step).toFixed(1)}%`;
  const last = i === all.length - 1;
  const mask = last
    ? `linear-gradient(to bottom, transparent ${at(0)}, black ${at(1)})`
    : `linear-gradient(to bottom, transparent ${at(0)}, black ${at(1)}, black ${at(2)}, transparent ${at(3)})`;
  const blur = `blur(${vw}vw)`;
  return {
    blur: vw,
    style: { backdropFilter: blur, WebkitBackdropFilter: blur, maskImage: mask, WebkitMaskImage: mask },
  };
});

const bigLink =
  "footer-link inline-flex min-h-11 items-center text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] leading-[1.1] font-medium tracking-[-0.035em]";

/**
 * Footer. Large, high-contrast navigation and contact, then the wordmark set
 * across the full width: sharp at the top, softening into an orange-fringed
 * blur towards the bottom edge.
 */
export function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-line bg-bg">
      <div className="shell pt-[clamp(3.5rem,2.5rem+4vw,6rem)]">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-6">
            <p className="text-meta font-medium text-muted uppercase tracking-[0.08em]">Start a conversation</p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-4 inline-flex items-center gap-3 text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-none font-medium tracking-[-0.045em] break-all"
            >
              <span className="footer-link">{site.email}</span>
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-(--dur) ease-out group-hover:rotate-45 md:size-14">
                <ArrowUpRight aria-hidden strokeWidth={2} className="size-5 md:size-6" />
              </span>
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] text-fg-2">
              <span>Based in {site.location}</span>
              <span className="inline-flex items-center gap-2.5">
                <span aria-hidden className="pulse-dot" />
                {site.availability}
              </span>
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-4 lg:col-span-3 lg:col-start-8">
            <h2 className="text-meta font-medium text-muted uppercase tracking-[0.08em]">Navigation</h2>
            <ul className="mt-4">
              <li>
                <Link href="/" className={bigLink}>
                  Home
                </Link>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={bigLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h2 className="text-meta font-medium text-muted uppercase tracking-[0.08em]">Social</h2>
            <ul className="mt-4">
              {site.social.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={bigLink}>
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(3rem,2rem+4vw,5.5rem)] flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line-strong py-6 text-[0.9375rem] text-fg-2">
          <p className="tabular">
            © <CopyrightYear /> {site.legalName} All rights reserved.
          </p>
          <a href="#top" className="footer-link inline-flex min-h-8 items-center">
            Back to top
          </a>
        </div>
      </div>

      {/* Progressive blur: crisp letters, a soft orange underglow, then a stack
          of backdrop blurs whose bands overlap so focus falls away smoothly. */}
      <div aria-hidden className="footer-mark">
        <MuseLetters className="footer-mark__layer footer-mark__glow" />
        <MuseLetters className="footer-mark__layer" />
        {/* Touch and small screens: the same mark as a picture of the desktop
            render (see .footer-mark__image). Lazy, and hidden elsewhere, so
            only the current theme's file is ever fetched, and only there. */}
        <Image
          src="/brand/footer-mark-dark.webp"
          alt=""
          width={1290}
          height={304}
          unoptimized
          className="footer-mark__image footer-mark__image--dark"
        />
        <Image
          src="/brand/footer-mark-light.webp"
          alt=""
          width={1290}
          height={304}
          unoptimized
          className="footer-mark__image footer-mark__image--light"
        />
        <div className="footer-mark__blur">
          {BLUR_BANDS.map((band) => (
            <span key={band.blur} style={band.style} />
          ))}
        </div>
      </div>
    </footer>
  );
}
