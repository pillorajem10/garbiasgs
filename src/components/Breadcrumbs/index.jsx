import { Link, useLocation } from "react-router-dom";
import { getBreadcrumbTrail } from "@/constants/navigation";
import styles from "./index.module.css";

export default function Breadcrumbs({ className = "" }) {
  const { pathname } = useLocation();
  const trail = getBreadcrumbTrail(pathname);

  if (!trail.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={styles.list}>
        {trail.map(({ to, label }, index) => {
          const isCurrentPage = index === trail.length - 1;
          return (
            <li key={to} className={styles.item}>
              {isCurrentPage ? (
                <span aria-current="page" className={styles.current}>
                  {label}
                </span>
              ) : (
                <Link to={to} className={styles.link}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
