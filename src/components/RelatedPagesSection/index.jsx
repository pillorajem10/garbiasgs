import Card from "@components/Card";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import styles from "./index.module.css";

export default function RelatedPagesSection({ id, links }) {
  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Keep exploring"
          title="Where to go next"
          titleId={`${id}-heading`}
        />

        <ul className={styles.cardGrid}>
          {links.map(({ to, title, description, linkLabel }, index) => (
            <Reveal as="li" key={to} delay={index * 100}>
              <Card to={to} title={title} linkLabel={linkLabel}>
                <p>{description}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
