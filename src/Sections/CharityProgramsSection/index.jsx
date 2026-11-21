import { memo } from "react";
import LazyBackground from "@components/LazyBackground";
import PhotoGallery from "@components/PhotoGallery";
import SectionHeader from "@components/SectionHeader";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import { cdnImage } from "@/utils/cdn";
import { images } from "./data";
import styles from "./index.module.css";

const charityGalleryImages = images.map((file, index) => ({
  src: cdnImage(`program_charity/${file}`),
  alt: `Charity program photo ${index + 1} of ${images.length}`,
  caption: `Charity program photo ${index + 1} of ${images.length}`,
}));

const CharityProgramsSection = () => (
  <LazyBackground
    as="section"
    className={styles.section}
    backgroundUrl={SECTION_BACKGROUNDS.charityPrograms}
    aria-labelledby="charity-heading"
  >
    <div className={styles.inner}>
      <SectionHeader
        isOnDark
        eyebrow="Community outreach"
        title="Spreading Hope Through Every Act of Kindness"
        titleId="charity-heading"
      />
      <PhotoGallery
        images={charityGalleryImages}
        label="Garbia charity program photos"
        initialCount={8}
        isOnDark
      />
    </div>
  </LazyBackground>
);

export default memo(CharityProgramsSection);
