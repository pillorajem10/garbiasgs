import { readFile } from "node:fs/promises";
import path from "node:path";
import { projectsData } from "../../src/Sections/AllProjectsSection/data.js";
import { licenseImages } from "../../src/Sections/AboutLicenseAndCertificationsSection/data.js";
import { officeImages } from "../../src/Sections/AboutOfficesSection/data.js";
import { images as charityImages } from "../../src/Sections/CharityProgramsSection/data.js";
import { companyWithHeartData } from "../../src/Sections/HomeCompanyWithHeartSection/data.js";
import { REPOSITORY_ROOT } from "./paths.mjs";

const SECTION_BACKGROUND_PATTERN = /bg\("([^"]+)"\)/g;

const STANDALONE_IMAGE_PATHS = [
  "service1.jpg",
  "66bc725f-c176-4ea9-8816-eb138ef6824e.jpg",
  "DJI_0226.jpg",
  "DJI_0059.jpg",
  "DJI_0180.JPG",
  "home1.jpg",
];

export const SITE_VIDEO_FILES = [
  "DJI_0020_trimmed.mp4",
  "DJI_0049_trimmed.mp4",
  "DJI_0224_trimmed.mp4",
  "DJI_0237_trimmed.mp4",
  "DJI_0237_trimmed_clip2.mp4",
  "DJI_0252_trimmed.mp4",
  "garbiaCharity.mp4",
];

async function readSectionBackgroundPaths() {
  const source = await readFile(
    path.join(REPOSITORY_ROOT, "src", "seo", "sectionBackgrounds.js"),
    "utf8"
  );
  return [...source.matchAll(SECTION_BACKGROUND_PATTERN)].map(([, imagePath]) => imagePath);
}

export async function listSiteImagePaths() {
  const imagePaths = [
    ...STANDALONE_IMAGE_PATHS,
    ...(await readSectionBackgroundPaths()),
    ...projectsData.flatMap(({ images }) => images.map((file) => `projects/${file}`)),
    ...licenseImages.map((file) => `licenses/${file}`),
    ...officeImages.map((file) => `office/${file}`),
    ...charityImages.map((file) => `program_charity/${file}`),
    ...companyWithHeartData.map((file) => `home_charity/${file}`),
  ];
  return [...new Set(imagePaths)];
}
