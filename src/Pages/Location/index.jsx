import LocationBannerSection from "@sections/LocationBannerSection";
import LocationMapSection from "@sections/LocationMapSection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import { RELATED_PAGES } from "@/constants/relatedPages";

const Page = () => (
  <>
    <LocationBannerSection />
    <LocationMapSection />
    <RelatedPagesSection id="location-related" links={RELATED_PAGES.location} />
  </>
);

export default Page;
