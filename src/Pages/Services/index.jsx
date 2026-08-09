import ServicesBannerSection from "@sections/ServicesBannerSection";
import ServicesSection from "@sections/ServicesSection";
import ServicesDetailSection from "@sections/ServicesDetailSection";
import FaqSection from "@components/FaqSection";
import { SERVICES_FAQ } from "@/seo/faqData";

const Page = () => (
  <>
    <ServicesBannerSection />
    <ServicesSection />
    <ServicesDetailSection />
    <FaqSection
      id="faq"
      title="Geotechnical Services FAQs"
      intro="Learn about site investigation, deep foundations, and how GarBia supports your project."
      faqs={SERVICES_FAQ}
    />
  </>
);

export default Page;
