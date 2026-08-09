import React from "react";
import LazyBackground from "@components/LazyBackground";
import OptimizedImage from "@components/OptimizedImage";
import { cdnImage } from "@/utils/cdn";
import { SECTION_BACKGROUNDS } from "@/seo/sectionBackgrounds";
import styles from "./index.module.css";
import { projectsData } from "./data";

const AllProjectsSection = ({ onOpenModal }) => (
  <LazyBackground
    as="section"
    className={styles.container}
    backgroundUrl={SECTION_BACKGROUNDS.allProjects}
  >
    {projectsData.map((project) => (
      <button
        type="button"
        key={project.title}
        className={styles.projectCard}
        onClick={() => onOpenModal(project.images)}
        aria-label={`View photos for ${project.title} project`}
      >
        <OptimizedImage
          src={cdnImage(`projects/${project.thumbnail}`)}
          alt={`${project.title} geotechnical and construction project thumbnail`}
          className={styles.thumbnail}
        />
        <h3>{project.title}</h3>
      </button>
    ))}
  </LazyBackground>
);

export default React.memo(AllProjectsSection);
