import ClassicBanner from "@components/ClassicBanner";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0224_trimmed.mp4");

const BODY =
  "At GarBia Group, we believe that success is not just measured by the structures we build, but by the lives we touch. Our charity programs are rooted in compassion and community empowerment. We regularly organize outreach efforts that provide food, educational supplies, and basic necessities to underprivileged communities, especially in areas where our projects are located. By collaborating with local leaders and volunteers, we ensure that our programs are relevant, respectful, and impactful. Whether it's supporting schoolchildren, helping displaced families, or responding to calamities, we are committed to sharing our blessings and building hope—one act of kindness at a time.";

const ProgramBannerSection = () => (
  <ClassicBanner headline="Charity Programs" body={BODY} videoSrc={VIDEO} />
);

export default ProgramBannerSection;
