import { useEffect, useState } from "react";
import { useInView } from "framer-motion";

/** True once element has entered the viewport (with optional rootMargin). */
export function useInViewOnce(ref, options = {}) {
  const { rootMargin = "120px", amount = 0.01, once = true } = options;
  const inView = useInView(ref, { once, amount, margin: rootMargin });
  // framer-motion `margin` expands the root viewport (e.g. "150px" preloads before visible)
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (inView) setHasBeenVisible(true);
  }, [inView]);

  return hasBeenVisible || inView;
}

export default useInViewOnce;
