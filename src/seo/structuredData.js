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
  SAME_AS,
  BRAND_ALTERNATE_NAMES,
  SERVED_AREAS,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
} from "./constants";
import { SERVICE_CATALOG, servicePagePath } from "@/constants/services";

export const ORG_ID = `${SITE_URL}/#organization`;
export const PLACE_ID = `${SITE_URL}/#office`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

function serviceUrl(slug) {
  return `${SITE_URL}${servicePagePath(slug)}`;
}

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

export const ORGANIZATION_NODE = {
  "@type": ["Organization", "ProfessionalService", "GeneralContractor"],
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: BUSINESS.legalName,
  alternateName: BRAND_ALTERNATE_NAMES,
  description:
    "GarBia Group (GarBia Builders and Technology Solutions, OPC — formerly GarBia Structural and Geotechnical Solutions) is a Philippine geotechnical engineering and construction services company providing soil investigation, site investigation, laboratory testing, geotechnical reports, micropiling, and ground improvement works.",
  url: `${SITE_URL}/`,
  // Must be the brand mark visitors actually see. This pointed at the previous
  // CDN logo, which the site no longer displays anywhere — structured data has
  // to match the visible brand, so it tracks the same asset as the share image.
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_OG_IMAGE,
    width: DEFAULT_OG_IMAGE_WIDTH,
    height: DEFAULT_OG_IMAGE_HEIGHT,
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
  slogan: "Strong foundations for a safe future",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Geotechnical engineering and construction services",
    itemListElement: SERVICE_CATALOG.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        url: serviceUrl(service.slug),
      },
    })),
  },
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
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${serviceUrl(service.slug)}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
    url: serviceUrl(service.slug),
  }));
}

/** Wraps page-specific nodes with the always-present ones into one document. */
export function buildGraph(pageNodes = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [...SITE_GRAPH_NODES, ...pageNodes],
  };
}
