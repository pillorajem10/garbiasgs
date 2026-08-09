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
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const HEAD_START = "<!--seo:start-->";
const HEAD_END = "<!--seo:end-->";
const APP_MARKER = "<!--app-html-->";

/**
 * Route → the lazily-imported page module behind it, used to look that route's
 * CSS chunk up in the client build manifest.
 *
 * Pages are code-split, so their styles live in a CSS file that only downloads
 * with the page's JS chunk. Without linking it here the prerendered markup
 * paints unstyled and then restyles a moment later. Kept in the build script
 * rather than in app code because it describes the build, and validated below
 * so a renamed page fails the build instead of silently losing its styles.
 */
const ROUTE_MODULES = {
  "/": "src/Pages/Home/index.jsx",
  "/services": "src/Pages/Services/index.jsx",
  "/about": "src/Pages/About/index.jsx",
  "/contact": "src/Pages/Contact/index.jsx",
  "/mission-vision": "src/Pages/MissionVision/index.jsx",
  "/location": "src/Pages/Location/index.jsx",
  "/projects": "src/Pages/Projects/index.jsx",
  "/program": "src/Pages/Program/index.jsx",
  "/404": "src/Pages/DefaultPage/index.jsx",
};

/** Every CSS file a route's chunk needs, following imports transitively. */
function cssForRoute(manifest, routePath) {
  const entry = ROUTE_MODULES[routePath];
  if (!entry) throw new Error(`No page module mapped for route ${routePath}`);
  if (!manifest[entry]) {
    throw new Error(
      `${entry} is not in the client build manifest — the page moved or was ` +
        "renamed; update ROUTE_MODULES in scripts/prerender.mjs.",
    );
  }

  const css = new Set();
  const seen = new Set();
  const walk = (key) => {
    if (seen.has(key)) return;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) return;
    for (const file of chunk.css ?? []) css.add(file);
    for (const imported of chunk.imports ?? []) walk(imported);
  };
  walk(entry);
  return [...css];
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

function buildSitemap(routes, lastmod) {
  const urls = routes
    .map(
      ({ path: routePath, changefreq, priority }) =>
        "  <url>\n" +
        `    <loc>https://garbiagroup.com${routePath === "/" ? "/" : routePath}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority}</priority>\n` +
        "  </url>",
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  const template = await readFile(path.join(distDir, "index.html"), "utf8");
  if (!template.includes(APP_MARKER)) {
    throw new Error(`dist/index.html is missing ${APP_MARKER}.`);
  }

  const manifest = JSON.parse(
    await readFile(path.join(distDir, ".vite", "manifest.json"), "utf8"),
  );

  const server = await import(pathToFileURL(ssrEntry).href);
  const { INDEXABLE_ROUTES, renderBody, renderHead } = server;

  const routes = [
    ...INDEXABLE_ROUTES,
    // Rendered so nginx has a real body to return with a 404 status, rather
    // than answering unknown URLs with a 200 and the homepage shell.
    { path: "/404", changefreq: null, priority: null, sitemap: false },
  ];

  for (const route of routes) {
    const body = await renderBody(route.path);
    const head = renderHead(route.path);
    // Vite already links the entry CSS in the template; only add what the
    // route needs on top of it.
    const css = cssForRoute(manifest, route.path)
      .filter((file) => !template.includes(file))
      .map((file) => `<link rel="stylesheet" crossorigin href="/${file}" />`)
      .join("\n    ");

    const html = injectHead(template, {
      ...head,
      tags: css ? `${head.tags}\n    ${css}` : head.tags,
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
    buildSitemap(INDEXABLE_ROUTES, lastmod),
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
