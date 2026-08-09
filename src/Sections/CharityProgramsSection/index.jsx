import { useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { cdnImage } from "@/utils/cdn";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import styles from "./index.module.css";
import { images } from "./data";

const SLIDE_MS = 5000;
const slides = images.map((file) => cdnImage(`program_charity/${file}`));

const CharityProgramsSection = () => {
  const mainRef = useRef(null);
  const scrollRef = useRef(null);
  const mainControls = useAnimation();
  const mainInView = useInView(mainRef);

  const [current, setCurrent] = useAutoAdvance(slides.length, SLIDE_MS, {
    active: mainInView,
  });

  useEffect(() => {
    if (mainInView) mainControls.start({ opacity: 1 });
    else mainControls.start({ opacity: 0 });
  }, [mainInView, mainControls]);

  const scrollThumbnails = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <LazyBackground
      as="section"
      className={styles.container}
      backgroundUrl={SECTION_BACKGROUNDS.charityPrograms}
    >
      <motion.div
        ref={mainRef}
        className={styles.mainContent}
        initial={{ y: 80, opacity: 0 }}
        animate={mainControls}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        <h2>Spreading Hope Through Every Act of Kindness</h2>
        <div className={styles.slideshow}>
          <motion.img
            key={current}
            src={slides[current]}
            alt={`Charity program photo ${current + 1} of ${slides.length}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.thumbnailWrapper}>
            <button
              type="button"
              className={styles.scrollButton}
              onClick={() => scrollThumbnails("left")}
              aria-label="Scroll thumbnails left"
            >
              ‹
            </button>
            <div className={styles.thumbnailRow} ref={scrollRef}>
              {slides.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles.thumbnailButton} ${current === idx ? styles.active : ""}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Show charity photo ${idx + 1}`}
                  aria-current={current === idx ? "true" : undefined}
                >
                  <OptimizedImage src={src} alt="" className={styles.thumbnailImg} />
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.scrollButton}
              onClick={() => scrollThumbnails("right")}
              aria-label="Scroll thumbnails right"
            >
              ›
            </button>
          </div>
        </div>
      </motion.div>
    </LazyBackground>
  );
};

export default memo(CharityProgramsSection);
