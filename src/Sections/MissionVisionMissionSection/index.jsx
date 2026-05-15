import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import LazyBackground from '@components/LazyBackground';
import OptimizedImage from '@components/OptimizedImage';
import { SECTION_BACKGROUNDS } from '@/seo/sectionBackgrounds';
import styles from './index.module.css';

const MissionVisionMissionSection = () => {
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
        <LazyBackground as="section" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.missionVisionMission}>
            <motion.div
                ref={leftRef}
                className={styles.leftContainer}
                initial={{ x: -80, opacity: 0 }}
                animate={leftControls}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            >

                <h2>Mission</h2>
                <p>
                    GarBia Structural & Geotechnical Solutions is dedicated to 
                    providing geotechnical services with high level of quality 
                    and accuracy in order to contribute on the Philippines' 
                    transition to quality construction and safe infrastructure.
                </p>

                <p>
                    GarBia Structural & Geotechnical Solutions is committed to be a company 
                    that is in harmony with people and its stakeholders.
                </p>
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
                        src="https://garbia.sgp1.cdn.digitaloceanspaces.com/images/DJI_0180.JPG"
                        alt="GarBia mission — engineering team and equipment in the field"
                    />
                </div>
            </motion.div>
        </LazyBackground>
    );
};

export default memo(MissionVisionMissionSection);
