import { Link } from "react-router-dom";
import { PRIMARY_NAV } from "@/constants/navigation";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

/**
 * 404 page.
 *
 * Offers the whole primary navigation rather than a single "back to home"
 * link: a visitor who arrived from a stale link or an old-domain URL is far
 * more likely to find what they wanted, and crawlers that reach this page get
 * routes to follow instead of a dead end.
 *
 * The HTTP status is set by nginx, not here — see deploy/docker-nginx.conf.
 * Returning 200 for a missing page is what Google reports as a soft 404.
 */
const DefaultPage = () => (
  <div className={styles.defaultPage}>
    <h1 className={styles.title}>404 — Page Not Found</h1>
    <p className={styles.description}>
      Sorry, that page does not exist or has been moved. It may be an old link
      from a previous version of our website.
    </p>

    <nav aria-label="Site pages" className={styles.nav}>
      <ul className={styles.navList}>
        {PRIMARY_NAV.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className={styles.navLink}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <p className={styles.help}>
      Looking for something specific? Email{" "}
      <a href={`mailto:${BUSINESS.email}`} className={styles.inlineLink}>
        {BUSINESS.email}
      </a>{" "}
      or call{" "}
      <a href={`tel:${BUSINESS.telephone}`} className={styles.inlineLink}>
        {BUSINESS.telephoneDisplay}
      </a>
      .
    </p>

    <Link to="/" className={styles.homeLink}>
      ← Go back to Home
    </Link>
  </div>
);

export default DefaultPage;
