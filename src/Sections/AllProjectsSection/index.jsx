import { useState } from "react";
import Lightbox from "@components/Lightbox";
import ProjectTile from "@components/ProjectTile";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { cdnImage } from "@/utils/cdn";
import { projectsData } from "./data";
import styles from "./index.module.css";

const toLightboxImages = ({ title, images }) =>
  images.map((file, index) => ({
    src: cdnImage(`projects/${file}`),
    alt: `${title} project site photo ${index + 1}`,
    caption: `${title} · photo ${index + 1} of ${images.length}`,
  }));

const AllProjectsSection = () => {
  const [openProject, setOpenProject] = useState(null);

  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.inner}>
        <SectionHeader
          eyebrow="Completed work"
          title="Completed projects"
          titleId="projects-heading"
          intro="Soil investigation, geotechnical testing, and foundation works delivered by GarBia Group. Select a project to view site photos."
        />

        <ul className={styles.tileGrid}>
          {projectsData.map((project, index) => (
            <Reveal as="li" key={project.title} delay={index * 100}>
              <ProjectTile
                title={project.title}
                thumbnail={project.thumbnail}
                photoCount={project.images.length}
                onClick={() => setOpenProject(project)}
                aria-label={`View photos for ${project.title} project`}
              />
            </Reveal>
          ))}
        </ul>
      </div>

      {openProject && (
        <Lightbox
          images={toLightboxImages(openProject)}
          label={`${openProject.title} project photos`}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
};

export default AllProjectsSection;
