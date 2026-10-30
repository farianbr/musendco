import type { Metadata } from "next";
import { site } from "@/content/site";
import { faqs } from "@/content/people";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageTransition } from "@/components/motion/PageTransition";
import { SplitWords } from "@/components/ui/SplitWords";
import { CopyEmail } from "@/components/ui/CopyEmail";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Musendco. Tell us what you are making, or email us directly.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  const [timing] = faqs;

  return (
    <PageTransition>
      <div className="shell grid-12 gap-y-10 pt-[calc(var(--header-h)+clamp(2rem,1rem+3vw,3.5rem))] pb-(--space-section)">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <h1 className="enter-words text-title font-medium">
            <SplitWords parts={[{ text: "Start a" }, { text: "project.", em: true }]} />
          </h1>
          <p className="enter-fade mt-5 max-w-[36ch] text-lead text-fg-2" style={{ "--delay": "300ms" } as React.CSSProperties}>
            A few details are enough to begin. Tell us what you are making and we will take it from there.
          </p>

          <div className="enter-fade mt-8 space-y-6" style={{ "--delay": "420ms" } as React.CSSProperties}>
            <div className="border-t border-line pt-6">
              <h2 className="font-mono text-mono text-muted uppercase">Prefer email?</h2>
              <CopyEmail email={site.email} className="mt-3 flex items-center gap-3" />
            </div>
            <div className="border-t border-line pt-6">
              <h2 className="font-mono text-mono text-muted uppercase">{timing.question}</h2>
              <p className="mt-3 max-w-[42ch] text-fg-2">{timing.answer}</p>
            </div>
            <div className="border-t border-line pt-6">
              <h2 className="font-mono text-mono text-muted uppercase">Elsewhere</h2>
              <ul className="mt-2 flex flex-wrap gap-x-6">
                {site.social.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-11 items-center">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="enter-fade relative col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-3"
          style={{ "--delay": "240ms" } as React.CSSProperties}
        >
          <ContactForm />
        </div>
      </div>
    </PageTransition>
  );
}
