import styles from "./index.module.css";

/**
 * The company's history, as supplied by the business. Sub-headings are an
 * editorial addition — grouping each paragraph under a short label it already
 * supports — not a change to the text itself, which is reproduced in full.
 */
const HistorySection = () => (
  <section className={styles.section} aria-labelledby="history-heading">
    <div className={styles.inner}>
      <h2 id="history-heading" className={styles.heading}>
        Our History
      </h2>

      <article className={styles.era}>
        <h3 className={styles.eraTitle}>Origin</h3>
        <p>
          Garbia Builders and Technology Solutions, OPC is a One Person
          Corporation that traces its origin to Garbia Structural and
          Geotechnical Solutions (GSGS), which was established in April 2018
          in Cainta, Rizal as an underground drilling contractor and soil
          testing laboratory. GSGS provided soil investigation, geotechnical
          laboratory testing, and bored piling works in support of structural
          design and foundation engineering requirements.
        </p>
      </article>

      <article className={styles.era}>
        <h3 className={styles.eraTitle}>Technical growth</h3>
        <p>
          Through years of operation, Garbia Structural and Geotechnical
          Solutions developed technical competence in soil analysis involving
          clay, sand, and rock formations, supported by qualified engineers,
          trained laboratory technicians, and skilled drillers. Its equipment,
          procedures, and testing methodologies are aligned with
          DPWH–Bureau of Research and Standards (DPWH-BRS) as well as
          internationally recognized engineering standards and applicable
          regulatory requirements, ensuring technical accuracy, reliability
          and compliance.
        </p>
      </article>

      <article className={styles.era}>
        <h3 className={styles.eraTitle}>Corporate transition</h3>
        <p>
          In support of its strategic direction, organizational growth and
          service expansion, the company formally transitioned to its
          corporate structure under the name Garbia Builders and Technology
          Solutions, OPC. Under this corporate entity, the organization
          continues to deliver its core geotechnical services—including soil
          testing, subsurface investigation, and bored piling works—while
          expanding its capability to include building construction and
          related engineering and construction services. The organization now
          provides comprehensive, end-to-end technical and construction
          support, reinforcing its position as trusted partner in
          infrastructure and development.
        </p>
      </article>

      <article className={styles.era}>
        <h3 className={styles.eraTitle}>Quality management</h3>
        <p>
          Garbia Builders and Technology Solutions, OPC operates under an
          established Quality Management System (QMS) aligned with ISO
          9001:2015 standards. This ensures consistent service delivery,
          compliance with statutory and regulatory requirements, and
          continuous improvement of processes. The organization is committed
          to maintaining the effectiveness of its quality management system
          through quality planning, risk-based thinking, operational control,
          and performance evaluation across all geotechnical and construction
          activities.
        </p>
      </article>

      <article className={styles.era}>
        <h3 className={styles.eraTitle}>Facilities and people</h3>
        <p>
          The company maintains its principal office, motor pool, and
          geotechnical laboratory facilities at Greenland Executive Village,
          Barangay San Juan, Cainta, Rizal, strategically supporting both
          laboratory and field operations. Continuous training, competence
          development, and awareness programs are implemented to ensure
          personnel remain capable of delivering safe, reliable, and
          standards-compliant geotechnical and construction services.
        </p>
      </article>
    </div>
  </section>
);

export default HistorySection;
