import { memo } from "react";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import { cdnImage } from "@/utils/cdn";
import { imageDims } from "@/utils/imageDimensions";
import styles from "./index.module.css";

const MissionVisionVisionSection = () => (
  <LazyBackground
    as="section"
    className={styles.section}
    backgroundUrl={SECTION_BACKGROUNDS.missionVisionVision}
    aria-labelledby="vision-heading"
  >
    <div className={styles.inner}>
      <Reveal className={styles.imageFrame}>
        <OptimizedImage
          sizes="(max-width: 900px) 100vw, 520px"
          src={cdnImage("DJI_0059.jpg")}
          {...imageDims("DJI_0059.jpg")}
          alt="Garbia vision — quality geotechnical services in practice"
          className={styles.image}
        />
      </Reveal>

      <Reveal delay={150} className={styles.text}>
        <p className={styles.eyebrow}>Where we are headed</p>
        <h2 id="vision-heading" className={styles.title}>
          Vision
        </h2>
        <p className={styles.statement}>
          Garbia Builders and Technology Solutions, OPC envisions becoming one of the most
          trusted and preferred providers of integrated geotechnical engineering, foundation
          and construction solutions in Luzon, delivering the highest standards of quality,
          safety, and technical excellence at competitive rates and within committed
          timelines.
        </p>
      </Reveal>
    </div>
  </LazyBackground>
);

export default memo(MissionVisionVisionSection);
