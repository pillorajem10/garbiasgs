import HomeBannerSection from '../../Sections/HomeBannerSection';
import HomeMissionVisionSection from '../../Sections/HomeMissionVisionSection';
import styles from './index.module.css';

const Page = () => {
    return (
        <div className={styles.container}>
            {/* Banner Section */}
            <HomeBannerSection />

            {/* Mission & Vision Section */}
            <HomeMissionVisionSection />
        </div>
    );
};

export default Page;
