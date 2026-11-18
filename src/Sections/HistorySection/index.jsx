import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { HISTORY_ERAS } from "./data";
import styles from "./index.module.css";

const LINE_SPRING = { stiffness: 120, damping: 30, restDelta: 0.001 };

const HistorySection = () => {
  const timelineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 70%"],
  });
  const lineScale = useSpring(scrollYProgress, LINE_SPRING);

  return (
    <section className={styles.section} aria-labelledby="history-heading">
      <div className={styles.inner}>
        <SectionHeader eyebrow="How we got here" title="Our History" titleId="history-heading" />

        <div ref={timelineRef} className={styles.timeline}>
          <motion.span
            className={styles.line}
            style={{ scaleY: shouldReduceMotion ? 1 : lineScale }}
            aria-hidden="true"
          />
          <ol className={styles.eraList}>
            {HISTORY_ERAS.map(({ title, text }) => (
              <Reveal as="li" key={title} className={styles.era}>
                <span className={styles.marker} aria-hidden="true" />
                <h3 className={styles.eraTitle}>{title}</h3>
                <p className={styles.eraText}>{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
