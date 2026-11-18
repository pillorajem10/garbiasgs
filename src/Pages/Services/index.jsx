import ServicesBannerSection from "@sections/ServicesBannerSection";
import ServicesSection from "@sections/ServicesSection";
import ServicesDetailSection from "@sections/ServicesDetailSection";
import ProcessSection from "@components/ProcessSection";
import FaqSection from "@components/FaqSection";
import { SERVICES_FAQ } from "@/seo/faqData";

const Page = () => (
  <>
    <ServicesBannerSection />
    <ServicesSection />
    <ServicesDetailSection />
    <ProcessSection
      id="services-process"
      eyebrow="How an engagement runs"
      title="From first call to finished foundation"
      intro="Six steps, from the first conversation to the foundation works themselves."
    />
    <FaqSection
      id="faq"
      title="Geotechnical Services FAQs"
      intro="Learn about site investigation, deep foundations, and how GarBia supports your project."
      faqs={SERVICES_FAQ}
    />
  </>
);

export default Page;
