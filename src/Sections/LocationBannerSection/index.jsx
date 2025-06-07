import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const LocationBannerSection = () => {
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
                <div className={styles.textContainer}>
                    <h1>Location</h1>
                    <p>
                        GarBia Structural and Geotechnical Solutions is located at Lot 10 Block 7 Jasmine Street, Cainta, Rizal—
                        easily accessible from key areas in Metro Manila and nearby provinces. Whether you're visiting for consultations,
                        project discussions, or testing services, our office is positioned for your convenience. Secure parking is available, 
                        and we’re just a few minutes away from major roads and public transport terminals.
                    </p>
                </div>


                {/* Embedded Google Map */}
                <div className={styles.mapContainer}>
                    <iframe
                        title="Garbia Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1106553024815!2d121.1137044!3d14.5632069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7ee9904b0a1%3A0x6b1b7ceb994b6a40!2sGarbia%20Structural%20and%20Geotechnical%20Solutions!5e0!3m2!1sen!2sph!4v1717304734567!5m2!1sen!2sph"
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default LocationBannerSection;
