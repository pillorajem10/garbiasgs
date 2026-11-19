import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@components/Button";
import { PRIMARY_NAV } from "@/constants/navigation";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";
import { useSlidingIndicator } from "@/hooks/useSlidingIndicator";
import garbiaLogo from "@/assets/images/garbia-logo.webp?inline";
import styles from "./index.module.css";

const Navbar = ({ menuOpen, onToggleMenu }) => {
  const { pathname } = useLocation();
  const { isScrolled, isHidden } = useNavbarVisibility();
  const linkGroupRef = useRef(null);
  const [hoveredPath, setHoveredPath] = useState(null);
  const indicator = useSlidingIndicator(linkGroupRef, hoveredPath ?? pathname);

  const classNames = [
    styles.navbar,
    isScrolled && styles.scrolled,
    isHidden && !menuOpen && styles.hidden,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classNames}>
      <Link to="/" className={styles.logoContainer} aria-label="GarBia Group home">
        <img
          src={garbiaLogo}
          alt="GarBia Group logo"
          className={styles.logo}
          width={372}
          height={115}
          decoding="async"
        />
      </Link>

      <nav
        ref={linkGroupRef}
        className={styles.linkGroup}
        aria-label="Primary"
        onMouseLeave={() => setHoveredPath(null)}
      >
        <ul className={styles.linkList}>
          {PRIMARY_NAV.map(({ to, label }) => (
            <li key={to} data-indicator-key={to}>
              <Link
                to={to}
                className={styles.link}
                aria-current={pathname === to ? "page" : undefined}
                onMouseEnter={() => setHoveredPath(to)}
                onFocus={() => setHoveredPath(to)}
                onBlur={() => setHoveredPath(null)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <span
          className={styles.indicator}
          aria-hidden="true"
          style={{
            width: `${indicator.width}px`,
            transform: `translateX(${indicator.offsetX}px)`,
            opacity: indicator.isVisible ? 1 : 0,
          }}
        />
      </nav>

      <Button to="/contact" size="small" isMagnetic className={styles.quoteButton}>
        Get a Quote
      </Button>

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
    </header>
  );
};

export default Navbar;
