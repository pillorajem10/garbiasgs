import { useEffect } from "react";
import { canUseFinePointerMotion } from "@/utils/pointerCapabilities";

const PULL_STRENGTH = 0.3;

export function useMagneticPull(elementRef, isEnabled = true) {
  useEffect(() => {
    const element = elementRef.current;
    if (!isEnabled || !element || !canUseFinePointerMotion()) return;

    const handlePointerMove = (event) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const offsetX = event.clientX - (left + width / 2);
      const offsetY = event.clientY - (top + height / 2);
      element.style.transform = `translate(${offsetX * PULL_STRENGTH}px, ${offsetY * PULL_STRENGTH}px)`;
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
  }, [elementRef, isEnabled]);
}

export default useMagneticPull;
