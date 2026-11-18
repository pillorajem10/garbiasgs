import ProjectsBannerSection from "@sections/ProjectsBannerSection";
import AllProjectsSection from "@sections/AllProjectsSection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import { RELATED_PAGES } from "@/constants/relatedPages";

const Page = () => (
  <>
    <ProjectsBannerSection />
    <AllProjectsSection />
    <RelatedPagesSection id="projects-related" links={RELATED_PAGES.projects} />
  </>
);

export default Page;
