import { Fragment } from "react";
import styles from "./index.module.css";

const WORD_STAGGER_MS = 70;

export default function SplitWords({ text, startDelay = 0 }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className={styles.word}>
        <span
          className={styles.wordInner}
          style={{ "--word-delay": `${startDelay + index * WORD_STAGGER_MS}ms` }}
        >
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ));
}
