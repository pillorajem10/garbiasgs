import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta, canonicalUrl, SITE_NAME } from "@/seo/pageMeta";
import { headTagsFor } from "@/seo/headTags";

/**
 * Keeps the document head in step with the current route on client-side
 * navigation.
 *
 * The *first* view of any page already ships correct head tags: the build
 * prerenders one HTML file per route (see scripts/prerender.mjs) from the same
 * `headTagsFor` description used here, so crawlers that do not run JavaScript
 * still get the right title, description, canonical, and social tags. This hook
 * only has to handle in-app navigation, where no new document is fetched.
 */
function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  for (const [name, value] of Object.entries(attrs)) {
    el.setAttribute(name, value);
  }
  return el;
}

export default function usePageSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    document.documentElement.lang = "en-PH";

    const tags = headTagsFor(pathname);

    // Navigating from a real page to a 404 has to *remove* the canonical the
    // previous page left behind, not just stop setting one.
    if (!tags.some((tag) => tag.rel === "canonical")) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }

    for (const tag of tags) {
      if (tag.tag === "meta" && tag.name) {
        upsert(`meta[name="${tag.name}"]`, () => document.createElement("meta"), {
          name: tag.name,
          content: tag.content,
        });
      } else if (tag.tag === "meta" && tag.property) {
        upsert(
          `meta[property="${tag.property}"]`,
          () => document.createElement("meta"),
          { property: tag.property, content: tag.content },
        );
      } else if (tag.tag === "link") {
        upsert(
          `link[rel="${tag.rel}"]`,
          () => document.createElement("link"),
          { rel: tag.rel, href: tag.href },
        );
      }
    }

    upsert('meta[name="author"]', () => document.createElement("meta"), {
      name: "author",
      content: SITE_NAME,
    });
  }, [pathname]);
}

export { canonicalUrl };
