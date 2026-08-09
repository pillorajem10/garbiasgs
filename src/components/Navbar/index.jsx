import { Link } from "react-router-dom";
import OptimizedImage from "@components/OptimizedImage";
import { PRIMARY_NAV } from "@/constants/navigation";
import { cdnImage } from "@/utils/cdn";
import styles from "./index.module.css";

const Navbar = ({ menuOpen, onToggleMenu }) => {
  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={styles.logoContainer}>
        <OptimizedImage
          src={cdnImage("garbiaLogo.jpg")}
          alt="GarBia Structural and Geotechnical Solutions logo"
          className={styles.logo}
          width={160}
          height={48}
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
