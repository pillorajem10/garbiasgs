import { CDN_IMAGES } from "@/seo/constants";

export function cdnImage(filename) {
  return `${CDN_IMAGES}/${filename}`;
}

export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
