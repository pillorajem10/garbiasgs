import { useEffect } from "react";

const ANCHOR_VIEWPORT_RATIO = 0.7;

export function useScrollProgress(elementRef) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let frameId = 0;

    const update = () => {
      frameId = 0;
      const { top, height } = element.getBoundingClientRect();
      const anchor = window.innerHeight * ANCHOR_VIEWPORT_RATIO;
      const progress = Math.min(1, Math.max(0, (anchor - top) / height));
      element.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, [elementRef]);
}

export default useScrollProgress;
