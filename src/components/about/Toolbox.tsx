import {
  siBlender,
  siFigma,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

type Tool =
  | { name: string; icon: { path: string; hex: string }; mono?: boolean }
  | { name: string; letters: string; fg: string; bg: string };

/**
 * The studio's everyday tools. Adobe apps are drawn as their two-letter
 * tiles; everything else uses its Simple Icons mark. Edit this list freely.
 */
const TOOLS: Tool[] = [
  { name: "Adobe Photoshop", letters: "Ps", fg: "#31a8ff", bg: "#001e36" },
  { name: "Adobe Illustrator", letters: "Ai", fg: "#ff9a00", bg: "#330000" },
  { name: "Adobe InDesign", letters: "Id", fg: "#ff3366", bg: "#49021f" },
  { name: "Adobe After Effects", letters: "Ae", fg: "#9999ff", bg: "#00005b" },
  { name: "Adobe Lightroom", letters: "Lr", fg: "#31a8ff", bg: "#001e36" },
  { name: "Figma", icon: siFigma },
  { name: "Blender", icon: siBlender },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs, mono: true },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Vite", icon: siVite },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Socket.IO", icon: siSocketdotio, mono: true },
];

function Tile({ tool }: { tool: Tool }) {
  return (
    <li className="toolbox-tile group relative">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-line bg-bg transition-[transform,border-color] duration-(--dur) ease-out group-hover:-translate-y-1 group-hover:border-line-strong md:size-16">
        {"letters" in tool ? (
          <span
            className="flex size-9 items-center justify-center rounded-[9px] border-[1.5px] text-[0.9375rem] font-bold tracking-[-0.02em] md:size-10"
            style={{ color: tool.fg, background: tool.bg, borderColor: tool.fg }}
          >
            {tool.letters}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="size-7 md:size-8" fill={tool.mono ? "currentColor" : `#${tool.icon.hex}`}>
            <path d={tool.icon.path} />
          </svg>
        )}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 rounded-full bg-fg px-2.5 py-1 text-mono whitespace-nowrap text-bg opacity-0 transition-[opacity,translate,visibility] duration-(--dur-fast) ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
      >
        {tool.name}
      </span>
    </li>
  );
}

/**
 * Toolbox row (after wearestokt.com): a label on the left, the tools drifting
 * past on the right, fading at both edges and pausing on hover. Each tile
 * names itself on hover. The visible list is for screen readers too; the
 * duplicate that makes the loop seamless is hidden from them.
 */
export function Toolbox() {
  return (
    <div
      data-reveal="fade"
      className="mt-3 grid items-center gap-5 rounded-card border border-line bg-surface p-5 md:mt-4 md:grid-cols-[14rem_1fr] md:gap-8 md:p-6"
    >
      <div>
        <h3 className="text-[0.9375rem] font-medium">Everyday toolbox</h3>
        <p className="mt-0.5 text-meta text-fg-2">Mastered for every project.</p>
      </div>
      <div className="marquee marquee-fade -my-10 overflow-hidden py-10">
        <div className="marquee-track flex w-max" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-label={copy === 0 ? "Tools we use" : undefined}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 gap-3 pr-3"
            >
              {TOOLS.map((tool) => (
                <Tile key={tool.name} tool={tool} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
