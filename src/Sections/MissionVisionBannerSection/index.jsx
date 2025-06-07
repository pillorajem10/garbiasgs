import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const MissionVisionBannerSection = () => {
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
                src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/DJI_0237_clip1.mp4"
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
                <h1>Mission And Vision</h1>
                <p>
                    GarBia Structural and Geotechnical Solutions strives to be the leading provider 
                    of high-quality geotechnical services in Luzon, offering competitive rates 
                    and timely delivery. Our mission is to contribute to the 
                    Philippines' transition towards superior construction standards and safe infrastructure 
                    through precise and reliable geotechnical solutions. 
                    We are committed to building lasting relationships with our stakeholders and ensuring 
                    our company's growth is aligned with the well-being of the communities we serve.
                </p>
            </motion.div>
        </div>
    );
};

export default MissionVisionBannerSection;
