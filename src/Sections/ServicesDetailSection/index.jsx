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
 * `SERVICE_CATALOG` supplies the name and summary; the copy below adds what
 * the work actually involves, the problem it addresses, and where it applies.
 *
 * Scope rule: descriptions cover the named services only — no service the
 * company has not stated it offers. The technical detail is general
 * engineering practice and the published standards the work is measured
 * against (ASTM test methods), which is verifiable; it deliberately states no
 * company specifics such as pricing, programme, or equipment counts.
 */
const DETAIL = {
  "site-assessment": {
    problem:
      "Committing to a drilling programme before anyone has looked at the ground, access, or nearby structures.",
    applies: "All project types, before an investigation scope is agreed.",
    involves:
      "A desk review of available geological and project information, followed by a walkover of the site. This establishes access for rigs, proximity of existing structures and services, surface conditions and any signs of past fill or instability — and from that, how many boreholes or test pits the investigation needs and how deep they should go.",
  },
  "soil-investigation": {
    problem:
      "Designing a foundation without knowing what the soil below it can actually carry.",
    applies:
      "Residential and institutional buildings, roads, and government infrastructure.",
    involves:
      "Boreholes advanced with Standard Penetration Testing to ASTM D1586, where a split-spoon sampler is driven by a 63.5 kg hammer falling 760 mm and the blows per 150 mm increment are logged as the N-value. Coring recovers continuous samples through rock or stiff strata; test pits expose shallow profiles directly. The output is a logged soil profile, the groundwater level, and samples recovered for laboratory testing.",
  },
  "geotechnical-testing": {
    problem:
      "Sample descriptions alone cannot tell you strength, classification, or how much a layer will settle under load.",
    applies: "Any project where foundation loads must be justified numerically.",
    involves:
      "In-situ measurements taken during drilling, combined with laboratory work on the recovered samples, to put numbers against each layer: density and consistency, shear strength, compressibility, and classification. These are the values the structural designer's bearing-capacity and settlement calculations are built on.",
  },
  "geotechnical-reports": {
    problem:
      "Raw borehole and laboratory data that the structural designer still has to interpret.",
    applies:
      "Permit submissions and structural design that need a signed geotechnical basis.",
    involves:
      "Borehole logs and the interpreted soil profile, groundwater conditions, laboratory results, and liquefaction analysis where saturated loose sands are present — carried through to foundation design recommendations: the recommended foundation type, founding depth, and allowable bearing or pile capacity.",
  },
  micropiling: {
    problem:
      "Shallow soils that cannot carry the design load, or sites too tight for conventional piling rigs.",
    applies: "Soft ground, sloping sites, and works alongside existing structures.",
    involves:
      "Small-diameter drilled and grouted piles, reinforced to carry high loads relative to their size. Because the rigs are compact, they reach restricted-access and low-headroom locations that a full-size piling rig cannot — which also makes them the usual choice for underpinning and for work next to or beneath structures that must stay in service.",
  },
  grouting: {
    problem:
      "Loose or permeable ground that needs improving in place rather than being replaced.",
    applies:
      "Bearing capacity improvement, seepage control, and stabilising weak ground.",
    involves:
      "Cement grouting injects grout into voids, fissures, and loose material to bind it and cut permeability. Jet grouting goes further, using a high-pressure jet to erode and mix the soil with grout into engineered soil-cement columns. Which one suits a site depends on whether the ground will accept grout by injection alone.",
  },
  "laboratory-testing": {
    problem:
      "Material properties that have to be measured to a recognised standard to be accepted.",
    applies:
      "Testing follows ASTM standards and specifications in our own laboratory.",
    involves:
      "Index and classification tests — moisture content, specific gravity, Atterberg limits to ASTM D4318, and grain size distribution — establish what the material is. Consolidation (ASTM D2435), unconfined compression, and permeability testing establish how it behaves under load and water. Field density, maximum dry density, CBR (ASTM D1883), and Los Angeles abrasion cover compaction control and pavement work.",
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
                  <dt>What it involves</dt>
                  <dd>{detail.involves}</dd>
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
