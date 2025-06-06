import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import styles from './index.module.css';

const HomeMissionVisionSection = () => {
    // Refs to observe when sections are in view
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Controls for animation
    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const leftInView = useInView(leftRef, { threshold: 0.3 });
    const rightInView = useInView(rightRef, { threshold: 0.3 });

    useEffect(() => {
        if (leftInView) {
            leftControls.start({ x: 0, opacity: 1 });
        } else {
            leftControls.start({ x: -80, opacity: 0 });
        }
    }, [leftInView, leftControls]);

    useEffect(() => {
        if (rightInView) {
            rightControls.start({ x: 0, opacity: 1 });
        } else {
            rightControls.start({ x: 80, opacity: 0 });
        }
    }, [rightInView, rightControls]);

    return (
        <section className={styles.container}>
            <motion.div
                ref={leftRef}
                className={styles.leftContainer}
                initial={{ x: -80, opacity: 0 }}
                animate={leftControls}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            >
                <div className={styles.imageContainer}>
                    <img src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/DJI_0103.webp" alt="GIF" />
                </div>

                <h2>Mission</h2>
                <p>
                    GarBia Structural & Geotechnical Solutions is dedicated to providing geotechnical services 
                    with high level of quality and accuracy in order to contribute on the Philippines' 
                    transition to quality construction and safe infrastructure.
                </p>
                <p>
                    GarBia Structural & Geotechnical Solutions is committed to be a company that is in harmony with people and its stakeholders.
                </p>
            </motion.div>

            <motion.div
                ref={rightRef}
                className={styles.rightContainer}
                initial={{ x: 80, opacity: 0 }}
                animate={rightControls}
                transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.2 }}
            >
                <h2>Vision</h2>
                <p>
                    GarBia Structural and Geotechnical Solutions aims to be one of the preferred and trusted service provider 
                    for geotechnical services with the highest quality standards and competitive rates, delivered in a timely manner in Luzon.
                </p>
                <div className={styles.imageContainer1}>
                    <img src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/DJI_0059.webp" alt="GIF" />
                </div>
            </motion.div>
        </section>
    );
};

export default memo(HomeMissionVisionSection);
