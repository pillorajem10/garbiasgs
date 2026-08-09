import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import LazyBackground from '@components/LazyBackground';
import OptimizedImage from '@components/OptimizedImage';
import { SECTION_BACKGROUNDS } from '@/seo/sectionBackgrounds';
import { cdnImage } from '@/utils/cdn';
import styles from './index.module.css';

const ServiceBlock = ({ title, image, items }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ y: 80, opacity: 0 });
    }
  }, [inView, controls]);

  const renderList = (list) =>
    list.map((item, idx) =>
      typeof item === 'string' ? (
        <li key={idx}>{item}</li>
      ) : (
        <li key={idx}>
          {item.title}
          <ul>
            {item.subItems.map((subItem, subIdx) => (
              <li key={subIdx}>{subItem}</li>
            ))}
          </ul>
        </li>
      )
    );

  return (
    <motion.div
      ref={ref}
      className={styles.contentContainer}
      initial={{ y: 80, opacity: 0 }}
      animate={controls}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
    >
      <div className={styles.imageContainer}>
        <OptimizedImage src={image} alt={`${title} — illustrative photo`} className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <ul>{renderList(items)}</ul>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <LazyBackground as="section" id="services-list" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.services} aria-label="GarBia geotechnical services list">
      <div className={styles.serviceRow}>
        <ServiceBlock
          title="Services"
          image={cdnImage("service1.jpg")}
          items={[
            'Site Assessment',
            {
              title: 'Soil Exploration',
              subItems: ['SPT / Coring', 'Test Pit'],
            },
            'Geotechnical Testing',
            {
              title: 'Detailed Geotechnical Reports',
              subItems: [
                'Laboratory Analysis',
                'Liquefaction Analysis',
                'Foundation Design Recommendation',
              ],
            },
            'Micropiling / Bored Piling Works',
            'Jet Grouting / Cement Grouting Works',
          ]}
        />
        <ServiceBlock
          title="Laboratory Testing"
          image={cdnImage("66bc725f-c176-4ea9-8816-eb138ef6824e.jpg")}
          items={[
            'Soil Sample Analysis',
            'Moisture Content Testing',
            'Specific Gravity Testing',
            'Atterberg Limit Testing',
            'Grain Size Distribution',
            'Consolidation Test',
            'Field Density Test',
            'Maximum Dry Density Test',
            'California Bearing Ratio (CBR) Test',
            'Los Angeles Abrasion Test',
            'Permeability Testing',
            'Unconfined Compression Test',
          ]}
        />
      </div>
    </LazyBackground>
  );
};

export default memo(ServicesSection);
