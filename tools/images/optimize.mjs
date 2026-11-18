import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  AVIF_QUALITY,
  IMAGE_VARIANT_WIDTHS,
  WEBP_QUALITY,
} from "../../src/constants/imageVariants.js";
import { OUTPUT_DIRECTORY, SOURCE_DIRECTORY } from "./paths.mjs";

const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const CONCURRENT_IMAGES = 3;

const FORMATS = [
  { extension: "avif", encode: (pipeline) => pipeline.avif({ quality: AVIF_QUALITY, effort: 4 }) },
  { extension: "webp", encode: (pipeline) => pipeline.webp({ quality: WEBP_QUALITY }) },
];

async function listSourceImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listSourceImages(entryPath);
      return SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
    })
  );
  return nested.flat();
}

async function isUpToDate(outputPath, sourceModifiedTime) {
  try {
    return (await stat(outputPath)).mtimeMs >= sourceModifiedTime;
  } catch {
    return false;
  }
}

async function createVariants(sourcePath) {
  const relativePath = path.relative(SOURCE_DIRECTORY, sourcePath);
  const { dir, name } = path.parse(relativePath);
  const outputDirectory = path.join(OUTPUT_DIRECTORY, dir);
  const sourceModifiedTime = (await stat(sourcePath)).mtimeMs;
  const sourceBuffer = await readFile(sourcePath);
  let writtenCount = 0;
  let writtenBytes = 0;

  await mkdir(outputDirectory, { recursive: true });

  for (const width of IMAGE_VARIANT_WIDTHS) {
    for (const { extension, encode } of FORMATS) {
      const outputPath = path.join(outputDirectory, `${name}-${width}.${extension}`);
      if (await isUpToDate(outputPath, sourceModifiedTime)) continue;

      const pipeline = sharp(sourceBuffer).rotate().resize({ width, withoutEnlargement: true });
      const info = await encode(pipeline).toFile(outputPath);
      writtenCount += 1;
      writtenBytes += info.size;
    }
  }

  return { sourceBytes: sourceBuffer.length, writtenCount, writtenBytes };
}

async function runWithConcurrency(items, worker) {
  const results = [];
  let nextIndex = 0;

  const runners = Array.from({ length: CONCURRENT_IMAGES }, async () => {
    while (nextIndex < items.length) {
      const item = items[nextIndex++];
      const result = await worker(item);
      results.push(result);
      console.log(`  [${results.length}/${items.length}] ${path.relative(SOURCE_DIRECTORY, item)}`);
    }
  });

  await Promise.all(runners);
  return results;
}

const toMegabytes = (bytes) => (bytes / 1024 / 1024).toFixed(1);

const sourceImages = await listSourceImages(SOURCE_DIRECTORY);
if (sourceImages.length === 0) {
  console.error(`No .jpg or .png files found in ${SOURCE_DIRECTORY}. Run "npm run download" first.`);
  process.exit(1);
}

console.log(`Optimizing ${sourceImages.length} images from ${SOURCE_DIRECTORY}`);
const results = await runWithConcurrency(sourceImages, createVariants);

const total = (key) => results.reduce((sum, result) => sum + result[key], 0);
console.log(
  `\nWrote ${total("writtenCount")} files (${toMegabytes(total("writtenBytes"))} MB) to ${OUTPUT_DIRECTORY}`
);
console.log(`Original images total ${toMegabytes(total("sourceBytes"))} MB`);
