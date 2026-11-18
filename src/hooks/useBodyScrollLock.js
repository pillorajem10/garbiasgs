import { useEffect } from "react";

export function useBodyScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);
}

export default useBodyScrollLock;
