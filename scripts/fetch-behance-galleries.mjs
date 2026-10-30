/**
 * Downloads gallery images for the Behance projects and stores them as WebP in
 * public/projects/<slug>/NN.webp, then writes their sizes to
 * src/content/project-galleries.json.
 *
 * Paths come from each gallery page and are relative to the CDN's project_modules/.
 * A short prefix keeps the list readable: "~" stands for max_3840_webp/.
 *
 * Usage: node scripts/fetch-behance-galleries.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const CDN = "https://mir-s3-cdn-cf.behance.net/project_modules/";

const GALLERIES = {
  "furki-branding": "~05df89253950065.6a75f7d433b53.png ~ceade6253950065.6a75f7d43531b.png ~a80948253950065.6a75f7d43938d.png ~d99ee2253950065.6a75f7d435e8e.png ~386fc3253950065.6a75f7d4377c7.png ~15f45f253950065.6a75f7d434c83.png ~9757e4253950065.6a75f7d43659d.png ~406a8b253950065.6a75f7d436c21.png ~af971d253950065.6a75f7d434729.png ~b8528f253950065.6a75f7d438b97.png ~95cd42253950065.6a75f7d4341a4.png ~328a92253950065.6a75f7d438434.png ~9075db253950065.6a75f7d439b3e.png ~30caf9253950065.6a75f7d435886.png ~5cf798253950065.6a75f7d437e75.png ~059505253950065.6a75f7d43aa17.png ~0712ec253950065.6a75f7d4371e8.png ~547f7f253950065.6a75f7d43a2db.png",
  "premium-packaging": "~a58081244006089.698d8b3302a52.png max_1200_webp/8cf3e2244006089.698d8b330311d.jpg ~c22f60244006089.698d8b3303c09.png ~8a8e01244006089.698d8b330369c.png",
  "brochure-illustration": "~6968c4243983631.698cee5b8c78e.png ~6da89f243983631.698cee5b8dfc0.png ~940d18243983631.698cee5b8d7ee.png ~cd4aa0243983631.698cee5b8cfdb.png",
  "bangla-typography": "~eb25c8243982889.698cea5a60599.png ~87b3df243982889.698cea5a60c32.png",
  "book-covers": "1400_opt_1/1f0f57243982105.698ce609cc084.jpg ~35712e243982105.698ce609cc5cc.jpg",
  "character-portfolio": "~bcc705243981729.698ce3efc96b8.jpg ~140f1b243981729.698ce3efcffa2.jpg ~b30e7a243981729.698ce3efcd6a0.jpg ~d4e4f5243981729.698ce3efcb70d.jpg ~23a519243981729.698ce3efd273a.jpg ~856dec243981729.698ce3efcc8ec.jpg ~6eefda243981729.698ce3efce98f.jpg ~bf1f03243981729.698ce3efcaf87.jpg ~08c54a243981729.698ce3efca9f4.jpg ~aa1c79243981729.698ce3efd0d5f.jpg ~a39931243981729.698ce3efc9cad.jpg ~06fdec243981729.698ce3efd1d44.jpg ~43a05e243981729.698ce3efcdebe.jpg ~e4f5b3243981729.698ce3efca37d.jpg ~f67152243981729.698ce3efd132a.jpg ~399aa5243981729.698ce3efcbc97.jpg ~f5b536243981729.698ce3efcf7df.jpg ~88483a243981729.698ce3efd073f.jpg ~02db2e243981729.698ce3efcd0cb.jpg ~3e9b01243981729.698ce3efcf233.jpg ~eb927e243981729.698ce3efd399a.jpg ~beecf3243981729.698ce3efd2f54.jpg ~aa2086243981729.698ce3efcc29f.jpg",
  "digital-detox-campaign": "~cd0c1f240794711.6946430f809ff.jpg ~e9a999240794711.6946430f80fa6.jpg",
  "digital-paintings": "~45d332240735001.6944b7b377377.jpg",
  "cities-of-bangladesh": "~fb823e240603057.69421c579e441.jpg ~fa23ff240603057.69421c579ecd9.jpg ~5ba0ed240603057.69421c579f808.jpg ~80068c240603057.69421c579fe9f.jpg",
  "skrp-business-card": "~d6a60f236831737.68f3ee10b96b2.jpg",
  "taka-banknote-redesign": "1400_opt_1/773dfa234917261.68cc6ab5dd5e1.jpg 1400_opt_1/75568b234917261.68cc6ab5ddcd1.jpg 1400_opt_1/12afa4234917261.68cc6ab5dcd5d.jpg ~f66e81234917261.68d064d8f2033.jpg",
  "movie-posters-redesign": "~892d29234916941.68cc694eccd2c.jpg ~05cef4234916941.68cc694ecd662.jpg",
  "magazine-layout": "~e292ef234124435.68bd91b900383.png max_1200_webp/3b0bd9234124435.68bd91b8f3685.png ~89174a234124435.68bd91b8f3ce7.jpg",
  "product-photography": "~9183e2230588291.6879396910953.jpg ~a92d95230588291.6879396911099.jpg",
  "social-media-manipulation": "max_1200_webp/5564ec224507117.680bef9791a1a.jpg 1400_opt_1/72252b224507117.680bef97912f8.jpg 1400_opt_1/850038224507117.680bef9792077.jpg max_1200_webp/9e3eb3224507117.682d9d954061e.jpg",
  photography: "~3dbf3d224355965.680978675827f.jpg ~54c571224355965.6809786757a3f.jpg ~e9f747224355965.68225c9d5af94.jpg",
  "packaging-design": "max_1200_webp/b7c691220388341.689110551c1a8.png 1400_opt_1/b56be9220388341.67c1cf8e5ae0a.jpg ~a78ee3220388341.67c1cf8e5b612.png ~261ed4220388341.688fb6641a75f.jpg ~408aca220388341.688fb6641b0a9.jpg max_1200_webp/1c52aa220388341.688fb6641a193.png",
  "my-paintings": "~b894a5220403569.67c205cedcac9.png max_1200_webp/b7f763220403569.67c205cedbbc0.jpg max_1200_webp/d6e44a220403569.67c205cedc3e2.jpg 1400_opt_1/32c2b5220403569.67d4bc934438e.jpg ~3edeb3220403569.67f6d588af611.jpg",
  "cripto-digital-logo": "~1230e4220157535.67be1f0d2b933.png ~2240d0220157535.67be1f0d2b1c6.png max_1200_webp/515ede220157535.67be1fc05bea0.png",
  posters: "~24b41e218231587.679df0a7b56a1.jpg ~7b7d26218231587.679df0a7b5eb5.jpg",
  "carclinic-stationery": "~42b3e5212348757.67338181796de.png ~d43ab1212348757.6733818178d9c.png ~cd4ffe212348757.673381817a85b.png ~f9bdc7212348757.6733818178423.png ~160209212348757.6733818179f32.png 1400_opt_1/83eb7d212348757.673381817b0c6.png",
  thumbnails: "max_1200_webp/dc072c200259907.665f74f749f68.png 1400_opt_1/9c82d1200259907.665f74f74a435.png max_1200_webp/5e064d200259907.6660b9da65cbc.png ~fb6561200259907.6660b9da65572.png ~aa5989200259907.6669afb4cfb1c.png",
  "baby-basket": "1400_opt_1/33e425198350321.663facfe65c8f.png 1400_opt_1/5304ad198350321.6644ff2f084e0.jpg 1400_opt_1/5553af198350321.665dedef450b1.png 1400_opt_1/764bd2198350321.665dedef44299.png max_1200_webp/4f75c3198350321.6660ba89299da.png max_1200_webp/df0f7b198350321.6660ba8929f19.png",
  "the-blackboard": "1400_opt_1/61d1a8198349771.663faa4f947b5.png ~23fef9198349771.6660baf662c1b.jpg",
  "bonoya-mothers-day": "1400_opt_1/0b62a7198350023.663fb1444f302.png",
  manipulations: "max_1200_webp/af2f52198293975.663e7a246057b.jpg ~32267c198293975.663e7a245dc0e.jpg ~7d016d198293975.663e7a245fa2d.jpg ~74af01198293975.663e7a245d546.jpg ~94c9ac198293975.663e7a245e672.jpg ~4be9e7198293975.663e7a245e14d.jpg ~659bcf198293975.663e7a245ff8f.jpg max_1200_webp/1558e6198293975.663e7a245f349.jpg max_1200_webp/f18678198293975.663e7a245ecc7.jpg ~d7affc198293975.663e7a245c944.jpg max_1200_webp/cc2cc8198293975.663e8cc8dea87.jpg max_1200_webp/eee8cc198293975.663e8cc8dfe83.jpg max_1200_webp/efdc24198293975.663e8cc8df6f2.jpg max_1200_webp/54e249198293975.663e8cc8df28c.jpg ~a3be5c198293975.66427773d5b04.jpg 1400_opt_1/766e84198293975.679def2292b54.jpg ~e71db5198293975.67be1927b8097.jpg ~083956198293975.68336b3c93320.jpg",
  foods: "1400_opt_1/52e6a5198287599.663e61564eb62.jpg max_1200_webp/4d5ab0198287599.6660bca4cdc48.png 1400_opt_1/08eed5198287599.67878beb92e09.png max_1200_webp/d3fac1198287599.682d9dea1d0e0.jpg",
  electronics: "max_1200_webp/daf213198298019.663e8d4e5682d.jpg max_1200_webp/defb61198298019.663e8d4e5771c.jpg ~837248198298019.67be1c616eacc.jpg max_1200_webp/1de01e198298019.67be1c616e50f.jpg",
  medical: "~0d5a33198298601.663e906e2be30.jpg",
  retouches: "~6037fc198290535.663e6c08f0610.jpg",
  cars: "1400_opt_1/8f7d74198287163.663e5fdb24de0.jpg",
};

const manifest = {};
let failed = 0;

async function save(slug, entry, index) {
  const response = await fetch(CDN + entry.replace("~", "max_3840_webp/"));
  if (!response.ok) throw new Error(`${slug} ${entry}: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const name = String(index + 1).padStart(2, "0");
  const dir = path.join(process.cwd(), "public", "projects", slug);
  await mkdir(dir, { recursive: true });
  const info = await sharp(buffer)
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(dir, `${name}.webp`));
  return { name, width: info.width, height: info.height };
}

for (const [slug, list] of Object.entries(GALLERIES)) {
  const entries = list.split(" ");
  const results = [];
  for (let i = 0; i < entries.length; i += 5) {
    const batch = entries.slice(i, i + 5).map((entry, j) =>
      save(slug, entry, i + j).catch((error) => {
        failed += 1;
        console.error(error.message);
        return null;
      }),
    );
    results.push(...(await Promise.all(batch)));
  }
  manifest[slug] = results.filter(Boolean);
  console.log(`${slug}: ${manifest[slug].length}/${entries.length}`);
}

await writeFile(path.join(process.cwd(), "src", "content", "project-galleries.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(failed ? `${failed} failed` : "all saved");
