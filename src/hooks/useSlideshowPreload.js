import { useEffect } from "react";
import { preloadImage } from "@/utils/images";

/** Preload current + next slideshow frame when visible */
export function useSlideshowPreload(visible, images, currentIndex) {
  useEffect(() => {
    if (!visible || !images?.length) return;
    const current = images[currentIndex];
    const next = images[(currentIndex + 1) % images.length];
    if (current) void preloadImage(current).catch(() => {});
    if (next && next !== current) void preloadImage(next).catch(() => {});
  }, [visible, images, currentIndex]);
}

export default useSlideshowPreload;
