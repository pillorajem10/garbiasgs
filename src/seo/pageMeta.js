import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, PRIMARY_KEYWORDS } from "./constants";

export const PAGE_META = {
  "/": {
    title: "Geotechnical & Construction Company Philippines | GarBia",
    description:
      "GarBia Group delivers soil investigation, foundation engineering, pile driving, and geotechnical services across the Philippines. Request a site visit today.",
    keywords: PRIMARY_KEYWORDS,
  },
  "/services": {
    title: "Geotechnical & Site Investigation Services | GarBia",
    description:
      "Soil investigation, deep foundation, micro-piling, and laboratory testing for residential, commercial, and government projects in Luzon. Get a quote.",
    keywords:
      "Geotechnical Services, Site Investigation Services, Soil Investigation, Deep Foundation, " +
      PRIMARY_KEYWORDS,
  },
  "/about": {
    title: "About GarBia | Geotechnical Engineering Company",
    description:
      "Founded in 2018, GarBia is a trusted Philippines construction and geotechnical firm specializing in soil testing and foundation assessments.",
    keywords: "Construction Company, Geotechnical Engineering, " + PRIMARY_KEYWORDS,
  },
  "/mission-vision": {
    title: "Mission & Vision | GarBia Geotechnical Philippines",
    description:
      "GarBia's mission: leading geotechnical and foundation engineering in Luzon with safe, reliable construction standards for Filipino communities.",
    keywords: PRIMARY_KEYWORDS,
  },
  "/projects": {
    title: "Construction & Geotechnical Projects | GarBia",
    description:
      "Explore GarBia's completed soil investigation, foundation, and infrastructure projects across the Philippines.",
    keywords: PRIMARY_KEYWORDS,
  },
  "/program": {
    title: "Community Charity Programs | GarBia Group",
    description:
      "GarBia gives back through outreach, education support, and disaster response in communities where we build.",
    keywords: "Construction Company Philippines, GarBia charity",
  },
  "/location": {
    title: "Office Location Cainta Rizal | GarBia Group",
    description:
      "Visit GarBia at Lot 10 Block 7 Jasmine St., Cainta, Rizal—minutes from Metro Manila. Parking available.",
    keywords: "Geotechnical Services Philippines, GarBia office, Cainta Rizal",
  },
  "/contact": {
    title: "Contact GarBia | Geotechnical Engineering Philippines",
    description:
      "Email inquiries@garbiagroup.com or call +63 (02) 8280-1763. Mobile lines available for site inquiries and geotechnical consultations.",
    keywords:
      "Contact GarBia, Geotechnical Services Philippines, soil investigation quote, " +
      PRIMARY_KEYWORDS,
  },
  "/404": {
    title: "Page Not Found | GarBia Group",
    description:
      "The page you requested was not found. Return to GarBia for geotechnical engineering and construction services.",
    keywords: PRIMARY_KEYWORDS,
    noindex: true,
  },
};

export function getPageMeta(pathname) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return PAGE_META[normalized] ?? PAGE_META["/404"];
}

export function canonicalUrl(pathname) {
  const path = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  return `${SITE_URL}${path || "/"}`;
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };
