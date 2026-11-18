import Button from "@components/Button";
import PageHero from "@components/PageHero";
import SplitWords from "@components/SplitWords";
import { cdnVideo } from "@/utils/cdn";
import styles from "./index.module.css";

const HOME_VIDEO = cdnVideo("DJI_0020_trimmed.mp4");
const HEADLINE = "Soil Testing, Engineering Consultancy, and Construction Works";
const BODY =
  "Dreaming of your perfect home? Lay the groundwork for a lifetime of stability by prioritizing safety and securing a flawless foundation";

const HomeBannerSection = () => (
  <PageHero
    isFeatured
    videoSrc={HOME_VIDEO}
    headline={
      <>
        <span className={styles.brandName}>GarBia Group</span>
        <SplitWords text={HEADLINE} startDelay={150} />
      </>
    }
    body={BODY}
    actions={
      <>
        <Button to="/contact" hasArrow isMagnetic>
          Request a quote
        </Button>
        <Button to="/projects" variant="ghost">
          View projects
        </Button>
      </>
    }
  >
    <p className={styles.tagline}>Strong foundations for a safe future</p>
  </PageHero>
);

export default HomeBannerSection;
