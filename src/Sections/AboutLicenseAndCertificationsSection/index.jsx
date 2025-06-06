import { useState, useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./index.module.css";
import { licenseImages } from "./data"; // Array of filenames like ['license1.webp', 'license2.webp', ...]

const AboutLicenseAndCertificationsSection = () => {
  const imageUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/garbiaLicenses/';

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  const leftInView = useInView(leftRef, { threshold: 0.3 });
  const rightInView = useInView(rightRef, { threshold: 0.3 });

  useEffect(() => {
    if (leftInView) leftControls.start({ x: 0, opacity: 1 });
    else leftControls.start({ x: -80, opacity: 0 });
  }, [leftInView, leftControls]);

  useEffect(() => {
    if (rightInView) rightControls.start({ x: 0, opacity: 1 });
    else rightControls.start({ x: 80, opacity: 0 });
  }, [rightInView, rightControls]);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % licenseImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container}>
      <motion.div
        ref={leftRef}
        className={styles.leftContainer}
        initial={{ x: -80, opacity: 0 }}
        animate={leftControls}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        <h2>Licenses, Accreditations and Memberships</h2>
        <ul>
          <li><p>ISO 9001:2015 Certified</p></li>
          <li><p>DPWH-BRS Accredited</p></li>
          <li>
            <p>ASTM Organizational Member</p>
            <ul className={styles.subList}>
              <li>
                <p>Our laboratory equipment and testing methods are in accordance with ASTM standards & specifications.</p>
              </li>
            </ul>
          </li>
          <li><p>Category "A" PCAB License</p></li>
          <li><p>Philgeps Platinum Membership</p></li>
        </ul>
      </motion.div>

      <motion.div
        ref={rightRef}
        className={styles.rightContainer}
        initial={{ x: 80, opacity: 0 }}
        animate={rightControls}
        transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
      >
        <div className={styles.slideshow}>
          <motion.img
            key={current}
            src={`${imageUrl}${licenseImages[current]}`}
            alt={`License ${current + 1}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className={styles.thumbnailRow}>
            {licenseImages.map((filename, idx) => (
              <img
                key={idx}
                src={`${imageUrl}${filename}`}
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

export default memo(AboutLicenseAndCertificationsSection);
