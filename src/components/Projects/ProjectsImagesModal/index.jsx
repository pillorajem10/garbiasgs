import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

/** Treat very small or extreme-aspect images as unsuitable for the hero stage */
function shouldUseMainPlaceholder(naturalWidth, naturalHeight) {
  if (!naturalWidth || !naturalHeight) return true;
  const ar = naturalWidth / naturalHeight;
  const tooSmall = naturalWidth < 380 && naturalHeight < 260;
  const tooTallThin = ar < 0.28;
  const tooWideStrip = ar > 4.2;
  return tooSmall || tooTallThin || tooWideStrip;
}

const ProjectsImagesModal = ({ imagesRoute, onClose }) => {
  const imageBaseUrl = "https://garbia.sgp1.cdn.digitaloceanspaces.com/images/projects/";
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const [mainState, setMainState] = useState("loading"); // loading | ready | placeholder | error
  const [thumbUi, setThumbUi] = useState(() => ({})); // index -> 'loading' | 'loaded' | 'error'

  const imageList = imagesRoute.map((img) => `${imageBaseUrl}${img}`);

  const setThumb = useCallback((index, status) => {
    setThumbUi((prev) => ({ ...prev, [index]: status }));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPr = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPr;
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const activeThumb = container?.children[currentIndex];
    if (activeThumb && container) {
      const offsetLeft = activeThumb.offsetLeft;
      const containerWidth = container.offsetWidth;
      const thumbWidth = activeThumb.offsetWidth;
      container.scrollTo({
        left: offsetLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const currentSrc = imageList[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setThumbUi({});
  }, [imagesRoute]);

  useEffect(() => {
    if (!currentSrc) return;

    setMainState("loading");
    const img = new Image();
    let cancelled = false;

    const done = () => {
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      if (cancelled) return;
      done();
      if (shouldUseMainPlaceholder(img.naturalWidth, img.naturalHeight)) {
        setMainState("placeholder");
      } else {
        setMainState("ready");
      }
    };

    img.onerror = () => {
      if (cancelled) return;
      done();
      setMainState("error");
    };

    img.src = currentSrc;

    return () => {
      cancelled = true;
      done();
    };
  }, [currentSrc]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const scrollThumbnails = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 100;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Project photo gallery"
      >
        {imageList.length > 0 && (
          <>
            <div className={styles.slideShow}>
              <div className={styles.mainStage}>
                {mainState === "loading" && (
                  <div className={styles.mainSkeleton} aria-busy="true" aria-label="Loading image" />
                )}

                {mainState === "placeholder" && (
                  <div className={styles.mainPlaceholder} role="img" aria-label="Preview not available for this image size or shape">
                    <div className={styles.placeholderGlyph} aria-hidden />
                    <p className={styles.placeholderText}>This photo is too small or an unusual shape for a large preview.</p>
                    <p className={styles.placeholderHint}>Use the thumbnails below to view other project images.</p>
                  </div>
                )}

                {mainState === "error" && (
                  <div className={styles.mainPlaceholder} role="alert">
                    <div className={`${styles.placeholderGlyph} ${styles.placeholderGlyphError}`} aria-hidden />
                    <p className={styles.placeholderText}>This image could not be loaded.</p>
                  </div>
                )}

                {mainState === "ready" && (
                  <img
                    key={currentSrc}
                    src={currentSrc}
                    alt={`Project photo ${currentIndex + 1} of ${imageList.length}`}
                    className={styles.mainImage}
                    loading="eager"
                    decoding="async"
                  />
                )}

                <button
                  type="button"
                  className={`${styles.arrowButton} ${styles.left}`}
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={`${styles.arrowButton} ${styles.right}`}
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  →
                </button>
                <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close gallery">
                  ✕
                </button>
              </div>
            </div>

            <div className={styles.thumbnailWrapper}>
              <button
                type="button"
                className={styles.thumbnailNavButton}
                onClick={() => scrollThumbnails("left")}
                aria-label="Scroll thumbnails left"
              >
                ‹
              </button>
              <div className={styles.thumbnailContainer} ref={scrollRef}>
                {imageList.map((img, index) => {
                  const tState = thumbUi[index] ?? "loading";
                  return (
                    <button
                      key={img}
                      type="button"
                      className={`${styles.thumbnailButton} ${index === currentIndex ? styles.active : ""}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Show project photo ${index + 1}`}
                      aria-current={index === currentIndex ? "true" : undefined}
                    >
                      <span className={styles.thumbCell}>
                        {tState === "loading" && (
                          <span className={styles.thumbSkeleton} aria-hidden />
                        )}
                        {tState === "error" && (
                          <span className={styles.thumbError} aria-hidden title="Failed to load" />
                        )}
                        <img
                          src={img}
                          alt=""
                          className={`${styles.thumbnailImg} ${tState === "loaded" ? styles.thumbnailImgVisible : ""}`}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => setThumb(index, "loaded")}
                          onError={() => setThumb(index, "error")}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className={styles.thumbnailNavButton}
                onClick={() => scrollThumbnails("right")}
                aria-label="Scroll thumbnails right"
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default React.memo(ProjectsImagesModal);
