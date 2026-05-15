import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState, memo } from 'react';
import LazyBackground from '@components/LazyBackground';
import LazyVideo from '@components/LazyVideo';
import OptimizedImage from '@components/OptimizedImage';
import { SECTION_BACKGROUNDS } from '@/seo/sectionBackgrounds';
import styles from './index.module.css';
import { companyWithHeartData } from './data';

const HomeCompanyWithHeartSection = () => {
    const imageUrl = 'https://garbia.sgp1.cdn.digitaloceanspaces.com/images/home_charity/';
    
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const leftInView = useInView(leftRef, { threshold: 0.3 });
    const rightInView = useInView(rightRef, { threshold: 0.3 });

    const [currentImage, setCurrentImage] = useState(0);
    const slides = companyWithHeartData.map((f) => `${imageUrl}${f}`);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % companyWithHeartData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (leftInView) leftControls.start({ x: 0, opacity: 1 });
        else leftControls.start({ x: -80, opacity: 0 });
    }, [leftInView, leftControls]);

    useEffect(() => {
        if (rightInView) rightControls.start({ x: 0, opacity: 1 });
        else rightControls.start({ x: 80, opacity: 0 });
    }, [rightInView, rightControls]);

    return (
        <LazyBackground as="section" className={styles.container} backgroundUrl={SECTION_BACKGROUNDS.homeCompanyHeart}>
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
                    <OptimizedImage
                        key={currentImage}
                        src={slides[currentImage]}
                        alt={`Community and charity work by GarBia, image ${currentImage + 1} of ${companyWithHeartData.length}`}
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
                    <LazyVideo
                        src="https://garbia.sgp1.cdn.digitaloceanspaces.com/videos/garbiaCharity.mp4"
                        className={styles.video}
                        controls
                    />
                </motion.div>
            </div>
        </LazyBackground>
    );
};

export default memo(HomeCompanyWithHeartSection);
