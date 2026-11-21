import { useRef } from "react";
import Button from "@components/Button";
import LazyBackground from "@components/LazyBackground";
import LazyVideo from "@components/LazyVideo";
import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { useInView } from "@/hooks/useInView";
import { cdnImage, cdnVideo } from "@/utils/cdn";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import { companyWithHeartData } from "./data";
import styles from "./index.module.css";

const SLIDE_INTERVAL_MS = 3000;
const slides = companyWithHeartData.map((file) => cdnImage(`home_charity/${file}`));

const HomeCompanyWithHeartSection = () => {
  const mediaRef = useRef(null);
  const isMediaInView = useInView(mediaRef);
  const [currentSlide] = useAutoAdvance(slides.length, SLIDE_INTERVAL_MS, {
    active: isMediaInView,
  });

  return (
    <LazyBackground
      as="section"
      className={styles.section}
      backgroundUrl={SECTION_BACKGROUNDS.homeCompanyHeart}
      aria-labelledby="home-heart-heading"
    >
      <div className={styles.inner}>
        <SectionHeader
          isOnDark
          isCentered
          eyebrow="Giving back"
          title="We are a company with a heart"
          titleId="home-heart-heading"
          intro="“We believe in giving back to the community. We are committed to making a difference in the lives of others.”"
        />

        <div ref={mediaRef} className={styles.media}>
          <Reveal className={styles.frame}>
            <OptimizedImage
              sizes="(max-width: 900px) 100vw, 600px"
              src={slides[currentSlide]}
              alt={`Community and charity work by Garbia, image ${currentSlide + 1} of ${slides.length}`}
              className={styles.slide}
            />
          </Reveal>

          <Reveal delay={150} className={styles.frame}>
            <LazyVideo
              src={cdnVideo("garbiaCharity.mp4")}
              className={styles.video}
              controls
            />
          </Reveal>
        </div>

        <Reveal className={styles.footer}>
          <Button to="/program" variant="ghost" hasArrow>
            See our charity programs
          </Button>
        </Reveal>
      </div>
    </LazyBackground>
  );
};

export default HomeCompanyWithHeartSection;
