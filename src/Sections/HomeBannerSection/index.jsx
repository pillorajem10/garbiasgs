import { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const HomeBannerSection = () => {
    const images = ['images/carousel2.webp', 'images/carousel1.webp'];
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(scrollNext, 5000);
        return () => clearInterval(interval);
    }, [emblaApi, scrollNext]);

    // Animation for banner text
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
            {/* Overlay */}
            <div className={styles.overlay}></div>

            {/* Carousel */}
            <div className={styles.carousel} ref={emblaRef}>
                <div className={styles.carouselWrapper}>
                    {images.map((image, index) => (
                        <div className={styles.carouselSlide} key={index}>
                            <img src={image} alt={`banner-${index}`} className={styles.carouselImage} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Animated Banner Text */}
            <motion.div
                className={styles.bannerText}
                ref={bannerTextRef}
                initial={{ y: 50, opacity: 0 }}
                animate={controls}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            >
                <h1>Soil Testing, Engineering Consultancy, and Construction Works</h1>
                <p>
                    Dreaming of your perfect home? Lay the groundwork for a lifetime of stability by prioritizing safety and securing a flawless foundation
                </p>
                <p className={styles.strongFoundations}>
                    Strong foundations for a safer future
                </p>
            </motion.div>
        </div>
    );
};

export default HomeBannerSection;
