import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState, memo } from 'react';
import styles from './index.module.css';

const HomeCompanyWithHeartSection = () => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const leftInView = useInView(leftRef, { threshold: 0.3 });
    const rightInView = useInView(rightRef, { threshold: 0.3 });

    // Carousel logic
    const images = Array.from({ length: 21 }, (_, i) => `/images/homeHeartCarousel/commitment${i + 1}.webp`);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

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
                        src={images[currentImage]}
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
                        src="/videos/garbiaCharity.webm"
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
