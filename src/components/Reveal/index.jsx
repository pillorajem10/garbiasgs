import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import styles from "./index.module.css";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}) {
  const elementRef = useRef(null);
  const [isBelowFold, setIsBelowFold] = useState(false);
  const hasEnteredView = useInViewOnce(elementRef, {
    rootMargin: "0px",
    amount: 0.15,
  });

  useEffect(() => {
    const { top } = elementRef.current.getBoundingClientRect();
    setIsBelowFold(top > window.innerHeight);
  }, []);

  const isHidden = isBelowFold && !hasEnteredView;
  const classNames = [styles.reveal, isHidden && styles.hidden, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={elementRef}
      className={classNames}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
