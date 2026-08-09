import { useCallback, useState } from "react";

import ProjectsBannerSection from "@sections/ProjectsBannerSection";
import AllProjectsSection from "@sections/AllProjectsSection";
import ProjectsImagesModal from "@components/Projects/ProjectsImagesModal";

const Page = () => {
  // `null` = closed. Holding the image list itself avoids a second "is open"
  // flag that could drift out of sync with it.
  const [galleryImages, setGalleryImages] = useState(null);

  // Stable identities so the memo() on both children can actually hit.
  const openGallery = useCallback((images) => setGalleryImages(images), []);
  const closeGallery = useCallback(() => setGalleryImages(null), []);

  return (
    <div>
      <ProjectsBannerSection />

      <AllProjectsSection onOpenModal={openGallery} />

      {galleryImages && (
        <ProjectsImagesModal imagesRoute={galleryImages} onClose={closeGallery} />
      )}
    </div>
  );
};

export default Page;
