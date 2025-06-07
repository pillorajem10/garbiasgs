// REACT
import { useState } from 'react';

// SECTIONS
import ProjectsBannerSection from '@sections/ProjectsBannerSection';
import AllProjectsSection from '@sections/AllProjectsSection';

// COMPONENTS
import ProjectsImagesModal from '@components/Projects/ProjectsImagesModal';

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setSelectedImage] = useState([]);

    return (
        <div>
            {/* Banner Section */}
            <ProjectsBannerSection />

            {/* All Projects Section */}
            <AllProjectsSection 
                onOpenModal={(images) => {
                    setSelectedImage(images);
                    setIsModalOpen(true);
                }}
            />

            {/* Modal for Project Images */}
            {isModalOpen && (
                <ProjectsImagesModal
                    imagesRoute={images}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Page;
