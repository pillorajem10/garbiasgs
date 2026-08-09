import ClassicBanner from "@components/ClassicBanner";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0252_trimmed.mp4");

const BODY =
  "Here are some of the projects we've completed across different industries—each one rooted in solid engineering, accurate soil data, and a deep understanding of the ground conditions that shape safe and sustainable construction. From residential buildings to institutional structures and government infrastructure, our work reflects our commitment to quality, safety, and technical excellence. Every project is a testament to our expertise in geotechnical solutions and our dedication to supporting clients from the ground up.";

const ProjectsBannerSection = () => (
  <ClassicBanner headline="Projects" body={BODY} videoSrc={VIDEO} />
);

export default ProjectsBannerSection;
