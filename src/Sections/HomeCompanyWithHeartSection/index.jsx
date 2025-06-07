import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState, memo } from 'react';
import styles from './index.module.css';
import { companyWithHeartData } from './data'; // This should be an array of filenames

const HomeCompanyWithHeartSection = () => {
    const imageUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/homeHeartCarousel/';
    
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const leftInView = useInView(leftRef, { threshold: 0.3 });
    const rightInView = useInView(rightRef, { threshold: 0.3 });

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % companyWithHeartData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [companyWithHeartData.length]);

    useEffect(() => {
        if (leftInView) leftControls.start({ x: 0, opacity: 1 });
        else leftControls.start({ x: -80, opacity: 0 });
    }, [leftInView, leftControls]);

    useEffect(() => {
        if (rightInView) rightControls.start({ x: 0, opacity: 1 });
        else rightControls.start({ x: 80, opacity: 0 });
    }, [rightInView, rightControls]);

    return (
        <section className={styles.container}>
            <motion.div
                className={styles.intro}
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                viewport={{ once: true, amount: 0.4 }}
            >
                <h2>We are a company with a heart</h2>
                <p>
                    "We believe in giving back to the community. We are committed to making a difference in the lives of
                    others."
                </p>
            </motion.div>

            <div className={styles.content}>
                <motion.div
                    ref={leftRef}
                    className={styles.leftContainer}
                    initial={{ x: -80, opacity: 0 }}
                    animate={leftControls}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                >
                    <img
                        key={currentImage}
                        src={`${imageUrl}${companyWithHeartData[currentImage]}`}
                        alt={`Commitment ${currentImage + 1}`}
                        className={styles.fadeImage}
                    />
                </motion.div>

                <motion.div
                    className={styles.rightContainer}
                    ref={rightRef}
                    initial={{ x: 80, opacity: 0 }}
                    animate={rightControls}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                >
                    <video
                        src="https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/garbiaCharity.mp4"
                        className={styles.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default memo(HomeCompanyWithHeartSection);
