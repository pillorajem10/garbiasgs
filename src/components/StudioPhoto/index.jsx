import { studioPhotoSources } from "@/utils/cdn";

const DEFAULT_SIZES = "100vw";

export default function StudioPhoto({
  photoPath,
  alt = "",
  width,
  height,
  sizes = DEFAULT_SIZES,
  priority = false,
  className,
  onLoad,
  onError,
}) {
  const { avifSrcSet, webpSrcSet, defaultSrc } = studioPhotoSources(photoPath);

  return (
    <picture data-oi-picture="">
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={defaultSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  );
}
