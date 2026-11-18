import ProgramBannerSection from "@sections/ProgramBannerSection";
import CharityProgramsSection from "@sections/CharityProgramsSection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import { RELATED_PAGES } from "@/constants/relatedPages";

const Page = () => (
  <>
    <ProgramBannerSection />
    <CharityProgramsSection />
    <RelatedPagesSection id="program-related" links={RELATED_PAGES.program} />
  </>
);

export default Page;
