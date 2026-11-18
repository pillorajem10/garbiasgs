import Button from "@components/Button";
import ProjectTile from "@components/ProjectTile";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { projectsData } from "@sections/AllProjectsSection/data";
import styles from "./index.module.css";

const HomeProjectsSection = () => (
  <section className={styles.section} aria-labelledby="home-projects-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="Our work"
        title="Recent projects"
        titleId="home-projects-heading"
        intro="Soil investigation and foundation projects in Antipolo, Marikina, Pasig, and Taguig, with site photos from each engagement."
      />

      <ul className={styles.tileGrid}>
        {projectsData.map(({ title, thumbnail, images }, index) => (
          <Reveal as="li" key={title} delay={index * 100}>
            <ProjectTile
              to="/projects"
              title={title}
              thumbnail={thumbnail}
              photoCount={images.length}
            />
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.footer}>
        <Button to="/projects" variant="outline" hasArrow>
          View all projects
        </Button>
      </Reveal>
    </div>
  </section>
);

export default HomeProjectsSection;
