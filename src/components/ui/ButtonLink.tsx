import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "default" | "small";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
};

/**
 * Shape rule: interactive buttons are full pills; media and cards use
 * --radius-media / --radius-card. See docs/DESIGN_SYSTEM.md.
 */
export function buttonClasses({
  variant = "primary",
  size = "default",
}: {
  variant?: Variant;
  size?: "default" | "small";
}) {
  return cn(
    "pressable group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    size === "small" ? "min-h-10 px-4.5 text-meta" : "min-h-13 px-7 text-[0.9375rem]",
    variant === "primary" && "bg-accent text-on-accent hover:brightness-110",
    variant === "secondary" && "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-bg",
    variant === "ghost" && "text-fg hover:text-accent",
  );
}

/** Arrow that slides out and back in on hover, a small sign of direction. */
export function ButtonArrow() {
  return (
    <span aria-hidden className="relative -mr-1 inline-flex size-4 overflow-hidden">
      <ArrowUpRight
        strokeWidth={2}
        className="absolute inset-0 size-4 transition-transform duration-(--dur) ease-out group-hover/btn:translate-x-full group-hover/btn:-translate-y-full motion-reduce:transition-none"
      />
      <ArrowUpRight
        strokeWidth={2}
        className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-(--dur) ease-out group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 motion-reduce:transition-none"
      />
    </span>
  );
}

export function ButtonLink({ href, children, variant, size, className, arrow, onClick }: Props) {
  return (
    <Link href={href} onClick={onClick} className={cn(buttonClasses({ variant, size }), className)}>
      {children}
      {arrow && <ButtonArrow />}
    </Link>
  );
}
