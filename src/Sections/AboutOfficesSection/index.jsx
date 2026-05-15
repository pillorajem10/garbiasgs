import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import styles from "./index.module.css";
import { officeImages } from "./data";

const AboutOfficesSection = () => {
  const imageUrl = "https://garbia.sgp1.cdn.digitaloceanspaces.com/images/office/";
  const mainRef = useRef(null);
  const thumbRowRef = useRef(null);
  const mainControls = useAnimation();
  const mainInView = useInView(mainRef, { threshold: 0.3 });
  const [current, setCurrent] = useState(0);
  const slides = officeImages.map((f) => `${imageUrl}${f}`);

  const scrollThumbIntoView = useCallback((idx) => {
    const row = thumbRowRef.current;
    const thumb = row?.children[idx];
    if (!row || !thumb) return;
    const left = thumb.offsetLeft - (row.clientWidth - thumb.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  const selectSlide = useCallback(
    (idx) => {
      setCurrent(idx);
      scrollThumbIntoView(idx);
    },
    [scrollThumbIntoView],
  );

  useEffect(() => {
    if (mainInView) mainControls.start({ opacity: 1 });
    else mainControls.start({ opacity: 0 });
  }, [mainInView, mainControls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % officeImages.length;
        scrollThumbIntoView(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [scrollThumbIntoView]);

  return (
    <LazyBackground as="section" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.aboutOffices}>
      <motion.div
        ref={mainRef}
        className={styles.mainContent}
        initial={{ opacity: 0 }}
        animate={mainControls}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        <h2>Step Into Our Workplace</h2>
        <div className={styles.slideshow}>
          <motion.img
            key={current}
            src={slides[current]}
            alt={`GarBia office photo ${current + 1} of ${officeImages.length}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.thumbnailStrip}>
            <div
              ref={thumbRowRef}
              className={styles.thumbnailRow}
              role="tablist"
              aria-label="Office photo thumbnails"
            >
              {officeImages.map((filename, idx) => (
                <button
                  key={filename}
                  type="button"
                  role="tab"
                  className={`${styles.thumbnailButton} ${current === idx ? styles.active : ""}`}
                  onClick={() => selectSlide(idx)}
                  aria-label={`Show office photo ${idx + 1}`}
                  aria-selected={current === idx}
                >
                  <OptimizedImage
                    src={`${imageUrl}${filename}`}
                    alt=""
                    className={styles.thumbnailImg}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </LazyBackground>
  );
};

export default memo(AboutOfficesSection);
