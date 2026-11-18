import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMagneticPull } from "@/hooks/useMagneticPull";
import styles from "./index.module.css";

const VARIANT_CLASS_NAMES = {
  primary: styles.primary,
  ghost: styles.ghost,
  outline: styles.outline,
};

const SIZE_CLASS_NAMES = {
  regular: styles.regular,
  small: styles.small,
};

export default function Button({
  to,
  href,
  variant = "primary",
  size = "regular",
  hasArrow = false,
  isMagnetic = false,
  className = "",
  children,
  ...rest
}) {
  const buttonRef = useRef(null);
  useMagneticPull(buttonRef, isMagnetic);

  const classNames = [
    styles.button,
    VARIANT_CLASS_NAMES[variant],
    SIZE_CLASS_NAMES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {hasArrow && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link ref={buttonRef} to={to} className={classNames} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={buttonRef} href={href} className={classNames} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={buttonRef} type="button" className={classNames} {...rest}>
      {content}
    </button>
  );
}
