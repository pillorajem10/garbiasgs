import { Link } from "react-router-dom";
import Button from "@components/Button";
import { BUSINESS, SAME_AS, SITE_NAME } from "@/seo/constants";
import { SERVICE_CATALOG, servicePagePath } from "@/constants/services";
import { FOOTER_NAV } from "@/constants/navigation";
import styles from "./index.module.css";

const SOCIAL_LINKS = [
  { href: SAME_AS[0], label: "Facebook" },
  { href: SAME_AS[1], label: "LinkedIn" },
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.callToAction}>
      <h2 className={styles.callToActionTitle}>
        Planning a build? Start with the ground beneath it.
      </h2>
      <Button to="/contact" hasArrow isMagnetic>
        Request a quote
      </Button>
    </div>

    <div className={styles.columns}>
      <section className={styles.brandColumn} aria-label={SITE_NAME}>
        <p className={styles.brandName}>{SITE_NAME}</p>
        <p className={styles.brandBlurb}>
          Soil testing, engineering consultancy, and construction works across Luzon,
          Philippines.
        </p>
        <p className={styles.legalName}>
          {BUSINESS.legalName}, formerly GarBia Structural and Geotechnical Solutions (GSGS)
        </p>
        <ul className={styles.socialList}>
          {SOCIAL_LINKS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav className={styles.column} aria-label="Footer">
        <h2 className={styles.columnTitle}>Explore</h2>
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

      <nav className={styles.column} aria-label="Services">
        <h2 className={styles.columnTitle}>Services</h2>
        <ul className={styles.linkList}>
          {SERVICE_CATALOG.map(({ slug, name }) => (
            <li key={slug}>
              <Link to={servicePagePath(slug)} className={styles.link}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className={styles.column} aria-label="Contact">
        <h2 className={styles.columnTitle}>Visit or call</h2>
        <address className={styles.address}>
          {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion}{" "}
          {BUSINESS.postalCode}, Philippines
        </address>
        <ul className={styles.linkList}>
          <li>
            <a href={`mailto:${BUSINESS.email}`} className={styles.link}>
              {BUSINESS.email}
            </a>
          </li>
          <li>
            <a href={`tel:${BUSINESS.telephone}`} className={styles.link}>
              {BUSINESS.telephoneDisplay}
            </a>
          </li>
          <li>
            <a href={`tel:${BUSINESS.phone}`} className={styles.link}>
              {BUSINESS.phoneDisplay}
            </a>
          </li>
        </ul>
      </section>
    </div>

    <p className={styles.copy}>
      &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
    </p>
  </footer>
);

export default Footer;
