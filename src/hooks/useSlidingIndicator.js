import { useCallback, useEffect, useState } from "react";

const HIDDEN_INDICATOR = { offsetX: 0, width: 0, isVisible: false };

export function useSlidingIndicator(containerRef, targetKey) {
  const [indicator, setIndicator] = useState(HIDDEN_INDICATOR);

  const measureTarget = useCallback(() => {
    const target = containerRef.current?.querySelector(
      `[data-indicator-key="${targetKey}"]`
    );

    if (!target) {
      setIndicator(HIDDEN_INDICATOR);
      return;
    }

    setIndicator({
      offsetX: target.offsetLeft,
      width: target.offsetWidth,
      isVisible: true,
    });
  }, [containerRef, targetKey]);

  useEffect(() => {
    measureTarget();
    window.addEventListener("resize", measureTarget);
    document.fonts?.ready.then(measureTarget);
    return () => window.removeEventListener("resize", measureTarget);
  }, [measureTarget]);

  return indicator;
}

export default useSlidingIndicator;
