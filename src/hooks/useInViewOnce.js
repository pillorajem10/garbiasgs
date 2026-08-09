import { useInView } from "framer-motion";

/**
 * True once the element has entered the viewport, and stays true afterwards.
 *
 * `margin` expands the observer root, so "150px" starts loading shortly before
 * the element is actually visible. With `once: true`, framer-motion already
 * latches the value permanently — no extra state is needed to hold it.
 */
export function useInViewOnce(ref, options = {}) {
  const { rootMargin = "120px", amount = 0.01, once = true } = options;
  return useInView(ref, { once, amount, margin: rootMargin });
}

export default useInViewOnce;
