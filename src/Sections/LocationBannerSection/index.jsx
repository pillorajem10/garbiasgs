import ClassicBanner from "@components/ClassicBanner";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const VIDEO =
  "https://garbia.sgp1.cdn.digitaloceanspaces.com/videos/DJI_0237_trimmed.mp4";

const BODY = `GarBia Group is located at Lot 10 Block 7 Jasmine Street, Cainta, Rizal—easily accessible from key areas in Metro Manila and nearby provinces. For consultations and site inquiries, call ${BUSINESS.telephoneDisplay}, email ${BUSINESS.email}, or reach our mobile lines listed on the Contact page. Secure parking is available near major roads and public transport terminals.`;

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1106553024815!2d121.1137044!3d14.5632069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7ee9904b0a1%3A0x6b1b7ceb994b6a40!2sGarbia%20Structural%20and%20Geotechnical%20Solutions!5e0!3m2!1sen!2sph!4v1717304734567!5m2!1sen!2sph";

const LocationBannerSection = () => (
  <ClassicBanner headline="Location" body={BODY} videoSrc={VIDEO}>
    <div className={styles.mapContainer}>
      <iframe
        title="GarBia Structural and Geotechnical Solutions office location map"
        src={MAP_EMBED}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </ClassicBanner>
);

export default LocationBannerSection;
