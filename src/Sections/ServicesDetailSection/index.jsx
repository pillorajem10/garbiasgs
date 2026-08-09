import { Link } from "react-router-dom";
import { SERVICE_CATALOG } from "@/seo/structuredData";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

/**
 * Plain-language explanation of each service listed above on the page.
 *
 * The service list itself is a bare bullet list — accurate, but it gives a
 * reader (and a search engine) nothing about what the work involves or when it
 * is needed. Each entry here is anchored at `#<slug>`, which is the same URL
 * the Service structured data points at, so the schema always resolves to
 * content that is genuinely on the page.
 *
 * `SERVICE_CATALOG` supplies the name and summary; the extra copy below adds
 * the problem the service addresses and where it applies. Descriptions are of
 * the named services only — no service the company has not stated it offers.
 */
const DETAIL = {
  "site-assessment": {
    problem:
      "Committing to a drilling programme before anyone has looked at the ground, access, or nearby structures.",
    applies: "All project types, before an investigation scope is agreed.",
  },
  "soil-investigation": {
    problem:
      "Designing a foundation without knowing what the soil below it can actually carry.",
    applies:
      "Residential and institutional buildings, roads, and government infrastructure.",
  },
  "geotechnical-testing": {
    problem:
      "Sample descriptions alone cannot tell you strength, classification, or how much a layer will settle under load.",
    applies: "Any project where foundation loads must be justified numerically.",
  },
  "geotechnical-reports": {
    problem:
      "Raw borehole and laboratory data that the structural designer still has to interpret.",
    applies:
      "Permit submissions and structural design that need a signed geotechnical basis.",
  },
  micropiling: {
    problem:
      "Shallow soils that cannot carry the design load, or sites too tight for conventional piling rigs.",
    applies: "Soft ground, sloping sites, and works alongside existing structures.",
  },
  grouting: {
    problem:
      "Loose or permeable ground that needs improving in place rather than being replaced.",
    applies:
      "Bearing capacity improvement, seepage control, and stabilising weak ground.",
  },
  "laboratory-testing": {
    problem:
      "Material properties that have to be measured to a recognised standard to be accepted.",
    applies:
      "Testing follows ASTM standards and specifications in our own laboratory.",
  },
};

const ServicesDetailSection = () => (
  <section className={styles.section} aria-labelledby="services-detail-heading">
    <div className={styles.inner}>
      <h2 id="services-detail-heading" className={styles.heading}>
        What each service covers
      </h2>
      <p className={styles.intro}>
        A short guide to the geotechnical and construction services GarBia Group
        provides, what each one solves, and where it typically applies. If you
        are unsure which you need, describe the site and we will advise.
      </p>

      <div className={styles.grid}>
        {SERVICE_CATALOG.map((service) => {
          const detail = DETAIL[service.slug];
          return (
            <article key={service.slug} id={service.slug} className={styles.card}>
              <h3 className={styles.cardTitle}>{service.name}</h3>
              <p className={styles.cardBody}>{service.description}</p>
              {detail && (
                <dl className={styles.meta}>
                  <dt>Problem it addresses</dt>
                  <dd>{detail.problem}</dd>
                  <dt>Where it applies</dt>
                  <dd>{detail.applies}</dd>
                </dl>
              )}
            </article>
          );
        })}
      </div>

      <div className={styles.process}>
        <h3 className={styles.processTitle}>How an engagement runs</h3>
        <ol className={styles.processList}>
          <li>
            Tell us the location, structure type, and programme — by{" "}
            <Link to="/contact" className={styles.link}>
              email or phone
            </Link>
            .
          </li>
          <li>
            We assess the site and agree the investigation scope and number of
            boreholes or test pits.
          </li>
          <li>Field work: SPT, coring, or test pits, with samples recovered for testing.</li>
          <li>Laboratory testing of the recovered samples to ASTM methods.</li>
          <li>
            A detailed geotechnical report, including foundation design
            recommendations, is issued to your design team.
          </li>
          <li>
            Where required, we carry out the foundation works themselves —
            micropiling, bored piling, or grouting.
          </li>
        </ol>
      </div>

      <p className={styles.cta}>
        Ready to start?{" "}
        <Link to="/contact" className={styles.link}>
          Request a quote
        </Link>
        , email{" "}
        <a href={`mailto:${BUSINESS.email}`} className={styles.link}>
          {BUSINESS.email}
        </a>
        , or call{" "}
        <a href={`tel:${BUSINESS.telephone}`} className={styles.link}>
          {BUSINESS.telephoneDisplay}
        </a>
        . You can also{" "}
        <Link to="/projects" className={styles.link}>
          see completed projects
        </Link>{" "}
        or{" "}
        <Link to="/location" className={styles.link}>
          visit our Cainta office
        </Link>
        .
      </p>
    </div>
  </section>
);

export default ServicesDetailSection;
