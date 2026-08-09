export const SITE_NAME = "GarBia Group";
export const SITE_URL = "https://garbiagroup.com";

/** DigitalOcean Spaces CDN. Origin is preconnected in index.html. */
export const CDN_BASE = "https://garbia.sgp1.cdn.digitaloceanspaces.com";
export const CDN_IMAGES = `${CDN_BASE}/images`;
export const CDN_VIDEOS = `${CDN_BASE}/videos`;

/**
 * Served from the site's own origin (public/garbia1.jpg) rather than the CDN,
 * so the share image is attributed to garbiagroup.com like every other
 * canonical signal.
 *
 * The declared size must match the file. It previously claimed 1200x630 for a
 * 958x960 image, which makes Facebook/LinkedIn lay the card out against the
 * wrong box. Replacing the asset with a real 1200x630 crop is an owner task —
 * see the SEO report — at which point update these two numbers with it.
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/garbia1.jpg`;
export const DEFAULT_OG_IMAGE_WIDTH = "958";
export const DEFAULT_OG_IMAGE_HEIGHT = "960";
export const DEFAULT_OG_IMAGE_ALT =
  "GarBia Structural and Geotechnical Solutions site works in the Philippines";
export const LOCALE = "en_PH";

/**
 * Verified public profiles for the same business. `sameAs` is how search
 * engines tie garbiagroup.com, the older garbiasgs.com site, and the social
 * profiles together as one entity instead of several.
 *
 * Only add a URL here after confirming it is genuinely the company's.
 */
export const SAME_AS = [
  "https://www.facebook.com/garbiastrucgeotech/",
  "https://www.linkedin.com/in/garbia-structural-and-geotechnical-solutions-a6113b18a/",
  "https://www.garbiasgs.com/",
];

/** Legitimate ways people search for this company. Used for schema alternateName. */
export const BRAND_ALTERNATE_NAMES = [
  "GarBia",
  "Garbia Group",
  "GarbiaGroup",
  "GarBia SGS",
  "GarBia Structural & Geotechnical Solutions",
];

export const BUSINESS = {
  legalName: "GarBia Structural and Geotechnical Solutions",
  email: "inquiries@garbiagroup.com",
  websiteUrl: "https://garbiagroup.com/",
  telephone: "+63282801763",
  telephoneDisplay: "+63 (02) 8280-1763",
  mobileNumbers: [
    { tel: "+639987285880", display: "+63 (998) 728-5880" },
    { tel: "+639569078719", display: "+63 (956) 907-8719" },
    { tel: "+639190016088", display: "+63 (919) 001-6088" },
  ],
  /** Primary mobile for footer / short links */
  phone: "+639987285880",
  phoneDisplay: "+63 (998) 728-5880",
  streetAddress: "Lot 10 Block 7 Jasmine Street",
  addressLocality: "Cainta",
  addressRegion: "Rizal",
  postalCode: "1900",
  addressCountry: "PH",
  geo: { latitude: 14.5632069, longitude: 121.1137044 },
  foundingYear: 2018,
  priceRange: "$$",
};

/**
 * Places the company has actually delivered work in, taken from the project
 * list on /projects. Kept deliberately short and evidence-backed — inventing
 * a long list of cities to chase local queries is exactly the doorway-page
 * pattern search engines penalise.
 */
export const SERVED_AREAS = [
  "Antipolo",
  "Marikina",
  "Pasig",
  "Taguig",
  "Rizal",
  "Metro Manila",
  "Luzon",
];

export const PRIMARY_KEYWORDS = [
  "Construction Company",
  "Geotechnical Engineering",
  "Foundation Engineering",
  "Soil Investigation",
  "Deep Foundation",
  "Pile Driving Contractor",
  "Site Investigation Services",
  "Geotechnical Services",
  "Civil Engineering Philippines",
  "Construction Services Philippines",
].join(", ");
