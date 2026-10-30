/**
 * Downloads DEMO photography from picsum.photos and stores it locally as WebP.
 *
 * These images are stand-ins, not Musendco work. Replace files in public/services/
 * with real assets (same names), or update src/content/services.ts.
 *
 * Usage: node scripts/fetch-demo-images.mjs
 * Change a seed in SEEDS to swap an individual image.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public");

/** Override individual seeds here when a random photo does not suit. */
const SEEDS = {};

const EXTRA = [
  ["services/brand-identity", [1200, 1500]],
  ["services/digital-product", [1200, 1500]],
  ["services/websites", [1200, 1500]],
  ["services/art-direction", [1200, 1500]],
];

async function fetchTo(seed, [w, h], file) {
  const response = await fetch(`https://picsum.photos/seed/${seed}/${w}/${h}`);
  if (!response.ok) throw new Error(`${seed}: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(file), { recursive: true });
  // One shared grade so unrelated stock frames read as a single art-directed set.
  await sharp(buffer)
    .modulate({ saturation: 0.82, brightness: 0.97 })
    .linear(1.06, -6)
    .webp({ quality: 78 })
    .toFile(file);
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
}

const jobs = [];
for (const [name, size] of EXTRA) {
  jobs.push([SEEDS[name] ?? `musendco-${name.replace("/", "-")}`, size, path.join(ROOT, `${name}.webp`)]);
}

// Small batches keep the remote service happy.
for (let i = 0; i < jobs.length; i += 6) {
  await Promise.all(jobs.slice(i, i + 6).map((job) => fetchTo(...job)));
}
