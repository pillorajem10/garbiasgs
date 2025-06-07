// SECTIONS
import HomeBannerSection from "@sections/HomeBannerSection";
import HomeMissionVisionSection from "@sections/HomeMissionVisionSection";
import HomeObjectivesSection from "@sections/HomeObjectivesSection";
import HomeCompanyWithHeartSection from "@sections/HomeCompanyWithHeartSection";

const Page = () => {
    return (
        <div>
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
