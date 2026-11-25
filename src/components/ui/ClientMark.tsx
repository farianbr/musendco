import type { Client } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * A client's logo in its own colours. Logos with a dark-theme twin swap files
 * with the theme (CSS, `.client-logo` in globals.css, so only the visible one
 * loads); one-colour (`mono`) logos are a mask painted in the text colour. The
 * height is set optically, so wide wordmarks and compact emblems read at a
 * similar weight. Clients without a logo file show their name, typeset.
 */
export function ClientMark({ client, size = "default" }: { client: Client; size?: "default" | "small" }) {
  const factor = size === "small" ? 0.82 : 1;

  if (!client.logo) {
    return (
      <span
        className={cn(
          "inline-flex items-center whitespace-nowrap font-semibold tracking-[-0.025em] text-fg",
          size === "small" ? "text-[0.9375rem]" : "text-[1.125rem]",
        )}
      >
        {client.name}
      </span>
    );
  }

  const { src, dark, width, height, scale = 1, mono } = client.logo;
  const aspect = width / height;
  // Wide logos sit lower, compact ones taller, so their visual area evens out.
  const rem = Math.min(2.1, Math.max(0.95, 2.9 / Math.sqrt(aspect))) * scale * factor;
  const box = { height: `${rem}rem`, aspectRatio: `${width} / ${height}` };

  if (mono) {
    const mask = `url(${src}) center / contain no-repeat`;
    return (
      <span
        role="img"
        aria-label={client.name}
        className="block shrink-0 bg-fg"
        style={{ ...box, mask, WebkitMask: mask }}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={client.name}
      className="client-logo block shrink-0"
      style={{ ...box, "--logo": `url(${src})`, "--logo-dark": `url(${dark ?? src})` } as React.CSSProperties}
    />
  );
}
