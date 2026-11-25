import Image from "next/image";

/**
 * A tool's own logo, in full colour (public/tools, from svgl.app or Simple Icons, which track
 * each brand's current mark). Every file reads on both themes; a one-colour
 * mark is set `mono` and painted in the text colour instead, so it follows
 * the theme without a second file.
 */
type Tool = { name: string; src: string; mono?: boolean };

/** The studio's everyday tools. Edit this list freely. */
const TOOLS: Tool[] = [
  { name: "Adobe Photoshop", src: "/tools/photoshop.svg" },
  { name: "Adobe Illustrator", src: "/tools/illustrator.svg" },
  { name: "Adobe InDesign", src: "/tools/indesign.svg" },
  { name: "Adobe After Effects", src: "/tools/after-effects.svg" },
  { name: "Adobe Premiere Pro", src: "/tools/premiere-pro.svg" },
  { name: "Adobe Lightroom", src: "/tools/lightroom.svg" },
  { name: "Figma", src: "/tools/figma.svg" },
  { name: "Framer", src: "/tools/framer.svg", mono: true },
  { name: "Blender", src: "/tools/blender.svg" },
  { name: "Cinema 4D", src: "/tools/cinema4d.webp" },
  { name: "ChatGPT", src: "/tools/openai.svg", mono: true },
  { name: "Claude", src: "/tools/claude.svg" },
  { name: "Gemini", src: "/tools/gemini.svg" },
  { name: "Midjourney", src: "/tools/midjourney.svg", mono: true },
  { name: "GitHub Copilot", src: "/tools/copilot.svg", mono: true },
  { name: "VS Code", src: "/tools/vscode.svg" },
  { name: "React", src: "/tools/react.svg" },
  { name: "Next.js", src: "/tools/nextjs.svg" },
  { name: "TypeScript", src: "/tools/typescript.svg" },
  { name: "Tailwind CSS", src: "/tools/tailwindcss.svg" },
  { name: "Node.js", src: "/tools/nodejs.svg" },
  { name: "Vite", src: "/tools/vite.svg" },
  { name: "PostgreSQL", src: "/tools/postgresql.svg" },
  { name: "Socket.IO", src: "/tools/socketio.svg", mono: true },
  { name: "Python", src: "/tools/python.svg" },
  { name: "Java", src: "/tools/java.svg" },
];

function Logo({ tool }: { tool: Tool }) {
  if (tool.mono) {
    const mask = `url(${tool.src}) center / contain no-repeat`;
    return <span aria-hidden className="block size-7 bg-current md:size-8" style={{ mask, WebkitMask: mask }} />;
  }
  return <Image src={tool.src} alt="" width={32} height={32} unoptimized className="size-7 object-contain md:size-8" />;
}

function Tile({ tool }: { tool: Tool }) {
  return (
    <li className="toolbox-tile group relative">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-line bg-bg transition-[transform,border-color] duration-(--dur) ease-out group-hover:-translate-y-1 group-hover:border-line-strong md:size-16">
        <Logo tool={tool} />
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
        <div className="marquee-track flex w-max" style={{ "--marquee-duration": "84s" } as React.CSSProperties}>
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
