import { Link } from "react-router-dom";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { useActiveSectionId } from "@/hooks/useActiveSectionId";
import { BUSINESS } from "@/seo/constants";
import { SERVICE_CATALOG, servicePagePath } from "@/constants/services";
import { SERVICE_DETAILS } from "@/constants/serviceDetails";
import styles from "./index.module.css";

const SERVICE_SECTION_IDS = SERVICE_CATALOG.map(({ slug }) => slug);

const ServicesDetailSection = () => {
  const activeServiceId = useActiveSectionId(SERVICE_SECTION_IDS);

  return (
    <section className={styles.section} aria-labelledby="services-detail-heading">
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Service guide"
          title="What each service covers"
          titleId="services-detail-heading"
          intro="A short guide to the geotechnical and construction services Garbia Group provides, what each one solves, and where it typically applies. If you are unsure which you need, describe the site and we will advise."
        />

        <div className={styles.layout}>
          <nav className={styles.serviceNav} aria-label="Services on this page">
            <ul className={styles.serviceNavList}>
              {SERVICE_CATALOG.map(({ slug, name }) => (
                <li key={slug}>
                  <a
                    href={`#${slug}`}
                    className={styles.serviceNavLink}
                    aria-current={activeServiceId === slug ? "location" : undefined}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.serviceList}>
            {SERVICE_CATALOG.map(({ slug, name, description }) => (
              <Reveal as="article" key={slug} id={slug}>
                <div className={styles.service}>
                  <h3 className={styles.serviceTitle}>
                    <Link to={servicePagePath(slug)} className={styles.serviceTitleLink}>
                      {name}
                    </Link>
                  </h3>
                  <p className={styles.serviceSummary}>{description}</p>
                  <dl className={styles.details}>
                    <div className={styles.detailRow}>
                      <dt>Where it applies</dt>
                      <dd>{SERVICE_DETAILS[slug].applies}</dd>
                    </div>
                  </dl>
                  <Link to={servicePagePath(slug)} className={styles.serviceLink}>
                    Read the full guide to {name.toLowerCase()}
                    <span aria-hidden="true"> →</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal as="p" className={styles.callToAction}>
          Ready to start?{" "}
          <Link to="/contact" className={styles.inlineLink}>
            Request a quote
          </Link>
          , email{" "}
          <a href={`mailto:${BUSINESS.email}`} className={styles.inlineLink}>
            {BUSINESS.email}
          </a>
          , or call{" "}
          <a href={`tel:${BUSINESS.telephone}`} className={styles.inlineLink}>
            {BUSINESS.telephoneDisplay}
          </a>
          . You can also{" "}
          <Link to="/projects" className={styles.inlineLink}>
            see completed projects
          </Link>{" "}
          or{" "}
          <Link to="/location" className={styles.inlineLink}>
            visit our Cainta office
          </Link>
          .
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesDetailSection;
