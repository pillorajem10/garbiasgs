import { Link } from "react-router-dom";
import ContactForm from "@components/ContactForm";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import StudioPhoto from "@components/StudioPhoto";
import { STUDIO_PHOTOS } from "@/constants/studioPhotos";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const ENGINEER_PHOTO_WIDTH = 5304;
const ENGINEER_PHOTO_HEIGHT = 7952;
const ENGINEER_PHOTO_SIZES = "(max-width: 900px) 100vw, 520px";

const ContactSection = () => (
  <section className={styles.section} aria-labelledby="contact-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="Send us a message"
        title="Tell us about your project"
        titleId="contact-heading"
        intro="Share the location, structure type, and programme, and we will advise on the investigation you need."
      />

      <div className={styles.layout}>
        <Reveal className={styles.formPanel}>
          <ContactForm />
        </Reveal>

        <Reveal delay={150} className={styles.details}>
          <figure className={styles.engineer}>
            <StudioPhoto
              photoPath={STUDIO_PHOTOS.engineerPortrait}
              alt="A Garbia Group engineer wearing a company safety helmet"
              width={ENGINEER_PHOTO_WIDTH}
              height={ENGINEER_PHOTO_HEIGHT}
              sizes={ENGINEER_PHOTO_SIZES}
              className={styles.engineerPhoto}
            />
            <figcaption className={styles.engineerCaption}>
              Our engineers review every inquiry and reply with the next steps.
            </figcaption>
          </figure>

          <section className={styles.detailBlock} aria-labelledby="email-heading">
            <h3 id="email-heading" className={styles.blockTitle}>
              Email
            </h3>
            <p className={styles.blockText}>
              Send project drawings, site details, or general questions—we respond to every
              inquiry as soon as possible.
            </p>
            <a href={`mailto:${BUSINESS.email}`} className={styles.contactLink}>
              {BUSINESS.email}
            </a>
          </section>

          <section className={styles.detailBlock} aria-labelledby="tel-heading">
            <h3 id="tel-heading" className={styles.blockTitle}>
              Tel. No.
            </h3>
            <p className={styles.blockText}>
              Call our office line during business hours for appointments, quotations, and
              coordination with our geotechnical team.
            </p>
            <a href={`tel:${BUSINESS.telephone}`} className={styles.contactLink}>
              {BUSINESS.telephoneDisplay}
            </a>
          </section>

          <section className={styles.detailBlock} aria-labelledby="mobile-heading">
            <h3 id="mobile-heading" className={styles.blockTitle}>
              Mobile Nos.
            </h3>
            <p className={styles.blockText}>
              For urgent site concerns or field coordination, contact us on any of the mobile
              numbers below.
            </p>
            <ul className={styles.phoneList}>
              {BUSINESS.mobileNumbers.map(({ tel, display }) => (
                <li key={tel}>
                  <a href={`tel:${tel}`} className={styles.contactLink}>
                    {display}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.detailBlock} aria-labelledby="office-heading">
            <h3 id="office-heading" className={styles.blockTitle}>
              Office
            </h3>
            <p className={styles.blockText}>
              {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion}
              —parking available for consultations and sample drop-offs.
            </p>
            <Link to="/location" className={styles.contactLink}>
              View map &amp; directions →
            </Link>
          </section>

          <section className={styles.detailBlock} aria-labelledby="website-heading">
            <h3 id="website-heading" className={styles.blockTitle}>
              Visit Our Website
            </h3>
            <p className={styles.blockText}>
              Explore our website for company updates, services, and project information.
            </p>
            <a
              href={BUSINESS.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              {BUSINESS.websiteUrl}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </section>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ContactSection;
