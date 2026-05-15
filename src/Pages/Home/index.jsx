import HomeBannerSection from "@sections/HomeBannerSection";
import HomeMissionVisionSection from "@sections/HomeMissionVisionSection";
import HomeObjectivesSection from "@sections/HomeObjectivesSection";
import HomeCompanyWithHeartSection from "@sections/HomeCompanyWithHeartSection";
import FaqSection from "@components/FaqSection";
import { HOME_FAQ } from "@/seo/faqData";

const Page = () => (
  <>
    <HomeBannerSection />
    <HomeMissionVisionSection />
    <HomeObjectivesSection />
    <HomeCompanyWithHeartSection />
    <FaqSection
      id="faq"
      title="Geotechnical & Construction FAQs"
      intro="Common questions about soil investigation, foundation engineering, and construction services in the Philippines."
      faqs={HOME_FAQ}
    />
  </>
);

export default Page;
