import { home } from "@/content/home";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SplitWords } from "@/components/ui/SplitWords";
import { Magnetic } from "@/components/motion/Magnetic";

/** Closing invitation. Shared by every page except Contact. */
export function ClosingCta() {
  const { heading, intro } = home.closing;

  return (
    <section aria-labelledby="closing-heading" className="shell section-y">
      <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-10 md:px-10 md:py-14">
        <h2 id="closing-heading" data-reveal="words" className="max-w-[24ch] text-title font-medium">
          <SplitWords parts={heading} />
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-end" data-reveal="fade">
          <div>
            <p className="max-w-[46ch] text-lead text-fg-2">{intro}</p>
            <CopyEmail email={site.email} className="mt-5 flex items-center gap-3" />
          </div>
          <div className="md:justify-self-end">
            <Magnetic strength={0.35}>
              <ButtonLink href="/contact" arrow>
                Start a project
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
