import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import LazyVideo from "@components/LazyVideo";
import { cdnVideo } from "@/utils/cdn";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const VIDEO = cdnVideo("DJI_0237_trimmed_clip2.mp4");

const ContactSection = () => {
  const contentRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(contentRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [inView, controls]);

  return (
    <div className={styles.banner}>
      <LazyVideo src={VIDEO} className={styles.videoBackground} />
      <div className={styles.overlay} aria-hidden="true" />

      <motion.div
        className={styles.content}
        ref={contentRef}
        initial={{ y: 40, opacity: 0 }}
        animate={controls}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
      >
        <header className={styles.intro}>
          <h1>Contact Us</h1>
          <p>
            Reach GarBia Structural and Geotechnical Solutions for soil investigation, foundation
            engineering, and construction inquiries. Our team is ready to discuss your project and
            schedule a consultation at our Cainta office or on site.
          </p>
        </header>

        <div className={styles.details}>
          <section className={styles.detailBlock} aria-labelledby="website-heading">
            <h2 id="website-heading" className={styles.blockTitle}>
              Visit Our Website
            </h2>
            <p className={styles.blockText}>
              Explore our website for company updates, services, and project information.
            </p>
            <a
              href={BUSINESS.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              {BUSINESS.websiteUrl}
            </a>
          </section>

          <section className={styles.detailBlock} aria-labelledby="email-heading">
              <h2 id="email-heading" className={styles.blockTitle}>
                Email
              </h2>
              <p className={styles.blockText}>
                Send project drawings, site details, or general questions—we respond to every
                inquiry as soon as possible.
              </p>
              <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
                {BUSINESS.email}
              </a>
            </section>

            <section className={styles.detailBlock} aria-labelledby="tel-heading">
              <h2 id="tel-heading" className={styles.blockTitle}>
                Tel. No.
              </h2>
              <p className={styles.blockText}>
                Call our office line during business hours for appointments, quotations, and
                coordination with our geotechnical team.
              </p>
              <a href={`tel:${BUSINESS.telephone}`} className={styles.contactLink}>
                {BUSINESS.telephoneDisplay}
              </a>
            </section>

            <section className={styles.detailBlock} aria-labelledby="mobile-heading">
              <h2 id="mobile-heading" className={styles.blockTitle}>
                Mobile Nos.
              </h2>
              <p className={styles.blockText}>
                For urgent site concerns or field coordination, contact us on any of the mobile
                numbers below.
              </p>
              <ul className={styles.phoneList}>
                {BUSINESS.mobileNumbers.map(({ tel, display }) => (
                  <li key={tel}>
                    <a href={`tel:${tel}`} className={styles.contactLink}>
                      {display}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.detailBlock} aria-labelledby="office-heading">
              <h2 id="office-heading" className={styles.blockTitle}>
                Office
              </h2>
              <p className={styles.blockText}>
                Lot 10 Block 7 Jasmine Street, Cainta, Rizal—parking available for consultations and
                sample drop-offs.
              </p>
              <Link to="/location" className={styles.officeLink}>
                View map &amp; directions →
              </Link>
            </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
