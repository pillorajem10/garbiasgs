export const SERVICE_CATALOG = [
  {
    slug: "site-assessment",
    name: "Site Assessment",
    metaTitle: "Site Assessment for Construction Projects | GarBia Group",
    metaDescription:
      "Desk study and site walkover by GarBia Group that set the scope of a soil investigation before drilling starts. Serving Metro Manila, Rizal, and Luzon.",
    description:
      "Desk study and site reconnaissance that establish ground conditions, access, and the scope of investigation a project needs before drilling begins.",
  },
  {
    slug: "soil-investigation",
    name: "Soil Investigation & Sub-Surface Exploration",
    metaTitle: "Soil Investigation & SPT Testing Philippines | GarBia Group",
    metaDescription:
      "Soil investigation by GarBia Group: boreholes with Standard Penetration Testing, coring, and test pits for foundation design across Luzon, Philippines.",
    description:
      "Standard Penetration Testing (SPT), coring, and test pits to recover samples and record sub-surface profiles for foundation and structural design.",
  },
  {
    slug: "geotechnical-testing",
    name: "Geotechnical Testing",
    metaTitle: "Geotechnical Testing Services Philippines | GarBia Group",
    metaDescription:
      "In-situ and laboratory geotechnical testing that puts numbers on soil strength, classification, and settlement for foundation design. By GarBia Group.",
    description:
      "In-situ and laboratory testing of recovered soil samples to establish strength, classification, and settlement behaviour.",
  },
  {
    slug: "geotechnical-reports",
    name: "Detailed Geotechnical Reports",
    metaTitle: "Geotechnical Reports & Foundation Design | GarBia Group",
    metaDescription:
      "Geotechnical reports with borehole logs, laboratory results, liquefaction analysis, and foundation design recommendations, prepared by GarBia Group.",
    description:
      "Laboratory analysis, liquefaction analysis, and foundation design recommendations issued as a geotechnical report for the design team.",
  },
  {
    slug: "micropiling",
    name: "Micropiling & Bored Piling Works",
    metaTitle: "Micropiling & Bored Piling Contractor | GarBia Group",
    metaDescription:
      "Micropiling and bored piling works by GarBia Group for soft ground, sloping sites, and work beside existing structures in Metro Manila, Rizal, and Luzon.",
    description:
      "Deep foundation works for sites where shallow soils cannot carry the design load, including restricted-access and existing-structure conditions.",
  },
  {
    slug: "grouting",
    name: "Jet Grouting & Cement Grouting Works",
    metaTitle: "Jet Grouting & Cement Grouting Works | GarBia Group",
    metaDescription:
      "Jet grouting and cement grouting by GarBia Group to improve bearing capacity, control seepage, and stabilise weak or loose ground in the Philippines.",
    description:
      "Ground improvement by grout injection to increase bearing capacity, reduce permeability, and stabilise weak or loose ground.",
  },
  {
    slug: "laboratory-testing",
    name: "Soil Laboratory Testing",
    metaTitle: "Soil Laboratory Testing to ASTM in Rizal | GarBia Group",
    metaDescription:
      "Soil laboratory testing at GarBia Group's Cainta, Rizal laboratory: moisture content, Atterberg limits, consolidation, CBR, and more, to ASTM standards.",
    description:
      "Moisture content, specific gravity, Atterberg limits, grain size distribution, consolidation, field density, maximum dry density, CBR, Los Angeles abrasion, permeability, and unconfined compression testing.",
  },
];

const SERVICE_PAGE_PREFIX = "/services/";

export function servicePagePath(slug) {
  return `${SERVICE_PAGE_PREFIX}${slug}`;
}

export function findServiceBySlug(slug) {
  return SERVICE_CATALOG.find((service) => service.slug === slug);
}

export function serviceSlugFromPath(pathname) {
  if (!pathname.startsWith(SERVICE_PAGE_PREFIX)) return null;
  const slug = pathname.slice(SERVICE_PAGE_PREFIX.length);
  return findServiceBySlug(slug) ? slug : null;
}
