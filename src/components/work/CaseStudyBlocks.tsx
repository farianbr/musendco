import Image from "next/image";
import type { CaseStudyBlock, ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Case-study gallery and feature cards, all on one column width. Frames never
 * crop finished artwork: upright images sit whole on a surface, so every row
 * has the same edges whatever the source proportions.
 */
export function CaseStudyBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="space-y-4 md:space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "text") return null;
        if (block.type === "features") {
          return (
            <ul key={i} data-reveal="stagger" className="grid gap-4 pb-(--space-block) md:grid-cols-3 md:gap-6">
              {block.items.map((item, j) => (
                <li key={j} className="rounded-card border border-line bg-surface p-6">
                  <p className="font-mono text-mono text-accent">0{j + 1}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-2">{item}</p>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "image") return <Single key={i} image={block.image} />;
        return (
          <div key={i} className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {block.images.map((image) => (
              <Upright key={image.src} image={image} aspect="aspect-[4/5]" sizes="(min-width: 640px) 510px, 100vw" />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Single({ image }: { image: ImageAsset }) {
  const ratio = image.height / image.width;

  // Long composites read top to bottom, so they keep their width instead of shrinking to fit.
  if (ratio > 1.6) {
    return (
      <div data-reveal="clip" className="overflow-hidden rounded-card bg-surface px-4 md:px-6">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="640px" className="mx-auto h-auto w-full max-w-[640px]" />
      </div>
    );
  }
  if (ratio >= 0.95) return <Upright image={image} aspect="aspect-[4/3]" sizes="(min-width: 1088px) 1040px, 100vw" />;

  return (
    <div data-reveal="clip" className="overflow-hidden rounded-card bg-surface">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1088px) 1040px, 100vw" className="h-auto w-full" />
    </div>
  );
}

function Upright({ image, aspect, sizes }: { image: ImageAsset; aspect: string; sizes: string }) {
  return (
    <div data-reveal="clip" className={cn("relative overflow-hidden rounded-card bg-surface", aspect)}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-contain p-4 md:p-6" />
    </div>
  );
}
