import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { cdnImage } from "@/utils/cdn";
import { imageDims } from "@/utils/imageDimensions";
import styles from "./index.module.css";

const OBJECTIVES = [
  "To provide quality service at reasonable cost.",
  "To provide fulfilling, harmonious, and safe workplace.",
  "To delight customers with high quality services.",
  "To make a positive impact in the community.",
  "To ensure compliance with applicable local and international requirements of various agencies.",
  "To continually improve the quality management system of the company.",
];

const HomeObjectivesSection = () => (
  <section className={styles.section} aria-labelledby="home-objectives-heading">
    <div className={styles.inner}>
      <div className={styles.content}>
        <SectionHeader
          eyebrow="What guides us"
          title="Objectives"
          titleId="home-objectives-heading"
        />

        <ul className={styles.objectiveList}>
          {OBJECTIVES.map((objective, index) => (
            <Reveal as="li" key={objective} delay={index * 80} className={styles.objective}>
              {objective}
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal delay={150} className={styles.imageFrame}>
        <OptimizedImage
          sizes="(max-width: 900px) 100vw, 460px"
          src={cdnImage("home1.jpg")}
          {...imageDims("home1.jpg")}
          alt="Garbia engineering and laboratory operations supporting company objectives"
          className={styles.image}
        />
      </Reveal>
    </div>
  </section>
);

export default HomeObjectivesSection;
