import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import LazyBackground from '@components/LazyBackground';
import OptimizedImage from '@components/OptimizedImage';
import { SECTION_BACKGROUNDS } from '@/seo/sectionBackgrounds';
import { cdnImage } from '@/utils/cdn';
import { imageDims } from '@/utils/imageDimensions';
import styles from './index.module.css';

const HomeMissionVisionSection = () => {
    // Refs to observe when sections are in view
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Controls for animation
    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const leftInView = useInView(leftRef);
    const rightInView = useInView(rightRef);

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
        <LazyBackground as="section" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.homeMissionVision}>
            <motion.div
                ref={leftRef}
                className={styles.leftContainer}
                initial={{ x: -80, opacity: 0 }}
                animate={leftControls}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            >
                <div className={styles.imageContainer}>
                    <OptimizedImage
                        src={cdnImage("DJI_0226.jpg")}
                        {...imageDims("DJI_0226.jpg")}
                        alt="GarBia team at a project site illustrating the company mission"
                    />
                </div>

                <h2>Mission</h2>
                <p>
                    Garbia Builders and Technology Solutions, OPC is committed
                    to delivering soil drilling, geotechnical investigation,
                    bored piling, and construction services with a high level
                    of quality, accuracy, and technical reliability in support
                    of the Philippines pursuit of safe, durable, and
                    standards-compliant infrastructure.
                </p>
                <p>
                    The company strives to operate in harmony with its
                    employees, clients, partners, and stakeholders by
                    promoting integrity, professionalism, safety, and
                    sustainable development in all its operations.
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
                    GarBia Group aims to be one of the preferred and trusted service provider 
                    for geotechnical services with the highest quality standards and competitive rates, delivered in a timely manner in Luzon.
                </p>
                <div className={styles.imageContainer1}>
                    <OptimizedImage
                        src={cdnImage("DJI_0059.jpg")}
                        {...imageDims("DJI_0059.jpg")}
                        alt="Geotechnical field work representing GarBia vision for quality infrastructure"
                    />
                </div>
            </motion.div>
        </LazyBackground>
    );
};

export default memo(HomeMissionVisionSection);
