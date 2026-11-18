import { CDN_IMAGES, CDN_VIDEOS, CDN_ASSET_VERSION } from "@/seo/constants";
import {
  BACKGROUND_VARIANT_WIDTH,
  DEFAULT_VARIANT_WIDTH,
  IMAGE_VARIANT_WIDTHS,
  OPTIMIZED_VARIANTS_ARE_UPLOADED,
} from "@/constants/imageVariants";

const VARIANT_SOURCE_PATTERN = /^(.+)\.(jpe?g|png)(\?.*)?$/i;
const FILE_STEM_PATTERN = /\/([^/]+)\.[^./?]+(\?.*)?$/;

/**
 * Cache-busting query param. The DO Spaces CDN (and browsers) cache each
 * exact URL for an hour, so overwriting a file on Spaces under the same name
 * doesn't reach visitors who already have it cached until that hour is up.
 * Bumping CDN_ASSET_VERSION changes every CDN URL's querystring, which forces
 * both the CDN edge and browsers to fetch fresh copies immediately.
 */
function versioned(url) {
  return `${url}?v=${CDN_ASSET_VERSION}`;
}

/** CDN image URL from a path relative to the images root. */
export function cdnImage(path) {
  return versioned(`${CDN_IMAGES}/${path}`);
}

/** CDN video URL from a filename relative to the videos root. */
export function cdnVideo(path) {
  return versioned(`${CDN_VIDEOS}/${path}`);
}

function splitVariantSource(src) {
  if (!OPTIMIZED_VARIANTS_ARE_UPLOADED || !src.startsWith(CDN_IMAGES)) return null;
  const match = VARIANT_SOURCE_PATTERN.exec(src);
  if (!match) return null;
  const [, base, extension, query = ""] = match;
  const mimeType = extension.toLowerCase() === "png" ? "image/png" : "image/jpeg";
  return { base, query, mimeType };
}

function variantUrl({ base, query }, width, format) {
  return `${base}-${width}.${format}${query}`;
}

function variantSrcSet(source, format) {
  return IMAGE_VARIANT_WIDTHS.map(
    (width) => `${variantUrl(source, width, format)} ${width}w`
  ).join(", ");
}

export function responsiveImageSources(src) {
  const source = splitVariantSource(src);
  if (!source) return null;
  return {
    avifSrcSet: variantSrcSet(source, "avif"),
    webpSrcSet: variantSrcSet(source, "webp"),
    defaultSrc: variantUrl(source, DEFAULT_VARIANT_WIDTH, "webp"),
  };
}

export function optimizedImageUrl(src, width) {
  const source = splitVariantSource(src);
  return source ? variantUrl(source, width, "webp") : src;
}

export function backgroundImageValue(src) {
  const source = splitVariantSource(src);
  if (!source) return `url("${src}")`;

  const candidates = [
    `url("${variantUrl(source, BACKGROUND_VARIANT_WIDTH, "avif")}") type("image/avif")`,
    `url("${variantUrl(source, BACKGROUND_VARIANT_WIDTH, "webp")}") type("image/webp")`,
    `url("${src}") type("${source.mimeType}")`,
  ];
  return `image-set(${candidates.join(", ")})`;
}

export function cdnVideoPoster(videoSrc) {
  if (!OPTIMIZED_VARIANTS_ARE_UPLOADED) return undefined;
  const match = FILE_STEM_PATTERN.exec(videoSrc);
  if (!match) return undefined;
  const [, stem, query = ""] = match;
  return `${CDN_IMAGES}/posters/${stem}.webp${query}`;
}
