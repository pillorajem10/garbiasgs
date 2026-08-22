import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, PRIMARY_KEYWORDS } from "./constants";

/**
 * Per-route title and description.
 *
 * Titles lead with the distinguishing part of the page and close with the
 * brand, so a branded search ("garbia group", "garbia sgs") has the brand to
 * match on and a service search has the service term near the front. Both are
 * kept short enough to survive Google's ~60-character truncation.
 *
 * Every title and description here must stay unique — duplicate metadata across
 * routes is one of the things this file exists to prevent.
 */
export const PAGE_META = {
  "/": {
    title: "GarBia Group | Geotechnical & Construction Services Philippines",
    description:
      "GarBia Group — GarBia Structural and Geotechnical Solutions — provides soil investigation, geotechnical testing, and foundation works across Luzon, Philippines.",
    keywords: PRIMARY_KEYWORDS,
  },
  "/services": {
    title: "Geotechnical & Soil Investigation Services | GarBia Group",
    description:
      "Site assessment, soil exploration by SPT and coring, laboratory testing, geotechnical reports, micropiling, and grouting for buildings, roads, and infrastructure.",
    keywords:
      "Geotechnical Services, Site Investigation Services, Soil Investigation, Deep Foundation, " +
      PRIMARY_KEYWORDS,
  },
  "/about": {
    title: "About GarBia Group | Geotechnical Company in the Philippines",
    description:
      "Founded in 2018 in Cainta, Rizal, GarBia Group is ISO 9001:2015 certified, DPWH-BRS accredited, PCAB Category A licensed, and a PhilGEPS Platinum member.",
    keywords: "Construction Company, Geotechnical Engineering, " + PRIMARY_KEYWORDS,
  },
  "/mission-vision": {
    title: "Mission & Vision | GarBia Group Geotechnical Solutions",
    description:
      "GarBia Group's mission and vision: accurate, high-quality geotechnical services supporting the Philippines' shift to quality construction and safe infrastructure.",
    keywords: PRIMARY_KEYWORDS,
  },
  "/projects": {
    title: "Geotechnical & Construction Projects | GarBia Group",
    description:
      "Soil investigation and foundation projects delivered by GarBia Group in Antipolo, Marikina, Pasig, and Taguig — with site photos from each engagement.",
    keywords: PRIMARY_KEYWORDS,
  },
  "/program": {
    title: "Community Charity Programs | GarBia Group",
    description:
      "GarBia Group's outreach work: food, educational supplies, and disaster response for communities near the sites where the company builds.",
    keywords: "Construction Company Philippines, GarBia charity",
  },
  "/location": {
    title: "Office Location in Cainta, Rizal | GarBia Group",
    description:
      "Find GarBia Group at Lot 10 Block 7 Jasmine Street, Cainta, Rizal 1900 — minutes from Metro Manila, with parking for consultations and sample drop-offs.",
    keywords: "Geotechnical Services Philippines, GarBia office, Cainta Rizal",
  },
  "/contact": {
    title: "Contact GarBia Group | Geotechnical Services Philippines",
    description:
      "Request soil investigation, geotechnical testing, or foundation works from GarBia Group. Email inquiries@garbiagroup.com or call +63 (02) 8280-1763.",
    keywords:
      "Contact GarBia, Geotechnical Services Philippines, soil investigation quote, " +
      PRIMARY_KEYWORDS,
  },
  "/404": {
    title: "Page Not Found | GarBia Group",
    description:
      "That page does not exist. Browse GarBia Group's geotechnical engineering, soil investigation, and construction services instead.",
    keywords: PRIMARY_KEYWORDS,
    noindex: true,
  },
};

/** Breadcrumb label for each non-home route. */
export const BREADCRUMB_LABELS = {
  "/services": "Services",
  "/about": "About",
  "/mission-vision": "Mission & Vision",
  "/projects": "Projects",
  "/program": "Charity Programs",
  "/location": "Location",
  "/contact": "Contact",
};

/**
 * Indexable routes, in sitemap priority order. Drives the prerender, the
 * sitemap, and nothing else — so adding a route in one place cannot leave it
 * missing from the other two.
 */
export const INDEXABLE_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.85" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/location", changefreq: "monthly", priority: "0.8" },
  { path: "/mission-vision", changefreq: "monthly", priority: "0.7" },
  { path: "/program", changefreq: "monthly", priority: "0.6" },
];

/**
 * The stable path a URL has for SEO purposes.
 *
 * Every URL without a page of its own is the *same* "not found" document: the
 * build prerenders it once at /404 and nginx returns that file for whatever
 * URL was missing (deploy/docker-nginx.conf). So its self-description must not
 * vary by request path — keyed off the raw pathname, the page claimed an
 * og:url and a structured-data @id for every junk URL that was ever requested,
 * and the client rewrote both to something the prerendered HTML never said.
 */
export function seoPath(pathname) {
  const normalized = normalizePath(pathname);
  return PAGE_META[normalized] ? normalized : "/404";
}

export function getPageMeta(pathname) {
  return PAGE_META[seoPath(pathname)];
}

/** "/services/" and "/services" are the same page; "/" stays "/". */
export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

/**
 * Absolute canonical URL on the preferred host, with no trailing slash except
 * on the homepage. Canonicals must be absolute and must always name
 * garbiagroup.com — that is the signal telling search engines which of the
 * company's domains and host variants is authoritative.
 */
export function canonicalUrl(pathname) {
  const path = normalizePath(pathname);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };
