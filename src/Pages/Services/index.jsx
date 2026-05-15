import ServicesBannerSection from "@sections/ServicesBannerSection";
import ServicesSection from "@sections/ServicesSection";
import FaqSection from "@components/FaqSection";
import { SERVICES_FAQ } from "@/seo/faqData";

const Page = () => (
  <>
    <ServicesBannerSection />
    <ServicesSection />
    <FaqSection
      id="faq"
      title="Geotechnical Services FAQs"
      intro="Learn about site investigation, deep foundations, and how GarBia supports your project."
      faqs={SERVICES_FAQ}
    />
  </>
);

export default Page;
