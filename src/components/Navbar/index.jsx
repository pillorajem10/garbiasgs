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
        <li><Link to="/services">Sevices</Link></li>
        <li><Link to="/about">About</Link></li>
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