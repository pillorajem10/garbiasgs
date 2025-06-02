import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './index.module.css';

const ContactBannerSection = () => {
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
                src="/videos/DJI_0237_clip2.mp4"
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
                <div className={styles.grid}>
                    {/* Left Column */}
                    <div className={styles.qrSection}>
                        <img src="images/qr-code.webp" alt="QR Code" className={styles.qrImage} />
                        <h2 className={styles.qrCaption}>Scan To Send An Email</h2>
                    </div>

                    {/* Right Column - Form */}
                    <div className={styles.formSection}>
                        <h1 className={styles.contactHeader}>Message Us</h1>
                        <form className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>First Name *</label>
                                    <input type="text" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Last Name</label>
                                    <input type="text" />
                                </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email *</label>
                                    <input type="email" required />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Phone Number *</label>
                                    <input type="tel" required />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Message *</label>
                                    <textarea rows="3" required></textarea>
                                </div>

                                <div className={styles.formGroup}>
                                <label>Upload File</label>
                                <input type="file" />
                                <p className={styles.fileNote}>Max file size: 20MB</p>
                            </div>

                            <button type="submit" className={styles.submitBtn}>SUBMIT</button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactBannerSection;
