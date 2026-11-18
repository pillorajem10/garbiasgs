import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CDN_IMAGES } from "../../src/seo/constants.js";
import { SOURCE_DIRECTORY } from "./paths.mjs";
import { listSiteImagePaths } from "./siteAssets.mjs";

const CONCURRENT_DOWNLOADS = 6;

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadImage(imagePath) {
  const destination = path.join(SOURCE_DIRECTORY, imagePath);
  if (await fileExists(destination)) return "skipped";

  const response = await fetch(`${CDN_IMAGES}/${imagePath}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return "downloaded";
}

async function runWithConcurrency(items, worker) {
  const results = [];
  let nextIndex = 0;

  const runners = Array.from({ length: CONCURRENT_DOWNLOADS }, async () => {
    while (nextIndex < items.length) {
      const item = items[nextIndex++];
      try {
        results.push({ item, outcome: await worker(item) });
      } catch (error) {
        results.push({ item, outcome: "failed", reason: error.message });
      }
    }
  });

  await Promise.all(runners);
  return results;
}

const imagePaths = await listSiteImagePaths();
console.log(`Downloading ${imagePaths.length} site images into ${SOURCE_DIRECTORY}`);

const results = await runWithConcurrency(imagePaths, downloadImage);
const count = (outcome) => results.filter((result) => result.outcome === outcome).length;

console.log(`Downloaded ${count("downloaded")}, skipped ${count("skipped")}, failed ${count("failed")}`);
results
  .filter((result) => result.outcome === "failed")
  .forEach(({ item, reason }) => console.error(`  ${item}: ${reason}`));

if (count("failed") > 0) process.exitCode = 1;
