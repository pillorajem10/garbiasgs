import Button from "@components/Button";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import { cdnImage } from "@/utils/cdn";
import { imageDims } from "@/utils/imageDimensions";
import styles from "./index.module.css";

const HomeMissionVisionSection = () => (
  <LazyBackground
    as="section"
    className={styles.section}
    backgroundUrl={SECTION_BACKGROUNDS.homeMissionVision}
    aria-label="Mission and vision"
  >
    <div className={styles.inner}>
      <div className={styles.columns}>
        <Reveal as="article" className={styles.column}>
          <div className={styles.imageFrame}>
            <OptimizedImage
              sizes="(max-width: 900px) 100vw, 580px"
              src={cdnImage("DJI_0226.jpg")}
              {...imageDims("DJI_0226.jpg")}
              alt="GarBia team at a project site illustrating the company mission"
              className={styles.image}
            />
          </div>
          <h2 className={styles.title}>Mission</h2>
          <p>
            GarBia Builders and Technology Solutions, OPC is committed to
            delivering soil drilling, geotechnical investigation, bored piling,
            and construction services with a high level of quality, accuracy,
            and technical reliability in support of the Philippines pursuit of
            safe, durable, and standards-compliant infrastructure.
          </p>
          <p>
            The company strives to operate in harmony with its employees,
            clients, partners, and stakeholders by promoting integrity,
            professionalism, safety, and sustainable development in all its
            operations.
          </p>
        </Reveal>

        <Reveal as="article" delay={150} className={styles.column}>
          <div className={styles.imageFrame}>
            <OptimizedImage
              sizes="(max-width: 900px) 100vw, 580px"
              src={cdnImage("DJI_0059.jpg")}
              {...imageDims("DJI_0059.jpg")}
              alt="Geotechnical field work representing GarBia vision for quality infrastructure"
              className={styles.image}
            />
          </div>
          <h2 className={styles.title}>Vision</h2>
          <p>
            GarBia Group aims to be one of the preferred and trusted service
            provider for geotechnical services with the highest quality
            standards and competitive rates, delivered in a timely manner in
            Luzon.
          </p>
        </Reveal>
      </div>

      <Reveal className={styles.footer}>
        <Button to="/mission-vision" variant="ghost" hasArrow>
          Read our mission and vision
        </Button>
      </Reveal>
    </div>
  </LazyBackground>
);

export default HomeMissionVisionSection;
