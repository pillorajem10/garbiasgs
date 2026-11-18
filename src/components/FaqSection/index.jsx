import { useState, useId } from "react";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import styles from "./index.module.css";

export default function FaqSection({
  title = "Frequently Asked Questions",
  intro,
  faqs,
  id = "faq",
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs?.length) return null;

  return (
    <section className={styles.section} id={id} aria-labelledby={`${baseId}-title`}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="FAQ"
          title={title}
          intro={intro}
          titleId={`${baseId}-title`}
        />
        <Reveal as="ul" delay={120} className={styles.list}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-btn-${index}`;
            return (
              <li
                key={faq.question}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
              >
                <button
                  type="button"
                  id={buttonId}
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={styles.answerWrapper}
                >
                  <div className={styles.answer}>{faq.answer}</div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
