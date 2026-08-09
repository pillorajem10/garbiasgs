import ClassicBanner from "@components/ClassicBanner";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0224_trimmed.mp4");

const BODY =
  "GarBia Group offers technical services ranging from geotechnical engineering, sub-surface soil exploration, laboratory testing, and micro-piling for foundations, in support to engineering design of residential and institutional buildings, roads, and government infrastructures.";

const ServicesBannerSection = () => (
  <ClassicBanner headline="Our Services" body={BODY} videoSrc={VIDEO} />
);

export default ServicesBannerSection;
