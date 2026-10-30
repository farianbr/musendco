import Link from "next/link";
import { cacheLife } from "next/cache";
import { navigation, site } from "@/content/site";
import { SplitWords } from "@/components/ui/SplitWords";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const linkClass = "link-underline inline-flex min-h-8 items-center";

export function Footer() {
  return (
    <footer id="site-footer" className="overflow-hidden border-t border-line bg-bg pt-16 text-meta">
      <div className="shell">
        <div className="grid-12 gap-y-10">
          <p className="col-span-4 max-w-[30ch] text-lead text-fg-2 md:col-span-5">
            {site.tagline}. Strategy, design and engineering in one team.
          </p>

          <nav aria-label="Footer" className="col-span-2 md:col-start-7">
            <h2 className="mb-3 font-mono text-mono text-muted">Pages</h2>
            <ul>
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2">
            <h2 className="mb-3 font-mono text-mono text-muted">Follow</h2>
            <ul>
              {site.social.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-2">
            <h2 className="mb-3 font-mono text-mono text-muted">Contact</h2>
            <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
              {site.email}
            </a>
            <p className="mt-1 text-muted">{site.location}</p>
          </div>
        </div>

        <p
          aria-hidden
          data-reveal="words"
          className="mt-14 mb-8 text-center text-[clamp(3.5rem,1rem+12vw,11rem)] leading-[0.85] font-semibold tracking-[-0.06em] whitespace-nowrap select-none"
        >
          <SplitWords parts="Musendco" />
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-muted">
          <p className="tabular">
            © <CopyrightYear /> {site.name}
          </p>
          {site.demoContent && (
            <p className="max-w-[60ch]">
              Testimonials shown are placeholders.
            </p>
          )}
          <a href="#top" className={linkClass}>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
