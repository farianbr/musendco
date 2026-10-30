import type { Client } from "@/types/content";

/**
 * Generated mark: a simple geometric glyph plus the name.
 * Replace with real, permitted SVG logos when they exist.
 */
export function ClientMark({ client }: { client: Client }) {
  const name =
    client.case === "upper" ? client.name.toUpperCase() : client.case === "lower" ? client.name.toLowerCase() : client.name;

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[1.125rem] font-semibold tracking-[-0.025em]">
      <svg aria-hidden viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor">
        {glyphs[client.glyph]}
      </svg>
      <span className={client.case === "upper" ? "text-[0.9375rem] tracking-[0.1em]" : undefined}>{name}</span>
    </span>
  );
}

const glyphs: Record<Client["glyph"], React.ReactNode> = {
  circle: <circle cx="12" cy="12" r="10" />,
  half: <path d="M12 2a10 10 0 0 1 0 20z" />,
  ring: <path fillRule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />,
  square: <rect x="3" y="3" width="18" height="18" rx="2" />,
  triangle: <path d="M12 3l10 18H2z" />,
  bars: (
    <>
      <rect x="2" y="4" width="20" height="4" rx="1" />
      <rect x="2" y="10" width="14" height="4" rx="1" />
      <rect x="2" y="16" width="8" height="4" rx="1" />
    </>
  ),
  arc: <path d="M2 20a10 10 0 0 1 20 0h-5a5 5 0 0 0-10 0z" />,
  diamond: <path d="M12 2l10 10-10 10L2 12z" />,
};
