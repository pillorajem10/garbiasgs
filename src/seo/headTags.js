/**
 * The head tags a given route should carry, as plain data.
 *
 * Single source of truth on purpose: the build-time prerender writes these into
 * the static HTML for each route, and usePageSEO replays the same list on
 * client-side navigation. Describing them once means the HTML a crawler fetches
 * and the head a visitor ends up with after navigating cannot disagree.
 */
import { getPageMeta, canonicalUrl } from "./pageMeta";
import {
  SITE_NAME,
  LOCALE,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_ALT,
} from "./constants";

export function headTagsFor(pathname) {
  const meta = getPageMeta(pathname);
  const canonical = canonicalUrl(pathname);

  return [
    { tag: "meta", name: "description", content: meta.description },
    { tag: "meta", name: "keywords", content: meta.keywords },
    {
      tag: "meta",
      name: "robots",
      content: meta.noindex ? "noindex, follow" : "index, follow",
    },
    // No canonical on the 404 document. It is served for whatever URL was
    // missing, so a self-referencing canonical would point every dead URL at
    // /404 — a page that is itself noindex. Omitting it leaves no conflicting
    // signal.
    ...(meta.noindex ? [] : [{ tag: "link", rel: "canonical", href: canonical }]),

    { tag: "meta", property: "og:type", content: "website" },
    { tag: "meta", property: "og:site_name", content: SITE_NAME },
    { tag: "meta", property: "og:title", content: meta.title },
    { tag: "meta", property: "og:description", content: meta.description },
    { tag: "meta", property: "og:url", content: canonical },
    { tag: "meta", property: "og:image", content: DEFAULT_OG_IMAGE },
    { tag: "meta", property: "og:image:width", content: DEFAULT_OG_IMAGE_WIDTH },
    { tag: "meta", property: "og:image:height", content: DEFAULT_OG_IMAGE_HEIGHT },
    { tag: "meta", property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
    { tag: "meta", property: "og:locale", content: LOCALE },

    { tag: "meta", name: "twitter:card", content: "summary_large_image" },
    { tag: "meta", name: "twitter:title", content: meta.title },
    { tag: "meta", name: "twitter:description", content: meta.description },
    { tag: "meta", name: "twitter:image", content: DEFAULT_OG_IMAGE },
    { tag: "meta", name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
  ].filter((tag) => tag.content !== undefined || tag.tag === "link");
}

export { getPageMeta, canonicalUrl };
