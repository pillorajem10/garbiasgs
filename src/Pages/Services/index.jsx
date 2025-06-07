// SECTIONS
import ServicesBannerSection from "@sections/ServicesBannerSection";
import ServicesSection from "@sections/ServicesSection";

const Page = () => {
    return (
        <div>
            {/* Banner Section */}
            <ServicesBannerSection />

            {/* Services Section */}
            <ServicesSection />
        </div>
    );
};

export default Page;