import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";
import { POSTER_QUALITY, POSTER_WIDTH } from "../../src/constants/imageVariants.js";
import { CDN_VIDEOS } from "../../src/seo/constants.js";
import { OUTPUT_DIRECTORY } from "./paths.mjs";
import { SITE_VIDEO_FILES } from "./siteAssets.mjs";

const run = promisify(execFile);
const POSTER_TIMESTAMP_SECONDS = "1";
const POSTER_DIRECTORY = path.join(OUTPUT_DIRECTORY, "posters");

async function createPoster(videoFile) {
  const stem = path.parse(videoFile).name;
  const framePath = path.join(os.tmpdir(), `garbia-poster-${stem}.png`);

  await run("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-ss",
    POSTER_TIMESTAMP_SECONDS,
    "-i",
    `${CDN_VIDEOS}/${videoFile}`,
    "-frames:v",
    "1",
    framePath,
  ]);

  const posterPath = path.join(POSTER_DIRECTORY, `${stem}.webp`);
  const info = await sharp(framePath)
    .resize({ width: POSTER_WIDTH, withoutEnlargement: true })
    .webp({ quality: POSTER_QUALITY })
    .toFile(posterPath);
  await rm(framePath);

  return { posterPath, size: info.size };
}

await mkdir(POSTER_DIRECTORY, { recursive: true });
console.log(`Creating ${SITE_VIDEO_FILES.length} video posters in ${POSTER_DIRECTORY}`);

for (const videoFile of SITE_VIDEO_FILES) {
  const { posterPath, size } = await createPoster(videoFile);
  console.log(`  ${path.basename(posterPath)} (${(size / 1024).toFixed(0)} KB)`);
}
