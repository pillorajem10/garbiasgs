import { useState, useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./index.module.css";
import { images } from "./data"; // now using this array of filenames like 'charity1.webp'

const CharityProgramsSection = () => {
  const mainRef = useRef(null);
  const scrollRef = useRef(null);
  
  const mainControls = useAnimation();
  const mainInView = useInView(mainRef, { threshold: 0.3 });

  const imageUrl = "https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/programImages";
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
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
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
            alt={`Charity ${current + 1}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
            <div className={styles.thumbnailWrapper}>
                <button className={styles.scrollButton} onClick={() => scrollThumbnails('left')}>‹</button>
                <div className={styles.thumbnailRow} ref={scrollRef}>
                    {images.map((filename, idx) => (
                    <img
                        key={idx}
                        src={`${imageUrl}/${filename}`}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`${styles.thumbnail} ${current === idx ? styles.active : ""}`}
                        onClick={() => setCurrent(idx)}
                    />
                    ))}
                </div>
                <button className={styles.scrollButton} onClick={() => scrollThumbnails('right')}>›</button>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(CharityProgramsSection);
