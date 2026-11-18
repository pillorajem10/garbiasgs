import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_HASH_LOOKUP_FRAMES = 60;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      return;
    }

    let remainingFrames = MAX_HASH_LOOKUP_FRAMES;
    let frameId;

    const scrollToHashTarget = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
      remainingFrames -= 1;
      if (remainingFrames > 0) frameId = window.requestAnimationFrame(scrollToHashTarget);
    };

    scrollToHashTarget();
    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
