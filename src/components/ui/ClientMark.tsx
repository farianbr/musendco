import type { Client } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * A client's logo in one colour (it takes the text colour, so it follows the
 * theme and the hover state). The logo file is a mask; its height is set
 * optically, so wide wordmarks and compact emblems read at a similar weight.
 * Clients without a logo file show their name, typeset.
 */
export function ClientMark({ client, size = "default" }: { client: Client; size?: "default" | "small" }) {
  const factor = size === "small" ? 0.82 : 1;

  if (!client.logo) {
    return (
      <span
        className={cn(
          "inline-flex items-center whitespace-nowrap font-semibold tracking-[-0.025em]",
          size === "small" ? "text-[0.9375rem]" : "text-[1.125rem]",
        )}
      >
        {client.name}
      </span>
    );
  }

  const { src, width, height, scale = 1 } = client.logo;
  const aspect = width / height;
  // Wide logos sit lower, compact ones taller, so their visual area evens out.
  const rem = Math.min(2.1, Math.max(0.95, 2.9 / Math.sqrt(aspect))) * scale * factor;
  const mask = `url(${src}) center / contain no-repeat`;

  return (
    <span
      role="img"
      aria-label={client.name}
      className="block shrink-0 bg-current"
      style={{ height: `${rem}rem`, aspectRatio: `${width} / ${height}`, mask, WebkitMask: mask }}
    />
  );
}
