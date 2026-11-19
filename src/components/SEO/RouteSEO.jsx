import { useLocation } from "react-router-dom";
import PageSEO from "./PageSEO";
import { HOME_FAQ, SERVICES_FAQ, faqsForService } from "@/seo/faqData";
import { serviceSlugFromPath } from "@/constants/services";
import { seoPath } from "@/seo/pageMeta";

export default function RouteSEO() {
  const { pathname } = useLocation();
  const path = seoPath(pathname);

  const serviceSlug = serviceSlugFromPath(path);

  let faqs;
  if (path === "/") faqs = HOME_FAQ;
  else if (path === "/services") faqs = SERVICES_FAQ;
  else if (serviceSlug) faqs = faqsForService(serviceSlug);

  return <PageSEO faqs={faqs} />;
}
