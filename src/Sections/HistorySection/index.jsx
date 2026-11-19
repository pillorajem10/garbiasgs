import { useRef } from "react";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { HISTORY_ERAS } from "./data";
import styles from "./index.module.css";

const HistorySection = () => {
  const timelineRef = useRef(null);
  useScrollProgress(timelineRef);

  return (
    <section className={styles.section} aria-labelledby="history-heading">
      <div className={styles.inner}>
        <SectionHeader eyebrow="How we got here" title="Our History" titleId="history-heading" />

        <div ref={timelineRef} className={styles.timeline}>
          <span className={styles.line} aria-hidden="true" />
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
