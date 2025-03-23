// SECTIONS
import AboutBannerSection from "../../Sections/AboutBannerSection";
import AboutLicenseAndCertificationsSection from "../../Sections/AboutLicenseAndCertificationsSection";
import AboutOfficesSection from "../../Sections/AboutOfficesSection";

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