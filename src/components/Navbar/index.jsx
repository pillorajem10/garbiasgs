import { Link } from "react-router-dom";
import OptimizedImage from "@components/OptimizedImage";
import styles from "./index.module.css";

const Navbar = ({ menuOpen, onToggleMenu }) => {
  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={styles.logoContainer}>
        <OptimizedImage
          src="https://garbia.sgp1.cdn.digitaloceanspaces.com/images/garbiaLogo.jpg"
          alt="GarBia Structural and Geotechnical Solutions logo"
          className={styles.logo}
          width={160}
          height={48}
          priority
        />
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/mission-vision">Mission And Vision</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/program">Program</Link>
        </li>
        <li>
          <Link to="/location">Location</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
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
