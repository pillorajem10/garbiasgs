import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h2>My Navbar</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
