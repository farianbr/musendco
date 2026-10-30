import type { Metadata } from "next";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SplitWords } from "@/components/ui/SplitWords";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80dvh] flex-col justify-end pt-[calc(var(--header-h)+4rem)] pb-(--space-block)">
      <p className="enter-fade font-mono text-mono text-accent" style={{ "--delay": "0ms" } as React.CSSProperties}>
        404
      </p>
      <h1 className="enter-words mt-6 max-w-[14ch] text-title font-medium">
        <SplitWords parts={[{ text: "This page is" }, { text: "not here.", em: true }]} />
      </h1>
      <p className="enter-fade mt-6 max-w-[40ch] text-lead text-fg-2">
        It may have moved, or the address may be mistyped.
      </p>
      <div className="enter-fade mt-8 flex flex-wrap gap-x-8" style={{ "--delay": "450ms" } as React.CSSProperties}>
        <ArrowLink href="/">Home</ArrowLink>
        <ArrowLink href="/work">Work</ArrowLink>
        <ArrowLink href="/contact">Contact</ArrowLink>
      </div>
    </section>
  );
}
