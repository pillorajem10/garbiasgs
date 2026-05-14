import { useRef, useEffect, useId } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import styles from "./index.module.css";

const ContactBannerSection = () => {
  const bannerTextRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(bannerTextRef, { threshold: 0.3 });
  const formId = useId();

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 50, opacity: 0 });
    }
  }, [inView, controls]);

  const field = (name) => `${formId}-${name}`;

  return (
    <div className={styles.banner}>
      <video
        className={styles.videoBackground}
        src="https://garbia.sgp1.cdn.digitaloceanspaces.com/videos/DJI_0237_trimmed_clip2.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className={styles.overlay} aria-hidden="true" />

      <motion.div
        className={styles.bannerText}
        ref={bannerTextRef}
        initial={{ y: 50, opacity: 0 }}
        animate={controls}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
      >
        <div className={styles.grid}>
          <div className={styles.qrSection}>
            <img
              src="https://garbia.sgp1.cdn.digitaloceanspaces.com/images/qr-code.webp"
              alt="QR code to email GarBia"
              className={styles.qrImage}
              loading="lazy"
              decoding="async"
            />
            <h2 className={styles.qrCaption}>Scan To Send An Email</h2>
          </div>

          <div className={styles.formSection}>
            <h1 id={field("heading")} className={styles.contactHeader}>
              Message Us
            </h1>
            <form className={styles.form} aria-labelledby={field("heading")}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor={field("first")}>First Name *</label>
                  <input id={field("first")} name="firstName" type="text" autoComplete="given-name" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor={field("last")}>Last Name</label>
                  <input id={field("last")} name="lastName" type="text" autoComplete="family-name" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={field("email")}>Email *</label>
                <input id={field("email")} name="email" type="email" autoComplete="email" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={field("phone")}>Phone Number *</label>
                <input id={field("phone")} name="phone" type="tel" autoComplete="tel" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={field("message")}>Message *</label>
                <textarea id={field("message")} name="message" rows={3} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={field("file")}>Upload File</label>
                <input id={field("file")} name="attachment" type="file" />
                <p className={styles.fileNote}>Max file size: 20MB</p>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactBannerSection;
