import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Typeset wordmark. Temporary until Musendco supplies a logo file
 * (see docs/ASSETS.md). Swap the contents of this component only.
 */
export function Wordmark({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center text-[1.3125rem] font-semibold tracking-[-0.045em]",
        className,
      )}
      aria-label="Musendco, home"
    >
      Musendco
    </Link>
  );
}
