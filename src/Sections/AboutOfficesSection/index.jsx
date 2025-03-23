import { useState, useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./index.module.css";

const AboutOfficesSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mainRef = useRef(null);

  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const mainControls = useAnimation();

  const leftInView = useInView(leftRef, { threshold: 0.3 });
  const rightInView = useInView(rightRef, { threshold: 0.3 });
  const mainInView = useInView(mainRef, { threshold: 0.3 });

  useEffect(() => {
    if (leftInView) leftControls.start({ x: 0, opacity: 1 });
    else leftControls.start({ x: -80, opacity: 0 });
  }, [leftInView, leftControls]);

  useEffect(() => {
    if (rightInView) rightControls.start({ x: 0, opacity: 1 });
    else rightControls.start({ x: 80, opacity: 0 });
  }, [rightInView, rightControls]);

  useEffect(() => {
    if (mainInView) mainControls.start({ opacity: 1 });
    else mainControls.start({ opacity: 0 });
  }, [mainInView, mainControls]);

  const licenseImages = Array.from({ length: 12 }, (_, i) => `/images/garbiaOffices/office${i + 1}.webp`);
  const [current, setCurrent] = useState(0);

  // 🔁 Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % licenseImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [licenseImages.length]);

  return (
    <section className={styles.container}>
      <motion.div
        ref={mainRef}
        className={styles.mainContent}
        initial={{ y: 80, opacity: 0 }}   // ✅ from bottom
        animate={mainControls}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        <h2>Our Offices</h2>

        <div className={styles.slideshow}>
          <motion.img
            key={current} // Re-mount to re-trigger animation
            src={licenseImages[current]}
            alt={`License ${current + 1}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className={styles.thumbnailRow}>
            {licenseImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                className={`${styles.thumbnail} ${current === idx ? styles.active : ""}`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(AboutOfficesSection);
