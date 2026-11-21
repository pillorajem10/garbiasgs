import { useEffect, useState } from "react";

const IDLE_TIMEOUT_MS = 2000;

export function useAfterPageLoad() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    let idleHandle;

    const scheduleReady = () => {
      const markLoaded = () => setIsPageLoaded(true);
      idleHandle =
        "requestIdleCallback" in window
          ? window.requestIdleCallback(markLoaded, { timeout: IDLE_TIMEOUT_MS })
          : window.setTimeout(markLoaded, IDLE_TIMEOUT_MS);
    };

    if (document.readyState === "complete") {
      scheduleReady();
    } else {
      window.addEventListener("load", scheduleReady, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleReady);
      if ("requestIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
    };
  }, []);

  return isPageLoaded;
}
