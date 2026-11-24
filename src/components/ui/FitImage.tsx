import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Artwork in a fixed frame without cropping. The whole image sits centred
 * (object-contain); a heavily blurred copy of itself fills the frame behind,
 * so a square or upright piece in a wide frame still reads as one surface.
 * Fills its positioned parent.
 */
export function FitImage({
  image,
  sizes,
  preload,
  className,
  imageClassName,
}: {
  image: Pick<ImageAsset, "src" | "alt">;
  sizes: string;
  preload?: boolean;
  /** Applied to the wrapper (for hover transforms that move both layers). */
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("absolute inset-0 block overflow-hidden", className)}>
      <Image
        src={image.src}
        alt=""
        aria-hidden
        fill
        sizes="160px"
        className="scale-125 object-cover opacity-90 blur-2xl saturate-150"
      />
      <span aria-hidden className="absolute inset-0 bg-black/20" />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-contain", imageClassName)}
      />
    </span>
  );
}
