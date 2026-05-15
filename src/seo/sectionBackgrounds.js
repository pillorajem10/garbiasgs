import { CDN_IMAGES } from "./constants";

const bg = (file) => `${CDN_IMAGES}/${file}`;

export const SECTION_BACKGROUNDS = {
  homeMissionVision: bg("20250328_084226.jpg"),
  homeObjectives: bg("DJI_0075.jpg"),
  missionVisionMission: bg("20250408_121004.jpg"),
  missionVisionVision: bg("20250526_110504.jpg"),
  homeCompanyHeart: bg("20250327_102158.jpg"),
  aboutLicense: bg("DJI_0058.jpg"),
  charityPrograms: bg("DJI_0257.jpg"),
  aboutOffices: bg("DJI_0180.JPG"),
  services: bg("20250327_102257.jpg"),
  allProjects: bg("20250408_121004.jpg"),
};
