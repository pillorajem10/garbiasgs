import { useRef, useEffect } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useAutoplayAllowed } from "@/hooks/useAutoplayAllowed";

/**
 * Loads a video only once its container is in view, and never earlier.
 *
 * Two distinct cases:
 *   - `controls` (a video the visitor may want to watch): always loads when in
 *     view, but only starts itself when autoplay is appropriate.
 *   - decorative background loop (no controls, aria-hidden): skipped entirely
 *     when the visitor asked for reduced motion or is on a metered/2G-class
 *     connection. These files are 6–42 MB, and the banner behind them has a
 *     solid fallback colour, so nothing breaks visually.
 */
export default function LazyVideo({ src, className, poster, controls = false }) {
  const ref = useRef(null);
  const visible = useInViewOnce(ref, { rootMargin: "0px" });
  const autoplayAllowed = useAutoplayAllowed();

  const shouldLoad = Boolean(src) && visible && (controls || autoplayAllowed);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad) return;

    if (el.src !== src) {
      el.src = src;
      el.load();
    }

    if (!autoplayAllowed) return;

    const play = () => {
      el.play().catch(() => {});
    };

    if (el.readyState >= 2) {
      play();
      return () => el.pause();
    }

    el.addEventListener("loadeddata", play, { once: true });
    return () => {
      el.removeEventListener("loadeddata", play);
      el.pause();
    };
  }, [shouldLoad, autoplayAllowed, src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay={autoplayAllowed}
      loop
      muted
      playsInline
      preload="none"
      controls={controls}
      aria-hidden={!controls}
    />
  );
}
