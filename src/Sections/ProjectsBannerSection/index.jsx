import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const ProjectsBannerSection = () => {
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
                src="/videos/DJI_0252_clip.mp4"
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
                <h1>Projects</h1>
                <p>
                    Here are some of the projects we’ve completed across different 
                    industries—each one rooted in solid engineering, accurate soil data, 
                    and a deep understanding of the ground conditions 
                    that shape safe and sustainable construction. 
                    From residential buildings to institutional structures and government infrastructure, 
                    our work reflects our commitment to quality, safety, and technical excellence. 
                    Every project is a testament to our expertise in geotechnical solutions and our dedication to supporting clients from the ground up.
                </p>
            </motion.div>
        </div>
    );
};

export default ProjectsBannerSection;
