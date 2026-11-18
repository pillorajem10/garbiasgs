import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LIGHTBOX_VARIANT_WIDTH, THUMBNAIL_VARIANT_WIDTH } from "@/constants/imageVariants";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { optimizedImageUrl } from "@/utils/cdn";
import styles from "./index.module.css";

const SWIPE_THRESHOLD_PX = 50;

export default function Lightbox({ images, startIndex = 0, label, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const thumbnailStripRef = useRef(null);
  const swipeStartXRef = useRef(null);
  const dialogRef = useDialogFocus(onClose);
  useBodyScrollLock();

  const imageCount = images.length;
  const currentImage = images[currentIndex];

  const showImageAt = useCallback(
    (index) => {
      setIsImageLoaded(false);
      setHasImageFailed(false);
      setCurrentIndex((index + imageCount) % imageCount);
    },
    [imageCount]
  );

  const showPrevious = useCallback(
    () => showImageAt(currentIndex - 1),
    [showImageAt, currentIndex]
  );
  const showNext = useCallback(
    () => showImageAt(currentIndex + 1),
    [showImageAt, currentIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPrevious, showNext]);

  useEffect(() => {
    [currentIndex - 1, currentIndex + 1].forEach((index) => {
      const neighbour = images[(index + imageCount) % imageCount];
      if (neighbour) new Image().src = optimizedImageUrl(neighbour.src, LIGHTBOX_VARIANT_WIDTH);
    });
  }, [currentIndex, images, imageCount]);

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const activeThumbnail = strip?.children[currentIndex];
    if (!strip || !activeThumbnail) return;
    const centredLeft =
      activeThumbnail.offsetLeft - (strip.clientWidth - activeThumbnail.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, centredLeft), behavior: "smooth" });
  }, [currentIndex]);

  const handlePointerDown = (event) => {
    swipeStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (swipeStartXRef.current === null) return;
    const distance = event.clientX - swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (distance > SWIPE_THRESHOLD_PX) showPrevious();
    if (distance < -SWIPE_THRESHOLD_PX) showNext();
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <header className={styles.topBar}>
          <p className={styles.counter} aria-live="polite">
            {currentIndex + 1} / {imageCount}
          </p>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close gallery"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <div
          className={styles.stage}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            swipeStartXRef.current = null;
          }}
        >
          {!isImageLoaded && !hasImageFailed && (
            <div className={styles.skeleton} aria-busy="true" />
          )}
          {hasImageFailed ? (
            <p className={styles.errorMessage} role="alert">
              This image could not be loaded.
            </p>
          ) : (
            <img
              key={currentImage.src}
              src={optimizedImageUrl(currentImage.src, LIGHTBOX_VARIANT_WIDTH)}
              alt={currentImage.alt}
              className={`${styles.image} ${isImageLoaded ? styles.imageReady : ""}`}
              draggable={false}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setHasImageFailed(true)}
            />
          )}

          {imageCount > 1 && (
            <>
              <button
                type="button"
                className={`${styles.arrowButton} ${styles.previous}`}
                onClick={showPrevious}
                aria-label="Previous image"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className={`${styles.arrowButton} ${styles.next}`}
                onClick={showNext}
                aria-label="Next image"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}
        </div>

        {currentImage.caption && (
          <p className={styles.caption}>{currentImage.caption}</p>
        )}

        {imageCount > 1 && (
          <div ref={thumbnailStripRef} className={styles.thumbnailStrip}>
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ""}`}
                onClick={() => showImageAt(index)}
                aria-label={`Show image ${index + 1} of ${imageCount}`}
                aria-current={index === currentIndex ? "true" : undefined}
              >
                <img
                  src={optimizedImageUrl(image.src, THUMBNAIL_VARIANT_WIDTH)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
