import { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./index.module.css";

const BurgerMenu = ({ onClose }) => {
  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className={styles.burgerMenuOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>

      <nav className={styles.menuNav}>
        <Link to="/" className={styles.menuItem} onClick={onClose}>Home</Link>
        <Link to="/services" className={styles.menuItem} onClick={onClose}>Services</Link>
        <Link to="/about" className={styles.menuItem} onClick={onClose}>About</Link>
        <Link to="/mission-vision" className={styles.menuItem} onClick={onClose}>Mission And Vision</Link>
        <Link to="#" className={styles.menuItem} onClick={onClose}>Projects</Link>
        <Link to="#" className={styles.menuItem} onClick={onClose}>Program</Link>
        <Link to="/location" className={styles.menuItem} onClick={onClose}>Location</Link>
        <Link to="/contact" className={styles.menuItem} onClick={onClose}>Contact Us</Link>
      </nav>
    </motion.div>
  );
};

// ✅ Memoize with custom comparison to avoid re-renders
export default memo(BurgerMenu, (prevProps, nextProps) => {
  return prevProps.onClose === nextProps.onClose;
});
