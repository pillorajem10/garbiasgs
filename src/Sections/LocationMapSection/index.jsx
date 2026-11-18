import { Link } from "react-router-dom";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1106553024815!2d121.1137044!3d14.5632069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7ee9904b0a1%3A0x6b1b7ceb994b6a40!2sGarbia%20Structural%20and%20Geotechnical%20Solutions!5e0!3m2!1sen!2sph!4v1717304734567!5m2!1sen!2sph";

const LocationMapSection = () => (
  <section className={styles.section} aria-labelledby="map-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="Find us"
        title="Find us on the map"
        titleId="map-heading"
        intro={`${BUSINESS.streetAddress}, ${BUSINESS.addressLocality}, ${BUSINESS.addressRegion} ${BUSINESS.postalCode}`}
      />

      <div className={styles.layout}>
        <Reveal as="address" className={styles.details}>
          <p className={styles.detailRow}>
            <span className={styles.detailLabel}>Tel.</span>
            <a href={`tel:${BUSINESS.telephone}`} className={styles.detailLink}>
              {BUSINESS.telephoneDisplay}
            </a>
          </p>
          <p className={styles.detailRow}>
            <span className={styles.detailLabel}>Email</span>
            <a href={`mailto:${BUSINESS.email}`} className={styles.detailLink}>
              {BUSINESS.email}
            </a>
          </p>
          <p className={styles.detailRow}>
            <span className={styles.detailLabel}>Mobile</span>
            <Link to="/contact" className={styles.detailLink}>
              View all mobile numbers →
            </Link>
          </p>
        </Reveal>

        <Reveal delay={150} className={styles.mapFrame}>
          <iframe
            title={`${BUSINESS.legalName} office location map`}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={styles.map}
          />
        </Reveal>
      </div>
    </div>
  </section>
);

export default LocationMapSection;
