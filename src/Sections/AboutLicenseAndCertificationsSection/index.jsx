import { useRef, useEffect, memo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { cdnImage } from "@/utils/cdn";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import styles from "./index.module.css";
import { licenseImages } from "./data";

const SLIDE_MS = 5000;
const slides = licenseImages.map((file) => cdnImage(`licenses/${file}`));

const AboutLicenseAndCertificationsSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const leftInView = useInView(leftRef);
  const rightInView = useInView(rightRef);

  // The slideshow lives in the right column, so gate it on that column.
  const [current, setCurrent] = useAutoAdvance(slides.length, SLIDE_MS, {
    active: rightInView,
  });

  useEffect(() => {
    if (leftInView) leftControls.start({ x: 0, opacity: 1 });
    else leftControls.start({ x: -80, opacity: 0 });
  }, [leftInView, leftControls]);

  useEffect(() => {
    if (rightInView) rightControls.start({ x: 0, opacity: 1 });
    else rightControls.start({ x: 80, opacity: 0 });
  }, [rightInView, rightControls]);

  return (
    <LazyBackground as="section" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.aboutLicense}>
      <motion.div
        ref={leftRef}
        className={styles.leftContainer}
        initial={{ x: -80, opacity: 0 }}
        animate={leftControls}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        <h2>Licenses, Accreditations and Memberships</h2>
        {/* Each credential carries a plain-language line explaining what it is
            and why it matters to a client. The bare list named them correctly
            but assumed the reader already knew what each one certifies. */}
        <ul>
          <li>
            <p>ISO 9001:2015 Certified</p>
            <ul className={styles.subList}>
              <li>
                <p>
                  The international standard for quality management systems,
                  confirmed by independent third-party audit.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>DPWH-BRS Accredited</p>
            <ul className={styles.subList}>
              <li>
                <p>
                  Accredited by the Department of Public Works and Highways,
                  Bureau of Research and Standards — the recognition Philippine
                  public works require of a materials testing laboratory.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>ASTM Organizational Member</p>
            <ul className={styles.subList}>
              <li>
                <p>
                  Our laboratory equipment and testing methods are in accordance with ASTM standards
                  &amp; specifications.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>Category &quot;A&quot; PCAB License</p>
            <ul className={styles.subList}>
              <li>
                <p>
                  Licensed by the Philippine Contractors Accreditation Board.
                  Category &quot;A&quot; is among the higher contractor
                  classifications, covering larger-scale construction works.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p>Philgeps Platinum Membership</p>
            <ul className={styles.subList}>
              <li>
                <p>
                  Platinum registration on the Philippine Government Electronic
                  Procurement System, the standing required to bid for
                  government projects.
                </p>
              </li>
            </ul>
          </li>
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
            src={slides[current]}
            alt={`License or accreditation document ${current + 1} of ${slides.length}`}
            className={styles.mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.thumbnailRow}>
            {slides.map((src, idx) => (
              <button
                key={src}
                type="button"
                className={`${styles.thumbnailButton} ${current === idx ? styles.active : ""}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Show license image ${idx + 1}`}
                aria-current={current === idx ? "true" : undefined}
              >
                <OptimizedImage src={src} alt="" className={styles.thumbnailImg} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </LazyBackground>
  );
};

export default memo(AboutLicenseAndCertificationsSection);
