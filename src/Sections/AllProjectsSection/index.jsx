// react
import React from 'react';

// css
import styles from './index.module.css';

// data
import { projectsData } from './data';

const AllProjectsSection = ({ onOpenModal }) => {
    const imageBaseUrl = 'https://wotg.sgp1.cdn.digitaloceanspaces.com/videos/chatvideos/projectsImages';

    return (
        <section className={styles.container}>
            {projectsData.map((project, index) => (
                <div 
                    className={styles.projectCard} 
                    key={index}
                    onClick={() => {
                        onOpenModal(project.images);
                    }}
                >
                    <img src={`${imageBaseUrl}/${project.thumbnail}`} alt={project.title} className={styles.thumbnail} />
                    <h3>{project.title}</h3>
                </div>
            ))}
        </section>
    );
};

export default React.memo(AllProjectsSection);
