# Image tools

Generates resized AVIF and WebP versions of the site's CDN photos, plus a poster frame for each hero video. Kept in its own package so `sharp` never enters the Docker build.

## Run it

```bash
cd tools/images
npm install
npm run download
npm run optimize
npm run posters
```

- `download` fetches the originals the site uses from the CDN into `image-source/`. Skip it if you already have the originals: pass `--source <folder>` to `optimize` instead (the folder must mirror the Spaces `images/` layout).
- `optimize` writes `<name>-<width>.avif` and `<name>-<width>.webp` for widths 480, 800, 1200, 1600 and 1920 into `image-output/`, mirroring the folder structure. It skips files that are already up to date.
- `posters` needs `ffmpeg` on your PATH and writes `image-output/posters/<video name>.webp`.

## Publish it

1. Upload everything inside `image-output/` to the Spaces bucket under `images/`, keeping the folders (so `image-output/posters` becomes `images/posters`). Keep the original files where they are.
2. Set `OPTIMIZED_VARIANTS_ARE_UPLOADED` to `true` in `src/constants/imageVariants.js`.
3. Build and deploy the site.

Widths, quality and the poster width live in `src/constants/imageVariants.js`, which both these tools and the site read.
