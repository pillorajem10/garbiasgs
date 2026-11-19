import { Link } from "react-router-dom";
import Button from "@components/Button";
import Reveal from "@components/Reveal";
import { SERVICE_CATALOG, servicePagePath } from "@/constants/services";
import { SERVICE_DETAILS } from "@/constants/serviceDetails";
import { BUSINESS } from "@/seo/constants";
import { SERVICE_GROUPS } from "@sections/ServicesSection/data";
import styles from "./index.module.css";

const TEST_GROUP_BY_SERVICE = {
  "laboratory-testing": "Soil Laboratory Testing",
};

function findTestList(slug) {
  const groupTitle = TEST_GROUP_BY_SERVICE[slug];
  return SERVICE_GROUPS.find(({ title }) => title === groupTitle)?.items ?? [];
}

const ServiceOverviewSection = ({ service }) => {
  const detail = SERVICE_DETAILS[service.slug];
  const testList = findTestList(service.slug);
  const otherServices = SERVICE_CATALOG.filter(({ slug }) => slug !== service.slug);

  const blocks = [
    { title: "What the work involves", text: detail.involves },
    { title: "The problem it solves", text: detail.problem },
    { title: "Where it applies", text: detail.applies },
  ];

  return (
    <section className={styles.section} aria-label={`${service.name} overview`}>
      <div className={styles.inner}>
        <div className={styles.content}>
          {blocks.map(({ title, text }, index) => (
            <Reveal as="article" key={title} delay={index * 80} className={styles.block}>
              <h2 className={styles.blockTitle}>{title}</h2>
              <p className={styles.blockText}>{text}</p>
            </Reveal>
          ))}

          {testList.length > 0 && (
            <Reveal as="article" className={styles.block}>
              <h2 className={styles.blockTitle}>Tests we carry out</h2>
              <ul className={styles.testList}>
                {testList.map((test) => (
                  <li key={test} className={styles.testItem}>
                    {test}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <aside className={styles.sidebar} aria-label="Request this service">
          <div className={styles.quoteCard}>
            <p className={styles.quoteEyebrow}>Get started</p>
            <h2 className={styles.quoteTitle}>Request a quote</h2>
            <p className={styles.quoteText}>
              Share the location, structure type, and programme, and we will advise on the
              scope you need.
            </p>
            <Button to="/contact" hasArrow>
              Send your project details
            </Button>
            <a href={`tel:${BUSINESS.telephone}`} className={styles.quoteLink}>
              {BUSINESS.telephoneDisplay}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className={styles.quoteLink}>
              {BUSINESS.email}
            </a>
          </div>

          <nav className={styles.otherServices} aria-label="Other services">
            <h2 className={styles.otherServicesTitle}>Other services</h2>
            <ul className={styles.otherServicesList}>
              {otherServices.map(({ slug, name }) => (
                <li key={slug}>
                  <Link to={servicePagePath(slug)} className={styles.otherServiceLink}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </section>
  );
};

export default ServiceOverviewSection;
