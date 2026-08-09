import { useRef, useEffect } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { preloadImage } from "@/utils/cdn";

/**
 * Defers CSS background-image until the section is near the viewport.
 * Section CSS should use: background-image: var(--lazy-bg, none);
 */
export default function LazyBackground({
  backgroundUrl,
  className,
  style,
  children,
  as = "section",
  rootMargin = "150px",
  ...rest
}) {
  const Wrapper = as;
  const ref = useRef(null);
  const visible = useInViewOnce(ref, { rootMargin });

  useEffect(() => {
    if (visible && backgroundUrl) {
      void preloadImage(backgroundUrl).catch(() => {});
    }
  }, [visible, backgroundUrl]);

  const mergedStyle = {
    ...style,
    ...(visible && backgroundUrl
      ? { "--lazy-bg": `url("${backgroundUrl}")` }
      : {}),
  };

  return (
    <Wrapper ref={ref} className={className} style={mergedStyle} {...rest}>
      {children}
    </Wrapper>
  );
}
