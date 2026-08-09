import { useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { cdnImage } from "@/utils/cdn";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import styles from "./index.module.css";
import { officeImages } from "./data";

const SLIDE_MS = 5000;
const slides = officeImages.map((file) => cdnImage(`office/${file}`));

const AboutOfficesSection = () => {
  const mainRef = useRef(null);
  const thumbRowRef = useRef(null);
  const mainControls = useAnimation();
  const mainInView = useInView(mainRef);

  const [current, setCurrent] = useAutoAdvance(slides.length, SLIDE_MS, {
    active: mainInView,
  });

  useEffect(() => {
    if (mainInView) mainControls.start({ opacity: 1 });
    else mainControls.start({ opacity: 0 });
  }, [mainInView, mainControls]);

  // Keep the active thumbnail centred, whether the change came from the timer
  // or from a click. Driving this off `current` covers both without running a
  // side effect inside the state updater.
  useEffect(() => {
    const row = thumbRowRef.current;
    const thumb = row?.children[current];
    if (!row || !thumb) return;
    const left = thumb.offsetLeft - (row.clientWidth - thumb.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [current]);

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
            alt={`GarBia office photo ${current + 1} of ${slides.length}`}
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
              {slides.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  className={`${styles.thumbnailButton} ${current === idx ? styles.active : ""}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Show office photo ${idx + 1}`}
                  aria-selected={current === idx}
                >
                  <OptimizedImage src={src} alt="" className={styles.thumbnailImg} />
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
