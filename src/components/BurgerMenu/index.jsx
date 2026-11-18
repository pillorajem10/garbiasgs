import { useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@components/Button";
import { PRIMARY_NAV } from "@/constants/navigation";
import {
  DURATION_BASE_SECONDS,
  DURATION_SLOW_SECONDS,
  EASE_OUT,
} from "@/constants/motion";
import { BUSINESS } from "@/seo/constants";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import styles from "./index.module.css";

const LINK_STAGGER_SECONDS = 0.06;
const LINKS_START_DELAY_SECONDS = 0.15;
const LINK_RISE_DISTANCE_PX = 28;

const BurgerMenu = ({ id = "site-mobile-menu", onClose }) => {
  const menuRef = useDialogFocus(onClose);
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: LINK_STAGGER_SECONDS,
        delayChildren: LINKS_START_DELAY_SECONDS,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : LINK_RISE_DISTANCE_PX },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION_SLOW_SECONDS, ease: EASE_OUT },
    },
  };

  return (
    <motion.div
      ref={menuRef}
      id={id}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION_BASE_SECONDS, ease: EASE_OUT }}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <nav className={styles.menuNav} aria-label="Mobile">
        <motion.ul
          className={styles.linkList}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {PRIMARY_NAV.map(({ to, label }) => (
            <motion.li key={to} variants={itemVariants}>
              <Link
                to={to}
                className={styles.link}
                aria-current={pathname === to ? "page" : undefined}
                onClick={onClose}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: DURATION_SLOW_SECONDS,
            delay: LINKS_START_DELAY_SECONDS + PRIMARY_NAV.length * LINK_STAGGER_SECONDS,
          }}
        >
          <Button to="/contact" onClick={onClose} hasArrow>
            Get a Quote
          </Button>
          <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
            {BUSINESS.email}
          </a>
          <a href={`tel:${BUSINESS.telephone}`} className={styles.contactLink}>
            {BUSINESS.telephoneDisplay}
          </a>
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default memo(BurgerMenu);
