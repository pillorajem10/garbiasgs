import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import LazyVideo from "@components/LazyVideo";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const VIDEO =
  "https://garbia.sgp1.cdn.digitaloceanspaces.com/videos/DJI_0237_trimmed.mp4";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1106553024815!2d121.1137044!3d14.5632069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7ee9904b0a1%3A0x6b1b7ceb994b6a40!2sGarbia%20Structural%20and%20Geotechnical%20Solutions!5e0!3m2!1sen!2sph!4v1717304734567!5m2!1sen!2sph";

const LocationBannerSection = () => {
  const contentRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(contentRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (inView) controls.start({ y: 0, opacity: 1 });
  }, [inView, controls]);

  return (
    <section className={styles.page} aria-label="GarBia office location">
      <LazyVideo src={VIDEO} className={styles.videoBackground} />
      <div className={styles.overlay} aria-hidden="true" />

      <motion.div
        ref={contentRef}
        className={styles.inner}
        initial={{ y: 32, opacity: 0 }}
        animate={controls}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
      >
        <header className={styles.copy}>
          <h1 className={styles.headline}>Location</h1>
          <div className={styles.titleRule} role="separator" aria-hidden="true" />
          <p className={styles.lead}>
            GarBia Group is at Lot 10 Block 7 Jasmine Street, Cainta, Rizal—easy to reach from
            Metro Manila and nearby provinces. Parking is available for consultations and sample
            drop-offs.
          </p>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactLabel}>Tel.</span>{" "}
              <a href={`tel:${BUSINESS.telephone}`} className={styles.contactLink}>
                {BUSINESS.telephoneDisplay}
              </a>
            </li>
            <li>
              <span className={styles.contactLabel}>Email</span>{" "}
              <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <Link to="/contact" className={styles.contactLink}>
                View all mobile numbers →
              </Link>
            </li>
          </ul>
        </header>

        <div className={styles.mapSection}>
          <h2 className={styles.mapHeading}>Find us on the map</h2>
          <p className={styles.mapHint}>
            {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion}{" "}
            {BUSINESS.postalCode}
          </p>
          <div className={styles.mapContainer}>
            <iframe
              title="GarBia Structural and Geotechnical Solutions office location map"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LocationBannerSection;
