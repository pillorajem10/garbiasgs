import { useEffect, useState } from "react";
import { observeIntersection } from "@/utils/intersection";

export function useInViewOnce(ref, options = {}) {
  const { rootMargin = "120px", amount = 0.01 } = options;
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let stopObserving = () => {};
    stopObserving = observeIntersection(element, { rootMargin, threshold: amount }, (isIntersecting) => {
      if (!isIntersecting) return;
      setHasEntered(true);
      stopObserving();
    });
    return () => stopObserving();
  }, [ref, rootMargin, amount]);

  return hasEntered;
}

export default useInViewOnce;
