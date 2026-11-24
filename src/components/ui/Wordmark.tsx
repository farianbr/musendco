import Link from "next/link";
import { cn } from "@/lib/cn";
import { MuseLogo } from "./Brand";

/** Header logo. Letters follow the theme's text colour; the mark stays orange. */
export function Wordmark({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("pressable inline-flex min-h-11 items-center", className)}
      aria-label="Muse, home"
    >
      <MuseLogo className="h-[26px] w-auto lg:h-[30px]" />
    </Link>
  );
}
