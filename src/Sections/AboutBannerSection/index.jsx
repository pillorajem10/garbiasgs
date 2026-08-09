import ClassicBanner from "@components/ClassicBanner";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0049_trimmed.mp4");

const BODY =
  "Founded in 2018, GarBia is a trusted provider of geotechnical solutions. Our team is dedicated to delivering expert soil testing and foundation assessments to ensure your home is built on a solid and secure foundation. With years of experience and a commitment to excellence, we strive to provide reliable and accurate services that give our clients peace of mind. At GarBia, we believe in the importance of safety and strength in every project we take on.";

const AboutBannerSection = () => (
  <ClassicBanner headline="About Us" body={BODY} videoSrc={VIDEO} />
);

export default AboutBannerSection;
