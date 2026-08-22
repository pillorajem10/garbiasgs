import { useLocation } from "react-router-dom";
import PageSEO from "./PageSEO";
import { HOME_FAQ, SERVICES_FAQ } from "@/seo/faqData";
import { BREADCRUMB_LABELS, seoPath } from "@/seo/pageMeta";

export default function RouteSEO() {
  const { pathname } = useLocation();
  const path = seoPath(pathname);

  let faqs;
  if (path === "/") faqs = HOME_FAQ;
  else if (path === "/services") faqs = SERVICES_FAQ;

  const breadcrumbLabel =
    path === "/404" ? "Page Not Found" : BREADCRUMB_LABELS[path];

  return (
    <PageSEO
      faqs={faqs}
      breadcrumbLabel={path !== "/" ? breadcrumbLabel : undefined}
    />
  );
}
