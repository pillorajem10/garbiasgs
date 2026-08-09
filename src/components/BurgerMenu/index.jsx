import { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PRIMARY_NAV } from "@/constants/navigation";
import styles from "./index.module.css";

const BurgerMenu =({ id = "site-mobile-menu", onClose }) => {
  // Prevent background scroll while the menu is open. Restore the previous
  // inline value rather than forcing "auto", so we don't clobber a lock held
  // by something else (e.g. the projects gallery modal).
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      id={id}
      className={styles.burgerMenuOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        &times;
      </button>

      <nav className={styles.menuNav} aria-label="Mobile">
        {PRIMARY_NAV.map(({ to, label }) => (
          <Link key={to} to={to} className={styles.menuItem} onClick={onClose}>
            {label}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default memo(BurgerMenu);
