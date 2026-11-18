import LazyVideo from "@components/LazyVideo";
import Breadcrumbs from "@components/Breadcrumbs";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const { latitude, longitude } = BUSINESS.geo;
const COORDINATES_LABEL = `${latitude.toFixed(4)}° N · ${longitude.toFixed(4)}° E`;

export default function PageHero({
  eyebrow,
  headline,
  body,
  videoSrc,
  actions,
  isFeatured = false,
  children,
}) {
  const classNames = [styles.hero, isFeatured && styles.featured]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classNames} aria-label="Page hero">
      {videoSrc && <LazyVideo src={videoSrc} className={styles.video} />}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.blueprintGrid} aria-hidden="true" />

      <div className={styles.content}>
        <Breadcrumbs className={styles.breadcrumbs} />
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.body}>{body}</p>
        {children}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {isFeatured && (
        <span className={styles.scrollCue} aria-hidden="true">
          Scroll
        </span>
      )}

      <p className={styles.coordinates} aria-hidden="true">
        {COORDINATES_LABEL}
      </p>
    </header>
  );
}
