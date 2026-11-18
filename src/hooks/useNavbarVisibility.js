import { useEffect, useState } from "react";

const SCROLLED_THRESHOLD_PX = 24;
const HIDE_AFTER_PX = 240;
const DIRECTION_TOLERANCE_PX = 6;

export function useNavbarVisibility() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let isFrameQueued = false;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const distance = currentScrollY - previousScrollY;

      setIsScrolled(currentScrollY > SCROLLED_THRESHOLD_PX);

      if (currentScrollY < HIDE_AFTER_PX) {
        setIsHidden(false);
      } else if (distance > DIRECTION_TOLERANCE_PX) {
        setIsHidden(true);
      } else if (distance < -DIRECTION_TOLERANCE_PX) {
        setIsHidden(false);
      }

      if (Math.abs(distance) > DIRECTION_TOLERANCE_PX) {
        previousScrollY = currentScrollY;
      }
      isFrameQueued = false;
    };

    const handleScroll = () => {
      if (isFrameQueued) return;
      isFrameQueued = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled, isHidden };
}

export default useNavbarVisibility;
