import { useCallback, useEffect, useRef, useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@components/Button";
import { PRIMARY_NAV } from "@/constants/navigation";
import { BUSINESS } from "@/seo/constants";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import styles from "./index.module.css";

const CLOSE_ANIMATION_MS = 200;

const BurgerMenu = ({ id = "site-mobile-menu", onClose }) => {
  const { pathname } = useLocation();
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef(null);

  const requestClose = useCallback(() => {
    if (closeTimerRef.current) return;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, CLOSE_ANIMATION_MS);
  }, [onClose]);

  const menuRef = useDialogFocus(requestClose);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      ref={menuRef}
      id={id}
      className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      tabIndex={-1}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={requestClose}
        aria-label="Close navigation menu"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <nav className={styles.menuNav} aria-label="Mobile">
        <ul className={styles.linkList}>
          {PRIMARY_NAV.map(({ to, label }, index) => (
            <li key={to} className={styles.linkItem} style={{ "--link-index": index }}>
              <Link
                to={to}
                className={styles.link}
                aria-current={pathname === to ? "page" : undefined}
                onClick={requestClose}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer} style={{ "--link-index": PRIMARY_NAV.length }}>
          <Button to="/contact" onClick={requestClose} hasArrow>
            Get a Quote
          </Button>
          <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
            {BUSINESS.email}
          </a>
          <a href={`tel:${BUSINESS.telephone}`} className={styles.contactLink}>
            {BUSINESS.telephoneDisplay}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default memo(BurgerMenu);
