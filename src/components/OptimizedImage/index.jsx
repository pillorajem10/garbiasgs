import { useEffect, useRef, useState } from "react";

/**
 * Shared image component for CDN-served images.
 *
 * All images come straight from the CDN (DigitalOcean Spaces), which has no
 * on-the-fly resizing and no webp/avif negotiation, so this focuses on
 * *perceived* performance rather than responsive sources:
 *   - an immediate skeleton placeholder (CSS only, see `img[data-oi]` in index.css)
 *   - a subtle fade-in once the image decodes
 *   - a neutral fallback box if the image fails
 *   - lazy loading by default; eager + high priority for above-the-fold images
 *
 * Load state is derived from `src` rather than stored as a plain flag, so a
 * component that swaps `src` (the slideshows do, every few seconds) shows the
 * placeholder for the *new* image instead of inheriting the old one's state.
 * That removes the need for callers to force a remount with `key`.
 *
 * Layout shift is prevented by the fixed-height / aspect-ratio frames the call
 * sites already provide (the `className` is kept on the <img>, so existing CSS
 * is untouched).
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  sizes,
  onLoad,
  onError,
  ...rest
}) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);
  const imgRef = useRef(null);

  // On a hydrated (prerendered) page, this mounts *after* the browser has
  // already requested the <img> from the server-rendered markup. A same-
  // origin, cached, high-priority image (e.g. the navbar logo) can finish
  // loading before hydration attaches `onLoad` below, so the native `load`
  // event fires into a void and the skeleton background never clears. This
  // catches that by checking whether the image is already complete on mount.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoadedSrc(src);
    }
  }, [src]);

  if (!src) return null;

  // Failed load: render a neutral box that keeps the frame's size (same class),
  // instead of a broken-image icon.
  if (failedSrc === src) {
    return (
      <span
        className={className}
        style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
        data-oi-error="true"
        role="img"
        aria-label={alt || "Image unavailable"}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      data-oi=""
      data-loaded={loadedSrc === src ? "" : undefined}
      onLoad={(e) => {
        setLoadedSrc(src);
        onLoad?.(e);
      }}
      onError={(e) => {
        setFailedSrc(src);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
