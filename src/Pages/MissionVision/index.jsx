
// SECTIONS
import MissionVisionBannerSection from "@sections/MissionVisionBannerSection";
import MissionVisionMissionSection from "@sections/MissionVisionMissionSection";
import MissionVisionVisionSection from "@sections/MissionVisionVisionSection";

const Page = () => {
    return (
        <div>
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
