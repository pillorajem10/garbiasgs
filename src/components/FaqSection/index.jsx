import { useState, useId } from "react";
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
      <h2 id={`${baseId}-title`} className={styles.heading}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
      <ul className={styles.list}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-btn-${index}`;
          return (
            <li key={faq.question} className={styles.item}>
              <button
                type="button"
                id={buttonId}
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.question}</span>
                <span className={styles.icon} aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                hidden={!isOpen}
                role="region"
                aria-labelledby={buttonId}
                className={styles.answer}
              >
                {faq.answer}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
