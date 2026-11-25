// Builds the soft backdrop behind every project cover (see FitImage).
//
// FitImage used to draw a second copy of each cover with a live CSS
// `filter: blur(40px) saturate(1.5)`. A large blur is one of the most
// expensive things a page can paint, and every card, the home stack and the
// case-study hero carried one; on phones (iOS Safari above all) it was
// repainted whenever the card moved or scaled. This bakes the same look into a
// tiny image once: blurred and saturated here, then simply stretched by the
// browser, which costs nothing to draw. A heavily blurred image has no fine
// detail, so stretching it shows no blockiness.
//
// Run after adding or replacing a cover:  node scripts/make-cover-backdrops.mjs

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "projects");
const WIDTH = 96; // px; the backdrop is always shown far larger than this
const SIGMA = 4.5; // ~5% of the width: blur(40px) was ~3% of a desktop frame, ~10% of a phone card

for (const slug of await readdir(root)) {
  const cover = path.join(root, slug, "cover.webp");
  try {
    await stat(cover);
  } catch {
    continue;
  }
  const out = path.join(root, slug, "cover-blur.webp");
  await sharp(cover)
    .resize({ width: WIDTH })
    .blur(SIGMA)
    .modulate({ saturation: 1.5 })
    .webp({ quality: 70 })
    .toFile(out);
  const { size } = await stat(out);
  console.log(`${slug}/cover-blur.webp  ${size} bytes`);
}
