/**
 * Schema.org data for the site.
 *
 * Everything lives in one `@graph` with stable `@id`s. That matters: the site
 * previously emitted a standalone Organization *and* a standalone LocalBusiness
 * that both claimed `url: https://garbiagroup.com` with different `name`s, so a
 * parser had no way to tell it was reading one company described twice. With
 * `@id` references there is a single organisation node, a single place node,
 * and every page's WebPage node points back at them.
 *
 * Rule for this file: only facts that are visible on the site or otherwise
 * verified. No ratings, no review counts, no certifications beyond the ones
 * listed on /about, no opening hours until the business confirms them.
 */
import {
  SITE_NAME,
  SITE_URL,
  BUSINESS,
  CDN_IMAGES,
  SAME_AS,
  BRAND_ALTERNATE_NAMES,
  SERVED_AREAS,
  DEFAULT_OG_IMAGE,
} from "./constants";

export const ORG_ID = `${SITE_URL}/#organization`;
export const PLACE_ID = `${SITE_URL}/#office`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const CONTACT_POINTS = [
  {
    "@type": "ContactPoint",
    telephone: BUSINESS.telephone,
    contactType: "customer service",
    areaServed: "PH",
    availableLanguage: ["English", "Filipino"],
  },
  ...BUSINESS.mobileNumbers.map((m) => ({
    "@type": "ContactPoint",
    telephone: m.tel,
    contactType: "customer service",
    areaServed: "PH",
  })),
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.streetAddress,
  addressLocality: BUSINESS.addressLocality,
  addressRegion: BUSINESS.addressRegion,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.addressCountry,
};

const AREA_SERVED = SERVED_AREAS.map((name) => ({ "@type": "Place", name }));

/**
 * The services the company states it provides, mirrored from the visible list
 * on /services. Each entry has an anchor on that page, so the schema and the
 * rendered content stay in step.
 */
export const SERVICE_CATALOG = [
  {
    slug: "site-assessment",
    name: "Site Assessment",
    description:
      "Desk study and site reconnaissance that establish ground conditions, access, and the scope of investigation a project needs before drilling begins.",
  },
  {
    slug: "soil-investigation",
    name: "Soil Investigation & Sub-Surface Exploration",
    description:
      "Standard Penetration Testing (SPT), coring, and test pits to recover samples and record sub-surface profiles for foundation and structural design.",
  },
  {
    slug: "geotechnical-testing",
    name: "Geotechnical Testing",
    description:
      "In-situ and laboratory testing of recovered soil samples to establish strength, classification, and settlement behaviour.",
  },
  {
    slug: "geotechnical-reports",
    name: "Detailed Geotechnical Reports",
    description:
      "Laboratory analysis, liquefaction analysis, and foundation design recommendations issued as a geotechnical report for the design team.",
  },
  {
    slug: "micropiling",
    name: "Micropiling & Bored Piling Works",
    description:
      "Deep foundation works for sites where shallow soils cannot carry the design load, including restricted-access and existing-structure conditions.",
  },
  {
    slug: "grouting",
    name: "Jet Grouting & Cement Grouting Works",
    description:
      "Ground improvement by grout injection to increase bearing capacity, reduce permeability, and stabilise weak or loose ground.",
  },
  {
    slug: "laboratory-testing",
    name: "Soil Laboratory Testing",
    description:
      "Moisture content, specific gravity, Atterberg limits, grain size distribution, consolidation, field density, maximum dry density, CBR, Los Angeles abrasion, permeability, and unconfined compression testing.",
  },
];

export const ORGANIZATION_NODE = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: BUSINESS.legalName,
  alternateName: BRAND_ALTERNATE_NAMES,
  description:
    "GarBia Group (GarBia Structural and Geotechnical Solutions) is a Philippine geotechnical engineering and construction services company providing soil investigation, site investigation, laboratory testing, geotechnical reports, micropiling, and ground improvement works.",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${CDN_IMAGES}/garbiaLogo.jpg`,
  },
  image: DEFAULT_OG_IMAGE,
  foundingDate: String(BUSINESS.foundingYear),
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  priceRange: BUSINESS.priceRange,
  contactPoint: CONTACT_POINTS,
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED,
  sameAs: SAME_AS,
  location: { "@id": PLACE_ID },
  knowsAbout: [
    "Geotechnical engineering",
    "Soil investigation",
    "Site investigation",
    "Foundation engineering",
    "Deep foundations",
    "Micropiling",
    "Soil laboratory testing",
    "Ground improvement",
  ],
};

export const PLACE_NODE = {
  "@type": "Place",
  "@id": PLACE_ID,
  name: BUSINESS.legalName,
  address: POSTAL_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  telephone: BUSINESS.telephone,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
};

export const WEBSITE_NODE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  alternateName: BRAND_ALTERNATE_NAMES,
  url: `${SITE_URL}/`,
  inLanguage: "en-PH",
  publisher: { "@id": ORG_ID },
};

/** Nodes present on every page. */
export const SITE_GRAPH_NODES = [ORGANIZATION_NODE, PLACE_NODE, WEBSITE_NODE];

export function webPageNode({ url, title, description }) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-PH",
  };
}

export function breadcrumbNode(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqNode(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceNodes(services = SERVICE_CATALOG) {
  return services.map((s) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/services#${s.slug}`,
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    url: `${SITE_URL}/services#${s.slug}`,
  }));
}

/** Wraps page-specific nodes with the always-present ones into one document. */
export function buildGraph(pageNodes = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [...SITE_GRAPH_NODES, ...pageNodes],
  };
}
