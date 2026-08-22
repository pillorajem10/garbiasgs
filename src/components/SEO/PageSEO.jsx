import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import usePageSEO from "@/hooks/usePageSEO";
import JsonLdGraph from "./JsonLd";
import { canonicalUrl, getPageMeta, seoPath } from "@/seo/pageMeta";
import {
  breadcrumbNode,
  faqNode,
  serviceNodes,
  webPageNode,
} from "@/seo/structuredData";

export default function PageSEO({ faqs, breadcrumbLabel }) {
  const { pathname } = useLocation();
  usePageSEO();

  const nodes = useMemo(() => {
    // Keyed off the SEO identity, not the raw pathname, so the /404 document
    // describes itself identically however it was reached.
    const path = seoPath(pathname);
    const url = canonicalUrl(path);
    const meta = getPageMeta(path);
    const pageNodes = [
      webPageNode({ url, title: meta.title, description: meta.description }),
    ];

    if (path !== "/" && breadcrumbLabel) {
      pageNodes.push(
        breadcrumbNode([
          { name: "Home", url: canonicalUrl("/") },
          { name: breadcrumbLabel, url },
        ]),
      );
    }

    if (path === "/services") pageNodes.push(...serviceNodes());
    if (faqs?.length) pageNodes.push(faqNode(faqs));

    return pageNodes;
  }, [pathname, breadcrumbLabel, faqs]);

  return <JsonLdGraph nodes={nodes} />;
}
