import AboutBannerSection from "@sections/AboutBannerSection";
import AboutLicenseAndCertificationsSection from "@sections/AboutLicenseAndCertificationsSection";
import AboutOfficesSection from "@sections/AboutOfficesSection";
import RelatedPagesSection from "@components/RelatedPagesSection";
import { RELATED_PAGES } from "@/constants/relatedPages";
import styles from "./index.module.css";

const Page = () => (
  <div className={styles.page}>
    <AboutBannerSection />
    <AboutLicenseAndCertificationsSection />
    <AboutOfficesSection />
    <RelatedPagesSection id="about-related" links={RELATED_PAGES.about} />
  </div>
);

export default Page;
