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

export function OrganizationJsonLd() {
  const data = useMemo(
    () => ({
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
      contactPoint: [
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
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.addressCountry,
      },
    }),
    []
  );
  return <JsonLdScript data={data} />;
}

export function LocalBusinessJsonLd() {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BUSINESS.legalName,
      image: `${SITE_URL}/garbia1.jpg`,
      url: SITE_URL,
      email: BUSINESS.email,
      telephone: BUSINESS.telephone,
      contactPoint: [
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
      ],
      priceRange: BUSINESS.priceRange,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      areaServed: { "@type": "Country", name: "Philippines" },
    }),
    []
  );
  return <JsonLdScript data={data} />;
}

export function WebSiteJsonLd() {
  const data = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en-PH",
    }),
    []
  );
  return <JsonLdScript data={data} />;
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
    [services]
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
    [faqs]
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
    [items]
  );
  return <JsonLdScript data={data} />;
}
