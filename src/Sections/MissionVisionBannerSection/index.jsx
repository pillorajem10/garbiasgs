import ClassicBanner from "@components/ClassicBanner";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0237_trimmed.mp4");

const BODY =
  "GarBia Group strives to be the leading provider of high-quality geotechnical services in Luzon, offering competitive rates and timely delivery. Our mission is to contribute to the Philippines' transition towards superior construction standards and safe infrastructure through precise and reliable geotechnical solutions. We are committed to building lasting relationships with our stakeholders and ensuring our company's growth is aligned with the well-being of the communities we serve.";

const MissionVisionBannerSection = () => (
  <ClassicBanner headline="Mission And Vision" body={BODY} videoSrc={VIDEO} />
);

export default MissionVisionBannerSection;
