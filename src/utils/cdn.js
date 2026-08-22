import { CDN_IMAGES, CDN_VIDEOS, CDN_ASSET_VERSION } from "@/seo/constants";

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

/** Warms the browser cache for `src`; resolves when decoded, rejects on failure. */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
