import { useEffect } from "react";
import { canUseFinePointerMotion } from "@/utils/pointerCapabilities";

const MAX_TILT_DEGREES = 5;
const PERSPECTIVE_PX = 900;

export function usePointerTilt(elementRef) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !canUseFinePointerMotion()) return;

    const handlePointerMove = (event) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const horizontalRatio = (event.clientX - left) / width - 0.5;
      const verticalRatio = (event.clientY - top) / height - 0.5;
      const rotateY = horizontalRatio * 2 * MAX_TILT_DEGREES;
      const rotateX = -verticalRatio * 2 * MAX_TILT_DEGREES;
      element.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handlePointerLeave = () => {
      element.style.transform = "";
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", handlePointerLeave);
      element.style.transform = "";
    };
  }, [elementRef]);
}

export default usePointerTilt;
