// SECTIONS
import ServicesBannerSection from '../../Sections/ServicesBannerSection';
import ServicesSection from '../../Sections/ServicesSection';

import styles from './index.module.css';

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