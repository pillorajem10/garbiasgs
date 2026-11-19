import Button from "@components/Button";
import PageHero from "@components/PageHero";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0224_trimmed.mp4");

const ServiceBannerSection = ({ service }) => (
  <PageHero
    eyebrow="GarBia Group services"
    headline={service.name}
    body={service.description}
    videoSrc={VIDEO}
    actions={
      <>
        <Button to="/contact" hasArrow isMagnetic>
          Request a quote
        </Button>
        <Button to="/services" variant="ghost">
          All services
        </Button>
      </>
    }
  />
);

export default ServiceBannerSection;
