# Deployment

garbiasgs is a Vite/React app run as a single Docker container. The container
serves the static build with nginx; the **host nginx** terminates SSL and
reverse-proxies to it.

## Build: three steps, not one

`npm run build` now runs:

1. `build:client` — the browser bundle (`dist/`).
2. `build:ssr` — a Node-only render bundle (`dist-ssr/`), never shipped.
3. `prerender` — [scripts/prerender.mjs](scripts/prerender.mjs) renders every
   route in [src/seo/pageMeta.js](src/seo/pageMeta.js) to its own HTML file
   (`dist/services.html`, `dist/about.html`, …) with that page's title,
   description, canonical, social tags, and content, and regenerates
   `dist/sitemap.xml`.

The client **hydrates** that markup rather than replacing it, so the HTML a
crawler or link previewer fetches is the page itself, not an empty shell.

**Adding a route means three edits:** the `<Route>` in `src/App.jsx`, an entry
in `PAGE_META` + `INDEXABLE_ROUTES` in `src/seo/pageMeta.js`, and the page
module in `ROUTE_MODULES` in `scripts/prerender.mjs`. Miss the last one and the
build fails with a clear message; miss the middle one and nginx returns 404 for
the new URL, because unknown paths are no longer answered with the SPA shell.

## Pipeline (push to `master`)

See [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml). On push to
`master`, GitHub Actions SSHes into the VPS (dedicated `github-actions-deploy`
key) and runs the deploy there:

1. `git fetch --prune origin master` + `git reset --hard origin/master`
   (deploy box mirrors master exactly).
2. `docker build -t garbiasgs:latest .` (multi-stage: `npm ci` + `npm run build`,
   final stage `nginx:alpine`). Building on the VPS peaks ~900 MB — safe; the
   old high CPU/RAM was from building *twice* per deploy plus a permanent Node
   `serve` process, both eliminated.
3. Replace the `garbiasgs-green` container
   (`docker run -d --restart always -p 127.0.0.1:5174:5173`).
4. `docker image prune -f` reclaims old layers, then a curl smoke test.

## Container / port model

- Container `garbiasgs-green` runs nginx on port **5173** (baked config:
  [deploy/docker-nginx.conf](deploy/docker-nginx.conf)), published to host
  **5174**.
- Host nginx proxies `https://garbiagroup.com` → `127.0.0.1:5174`
  (see [deploy/nginx.conf](deploy/nginx.conf)).

## One-time / manual deploy on the VPS

```sh
cd /var/www/garbiagroup.com/garbiasgs
git pull origin master
docker build -t garbiasgs:latest .
docker stop garbiasgs-green 2>/dev/null || true
docker rm   garbiasgs-green 2>/dev/null || true
docker run -d --name garbiasgs-green --restart always -p 127.0.0.1:5174:5173 garbiasgs:latest
docker image prune -f
```

## Rollback

Re-run the previous image (tag one before deploying if you want a named
fallback), or redeploy the last good commit:

```sh
docker stop garbiasgs-green && docker rm garbiasgs-green
docker run -d --name garbiasgs-green --restart always -p 127.0.0.1:5174:5173 <previous-image>
```

## Housekeeping

A weekly cron (`/etc/cron.weekly/garbiasgs-cleanup`) prunes dangling Docker
images/build cache, trims journald logs, and clears apt/tmp caches so disk and
memory don't creep like before.
