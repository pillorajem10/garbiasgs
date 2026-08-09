import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import LazyVideo from '@components/LazyVideo';
import { cdnVideo } from '@/utils/cdn';
import styles from './index.module.css';

const HOME_VIDEO = cdnVideo("DJI_0020_trimmed.mp4");

const HomeBannerSection = () => {
    const bannerTextRef = useRef(null);
    const controls = useAnimation();
    const inView = useInView(bannerTextRef);

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
            <LazyVideo src={HOME_VIDEO} className={styles.videoBackground} />

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
                <h1>
                    <span className={styles.brandEyebrow}>GarBia Group</span>
                    Soil Testing, Engineering Consultancy, and Construction Works
                </h1>
                <p>
                    Dreaming of your perfect home? Lay the groundwork for a lifetime of stability by prioritizing safety and securing a flawless foundation
                </p>
                <p className={styles.strongFoundations}>
                    Strong foundations for a safe future
                </p>
            </motion.div>
        </div>
    );
};

export default HomeBannerSection;
