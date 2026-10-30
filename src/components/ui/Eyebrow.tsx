import { cn } from "@/lib/cn";

/** Small outlined pill that names a section above its heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      data-reveal="fade"
      className={cn("inline-flex min-h-8 items-center rounded-full border border-accent/50 px-3.5 text-meta text-accent", className)}
    >
      {children}
    </p>
  );
}
