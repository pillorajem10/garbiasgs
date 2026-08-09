import { Link } from "react-router-dom";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

/**
 * Short company introduction below the hero.
 *
 * The homepage previously opened straight into Mission / Vision / Objectives,
 * which never state plainly who the company is, what it sells, or where it
 * works — the three things both a first-time visitor and a search engine need
 * from a homepage. Every claim here is already stated elsewhere on the site
 * (About, Services, Projects); nothing new is asserted about the business.
 */
const HomeIntroSection = () => (
  <section className={styles.section} aria-labelledby="home-intro-heading">
    <div className={styles.inner}>
      <h2 id="home-intro-heading" className={styles.heading}>
        Who we are
      </h2>

      <p className={styles.lead}>
        <strong>GarBia Group</strong> — registered as{" "}
        <strong>GarBia Structural and Geotechnical Solutions</strong> and also
        known as GarBia SGS — is a geotechnical engineering and construction
        services company based in {BUSINESS.addressLocality},{" "}
        {BUSINESS.addressRegion}. Since {BUSINESS.foundingYear} we have carried
        out soil investigation, geotechnical testing, and foundation works for
        residential, institutional, and government projects across Luzon.
      </p>

      <div className={styles.columns}>
        <article className={styles.card}>
          <h3 className={styles.cardTitle}>What we do</h3>
          <p>
            Site assessment, sub-surface soil exploration by SPT, coring and
            test pits, soil laboratory testing, detailed geotechnical reports
            with foundation design recommendations, and micropiling, bored
            piling, and grouting works.
          </p>
          <Link to="/services" className={styles.cardLink}>
            See all geotechnical services →
          </Link>
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Where we work</h3>
          <p>
            Field teams operate throughout Metro Manila, Rizal, and the wider
            Luzon area. Recent investigations include projects in Antipolo,
            Marikina, Pasig, and Taguig.
          </p>
          <Link to="/projects" className={styles.cardLink}>
            View completed projects →
          </Link>
        </article>

        <article className={styles.card}>
          <h3 className={styles.cardTitle}>Why clients choose us</h3>
          <p>
            ISO 9001:2015 certified, DPWH-BRS accredited, PCAB Category “A”
            licensed, PhilGEPS Platinum member, and an ASTM organisational
            member — our laboratory equipment and test methods follow ASTM
            standards.
          </p>
          <Link to="/about" className={styles.cardLink}>
            About GarBia Group →
          </Link>
        </article>
      </div>

      <p className={styles.cta}>
        Planning a build and need soil data before design?{" "}
        <Link to="/contact" className={styles.ctaLink}>
          Request a site investigation quote
        </Link>{" "}
        or call{" "}
        <a href={`tel:${BUSINESS.telephone}`} className={styles.ctaLink}>
          {BUSINESS.telephoneDisplay}
        </a>
        .
      </p>
    </div>
  </section>
);

export default HomeIntroSection;
