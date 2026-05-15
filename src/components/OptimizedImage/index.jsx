/**
 * Lazy-loaded image with async decode. WebP only when webpSrc is explicitly provided.
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  webpSrc,
  sizes,
  onLoad,
  onError,
  ...rest
}) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  if (!src) return null;

  const imgProps = {
    className,
    src,
    alt: alt ?? "",
    width,
    height,
    loading,
    decoding: "async",
    fetchPriority,
    sizes,
    onLoad,
    onError,
    ...rest,
  };

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img {...imgProps} />
      </picture>
    );
  }

  return <img {...imgProps} />;
}
