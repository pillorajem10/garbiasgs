import { useRef } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "@components/OptimizedImage";
import { usePointerTilt } from "@/hooks/usePointerTilt";
import { cdnImage } from "@/utils/cdn";
import styles from "./index.module.css";

export default function ProjectTile({ to, title, thumbnail, photoCount, ...rest }) {
  const tileRef = useRef(null);
  usePointerTilt(tileRef);

  const content = (
    <>
      <OptimizedImage
        sizes="(max-width: 640px) 100vw, 300px"
        src={cdnImage(`projects/${thumbnail}`)}
        alt={`${title} geotechnical project site`}
        className={styles.image}
      />
      <span className={styles.corner} aria-hidden="true" />
      <span className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.meta}>
          {photoCount} site photos
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link ref={tileRef} to={to} className={styles.tile} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={tileRef} type="button" className={styles.tile} {...rest}>
      {content}
    </button>
  );
}
