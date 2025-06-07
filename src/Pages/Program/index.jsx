// SECTIONS
import ProgramBannerSection from "@sections/ProgramBannerSection";
import CharityProgramsSection from "@sections/CharityProgramsSection";

const Page = () => {
    return (
        <div>
            {/* Banner Section */}
            <ProgramBannerSection />

            {/* Charity Programs Section */}
            <CharityProgramsSection />
        </div>
    );
};

export default Page;