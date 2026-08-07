# Deployment

garbiasgs is a static Vite/React SPA shipped as a Docker image. The image is
**built in GitHub Actions** (or a one-time manual build), shipped to the VPS,
and run as a single container. The container serves the static build with
nginx; the **host nginx** terminates SSL and reverse-proxies to it.

The VPS does **not** run `npm` or a build per request. Building on the VPS was
the original cause of the high CPU/RAM usage, so the CI path builds on GitHub
and only *ships* the image.

## Pipeline (push to `master`)

See [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml):

1. `docker build` on the GitHub runner (multi-stage: `npm ci` + `npm run build`,
   final stage `nginx:alpine`).
2. `docker save | gzip` → `scp` the image tar to the VPS.
3. VPS: `docker load`, then replace the `garbiasgs-green` container with the new
   image (`docker run -d --restart always -p 127.0.0.1:5174:5173`).
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
