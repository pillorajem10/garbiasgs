/**
 * Build-time rendering entry. Never shipped to the browser.
 *
 * The site is a client-rendered SPA, so before this existed every URL on
 * garbiagroup.com returned the same ~3 KB shell: same <title>, same
 * description, same canonical, and an empty <div id="root">. Googlebot renders
 * JavaScript and could eventually see the real page, but Bing, the Facebook /
 * LinkedIn / X / Viber link previewers, and most AI crawlers do not — to them
 * every page of the site looked identical to the homepage.
 *
 * This module renders each route to static HTML at build time so the file
 * served for /services really is the services page. The client still boots
 * normally on top of it and takes over from there.
 */
import { StaticRouter } from "react-router";
import { prerenderToNodeStream } from "react-dom/static";
import { AppRoot } from "./App.jsx";
import { headTagsFor } from "./seo/headTags";
import { getPageMeta } from "./seo/pageMeta";

export { INDEXABLE_ROUTES } from "./seo/pageMeta";

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    let out = "";
    stream.setEncoding("utf8");
    stream.on("data", (chunk) => {
      out += chunk;
    });
    stream.on("end", () => resolve(out));
    stream.on("error", reject);
  });
}

/** Static markup for `url`, ready to drop into <div id="root">. */
export async function renderBody(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <AppRoot />
    </StaticRouter>,
  );
  return streamToString(prelude);
}

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** The <title> and meta/link tags this route should ship in its static HTML. */
export function renderHead(url) {
  const { title } = getPageMeta(url);
  const tags = headTagsFor(url).map((tag) => {
    if (tag.tag === "link") {
      return `<link rel="${tag.rel}" href="${escapeAttr(tag.href)}" />`;
    }
    const key = tag.name ? "name" : "property";
    const value = tag.name ?? tag.property;
    return `<meta ${key}="${value}" content="${escapeAttr(tag.content)}" />`;
  });

  return {
    title: escapeAttr(title),
    tags: tags.join("\n    "),
  };
}
