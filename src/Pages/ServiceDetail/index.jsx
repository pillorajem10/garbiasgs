import { useParams } from "react-router-dom";
import ServiceBannerSection from "@sections/ServiceBannerSection";
import ServiceOverviewSection from "@sections/ServiceOverviewSection";
import FaqSection from "@components/FaqSection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import DefaultPage from "@pages/DefaultPage";
import { findServiceBySlug } from "@/constants/services";
import { RELATED_PAGES } from "@/constants/relatedPages";
import { faqsForService } from "@/seo/faqData";

const Page = () => {
  const { slug } = useParams();
  const service = findServiceBySlug(slug);

  if (!service) return <DefaultPage />;

  const faqs = faqsForService(service.slug);

  return (
    <>
      <ServiceBannerSection service={service} />
      <ServiceOverviewSection service={service} />
      {faqs.length > 0 && (
        <FaqSection
          id="faq"
          title={`${service.name} FAQs`}
          intro={`Answers to common questions about ${service.name.toLowerCase()} in the Philippines.`}
          faqs={faqs}
        />
      )}
      <RelatedPagesSection id="service-related" links={RELATED_PAGES.serviceDetail} />
    </>
  );
};

export default Page;
