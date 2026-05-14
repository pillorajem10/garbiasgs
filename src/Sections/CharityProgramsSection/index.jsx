import { useState, useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./index.module.css";
import { images } from "./data";

const CharityProgramsSection = () => {
  const mainRef = useRef(null);
  const scrollRef = useRef(null);

  const mainControls = useAnimation();
  const mainInView = useInView(mainRef, { threshold: 0.3 });

  const imageUrl = "https://garbia.sgp1.cdn.digitaloceanspaces.com/images/program_charity";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (mainInView) mainControls.start({ opacity: 1 });
    else mainControls.start({ opacity: 0 });
  }, [mainInView, mainControls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollThumbnails = (direction) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.container}>
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
            src={`${imageUrl}/${images[current]}`}
            alt={`Charity program photo ${current + 1} of ${images.length}`}
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
              {images.map((filename, idx) => (
                <button
                  key={filename}
                  type="button"
                  className={`${styles.thumbnailButton} ${current === idx ? styles.active : ""}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Show charity photo ${idx + 1}`}
                  aria-current={current === idx ? "true" : undefined}
                >
                  <img
                    src={`${imageUrl}/${filename}`}
                    alt=""
                    className={styles.thumbnailImg}
                    loading="lazy"
                    decoding="async"
                  />
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
    </section>
  );
};

export default memo(CharityProgramsSection);
