import { Link } from "react-router-dom";
import OptimizedImage from "@components/OptimizedImage";
import { PRIMARY_NAV } from "@/constants/navigation";
import garbiaLogo from "@/assets/images/garbia-logo.png";
import styles from "./index.module.css";

const Navbar = ({ menuOpen, onToggleMenu }) => {
  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={styles.logoContainer}>
        <OptimizedImage
          src={garbiaLogo}
          alt="GarBia Structural and Geotechnical Solutions logo"
          className={styles.logo}
          width={800}
          height={248}
          priority
        />
      </div>

      <ul>
        {PRIMARY_NAV.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.burger}
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-controls="site-mobile-menu"
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default Navbar;
