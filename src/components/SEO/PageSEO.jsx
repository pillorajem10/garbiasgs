import { useLocation } from "react-router-dom";
import usePageSEO from "@/hooks/usePageSEO";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  FaqPageJsonLd,
  BreadcrumbJsonLd,
  ServiceJsonLd,
} from "./JsonLd";
import { canonicalUrl } from "@/seo/pageMeta";

const SERVICE_SCHEMA_ITEMS = [
  {
    name: "Soil Investigation & Site Investigation",
    description:
      "Sub-surface exploration, sampling, and laboratory testing for foundation and structural design.",
  },
  {
    name: "Foundation Engineering & Deep Foundations",
    description:
      "Foundation recommendations, deep foundation design support, and pile driving contractor services.",
  },
  {
    name: "Geotechnical Laboratory Testing",
    description:
      "Soil and material testing to support civil engineering and construction projects in the Philippines.",
  },
];

export default function PageSEO({ faqs, breadcrumbLabel }) {
  const { pathname } = useLocation();
  usePageSEO();

  const breadcrumbs = [{ name: "Home", url: canonicalUrl("/") }];
  if (pathname !== "/" && breadcrumbLabel) {
    breadcrumbs.push({ name: breadcrumbLabel, url: canonicalUrl(pathname) });
  }

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      {pathname === "/services" && <ServiceJsonLd services={SERVICE_SCHEMA_ITEMS} />}
      {faqs?.length > 0 && <FaqPageJsonLd faqs={faqs} />}
      {breadcrumbLabel && pathname !== "/" && (
        <BreadcrumbJsonLd items={breadcrumbs} />
      )}
    </>
  );
}
