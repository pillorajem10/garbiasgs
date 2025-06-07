import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const ServicesBannerSection = () => {
    const bannerTextRef = useRef(null);
    const controls = useAnimation();
    const inView = useInView(bannerTextRef, { threshold: 0.3 });

    useEffect(() => {
        if (inView) {
            controls.start({ y: 0, opacity: 1 });
        } else {
            controls.start({ y: 50, opacity: 0 });
        }
    }, [inView, controls]);

    return (
        <div className={styles.banner}>
            {/* Background Video */}
            <video
                className={styles.videoBackground}
                src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/DJI_0107_trimmed.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay */}
            <div className={styles.overlay}></div>

            {/* Animated Banner Text */}
            <motion.div
                className={styles.bannerText}
                ref={bannerTextRef}
                initial={{ y: 50, opacity: 0 }}
                animate={controls}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            >
                <h1>Our Services</h1>
                <p>
                    GarBia Structural and Geotechnical Solutions offers technical services ranging from geotechnical engineering, 
                    sub-surface soil exploration, laboratory testing, and micro-piling for foundations, 
                    in support to engineering design of residential and institutional buildings, roads, and government infrastructures.
                </p>
            </motion.div>
        </div>
    );
};

export default ServicesBannerSection;
