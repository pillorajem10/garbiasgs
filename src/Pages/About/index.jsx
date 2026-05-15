// SECTIONS
import AboutBannerSection from "@sections/AboutBannerSection";
import AboutLicenseAndCertificationsSection from "@sections/AboutLicenseAndCertificationsSection";
import AboutOfficesSection from "@sections/AboutOfficesSection";
import styles from "./index.module.css";

const Page = () => {
  return (
    <div className={styles.page}>
      <AboutBannerSection />
      <AboutLicenseAndCertificationsSection />
      <AboutOfficesSection />
    </div>
  );
};

export default Page;

