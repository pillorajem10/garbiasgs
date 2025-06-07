// SECTIONS
import AboutBannerSection from "@sections/AboutBannerSection";
import AboutLicenseAndCertificationsSection from "@sections/AboutLicenseAndCertificationsSection";
import AboutOfficesSection from "@sections/AboutOfficesSection";

const Page = () => {
    return (
        <div>
            {/* About Banner Section */}
            <AboutBannerSection />

            {/* About License and Certifications Section */}
            <AboutLicenseAndCertificationsSection />

            {/* About Offices Section */}
            <AboutOfficesSection />
        </div>
    );
};

export default Page;