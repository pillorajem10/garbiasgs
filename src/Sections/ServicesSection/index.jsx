import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import styles from './index.module.css';

const ServiceBlock = ({ title, image, items }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 80, opacity: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={styles.contentContainer}
      initial={{ y: 80, opacity: 0 }}
      animate={controls}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className={styles.container}>
      <ServiceBlock
        title="Soil Exploration"
        image="/images/servicesImages/p103_orig.webp"
        items={[
          'Site Assessment',
          'Borehole Drilling',
          'Geotechnical Testing',
          'Soil Profiling',
          'Laboratory Analysis',
          'Foundation Design Recommendations',
          'Soil Improvement Solutions',
          'Detailed Geotechnical Reports',
        ]}
      />
      <ServiceBlock
        title="Laboratory Testing"
        image="/images/66bc725f-c176-4ea9-8816-eb138ef6824e.webp"
        items={[
          'Soil Sample Analysis',
          'Moisture Content Testing',
          'Compaction Tests',
          'Atterberg Limits Testing',
          'Strength Testing',
          'Permeability Testing',
          'Grain Size Distribution',
          'pH & Organic Content Analysis',
          'Comprehensive Test Reports',
        ]}
      />
      <ServiceBlock
        title="Foundation Improvement"
        image="/images/DJI_0088.webp"
        items={[
          'Soil Stabilization',
          'Deep Foundation Solutions',
          'Ground Improvement Techniques',
          'Geotechnical Reinforcement',
          'Dynamic Compaction',
        ]}
      />
    </section>
  );
};

export default memo(ServicesSection);
