import { useRef } from "react";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { PROCESS_STEPS } from "@/constants/processSteps";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import styles from "./index.module.css";

const STEP_STAGGER_MS = 120;

const ProcessSection = ({ id, eyebrow, title, intro }) => {
  const stepListRef = useRef(null);
  const isTimelineDrawn = useInViewOnce(stepListRef, {
    rootMargin: "0px",
    amount: 0.3,
  });

  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <SectionHeader
          isOnDark
          eyebrow={eyebrow}
          title={title}
          titleId={`${id}-heading`}
          intro={intro}
        />

        <ol
          ref={stepListRef}
          className={`${styles.stepList} ${isTimelineDrawn ? styles.drawn : ""}`}
        >
          {PROCESS_STEPS.map(({ title: stepTitle, description }, index) => (
            <Reveal
              as="li"
              key={stepTitle}
              delay={index * STEP_STAGGER_MS}
              className={styles.step}
            >
              <span className={styles.stepNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{stepTitle}</h3>
              <p className={styles.stepDescription}>{description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
