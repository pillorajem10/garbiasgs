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

                <h2>Objectives</h2>
                <ul>
                    <li>
                        <p>To provide quality service at reasonable cost.</p>
                    </li>
                    <li>
                        <p>To provide fulfilling, harmonious, and safe workplace.</p>
                    </li>
                    <li>
                        <p>To delight customers with high quality services.</p>
                    </li>
                    <li>
                        <p>To make a positive impact in the community.</p>
                    </li>
                    <li>
                        <p>To ensure compliance with applicable local and international requirements of various agencies.</p>
                    </li>
                    <li>
                        <p>To continually improve the quality management system of the company.</p>
                    </li>
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
                    <img src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/d4f1eb50-a4af-48f7-bc8c-98033be69fed.webp" alt="GIF" />
                </div>
            </motion.div>
        </section>
    );
};

export default memo(HomeMissionVisionSection);
