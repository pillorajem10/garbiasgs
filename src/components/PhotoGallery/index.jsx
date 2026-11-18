import { useState } from "react";
import Button from "@components/Button";
import Lightbox from "@components/Lightbox";
import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import styles from "./index.module.css";

const COLUMN_STAGGER_COUNT = 4;
const STAGGER_MS = 60;

export default function PhotoGallery({
  images,
  label,
  initialCount = 8,
  aspectRatio = "4 / 3",
  isContained = false,
  isOnDark = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const visibleImages = isExpanded ? images : images.slice(0, initialCount);
  const hiddenCount = images.length - visibleImages.length;

  return (
    <div className={styles.gallery}>
      <ul className={styles.grid}>
        {visibleImages.map((image, index) => (
          <Reveal
            as="li"
            key={image.src}
            delay={(index % COLUMN_STAGGER_COUNT) * STAGGER_MS}
          >
            <button
              type="button"
              className={`${styles.thumbnailButton} ${isContained ? styles.contained : ""}`}
              style={{ aspectRatio }}
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo ${index + 1} of ${images.length}: ${label}`}
            >
              <OptimizedImage
                src={image.src}
                alt=""
                sizes="(max-width: 640px) 100vw, 280px"
                className={styles.thumbnail}
              />
              <span className={styles.corner} aria-hidden="true" />
              <span className={styles.zoomHint} aria-hidden="true">
                View
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <div className={styles.footer}>
          <Button variant={isOnDark ? "ghost" : "outline"} onClick={() => setIsExpanded(true)}>
            Show all {images.length} photos
          </Button>
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          images={images}
          startIndex={openIndex}
          label={label}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
