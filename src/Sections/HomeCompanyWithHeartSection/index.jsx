import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';
import LazyBackground from '@components/LazyBackground';
import LazyVideo from '@components/LazyVideo';
import OptimizedImage from '@components/OptimizedImage';
import { useAutoAdvance } from '@/hooks/useAutoAdvance';
import { cdnImage, cdnVideo } from '@/utils/cdn';
import { SECTION_BACKGROUNDS } from '@/seo/sectionBackgrounds';
import styles from './index.module.css';
import { companyWithHeartData } from './data';

const SLIDE_MS = 3000;
const slides = companyWithHeartData.map((file) => cdnImage(`home_charity/${file}`));

const HomeCompanyWithHeartSection = () => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const leftControls = useAnimation();
    const rightControls = useAnimation();

    const leftInView = useInView(leftRef);
    const rightInView = useInView(rightRef);

    // The rotating image is in the left column.
    const [currentImage] = useAutoAdvance(slides.length, SLIDE_MS, {
        active: leftInView,
    });

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
                        src={slides[currentImage]}
                        alt={`Community and charity work by GarBia, image ${currentImage + 1} of ${slides.length}`}
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
                        src={cdnVideo("garbiaCharity.mp4")}
                        className={styles.video}
                        controls
                    />
                </motion.div>
            </div>
        </LazyBackground>
    );
};

export default memo(HomeCompanyWithHeartSection);
