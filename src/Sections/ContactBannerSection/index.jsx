import PageHero from "@components/PageHero";
import { BUSINESS } from "@/seo/constants";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0237_trimmed_clip2.mp4");

const BODY = `Reach ${BUSINESS.legalName} for soil investigation, foundation engineering, and construction inquiries. Our team is ready to discuss your project and schedule a consultation at our Cainta office or on site.`;

const ContactBannerSection = () => (
  <PageHero eyebrow="Get in touch" headline="Contact Us" body={BODY} videoSrc={VIDEO} />
);

export default ContactBannerSection;
