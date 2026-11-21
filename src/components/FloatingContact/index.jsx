import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StudioPhoto from "@components/StudioPhoto";
import { STUDIO_PHOTOS } from "@/constants/studioPhotos";
import { useAfterPageLoad } from "@/hooks/useAfterPageLoad";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const CONTACT_PATH = "/contact";
const PORTRAIT_WIDTH = 1447;
const PORTRAIT_HEIGHT = 2284;
const PORTRAIT_SIZES = "(max-width: 767px) 108px, 160px";

const PhoneIcon = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const FloatingContact = () => {
  const { pathname } = useLocation();
  const isPageLoaded = useAfterPageLoad();
  const [isOpen, setIsOpen] = useState(false);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [hasPhotoFailed, setHasPhotoFailed] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnOutsidePress = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [isOpen]);

  if (!isPageLoaded || hasPhotoFailed || pathname === CONTACT_PATH) return null;

  const closePanel = () => setIsOpen(false);
  const rootClassName = [styles.root, isPhotoLoaded && styles.visible, isOpen && styles.open]
    .filter(Boolean)
    .join(" ");

  return (
    <aside ref={rootRef} className={rootClassName} aria-label="Quick contact">
      <div id={panelId} className={styles.panel}>
        <div className={styles.card}>
          <p className={styles.title}>Need a soil test or site investigation?</p>
          <p className={styles.text}>Talk to our team. We reply to every inquiry.</p>
          <a href={`tel:${BUSINESS.telephone}`} className={styles.action}>
            Call {BUSINESS.telephoneDisplay}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className={styles.action}>
            {BUSINESS.email}
          </a>
          <Link to={CONTACT_PATH} className={styles.quoteLink} onClick={closePanel}>
            Request a quote
          </Link>
        </div>
      </div>

      <button
        type="button"
        className={styles.toggle}
        aria-label="Contact Garbia Group"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
      >
        <span className={styles.frame}>
          <StudioPhoto
            photoPath={STUDIO_PHOTOS.contactGuidePortrait}
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            sizes={PORTRAIT_SIZES}
            className={styles.portrait}
            onLoad={() => setIsPhotoLoaded(true)}
            onError={() => setHasPhotoFailed(true)}
          />
        </span>
        <span className={styles.iconBubble}>
          <PhoneIcon />
        </span>
      </button>
    </aside>
  );
};

export default FloatingContact;
