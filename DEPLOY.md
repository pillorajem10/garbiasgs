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

**Adding a route means two edits:** the `<Route>` in `src/App.jsx`, and an entry
in `PAGE_META` + `INDEXABLE_ROUTES` in `src/seo/pageMeta.js`. Miss the second and
nginx returns 404 for the new URL, because unknown paths are no longer answered
with the SPA shell. The site's CSS is one file, inlined into every prerendered
page, so a new route needs nothing in the build script.

## Pipeline (push to `master`)

See [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml). On push to
`master`, GitHub Actions SSHes into the VPS (dedicated `github-actions-deploy`
key) and runs the deploy there:

1. `git fetch --prune origin master` + `git reset --hard origin/master`
   (deploy box mirrors master exactly).
2. `DOCKER_BUILDKIT=0 docker build --no-cache -t garbiasgs:latest .`
   (multi-stage: `npm ci` + `npm run build`, final stage `nginx:alpine`).
   Building on the VPS peaks ~900 MB — safe; the old high CPU/RAM was from
   building *twice* per deploy plus a permanent Node `serve` process, both
   eliminated. `DOCKER_BUILDKIT=0`: BuildKit's overlay2 snapshotter on this
   VPS has repeatedly failed to commit a `RUN` layer's filesystem diff even
   though the command's own output showed it genuinely succeeded, so the
   next stage's `COPY --from=builder` found nothing there — confirmed via
   dmesg logging an overlay mount conflict at the exact failure time. The
   classic (pre-BuildKit) builder does not use that snapshotter and does not
   reproduce the failure; three builds in a row confirmed this directly on
   the VPS. See the comment in deploy.yaml for the full incident history.
3. Replace the `garbiasgs-green` container
   (`docker run -d --restart always -p 127.0.0.1:5174:5173`).
4. `docker image prune -f` reclaims old image layers, then a curl smoke test.

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
DOCKER_BUILDKIT=0 docker build --no-cache -t garbiasgs:latest .
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

## Contact form mail service

The contact form posts to `/api/contact`, which a small Node service in
[contact-api/](contact-api/) turns into an email to `MAIL_TO`. It runs as its
own container (`garbiasgs-contact`, published on `127.0.0.1:5175`), separate
from the site container, so a problem with it never affects the site.

### One-time setup on the VPS

1. Create `/var/www/garbiagroup.com/contact-api.env` (outside the git checkout,
   so deploys never overwrite it) using
   [contact-api/.env.example](contact-api/.env.example) as the template. It needs
   the SMTP details of the mailbox that will send the messages:

   ```sh
   MAIL_TO=inquiries@garbiagroup.com
   MAIL_FROM=<the address your SMTP account is allowed to send from>
   SMTP_HOST=mail.privateemail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=<SMTP username>
   SMTP_PASS=<SMTP password or app password>
   ```

   Then `chmod 600` the file.

2. Add the `location = /api/contact` block from
   [deploy/nginx.conf](deploy/nginx.conf) to the HTTPS server block of the host
   nginx, above `location /`, then `sudo nginx -t && sudo systemctl reload nginx`.

3. Deploy as usual. When the env file exists, the deploy workflow builds and
   starts the contact container after the site container. If it fails, the site
   deploy still succeeds and the log shows a warning.

### Checking it

```sh
curl -s http://127.0.0.1:5175/api/contact/health
docker logs garbiasgs-contact
```

Messages are limited to 5 per visitor per hour (`RATE_LIMIT_MAX`,
`RATE_LIMIT_WINDOW_MINUTES`), and a hidden form field catches most bots. To try
it without sending real mail, run the service locally with `MAIL_DRY_RUN=1`.
