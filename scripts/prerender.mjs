/**
 * Turns the client build into one static HTML file per route.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle):
 *
 *   dist/index.html          →  the built shell, with asset tags injected
 *   dist-ssr/entry-server.js →  renderBody / renderHead for a given route
 *
 * For each indexable route it swaps the route's head tags into the shell and
 * drops the rendered markup into <div id="root">, writing dist/<route>.html.
 * It also emits dist/404.html and regenerates dist/sitemap.xml from the same
 * route list, so the sitemap can never list a page the build did not produce.
 *
 * Nothing here runs in the browser or on the server at request time.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const HEAD_START = "<!--seo:start-->";
const HEAD_END = "<!--seo:end-->";
const APP_MARKER = "<!--app-html-->";

const STYLESHEET_LINK_PATTERN = /<link\s+rel="stylesheet"[^>]*?href="\/(assets\/[^"]+\.css)"[^>]*>/g;

async function inlineStylesheets(template) {
  let html = template;
  for (const [linkTag, cssFile] of template.matchAll(STYLESHEET_LINK_PATTERN)) {
    const css = await readFile(path.join(distDir, cssFile), "utf8");
    html = html.replace(linkTag, () => `<style>${css}</style>`);
  }
  return html;
}

const ENTRY_SCRIPT_PATTERN = /<script type="module"[^>]*?src="(\/assets\/[^"]+\.js)"[^>]*><\/script>\s*/;
const MODULE_PRELOAD_PATTERN = /<link rel="modulepreload"[^>]*>\s*/g;

const FALLBACK_START_DELAY_MS = 1500;

const deferredLoaderScript = (entrySource) => `<script>
(function () {
  var hasStarted = false;
  function start() {
    if (hasStarted) return;
    hasStarted = true;
    var script = document.createElement("script");
    script.type = "module";
    script.src = "${entrySource}";
    document.body.appendChild(script);
  }
  var canObservePaint =
    window.PerformanceObserver &&
    PerformanceObserver.supportedEntryTypes &&
    PerformanceObserver.supportedEntryTypes.indexOf("paint") !== -1;
  if (!canObservePaint) {
    window.addEventListener("load", start);
    return;
  }
  new PerformanceObserver(function (list, observer) {
    if (list.getEntriesByName("first-contentful-paint").length === 0) return;
    observer.disconnect();
    setTimeout(start, 0);
  }).observe({ type: "paint", buffered: true });
  window.addEventListener("load", function () {
    setTimeout(start, ${FALLBACK_START_DELAY_MS});
  });
})();
</script>`;

function deferEntryScript(template) {
  const entryMatch = ENTRY_SCRIPT_PATTERN.exec(template);
  if (!entryMatch) throw new Error("dist/index.html has no module entry script to defer.");

  return template
    .replace(MODULE_PRELOAD_PATTERN, "")
    .replace(ENTRY_SCRIPT_PATTERN, "")
    .replace("</body>", `${deferredLoaderScript(entryMatch[1])}\n  </body>`);
}

const CRITICAL_FONT_PATTERNS = [
  /^archivo-latin-wght-normal-.+\.woff2$/,
  /^public-sans-latin-wght-normal-.+\.woff2$/,
];

async function fontPreloadTags() {
  const assetFiles = await readdir(path.join(distDir, "assets"));
  return CRITICAL_FONT_PATTERNS.map((pattern) => {
    const fontFile = assetFiles.find((file) => pattern.test(file));
    if (!fontFile) {
      throw new Error(`No built font file matches ${pattern}; the font package or its file names changed.`);
    }
    return `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${fontFile}" />`;
  }).join("\n    ");
}

/** "/" → index.html, "/mission-vision" → mission-vision.html */
function outputFile(routePath) {
  return routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}.html`;
}

function injectHead(template, { title, tags }) {
  const start = template.indexOf(HEAD_START);
  const end = template.indexOf(HEAD_END);
  if (start === -1 || end === -1) {
    throw new Error(
      `dist/index.html is missing the ${HEAD_START} / ${HEAD_END} markers — ` +
        "index.html was edited without keeping them.",
    );
  }
  const head = `${HEAD_START}\n    <title>${title}</title>\n    ${tags}\n    `;
  return template.slice(0, start) + head + template.slice(end);
}

const SITE_ORIGIN = "https://garbiagroup.com";
const MAX_SITEMAP_IMAGES_PER_PAGE = 20;
const IMAGE_SOURCE_PATTERN = /<img\b[^>]*?\ssrc="([^"]+)"/g;

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function extractImageUrls(body) {
  const imageUrls = [...body.matchAll(IMAGE_SOURCE_PATTERN)]
    .map(([, source]) => source.replace(/&amp;/g, "&"))
    .map((source) => (source.startsWith("/") ? `${SITE_ORIGIN}${source}` : source))
    .filter((source) => source.startsWith("https://"));
  return [...new Set(imageUrls)].slice(0, MAX_SITEMAP_IMAGES_PER_PAGE);
}

function buildSitemap(routes, lastmod, imagesByRoute) {
  const urls = routes
    .map(({ path: routePath, changefreq, priority }) => {
      const images = (imagesByRoute.get(routePath) ?? [])
        .map((imageUrl) => `    <image:image><image:loc>${escapeXml(imageUrl)}</image:loc></image:image>\n`)
        .join("");
      return (
        "  <url>\n" +
        `    <loc>${SITE_ORIGIN}${routePath === "/" ? "/" : routePath}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority}</priority>\n` +
        images +
        "  </url>"
      );
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

async function main() {
  const template = deferEntryScript(
    await inlineStylesheets(await readFile(path.join(distDir, "index.html"), "utf8")),
  );
  if (!template.includes(APP_MARKER)) {
    throw new Error(`dist/index.html is missing ${APP_MARKER}.`);
  }

  const server = await import(pathToFileURL(ssrEntry).href);
  const { INDEXABLE_ROUTES, renderBody, renderHead } = server;

  const fontPreloads = await fontPreloadTags();

  const routes = [
    ...INDEXABLE_ROUTES,
    // Rendered so nginx has a real body to return with a 404 status, rather
    // than answering unknown URLs with a 200 and the homepage shell.
    { path: "/404", changefreq: null, priority: null, sitemap: false },
  ];

  const imagesByRoute = new Map();

  for (const route of routes) {
    const body = await renderBody(route.path);
    const head = renderHead(route.path);
    imagesByRoute.set(route.path, extractImageUrls(body));

    const html = injectHead(template, {
      ...head,
      tags: [head.tags, fontPreloads].filter(Boolean).join("\n    "),
    }).replace(APP_MARKER, body);

    const file = path.join(distDir, outputFile(route.path));
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html, "utf8");
    process.stdout.write(
      `  prerendered ${route.path.padEnd(16)} → dist/${outputFile(route.path)} (${(html.length / 1024).toFixed(1)} kB)\n`,
    );
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  await writeFile(
    path.join(distDir, "sitemap.xml"),
    buildSitemap(INDEXABLE_ROUTES, lastmod, imagesByRoute),
    "utf8",
  );
  process.stdout.write(
    `  sitemap.xml regenerated with ${INDEXABLE_ROUTES.length} URLs (lastmod ${lastmod})\n`,
  );
}

main().catch((error) => {
  console.error("\nPrerender failed:\n", error);
  process.exit(1);
});
