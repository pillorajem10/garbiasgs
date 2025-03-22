import HomeBannerSection from '../../Sections/HomeBannerSection';
import HomeMissionVisionSection from '../../Sections/HomeMissionVisionSection';
import HomeObjectivesSection from '../../Sections/HomeObjectivesSection';
import HomeCompanyWithHeartSection from '../../Sections/HomeCompanyWithHeartSection';

import styles from './index.module.css';

const Page = () => {
    return (
        <div className={styles.container}>
            {/* Banner Section */}
            <HomeBannerSection />

            {/* Mission & Vision Section */}
            <HomeMissionVisionSection />

            {/* Objectives Section */}
            <HomeObjectivesSection />
            
            {/* Company with Heart Section */}
            <HomeCompanyWithHeartSection />
        </div>
    );
};

export default Page;
