import { memo } from "react";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import StudioPhoto from "@components/StudioPhoto";
import { STUDIO_PHOTOS } from "@/constants/studioPhotos";
import styles from "./index.module.css";

const TEAM_PHOTO_WIDTH = 7743;
const TEAM_PHOTO_HEIGHT = 5165;
const TEAM_PHOTO_SIZES = "(max-width: 75rem) 100vw, 1200px";

const AboutTeamSection = () => (
  <section className={styles.section} aria-labelledby="team-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="Our people"
        title="Meet the GarBia Group team"
        titleId="team-heading"
        intro="The engineers, laboratory technicians, and office staff behind every site investigation, soil test, and foundation project we deliver."
      />

      <Reveal className={styles.frame}>
        <StudioPhoto
          photoPath={STUDIO_PHOTOS.teamGroup}
          alt="The GarBia Group team posing together in the studio"
          width={TEAM_PHOTO_WIDTH}
          height={TEAM_PHOTO_HEIGHT}
          sizes={TEAM_PHOTO_SIZES}
          className={styles.photo}
        />
      </Reveal>
    </div>
  </section>
);

export default memo(AboutTeamSection);
