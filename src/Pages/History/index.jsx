import HistoryBannerSection from "@sections/HistoryBannerSection";
import HistorySection from "@sections/HistorySection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import { RELATED_PAGES } from "@/constants/relatedPages";

const Page = () => (
  <>
    <HistoryBannerSection />
    <HistorySection />
    <RelatedPagesSection id="history-related" links={RELATED_PAGES.history} />
  </>
);

export default Page;
