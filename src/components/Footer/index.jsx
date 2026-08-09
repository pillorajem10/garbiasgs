import { Link } from "react-router-dom";
import { BUSINESS, SITE_NAME } from "@/seo/constants";
import { FOOTER_NAV } from "@/constants/navigation";
import styles from "./index.module.css";

/**
 * The footer is the one block on every page, which makes it where the name,
 * address, and phone number belong. Local search cares that those three agree
 * with the Google Business Profile and with directory listings, so the address
 * here is rendered from the single BUSINESS record rather than retyped.
 */
const Footer = () => (
  <footer className={styles.footer}>
    <nav className={styles.nav} aria-label="Footer">
      <ul className={styles.linkList}>
        {FOOTER_NAV.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className={styles.link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <p className={styles.identity}>
      <strong>{SITE_NAME}</strong> — {BUSINESS.legalName}
    </p>

    <address className={styles.address}>
      {BUSINESS.streetAddress}, {BUSINESS.addressLocality},{" "}
      {BUSINESS.addressRegion} {BUSINESS.postalCode}, Philippines
    </address>

    <p className={styles.contact}>
      <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
        {BUSINESS.email}
      </a>
      <span className={styles.contactSep} aria-hidden>
        {" "}
        ·{" "}
      </span>
      <a href={`tel:${BUSINESS.telephone}`} className={styles.contactLink}>
        {BUSINESS.telephoneDisplay}
      </a>
      <span className={styles.contactSep} aria-hidden>
        {" "}
        ·{" "}
      </span>
      <a href={`tel:${BUSINESS.phone}`} className={styles.contactLink}>
        {BUSINESS.phoneDisplay}
      </a>
    </p>

    <p className={styles.copy}>
      &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
    </p>
  </footer>
);

export default Footer;
