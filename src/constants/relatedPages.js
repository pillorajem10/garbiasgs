const SERVICES = {
  to: "/services",
  title: "Our geotechnical services",
  description:
    "Site assessment, soil exploration, laboratory testing, geotechnical reports, micropiling, and grouting.",
  linkLabel: "See all services",
};

const PROJECTS = {
  to: "/projects",
  title: "Completed projects",
  description: "Site photos from soil investigation and foundation projects in Antipolo, Marikina, Pasig, and Taguig.",
  linkLabel: "View projects",
};

const ABOUT = {
  to: "/about",
  title: "Licenses and accreditations",
  description: "ISO 9001:2015 certified, DPWH-BRS accredited, PCAB Category “A” licensed, and a PhilGEPS Platinum member.",
  linkLabel: "About GarBia Group",
};

const CONTACT = {
  to: "/contact",
  title: "Request a quote",
  description: "Tell us about your site and we will advise on the investigation you need.",
  linkLabel: "Contact us",
};

const HISTORY = {
  to: "/history",
  title: "Our history",
  description: "From a drilling contractor and soil testing laboratory founded in 2018 to today's company.",
  linkLabel: "Read our history",
};

const MISSION_VISION = {
  to: "/mission-vision",
  title: "Mission and vision",
  description: "The standards of quality, safety, and reliability behind every GarBia project.",
  linkLabel: "Read more",
};

export const RELATED_PAGES = {
  about: [SERVICES, PROJECTS, HISTORY],
  history: [ABOUT, MISSION_VISION, SERVICES],
  missionVision: [SERVICES, PROJECTS, CONTACT],
  projects: [SERVICES, ABOUT, CONTACT],
  serviceDetail: [PROJECTS, ABOUT, CONTACT],
  program: [ABOUT, PROJECTS, CONTACT],
  location: [CONTACT, SERVICES, ABOUT],
};
