import Reveal from "@components/Reveal";
import styles from "./index.module.css";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  titleId,
  titleTag: TitleTag = "h2",
  isCentered = false,
  isOnDark = false,
}) {
  const classNames = [
    styles.header,
    isCentered && styles.centered,
    isOnDark && styles.onDark,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Reveal as="header" className={classNames}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <TitleTag id={titleId} className={styles.title}>
        {title}
      </TitleTag>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  );
}
