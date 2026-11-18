import { useEffect, useRef, useState } from "react";
import { responsiveImageSources } from "@/utils/cdn";

const DEFAULT_SIZES = "100vw";

/**
 * Shared image component for CDN-served images.
 *
 * Once the resized AVIF/WebP variants are on the CDN (see
 * OPTIMIZED_VARIANTS_ARE_UPLOADED), CDN photos render as a <picture> with
 * AVIF and WebP srcsets, so each device downloads a file sized for its slot.
 * If a variant fails to load the component falls back to the original file.
 * Until the variants are uploaded, and for non-CDN images, it renders the
 * single original <img>.
 *
 * Perceived performance:
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
  sizes = DEFAULT_SIZES,
  onLoad,
  onError,
  ...rest
}) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);
  const [variantFailedSrc, setVariantFailedSrc] = useState(null);
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

  const variants = variantFailedSrc === src ? null : responsiveImageSources(src);

  const handleError = (event) => {
    if (variants) {
      setVariantFailedSrc(src);
      return;
    }
    setFailedSrc(src);
    onError?.(event);
  };

  const image = (
    <img
      ref={imgRef}
      src={variants ? variants.defaultSrc : src}
      srcSet={variants?.webpSrcSet}
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
      onLoad={(event) => {
        setLoadedSrc(src);
        onLoad?.(event);
      }}
      onError={handleError}
      {...rest}
    />
  );

  if (!variants) return image;

  return (
    <picture data-oi-picture="">
      <source type="image/avif" srcSet={variants.avifSrcSet} sizes={sizes} />
      {image}
    </picture>
  );
}
