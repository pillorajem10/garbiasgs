import ClassicBanner from "@components/ClassicBanner";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0049_trimmed.mp4");

const BODY =
  "From an underground drilling contractor and soil testing laboratory founded in 2018, to Garbia Builders and Technology Solutions, OPC today — our history in geotechnical engineering and construction.";

const HistoryBannerSection = () => (
  <ClassicBanner headline="Our History" body={BODY} videoSrc={VIDEO} />
);

export default HistoryBannerSection;
