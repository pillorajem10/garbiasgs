import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function Card({
  to,
  title,
  linkLabel,
  titleTag: TitleTag = "h3",
  className = "",
  children,
}) {
  return (
    <Link to={to} className={`${styles.card} ${className}`}>
      <TitleTag className={styles.title}>{title}</TitleTag>
      <div className={styles.body}>{children}</div>
      <span className={styles.linkLabel}>
        {linkLabel}
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}
