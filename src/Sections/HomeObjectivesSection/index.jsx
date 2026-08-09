import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import LazyBackground from '@components/LazyBackground';
import OptimizedImage from '@components/OptimizedImage';
import { SECTION_BACKGROUNDS } from '@/seo/sectionBackgrounds';
import { cdnImage } from '@/utils/cdn';
import { imageDims } from '@/utils/imageDimensions';
import styles from './index.module.css';

const HomeObjectivesSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const leftInView = useInView(leftRef);
  const rightInView = useInView(rightRef);

  useEffect(() => {
    if (leftInView) leftControls.start({ x: 0, opacity: 1 });
    else leftControls.start({ x: -80, opacity: 0 });
  }, [leftInView, leftControls]);

  useEffect(() => {
    if (rightInView) rightControls.start({ x: 0, opacity: 1 });
    else rightControls.start({ x: 80, opacity: 0 });
  }, [rightInView, rightControls]);

  return (
    <LazyBackground as="section" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.homeObjectives}>
      <motion.div
        ref={leftRef}
        className={styles.leftContainer}
        initial={{ x: -80, opacity: 0 }}
        animate={leftControls}
        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
      >
        <h2>Objectives</h2>
        <ul>
          <li><p>To provide quality service at reasonable cost.</p></li>
          <li><p>To provide fulfilling, harmonious, and safe workplace.</p></li>
          <li><p>To delight customers with high quality services.</p></li>
          <li><p>To make a positive impact in the community.</p></li>
          <li><p>To ensure compliance with applicable local and international requirements of various agencies.</p></li>
          <li><p>To continually improve the quality management system of the company.</p></li>
        </ul>
      </motion.div>
      <motion.div
        ref={rightRef}
        className={styles.rightContainer}
        initial={{ x: 80, opacity: 0 }}
        animate={rightControls}
        transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.2 }}
      >
        <div className={styles.imageContainer1}>
          <OptimizedImage
            src={cdnImage("home1.jpg")}
            {...imageDims("home1.jpg")}
            alt="GarBia engineering and laboratory operations supporting company objectives"
          />
        </div>
      </motion.div>
    </LazyBackground>
  );
};

export default memo(HomeObjectivesSection);
