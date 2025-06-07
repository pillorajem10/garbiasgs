import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Navbar = ({ onToggleMenu }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="images/garbia2.webp" alt="Logo" className={styles.logo} />
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/mission-vision">Mission And Vision</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/program">Program</Link></li>
        <li><Link to="/location">Location</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      
      <div className={styles.burger} onClick={onToggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;