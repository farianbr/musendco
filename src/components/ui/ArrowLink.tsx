import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group/arrow inline-flex min-h-11 items-center gap-2 font-medium", className)}>
      <span className="link-underline">{children}</span>
      <ArrowRight
        aria-hidden
        strokeWidth={1.75}
        className="size-4 transition-transform duration-(--dur) ease-out group-hover/arrow:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}
