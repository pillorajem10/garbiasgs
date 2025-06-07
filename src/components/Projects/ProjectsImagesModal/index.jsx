import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';

const ProjectsImagesModal = ({ imagesRoute, onClose }) => {
  const imageBaseUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/projectsImages/';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0); // Used to trigger fade animation
  const scrollRef = useRef(null);

  const imageList = imagesRoute.map((img) => `${imageBaseUrl}${img}`);

  useEffect(() => {
    const container = scrollRef.current;
    const activeThumb = container?.children[currentIndex];
    if (activeThumb && container) {
      const offsetLeft = activeThumb.offsetLeft;
      const containerWidth = container.offsetWidth;
      const thumbWidth = activeThumb.offsetWidth;
      container.scrollTo({
        left: offsetLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: 'smooth',
      });
    }

    // Trigger image fade-in
    setFadeKey(prev => prev + 1);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const scrollThumbnails = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 100;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {imageList.length > 0 && (
          <>
            <div className={styles.slideShow}>
                <div className={styles.imageWrapper}>
                  <img
                    key={fadeKey}
                    src={imageList[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className={styles.mainImage}
                  />
                  <button className={`${styles.arrowButton} ${styles.left}`} onClick={handlePrev}>←</button>
                  <button className={`${styles.arrowButton} ${styles.right}`} onClick={handleNext}>→</button>
                  <button className={styles.closeButton} onClick={onClose}>✕</button>
                </div>
            </div>

            <div className={styles.thumbnailWrapper}>
              <button className={styles.thumbnailNavButton} onClick={() => scrollThumbnails('left')}>‹</button>
              <div className={styles.thumbnailContainer} ref={scrollRef}>
                {imageList.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumb ${index + 1}`}
                    className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
              <button className={styles.thumbnailNavButton} onClick={() => scrollThumbnails('right')}>›</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProjectsImagesModal);
