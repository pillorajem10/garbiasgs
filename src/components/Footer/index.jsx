import { Link } from "react-router-dom";
import { BUSINESS } from "@/seo/constants";
import { FOOTER_NAV } from "@/constants/navigation";
import styles from "./index.module.css";

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
    <p className={styles.contact}>
      <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
        {BUSINESS.email}
      </a>
      <span className={styles.contactSep} aria-hidden>
        {" "}
        ·{" "}
      </span>
      <a href={`tel:${BUSINESS.phone}`} className={styles.contactLink}>
        {BUSINESS.phoneDisplay}
      </a>
    </p>
    <p className={styles.copy}>&copy; {new Date().getFullYear()} GarBia Group. All rights reserved.</p>
  </footer>
);

export default Footer;
