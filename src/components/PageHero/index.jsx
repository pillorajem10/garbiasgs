import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import LazyVideo from "@components/LazyVideo";
import styles from "./index.module.css";

/**
 * Charity-style banner: centered H1, rule under title, bold body paragraph.
 * Used on all pages except Home.
 */
export default function ClassicBanner({
  headline,
  body,
  videoSrc,
  children,
}) {
  const bannerTextRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(bannerTextRef, { once: true, amount: 0.25 });

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [inView, controls]);

  const hasExtra = Boolean(children);

  return (
    <header
      className={`${styles.banner} ${hasExtra ? styles.bannerWithChildren : ""}`}
      aria-label="Page hero"
    >
      {videoSrc && (
        <LazyVideo src={videoSrc} className={styles.videoBackground} />
      )}

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.bannerTextOuter}>
        <motion.div
          className={styles.bannerText}
          ref={bannerTextRef}
          initial={{ y: 50, opacity: 0 }}
          animate={controls}
          transition={{ type: "spring", stiffness: 50, damping: 14 }}
        >
          <h1 className={styles.headline}>{headline}</h1>
          <div className={styles.titleRule} role="separator" aria-hidden="true" />
          <p className={styles.body}>{body}</p>
        </motion.div>
      </div>

      {hasExtra && <div className={styles.extra}>{children}</div>}
    </header>
  );
}
