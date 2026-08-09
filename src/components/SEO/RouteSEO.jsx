import { useLocation } from "react-router-dom";
import PageSEO from "./PageSEO";
import { HOME_FAQ, SERVICES_FAQ } from "@/seo/faqData";
import { BREADCRUMB_LABELS, PAGE_META, normalizePath } from "@/seo/pageMeta";

export default function RouteSEO() {
  const { pathname } = useLocation();
  const normalized = normalizePath(pathname);
  const isKnown = Boolean(PAGE_META[normalized]);

  let faqs;
  if (normalized === "/") faqs = HOME_FAQ;
  else if (normalized === "/services") faqs = SERVICES_FAQ;

  const breadcrumbLabel = isKnown
    ? BREADCRUMB_LABELS[normalized]
    : "Page Not Found";

  return (
    <PageSEO
      faqs={faqs}
      breadcrumbLabel={normalized !== "/" ? breadcrumbLabel : undefined}
    />
  );
}
