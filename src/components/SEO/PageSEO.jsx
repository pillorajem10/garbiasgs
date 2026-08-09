import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import usePageSEO from "@/hooks/usePageSEO";
import JsonLdGraph from "./JsonLd";
import { canonicalUrl, getPageMeta } from "@/seo/pageMeta";
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
    const url = canonicalUrl(pathname);
    const meta = getPageMeta(pathname);
    const pageNodes = [
      webPageNode({ url, title: meta.title, description: meta.description }),
    ];

    if (pathname !== "/" && breadcrumbLabel) {
      pageNodes.push(
        breadcrumbNode([
          { name: "Home", url: canonicalUrl("/") },
          { name: breadcrumbLabel, url },
        ]),
      );
    }

    if (pathname === "/services") pageNodes.push(...serviceNodes());
    if (faqs?.length) pageNodes.push(faqNode(faqs));

    return pageNodes;
  }, [pathname, breadcrumbLabel, faqs]);

  return <JsonLdGraph nodes={nodes} />;
}
