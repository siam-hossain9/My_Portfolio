// Compresses the curated project showcase images into web-optimized WebP files
// under public/projects/<slug>/. Sources live across the E: drive.
//
// Outputs per slug:
//   cover.webp — 640px-wide STATIC cover for the card grid (first frame for GIF sources)
//   1..N.webp  — full-size gallery images for the detail modal (animated preserved)
//
// Run: node scripts/process-project-images.mjs
import sharp from "sharp";
import { mkdirSync, statSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public", "projects");

// Entries are either a path string or { src, cropTop?, cropBottom? } (crop in
// source pixels, applied before resize — e.g. to remove a stale app header).
// The Dororo screenshots predate the app's rebrand (old "WASUSANOCH" header),
// so the navbar is cropped out; the content below it is the real app.
const DORORO_CROP = { cropTop: 72 };

const MANIFEST = {
  "customer-support": [
    "E:/N8N/customer support ai agent/Screenshot 2026-04-27 195040.png",
  ],
  // Anonymized production workflow canvases from the CV portfolio doc
  // (E:/CV/job cv/Siam_Hossain_Nayon_n8n_Portfolio.html)
  "realestate-engine": [
    "E:/CV/job cv/screenshots/clean/re-03-score-push.png",
    "E:/CV/job cv/screenshots/clean/re-01-listings-ingest.png",
    "E:/CV/job cv/screenshots/clean/re-02-enrich.png",
    "E:/CV/job cv/screenshots/clean/re-04-comping.png",
  ],
  "cold-outreach": [
    "E:/CV/job cv/screenshots/clean/uw-03-reply-classifier.png",
    "E:/CV/job cv/screenshots/clean/uw-01-ingest.png",
    "E:/CV/job cv/screenshots/clean/uw-02-opener.png",
    "E:/CV/job cv/screenshots/clean/uw-04-build-demo.png",
    "E:/CV/job cv/screenshots/clean/uw-05-ops.png",
  ],
  "devops-incident": [
    "E:/CV/job cv/screenshots/DevOps-Incident-Response-Automation.png",
  ],
  "social-media": [
    "E:/CV/job cv/screenshots/N8N-Automation-social-media.png",
  ],
  dororo: [
    { src: "E:/agent/clockwatch/screenshots/Screenshot 2026-04-17 023151.png", ...DORORO_CROP },
    { src: "E:/agent/clockwatch/screenshots/Screenshot 2026-04-17 023205.png", ...DORORO_CROP },
    { src: "E:/agent/clockwatch/screenshots/Screenshot 2026-04-17 023231.png", ...DORORO_CROP },
    { src: "E:/agent/clockwatch/screenshots/Screenshot 2026-04-17 023304.png", ...DORORO_CROP, cropBottom: 96 },
  ],
  "virtual-pet": [
    "E:/agent/virtual-pet/Screenshot 2026-04-17 023716.png",
    "E:/agent/virtual-pet/Screenshot 2026-04-17 023645.png",
    "E:/agent/virtual-pet/Screenshot 2026-04-17 023809.png",
    "E:/agent/virtual-pet/Screenshot 2026-04-17 023625.png",
  ],
  suki: ["E:/Tanisha/music app/Untitled.png"],
  "marigold-bay": [
    "E:/Games Build/junk first game/art/chapters/ch01/l1/base.png",
    "E:/Games Build/junk first game/art/chapters/ch01/l4/base.png",
    "E:/Games Build/junk first game/art/chapters/ch01/l3/base.png",
    "E:/Games Build/junk first game/art/chapters/ch01/l4/qc-preview.png",
  ],
  "snake-game": [
    "E:/project/Snake Game/two player.png",
    "E:/project/Snake Game/single player.png",
    "E:/project/Snake Game/menu.png",
  ],
  wallop: ["E:/agent/imagination/wallop/docs/demo.gif"],
  galaxy: [
    "E:/11th semester/PAPER MODEL/Galaxy detection/images/grad_cam.png",
    "E:/11th semester/PAPER MODEL/Galaxy detection/images/tsne_embeddings.png",
    "E:/11th semester/PAPER MODEL/Galaxy detection/images/topk_anomalies.png",
    "E:/11th semester/PAPER MODEL/Galaxy detection/images/confusion_matrix.png",
  ],
  "few-shot": [
    "E:/11th semester/11th semester/fewshot_finegrained/figures/fig1_main_results.png",
    "E:/11th semester/11th semester/fewshot_finegrained/figures/fig4_heatmap.png",
    "E:/11th semester/11th semester/fewshot_finegrained/figures/fig3_classifier_comparison.png",
    "E:/11th semester/11th semester/fewshot_finegrained/figures/fig2_backbone_comparison.png",
  ],
};

const kb = (p) => Math.round(statSync(p).size / 1024);
const summary = {};
let missing = 0;

function base(entry) {
  return typeof entry === "string" ? { src: entry } : entry;
}

// Load a source with crops applied (crop before resize, in source pixels).
async function loadCropped({ src, cropTop = 0, cropBottom = 0 }, { animated }) {
  const img = sharp(src, animated ? { animated: true } : {}).rotate();
  if (cropTop || cropBottom) {
    const meta = await sharp(src).metadata();
    img.extract({
      left: 0,
      top: cropTop,
      width: meta.width,
      height: meta.height - cropTop - cropBottom,
    });
  }
  return img;
}

for (const [slug, sources] of Object.entries(MANIFEST)) {
  const outDir = join(PUB, slug);
  mkdirSync(outDir, { recursive: true });
  summary[slug] = [];

  for (let i = 0; i < sources.length; i++) {
    const entry = base(sources[i]);
    if (!existsSync(entry.src)) {
      console.warn(`  ! MISSING: ${entry.src}`);
      missing++;
      continue;
    }
    const animated = entry.src.toLowerCase().endsWith(".gif");

    try {
      // Gallery image (index 1..N) — animation preserved for GIF sources.
      const out = join(outDir, `${i + 1}.webp`);
      const galleryImg = await loadCropped(entry, { animated });
      const maxW = animated ? 620 : 1500;
      await galleryImg
        .resize({ width: maxW, withoutEnlargement: true })
        .webp({ quality: animated ? 50 : 80, effort: 6 })
        .toFile(out);
      summary[slug].push(`${i + 1}.webp (${kb(entry.src)}KB -> ${kb(out)}KB)`);

      // Static 640px cover for the card grid, from the first source only.
      if (i === 0) {
        const coverOut = join(outDir, "cover.webp");
        const coverImg = await loadCropped(entry, { animated: false }); // first frame for GIFs
        await coverImg
          .resize({ width: 640, withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(coverOut);
        summary[slug].push(`cover.webp (${kb(coverOut)}KB)`);
      }
    } catch (err) {
      console.error(`  ! FAILED ${entry.src}: ${err.message}`);
      missing++;
    }
  }
}

console.log("\n=== processed ===");
for (const [slug, files] of Object.entries(summary)) {
  console.log(`${slug}: ${files.length ? files.join(", ") : "none"}`);
}
if (missing > 0) {
  console.error(`\n${missing} source(s) missing or failed`);
  process.exitCode = 1;
}
