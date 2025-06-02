import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const AboutBannerSection = () => {
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
                src="/videos/DJI_0049_trimmed.mp4"
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
                <h1>About Us</h1>
                <p>
                    Founded in 2018, GarBia is a trusted provider of geotechnical solutions. 
                    Our team is dedicated to delivering expert soil testing and foundation 
                    assessments to ensure your home is built on a solid and secure foundation. 
                    With years of experience and a commitment to excellence, 
                    we strive to provide reliable and accurate services that give our clients peace of mind. 
                    At GarBia, we believe in the importance of safety and strength in every project we take on.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutBannerSection;
