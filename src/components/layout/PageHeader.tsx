import { SplitWords } from "@/components/ui/SplitWords";

/** Opening block for inner pages. The title rises in word by word on arrival. */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: { text: string; em?: boolean }[] | string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="shell pt-[calc(var(--header-h)+clamp(2rem,1rem+3vw,3.5rem))] pb-(--space-block)">
      <h1 className="enter-words max-w-[22ch] text-display font-medium">
        <SplitWords parts={title} />
      </h1>
      {intro && (
        <p
          className="enter-fade mt-5 max-w-[56ch] text-lead text-fg-2"
          style={{ "--delay": "380ms" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}
