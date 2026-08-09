import { useEffect, useState } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Whether it is reasonable to auto-download and auto-play a decorative video.
 *
 * The background videos are large (6–42 MB each), so pulling them on a metered
 * or very slow connection costs the visitor real money and blocks bandwidth the
 * page needs for text, fonts, and images. We also honour reduced-motion, since
 * these are looping ambient clips with no pause control.
 *
 * Deliberately conservative: only `Save-Data` and 2G-class connections are
 * excluded, not 3G, which is still common in the Philippines.
 */
function readPreference() {
  if (typeof window === "undefined") return true;

  if (window.matchMedia?.(REDUCED_MOTION).matches) return false;

  const connection = navigator.connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) {
    return false;
  }
  return true;
}

export function useAutoplayAllowed() {
  const [allowed, setAllowed] = useState(readPreference);

  useEffect(() => {
    const motionQuery = window.matchMedia?.(REDUCED_MOTION);
    const connection = navigator.connection;
    const update = () => setAllowed(readPreference());

    motionQuery?.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      motionQuery?.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return allowed;
}

export default useAutoplayAllowed;
