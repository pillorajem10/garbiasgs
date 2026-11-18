import { memo } from "react";
import PhotoGallery from "@components/PhotoGallery";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { cdnImage } from "@/utils/cdn";
import { CREDENTIALS, licenseImages } from "./data";
import styles from "./index.module.css";

const licenseGalleryImages = licenseImages.map((file, index) => ({
  src: cdnImage(`licenses/${file}`),
  alt: `License or accreditation document ${index + 1} of ${licenseImages.length}`,
  caption: `License or accreditation document ${index + 1} of ${licenseImages.length}`,
}));

const AboutLicenseAndCertificationsSection = () => (
  <section className={styles.section} aria-labelledby="credentials-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="Credentials"
        title="Licenses, Accreditations and Memberships"
        titleId="credentials-heading"
      />

      <ul className={styles.credentialGrid}>
        {CREDENTIALS.map(({ name, description }, index) => (
          <Reveal as="li" key={name} delay={(index % 3) * 100}>
            <div className={styles.credential}>
              <h3 className={styles.credentialName}>{name}</h3>
              <p className={styles.credentialDescription}>{description}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className={styles.documents}>
        <h3 className={styles.documentsTitle}>Certificates and license documents</h3>
        <PhotoGallery
          images={licenseGalleryImages}
          label="GarBia license and accreditation documents"
          aspectRatio="3 / 4"
          initialCount={7}
          isContained
        />
      </div>
    </div>
  </section>
);

export default memo(AboutLicenseAndCertificationsSection);
