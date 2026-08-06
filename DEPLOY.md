# Deployment

garbiasgs is a static Vite/React SPA. It is **built in GitHub Actions** and the
resulting `dist/` is copied to the VPS, where **nginx serves it directly**.

The VPS does **not** run `npm`, a build, Docker, or any Node process for this
site. This is deliberate — building on the VPS was the cause of the high
CPU/RAM usage.

## Pipeline

On push to `master` ([.github/workflows/deploy.yaml](.github/workflows/deploy.yaml)):

1. `npm ci` + `npm run build` on the GitHub runner.
2. `dist/` is uploaded to `/var/www/garbiagroup.com/_incoming` on the VPS.
3. The old release is backed up to `<web_root>.old`, then `_incoming` is
   rsynced into `/var/www/garbiagroup.com/html`.
4. `nginx -t` validates config, then `systemctl reload nginx` (zero downtime).

## One-time VPS setup

1. Install the nginx config from [deploy/nginx.conf](deploy/nginx.conf) into your
   existing site file (keep your certbot/SSL lines). Point `root` at
   `/var/www/garbiagroup.com/html`.
2. Create the web root: `sudo mkdir -p /var/www/garbiagroup.com/html`.
3. Ensure the deploy SSH user can write it and reload nginx:
   - owns the dir: `sudo chown -R $USER:$USER /var/www/garbiagroup.com`
   - passwordless reload, e.g. a sudoers line for `nginx -t` + `systemctl reload nginx`.
4. `sudo nginx -t && sudo systemctl reload nginx`.

## Decommission the old setup

The old Node `serve` / Docker containers are no longer used. Remove them once
the nginx static serving is confirmed working:

```sh
docker stop garbiasgs-green garbiasgs-blue 2>/dev/null || true
docker rm   garbiasgs-green garbiasgs-blue 2>/dev/null || true
docker image prune -af            # reclaim old build layers
docker builder prune -af          # reclaim build cache
```

Also remove the old `git pull && npm build` checkout at
`/var/www/garbiagroup.com/garbiasgs` if it exists — it is no longer needed.

## Rollback

The previous release is kept at `/var/www/garbiagroup.com/html.old`:

```sh
WEB_ROOT=/var/www/garbiagroup.com/html
rm -rf "${WEB_ROOT}.rollback"
mv "$WEB_ROOT" "${WEB_ROOT}.rollback"
mv "${WEB_ROOT}.old" "$WEB_ROOT"
sudo systemctl reload nginx
```
