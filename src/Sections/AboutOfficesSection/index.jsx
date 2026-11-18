import { memo } from "react";
import LazyBackground from "@components/LazyBackground";
import PhotoGallery from "@components/PhotoGallery";
import SectionHeader from "@components/SectionHeader";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import { cdnImage } from "@/utils/cdn";
import { officeImages } from "./data";
import styles from "./index.module.css";

const officeGalleryImages = officeImages.map((file, index) => ({
  src: cdnImage(`office/${file}`),
  alt: `GarBia office photo ${index + 1} of ${officeImages.length}`,
  caption: `GarBia office photo ${index + 1} of ${officeImages.length}`,
}));

const AboutOfficesSection = () => (
  <LazyBackground
    as="section"
    className={styles.section}
    backgroundUrl={SECTION_BACKGROUNDS.aboutOffices}
    aria-labelledby="offices-heading"
  >
    <div className={styles.inner}>
      <SectionHeader
        isOnDark
        eyebrow="Our workplace"
        title="Step Into Our Workplace"
        titleId="offices-heading"
      />
      <PhotoGallery
        images={officeGalleryImages}
        label="GarBia office and laboratory photos"
        initialCount={8}
        isOnDark
      />
    </div>
  </LazyBackground>
);

export default memo(AboutOfficesSection);
