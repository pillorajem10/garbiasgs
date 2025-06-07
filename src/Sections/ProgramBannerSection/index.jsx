import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const ProgramServiceSection = () => {
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
                src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/DJI_0224_clip.mp4"
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
                <h1>Charity Programs</h1>
                <p>
                    At GarBia Structural and Geotechnical Solutions, 
                    we believe that success is not just measured by the structures we build, 
                    but by the lives we touch. Our charity programs are rooted in compassion and community empowerment. 
                    We regularly organize outreach efforts that provide food, educational supplies, 
                    and basic necessities to underprivileged communities, especially in areas where our projects are located. 
                    By collaborating with local leaders and volunteers, 
                    we ensure that our programs are relevant, respectful, and impactful. Whether it's supporting schoolchildren, 
                    helping displaced families, or responding to calamities, 
                    we are committed to sharing our blessings and building hope—one act of kindness at a time.
                </p>
            </motion.div>
        </div>
    );
};

export default ProgramServiceSection;
