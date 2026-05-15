import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta, canonicalUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/seo/pageMeta";
import {
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
  LOCALE,
  TWITTER_HANDLE,
} from "@/seo/constants";

function setMetaName(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function usePageSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    const canonical = canonicalUrl(pathname);

    document.title = meta.title;
    setMetaName("description", meta.description);
    setMetaName("keywords", meta.keywords);
    setMetaName("author", SITE_NAME);
    setMetaName("robots", meta.noindex ? "noindex, follow" : "index, follow");

    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", SITE_NAME);
    setMetaProperty("og:title", meta.title);
    setMetaProperty("og:description", meta.description);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", DEFAULT_OG_IMAGE);
    setMetaProperty("og:image:width", DEFAULT_OG_IMAGE_WIDTH);
    setMetaProperty("og:image:height", DEFAULT_OG_IMAGE_HEIGHT);
    setMetaProperty("og:locale", LOCALE);

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", meta.title);
    setMetaName("twitter:description", meta.description);
    setMetaName("twitter:image", DEFAULT_OG_IMAGE);
    setMetaName("twitter:site", TWITTER_HANDLE);

    setCanonical(canonical);
  }, [pathname]);
}
