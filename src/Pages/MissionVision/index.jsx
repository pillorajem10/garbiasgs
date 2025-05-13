
import MissionVisionBannerSection from '../../Sections/MissionVisionBannerSection';
import MissionVisionMissionSection from '../../Sections/MissionVisionMissionSection';
import MissionVisionVisionSection from '../../Sections/MissionVisionVisionSection';

import styles from './index.module.css';

const Page = () => {
    return (
        <div className={styles.container}>
          {/* Banner Section */}
          <MissionVisionBannerSection />

          {/* Mission Section */}
          <MissionVisionMissionSection />

          {/* Vision Section */}
          <MissionVisionVisionSection />
        </div>
    );
};

export default Page;
