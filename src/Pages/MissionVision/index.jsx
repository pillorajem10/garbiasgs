import MissionVisionBannerSection from "@sections/MissionVisionBannerSection";
import MissionVisionMissionSection from "@sections/MissionVisionMissionSection";
import MissionVisionVisionSection from "@sections/MissionVisionVisionSection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import { RELATED_PAGES } from "@/constants/relatedPages";

const Page = () => (
  <>
    <MissionVisionBannerSection />
    <MissionVisionMissionSection />
    <MissionVisionVisionSection />
    <RelatedPagesSection id="mission-vision-related" links={RELATED_PAGES.missionVision} />
  </>
);

export default Page;
