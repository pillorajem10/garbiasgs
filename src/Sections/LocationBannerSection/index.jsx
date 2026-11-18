import Button from "@components/Button";
import PageHero from "@components/PageHero";
import { BUSINESS } from "@/seo/constants";
import { cdnVideo } from "@/utils/cdn";

const VIDEO = cdnVideo("DJI_0237_trimmed.mp4");

const BODY =
  "GarBia Group is at Lot 10 Block 7 Jasmine Street, Cainta, Rizal—easy to reach from Metro Manila and nearby provinces. Parking is available for consultations and sample drop-offs.";

const { latitude, longitude } = BUSINESS.geo;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

const LocationBannerSection = () => (
  <PageHero
    eyebrow="Visit us"
    headline="Location"
    body={BODY}
    videoSrc={VIDEO}
    actions={
      <>
        <Button href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" hasArrow>
          Get directions
          <span className="visually-hidden"> (opens in a new tab)</span>
        </Button>
        <Button href={`tel:${BUSINESS.telephone}`} variant="ghost">
          Call {BUSINESS.telephoneDisplay}
        </Button>
      </>
    }
  />
);

export default LocationBannerSection;
