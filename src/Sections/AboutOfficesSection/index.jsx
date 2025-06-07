import { useState, useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./index.module.css";
import { officeImages } from "./data"; // ➜ Example: ['office1.webp', 'office2.webp', ...]

const AboutOfficesSection = () => {
  const imageUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/garbiaOffices/';

  const mainRef = useRef(null);
  const mainControls = useAnimation();
  const mainInView = useInView(mainRef, { threshold: 0.3 });

  useEffect(() => {
    if (mainInView) mainControls.start({ opacity: 1 });
    else mainControls.start({ opacity: 0 });
  }, [mainInView, mainControls]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % officeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [officeImages.length]);

  return (
    <section className={styles.container}>
      <motion.div
        ref={mainRef}
        className={styles.mainContent}
        initial={{ y: 80, opacity: 0 }}
        animate={mainControls}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        <h2>Step Into Our Workplace</h2>

        <div className={styles.slideshow}>
          <motion.img
            key={current}
            src={`${imageUrl}${officeImages[current]}`}
            alt={`Office ${current + 1}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className={styles.thumbnailRow}>
            {officeImages.map((filename, idx) => (
              <img
                key={idx}
                src={`${imageUrl}${filename}`}
                loading="lazy"
                alt={`Thumbnail ${idx + 1}`}
                className={`${styles.thumbnail} ${current === idx ? styles.active : ""}`}
                onClick={() => setCurrent(idx)}
                onError={(e) => (e.currentTarget.src = "/images/fallback.webp")}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(AboutOfficesSection);
