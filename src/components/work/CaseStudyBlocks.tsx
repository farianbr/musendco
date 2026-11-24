import Image from "next/image";
import type { CaseStudyBlock, ImageAsset } from "@/types/content";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { cn } from "@/lib/cn";

/**
 * Case-study gallery. Images are composed into a varied sequence of rows
 * (full-bleed, offset pair, split with caption, trio, inset) and every row
 * type has its own entrance, so no two neighbours move the same way.
 * Artwork is never cropped: frames take each image's natural proportions.
 */

type Row =
  | { kind: "bleed"; image: ImageAsset }
  | { kind: "inset"; image: ImageAsset }
  | { kind: "duo"; images: [ImageAsset, ImageAsset]; offset: boolean }
  | { kind: "split"; image: ImageAsset; side: "left" | "right" }
  | { kind: "trio"; images: [ImageAsset, ImageAsset, ImageAsset] }
  | { kind: "tall"; image: ImageAsset };

const ratio = (image: ImageAsset) => image.width / image.height;
const isWide = (image: ImageAsset) => ratio(image) >= 1.25;
const isLong = (image: ImageAsset) => image.height / image.width > 1.6;

/** Wide images cycle through these, so long runs of landscape work still vary. */
const WIDE_CYCLE = ["bleed", "duo", "split", "inset", "duo"] as const;

function compose(images: ImageAsset[]): Row[] {
  const rows: Row[] = [];
  let wideStep = 0;
  let uprightStep = 0;
  let splitSide: "left" | "right" = "left";
  let duoCount = 0;

  for (let i = 0; i < images.length; ) {
    const image = images[i];
    const next = images[i + 1];
    const after = images[i + 2];

    if (isLong(image)) {
      rows.push({ kind: "tall", image });
      i += 1;
      continue;
    }

    if (isWide(image)) {
      let kind = WIDE_CYCLE[wideStep % WIDE_CYCLE.length];
      wideStep += 1;
      if (kind === "duo" && !(next && isWide(next))) kind = "inset";
      if (kind === "duo") {
        rows.push({ kind, images: [image, next], offset: duoCount++ % 2 === 1 });
        i += 2;
      } else if (kind === "split") {
        rows.push({ kind, image, side: splitSide });
        splitSide = splitSide === "left" ? "right" : "left";
        i += 1;
      } else {
        rows.push({ kind, image });
        i += 1;
      }
      continue;
    }

    // Upright or square.
    const step = uprightStep++;
    if (step % 3 === 2 && next && after && !isWide(next) && !isWide(after) && !isLong(next) && !isLong(after)) {
      rows.push({ kind: "trio", images: [image, next, after] });
      i += 3;
    } else if (next && !isWide(next) && !isLong(next)) {
      rows.push({ kind: "duo", images: [image, next], offset: duoCount++ % 2 === 0 });
      i += 2;
    } else {
      rows.push({ kind: "split", image, side: splitSide });
      splitSide = splitSide === "left" ? "right" : "left";
      i += 1;
    }
  }
  return rows;
}

/** Everything except full-bleed rows shares the case study's column. */
const column = "mx-auto w-full max-w-[1240px] px-(--gutter)";
const wide = "mx-auto w-full max-w-[1560px] px-(--gutter)";

function Picture({ image, sizes, className }: { image: ImageAsset; sizes: string; className?: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={cn("block h-auto w-full", className)}
    />
  );
}

export function CaseStudyBlocks({ blocks, title }: { blocks: CaseStudyBlock[]; title: string }) {
  const features = blocks.flatMap((block) => (block.type === "features" ? [block.items] : []));
  const images = blocks.flatMap((block) =>
    block.type === "image" ? [block.image] : block.type === "pair" ? block.images : [],
  );
  const rows = compose(images);
  let figure = 0;
  const total = images.length;
  const label = () => `${String(++figure).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div className="space-y-[clamp(1.25rem,0.75rem+2.5vw,3.5rem)]">
      {features.map((items, f) => (
        <ul key={`f${f}`} data-reveal="stagger" className={cn(column, "grid gap-4 pb-(--space-block) md:grid-cols-3 md:gap-6")}>
          {items.map((item, j) => (
            <li key={j} className="rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-mono text-accent-ink">0{j + 1}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-2">{item}</p>
            </li>
          ))}
        </ul>
      ))}

      {rows.map((row, r) => {
        switch (row.kind) {
          case "bleed":
            label();
            return (
              <div key={r} className={wide}>
                <div data-reveal="clip-x" className="overflow-hidden rounded-card bg-surface">
                  <ParallaxFrame>
                    <Picture image={row.image} sizes="(min-width: 1560px) 1512px, 100vw" />
                  </ParallaxFrame>
                </div>
              </div>
            );

          case "inset":
            label();
            return (
              <div key={r} className={column}>
                <div data-reveal="clip" className="overflow-hidden rounded-card bg-surface">
                  <Picture image={row.image} sizes="(min-width: 1288px) 1240px, 100vw" />
                </div>
              </div>
            );

          case "duo": {
            const [a, b] = row.images;
            label();
            label();
            return (
              <div
                key={r}
                className={cn(
                  column,
                  "grid items-start gap-4 sm:grid-cols-12 md:gap-6",
                )}
              >
                <div
                  data-reveal="slide-l"
                  className={cn(
                    "overflow-hidden rounded-card bg-surface",
                    row.offset ? "sm:col-span-7" : "sm:col-span-6",
                  )}
                >
                  <Picture image={a} sizes="(min-width: 640px) 720px, 100vw" />
                </div>
                <div
                  data-reveal="slide-r"
                  style={{ "--delay": "120ms" } as React.CSSProperties}
                  className={cn(
                    "overflow-hidden rounded-card bg-surface",
                    row.offset ? "sm:col-span-5 sm:mt-[18%]" : "sm:col-span-6",
                  )}
                >
                  <Picture image={b} sizes="(min-width: 640px) 620px, 100vw" />
                </div>
              </div>
            );
          }

          case "split": {
            const fig = label();
            const right = row.side === "right";
            return (
              <div key={r} className={cn(column, "grid items-end gap-5 md:grid-cols-12 md:gap-8")}>
                <div
                  data-reveal="scale"
                  className={cn(
                    "overflow-hidden rounded-card bg-surface md:col-span-8",
                    right && "md:order-2 md:col-start-5",
                  )}
                >
                  <Picture image={row.image} sizes="(min-width: 768px) 820px, 100vw" />
                </div>
                <div
                  data-reveal="fade"
                  className={cn("md:col-span-4 md:pb-2", right ? "md:order-1 md:row-start-1" : "md:pl-2")}
                >
                  <p className="font-mono text-mono text-muted tabular">{fig}</p>
                  <p className="mt-3 max-w-[22ch] text-subheading font-medium">{title}</p>
                  <span aria-hidden className="mt-5 block h-px w-16 bg-accent" />
                </div>
              </div>
            );
          }

          case "trio":
            label();
            label();
            label();
            return (
              <ul key={r} data-reveal="stagger" className={cn(wide, "grid items-start gap-4 sm:grid-cols-3 md:gap-6")}>
                {row.images.map((image, k) => (
                  <li key={image.src} className={cn("overflow-hidden rounded-card bg-surface", k === 1 && "sm:mt-[12%]")}>
                    <Picture image={image} sizes="(min-width: 640px) 500px, 100vw" />
                  </li>
                ))}
              </ul>
            );

          case "tall":
            label();
            return (
              <div key={r} className={column}>
                <div data-reveal="fade" className="overflow-hidden rounded-card bg-surface px-4 md:px-6">
                  <Picture image={row.image} sizes="640px" className="mx-auto max-w-[640px]" />
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
