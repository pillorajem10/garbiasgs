import { memo } from "react";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import { cdnImage } from "@/utils/cdn";
import { imageDims } from "@/utils/imageDimensions";
import styles from "./index.module.css";

const MissionVisionMissionSection = () => (
  <LazyBackground
    as="section"
    className={styles.section}
    backgroundUrl={SECTION_BACKGROUNDS.missionVisionMission}
    aria-labelledby="mission-heading"
  >
    <div className={styles.inner}>
      <Reveal className={styles.text}>
        <p className={styles.eyebrow}>What we commit to</p>
        <h2 id="mission-heading" className={styles.title}>
          Mission
        </h2>
        <p className={styles.statement}>
          Garbia Builders and Technology Solutions, OPC is committed to delivering soil
          drilling, geotechnical investigation, bored piling, and construction services with
          a high level of quality, accuracy, and technical reliability in support of the
          Philippines pursuit of safe, durable, and standards-compliant infrastructure.
        </p>
        <p>
          The company shall implement, maintain and continually improve its Quality
          Management System to ensure compliance with applicable statutory, regulatory, and
          client requirements.
        </p>
        <p>
          Garbia Builders and Technology Solutions, OPC strives to operate in harmony with
          its employees, clients, partners, and stakeholders by promoting integrity,
          professionalism, safety, and sustainable development in all its operations.
        </p>
      </Reveal>

      <Reveal delay={150} className={styles.imageFrame}>
        <OptimizedImage
          sizes="(max-width: 900px) 100vw, 520px"
          src={cdnImage("DJI_0180.JPG")}
          {...imageDims("DJI_0180.JPG")}
          alt="GarBia mission — engineering team and equipment in the field"
          className={styles.image}
        />
      </Reveal>
    </div>
  </LazyBackground>
);

export default memo(MissionVisionMissionSection);
