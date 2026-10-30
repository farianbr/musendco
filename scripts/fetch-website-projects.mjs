/**
 * Downloads screenshots for the Websites category from https://www.farian.me/projects
 * and stores them locally as WebP in public/projects/<slug>/. The first screen
 * in each list becomes cover.webp and a 4:5 attention-cropped portrait.webp.
 *
 * Usage: node scripts/fetch-website-projects.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECTS = {
  "think-space": ["board-journey", "dashboard", "board-flowchart", "templates", "mobile-dashboard", "mobile-landing"],
  merqetia: ["admin-board", "order-detail", "client-dashboard", "employee-board", "reports", "invoices", "support"],
  "subscription-manager": ["dashboard", "spending", "forecast", "ai-insights", "subscriptions", "mobile-dashboard", "mobile-history"],
  kendro: ["room-session", "dashboard", "session-running", "team-detail", "mobile-dashboard", "mobile-room"],
};

async function download(slug, name) {
  const response = await fetch(`https://www.farian.me/images/projects/${slug}/${name}.png`);
  if (!response.ok) throw new Error(`${slug}/${name}: HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

for (const [slug, screens] of Object.entries(PROJECTS)) {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  await mkdir(dir, { recursive: true });

  for (const [i, name] of screens.entries()) {
    const buffer = await download(slug, name);
    const output = i === 0 ? "cover" : name;
    const screen = await sharp(buffer).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(dir, `${output}.webp`));
    console.log(`${slug}/${output} ${screen.width}x${screen.height}`);
    if (i === 0) {
      await sharp(buffer).resize({ width: 1400, height: 1750, fit: "cover", position: sharp.strategy.attention }).webp({ quality: 82 }).toFile(path.join(dir, "portrait.webp"));
    }
  }
}
