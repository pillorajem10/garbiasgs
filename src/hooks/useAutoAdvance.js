import { useEffect, useState } from "react";

/**
 * Cycles an index over 0..count-1 on a timer. Drop-in shaped like useState.
 *
 * The timer only runs while `active` is true and the tab is visible. Without
 * that gate the slideshows keep advancing off-screen, and because every slide
 * swap mounts a fresh <img>, they quietly pull their whole image set from the
 * CDN whether or not anyone is looking — ~5 MB for the 27-image charity strip.
 *
 * Callers pass `active` from the `useInView` they already have for their
 * entrance animation, so this adds no extra IntersectionObserver.
 */
export function useAutoAdvance(count, delay, { active = true } = {}) {
  const [index, setIndex] = useState(0);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!active || !pageVisible || count < 2) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % count),
      delay,
    );
    return () => clearInterval(id);
  }, [active, pageVisible, count, delay]);

  return [index, setIndex];
}

export default useAutoAdvance;
