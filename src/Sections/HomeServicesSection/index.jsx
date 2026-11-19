import Button from "@components/Button";
import Card from "@components/Card";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { SERVICE_CATALOG, servicePagePath } from "@/constants/services";
import styles from "./index.module.css";

const HomeServicesSection = () => (
  <section className={styles.section} aria-labelledby="home-services-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="What we do"
        title="Geotechnical and foundation services"
        titleId="home-services-heading"
        intro="Soil investigation, testing, and foundation works for residential, institutional, and government projects."
      />

      <ul className={styles.cardGrid}>
        {SERVICE_CATALOG.map(({ slug, name, description }, index) => (
          <Reveal as="li" key={slug} delay={(index % 3) * 100}>
            <Card to={servicePagePath(slug)} title={name} linkLabel="Learn more">
              <p>{description}</p>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.footer}>
        <Button to="/services" variant="outline" hasArrow>
          View all services
        </Button>
      </Reveal>
    </div>
  </section>
);

export default HomeServicesSection;
