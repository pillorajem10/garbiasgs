import { useRef, useEffect } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

/**
 * Loads and plays background video only when the banner is in view.
 */
export default function LazyVideo({ src, className, poster, controls = false }) {
  const ref = useRef(null);
  const visible = useInViewOnce(ref, { rootMargin: "0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !visible || !src) return;

    if (!el.src || el.src !== src) {
      el.src = src;
      el.load();
    }

    const play = () => {
      el.play().catch(() => {});
    };

    if (el.readyState >= 2) play();
    else el.addEventListener("loadeddata", play, { once: true });

    return () => {
      el.pause();
    };
  }, [visible, src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      controls={controls}
      aria-hidden={!controls}
    />
  );
}
