import { useMemo } from "react";
import { SITE_URL, SITE_NAME, BUSINESS, CDN_IMAGES } from "@/seo/constants";

function JsonLdScript({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema that never varies is built once at module scope rather than memoised
// per component instance — same JSON, no per-render work and no memo cache.
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

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  logo: `${CDN_IMAGES}/garbiaLogo.jpg`,
  image: `${SITE_URL}/garbia1.jpg`,
  foundingDate: String(BUSINESS.foundingYear),
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  contactPoint: CONTACT_POINTS,
  address: POSTAL_ADDRESS,
};

const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.legalName,
  image: `${SITE_URL}/garbia1.jpg`,
  url: SITE_URL,
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  contactPoint: CONTACT_POINTS,
  priceRange: BUSINESS.priceRange,
  address: POSTAL_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  areaServed: { "@type": "Country", name: "Philippines" },
};

const WEB_SITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-PH",
};

export function OrganizationJsonLd() {
  return <JsonLdScript data={ORGANIZATION} />;
}

export function LocalBusinessJsonLd() {
  return <JsonLdScript data={LOCAL_BUSINESS} />;
}

export function WebSiteJsonLd() {
  return <JsonLdScript data={WEB_SITE} />;
}

export function ServiceJsonLd({ services }) {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          areaServed: "Philippines",
        },
      })),
    }),
    [services],
  );
  return <JsonLdScript data={data} />;
}

export function FaqPageJsonLd({ faqs = [] }) {
  const data = useMemo(
    () =>
      faqs.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }
        : null,
    [faqs],
  );
  if (!data) return null;
  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({ items }) {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }),
    [items],
  );
  return <JsonLdScript data={data} />;
}
