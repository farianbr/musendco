/**
 * Downloads project covers from Musendco's Behance profile (https://www.behance.net/shuvo24)
 * and stores them locally as WebP: cover.webp (max 2000px wide) and portrait.webp
 * (a 4:5 crop chosen by sharp's attention strategy).
 *
 * Only covers are public on the profile page. Gallery images must be exported
 * from the original files and added to public/projects/<slug>/ by hand.
 *
 * Usage: node scripts/fetch-behance-covers.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const COVERS = [
  ["furki-branding", "https://mir-s3-cdn-cf.behance.net/projects/original/69b551253950065.Y3JvcCw1NzUzLDQ1MDAsMTEyNSww.png"],
  ["premium-packaging", "https://mir-s3-cdn-cf.behance.net/projects/original/5dd713244006089.Y3JvcCwzOTk5LDMxMjgsMCw3OQ.png"],
  ["brochure-illustration", "https://mir-s3-cdn-cf.behance.net/projects/original/d3fbea243983631.Y3JvcCwzMjExLDI1MTIsMTAwMSwyNzg.png"],
  ["bangla-typography", "https://mir-s3-cdn-cf.behance.net/projects/original/551524243982889.Y3JvcCwzMDAwLDIzNDYsMCwzMjY.png"],
  ["book-covers", "https://mir-s3-cdn-cf.behance.net/projects/original/deebb4243982105.Y3JvcCwxNjUwLDEyOTAsMCw0NDU.jpg"],
  ["character-portfolio", "https://mir-s3-cdn-cf.behance.net/projects/original/e798fb243981729.Y3JvcCwyODc2LDIyNTAsNjQsMA.jpg"],
  ["digital-detox-campaign", "https://mir-s3-cdn-cf.behance.net/projects/original/4b14a4240794711.Y3JvcCwyNzYxLDIxNjAsNDcxLDA.jpg"],
  ["digital-paintings", "https://mir-s3-cdn-cf.behance.net/projects/original/77bf8e240735001.Y3JvcCwzOTk5LDMxMjgsMCw4MzE.jpg"],
  ["cities-of-bangladesh", "https://mir-s3-cdn-cf.behance.net/projects/original/1c72d2240603057.Y3JvcCw0MjAwLDMyODUsMCw5MTQ.jpg"],
  ["skrp-business-card", "https://mir-s3-cdn-cf.behance.net/projects/original/fc4970236831737.Y3JvcCw0MDkxLDMyMDAsMjAyLDA.jpg"],
  ["taka-banknote-redesign", "https://mir-s3-cdn-cf.behance.net/projects/original/e03bc2234917261.Y3JvcCwyMDQ4LDE2MDEsMCwyMjM.jpg"],
  ["movie-posters-redesign", "https://mir-s3-cdn-cf.behance.net/projects/original/8d3e04234916941.Y3JvcCwyOTAwLDIyNjgsMCwyNjU.jpg"],
  ["magazine-layout", "https://mir-s3-cdn-cf.behance.net/projects/original/570648234124435.Y3JvcCw1MjcwLDQxMjIsMzY1LDU4Nw.jpg"],
  ["product-photography", "https://mir-s3-cdn-cf.behance.net/projects/original/c7a238230588291.Y3JvcCwzOTk5LDMxMjgsMCwxOTk5.jpg"],
  ["social-media-manipulation", "https://mir-s3-cdn-cf.behance.net/projects/original/2f0fab224507117.Y3JvcCwxMDgwLDg0NCwwLDI2MQ.jpg"],
  ["photography", "https://mir-s3-cdn-cf.behance.net/projects/original/7d89d0224355965.Y3JvcCw0OTU1LDM4NzUsNDI5LDA.jpg"],
  ["packaging-design", "https://mir-s3-cdn-cf.behance.net/projects/original/107e6a220388341.Y3JvcCwzNDA4LDI2NjYsMjQ0LDA.jpg"],
  ["my-paintings", "https://mir-s3-cdn-cf.behance.net/projects/original/72eac3220403569.Y3JvcCwyODgwLDIyNTIsMCwyNTY.jpg"],
  ["cripto-digital-logo", "https://mir-s3-cdn-cf.behance.net/projects/original/80e2c8220157535.Y3JvcCwxNDM4LDExMjUsMjgxLDA.png"],
  ["posters", "https://mir-s3-cdn-cf.behance.net/projects/original/7149a2218231587.Y3JvcCwxMjAwLDkzOCwwLDczOQ.jpg"],
  ["carclinic-stationery", "https://mir-s3-cdn-cf.behance.net/projects/original/b437f6212348757.Y3JvcCwxMzQyLDEwNTAsMjksMA.png"],
  ["thumbnails", "https://mir-s3-cdn-cf.behance.net/projects/original/adff1c200259907.Y3JvcCwxNDI1LDExMTUsMTQxLDEwNQ.png"],
  ["baby-basket", "https://mir-s3-cdn-cf.behance.net/projects/original/162908198350321.Y3JvcCwxNDY3LDExNDgsMTI3LDA.png"],
  ["the-blackboard", "https://mir-s3-cdn-cf.behance.net/projects/original/ac8390198349771.Y3JvcCwxMjAwLDkzOCwwLDEx.png"],
  ["bonoya-mothers-day", "https://mir-s3-cdn-cf.behance.net/projects/original/f664bf198350023.Y3JvcCwxMjAwLDkzOCwwLDE0.png"],
  ["manipulations", "https://mir-s3-cdn-cf.behance.net/projects/original/a2684d198293975.Y3JvcCwzNzA3LDI5MDAsMTc0LDA.jpg"],
  ["foods", "https://mir-s3-cdn-cf.behance.net/projects/original/e01868198287599.Y3JvcCwxMDgwLDg0NCwwLDUw.jpg"],
  ["electronics", "https://mir-s3-cdn-cf.behance.net/projects/original/01d3ed198298019.Y3JvcCwxMTg0LDkyNiwwLDEyOA.png"],
  ["medical", "https://mir-s3-cdn-cf.behance.net/projects/original/3fb23b198298601.Y3JvcCwxNDAwLDEwOTUsMCw2NQ.jpg"],
  ["retouches", "https://mir-s3-cdn-cf.behance.net/projects/original/353299198290535.Y3JvcCwxMDMxLDgwNyw4Niww.jpg"],
  ["cars", "https://mir-s3-cdn-cf.behance.net/projects/original/078b65198287163.Y3JvcCwxMjAwLDkzOCwwLDEzMA.jpg"],
];

async function save(slug, url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(slug + ": HTTP " + response.status);
  const buffer = Buffer.from(await response.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "projects", slug);
  await mkdir(dir, { recursive: true });
  const cover = await sharp(buffer).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(dir, "cover.webp"));
  const portrait = await sharp(buffer).resize({ width: 1400, height: 1750, fit: "cover", position: sharp.strategy.attention }).webp({ quality: 82 }).toFile(path.join(dir, "portrait.webp"));
  console.log(slug + " cover " + cover.width + "x" + cover.height + " portrait " + portrait.width + "x" + portrait.height);
}

for (let i = 0; i < COVERS.length; i += 5) {
  await Promise.all(COVERS.slice(i, i + 5).map(([slug, url]) => save(slug, url)));
}
