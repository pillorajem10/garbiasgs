import styles from "./index.module.css";

/**
 * Lightweight branded full-area loader for Suspense (code-split routes).
 */
const BrandedPageLoader = () => {
  return (
    <div className={styles.root} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.inner}>
        <div className={styles.spinnerWrap} aria-hidden>
          <div className={styles.spinner} />
          <div className={styles.spinnerCore} />
        </div>
        <p className={styles.brand}>GarBia</p>
        <p className={styles.tagline}>Structural &amp; Geotechnical Solutions</p>
        <p className={styles.loadingLine}>Loading your content…</p>
      </div>
    </div>
  );
};

export default BrandedPageLoader;
