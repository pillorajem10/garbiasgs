import { CDN_IMAGES, CDN_VIDEOS } from "@/seo/constants";

/** CDN image URL from a path relative to the images root. */
export function cdnImage(path) {
  return `${CDN_IMAGES}/${path}`;
}

/** CDN video URL from a filename relative to the videos root. */
export function cdnVideo(path) {
  return `${CDN_VIDEOS}/${path}`;
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
