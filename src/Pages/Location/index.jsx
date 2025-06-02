import LocationBannerSection from '../../Sections/LocationBannerSection';

import styles from './index.module.css';

const Page = () => {
    return (
        <div className={styles.container}>
            {/* Banner Section */}
            <LocationBannerSection />
        </div>
    );
};

export default Page;
