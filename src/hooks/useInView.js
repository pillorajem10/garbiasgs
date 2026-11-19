import { useEffect, useState } from "react";
import { observeIntersection } from "@/utils/intersection";

export function useInView(ref, options = {}) {
  const { rootMargin = "0px", amount = 0 } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return observeIntersection(element, { rootMargin, threshold: amount }, setIsInView);
  }, [ref, rootMargin, amount]);

  return isInView;
}

export default useInView;
