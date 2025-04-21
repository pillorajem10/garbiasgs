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
        <img src={image} alt={title} className={styles.image} />
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
    <section className={styles.container}>
      <div className={styles.serviceRow}>
        <ServiceBlock
          title="Services"
          image="/images/servicesImages/p103_orig.webp"
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
          image="/images/66bc725f-c176-4ea9-8816-eb138ef6824e.webp"
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
    </section>
  );
};

export default memo(ServicesSection);
