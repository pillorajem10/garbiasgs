# SEO audit and implementation — garbiagroup.com

Audit date: **9 August 2026**. Codebase: `garbiasgs` (Vite 6 + React 19 SPA),
branch `development`, baseline commit `a963ad4`.

Everything below marked **verified** was measured or fetched directly. Anything
that needs Google Search Console, Google Analytics, Google Business Profile, or
registrar access is listed as **not verifiable from here** — it is not guessed.

---

## 1. Audit summary

The site's metadata was already thoughtfully written. The problems were
structural: none of that metadata reached anything that does not execute
JavaScript, unknown URLs returned HTTP 200, `www` and non-`www` both served the
site, and the older domain — which is the one search engines currently associate
with the brand — is still live with overlapping content.

| # | Severity | Issue | Fixed |
|---|----------|-------|-------|
| 1 | Critical | Every URL returned the same 3,031-byte shell with the homepage's title/description/canonical and an empty `<div id="root">` | Yes |
| 2 | Critical | Unknown URLs returned **HTTP 200** with the shell (soft 404) | Yes |
| 3 | Critical | Old domain `www.garbiasgs.com` live, indexed, overlapping content, **no canonical tags** | No — needs registrar/Weebly access (§13) |
| 4 | High | `www.garbiagroup.com` and `garbiagroup.com` both returned 200, no redirect | Yes |
| 5 | High | `/services/` and `/services` both returned 200 | Yes |
| 6 | High | `og:image` declared 1200×630 for a **958×960** file → broken social cards | Yes |
| 7 | High | Organization and LocalBusiness declared as two unlinked entities with the same URL and different names | Yes |
| 8 | High | No `sameAs`, no `alternateName` — nothing tied "Garbia", "Garbia SGS", "GarBia Group" to one entity | Yes |
| 9 | Medium | Homepage had no prose saying who the company is, what it sells, or where it works | Yes |
| 10 | Medium | Images at `width:100%` with no reserved height → CLS 0.16 | Yes |
| 11 | Medium | Inline `<video>` with no aspect ratio → layout shift on metadata load | Yes |
| 12 | Medium | Google Fonts render-blocking (~900 ms on throttled mobile) | Yes |
| 13 | Medium | Prerendered markup would have painted unstyled (route CSS in lazy chunk) | Yes |
| 14 | Medium | `/projects` heading order jumped h1 → h3 | Yes |
| 15 | Medium | 404 page offered a single "home" link | Yes |
| 16 | Medium | Sitemap had no `lastmod`; maintained by hand | Yes — generated |
| 17 | Low | `public/_redirects` mapped `/*` → `index.html` **200** (soft 404 on Netlify) | Yes |
| 18 | Low | `twitter:site` declared `@garbiagroup`, unverified | Yes — removed |
| 19 | Low | No web app manifest | Yes |
| 20 | Low | `AllProjectsSection` painted pure blue before its background loaded | Yes |
| 21 | Low | Footer link contrast ~4.4:1, just under WCAG AA | **No — brand colour, §16** |
| 22 | Medium | CDN images served at full resolution (one 2.5 MB photo in an 800 px slot; 176 KB logo in a 160×48 slot) | **No — needs new assets, §16** |

### Issue 1 in detail — why it was the important one

`curl https://garbiagroup.com/services` returned, byte for byte, the same
document as `/`: `<title>Geotechnical & Construction Company Philippines |
GarBia</title>`, `<link rel="canonical" href="https://garbiagroup.com/">`, and an
empty root div. All per-route metadata was applied by `usePageSEO` **after**
React mounted.

Googlebot renders JavaScript, so it could eventually see the right page. Bing,
the Facebook / LinkedIn / X / Viber link previewers, and most AI crawlers do
not. To all of them, every page of the site was the homepage — and every link
anyone shared to a service page previewed as the homepage.

---

## 2. Confirmed vs suspected

**Confirmed (fetched or measured on 9 Aug 2026):**

- `https://garbiagroup.com/` → 200, `nginx/1.24.0 (Ubuntu)`, `187.77.142.13`.
- `https://www.garbiagroup.com/` → 200, byte-identical `Content-Length: 3031`. No redirect.
- `http://garbiagroup.com/` → 301 → `https://garbiagroup.com/`. HTTPS is enforced.
- `/services`, `/services/`, `/this-page-does-not-exist` → all 200, all the same 3,031-byte body.
- `https://www.garbiasgs.com/` → 200. `X-Host: grn34.sf2p.intern.weebly.net` — **Weebly**, behind Weebly's Cloudflare.
- `https://garbiasgs.com/` → 301 → `https://www.garbiasgs.com/`. `www` is canonical on the old domain.
- Old sitemap lists exactly 6 URLs (§13).
- Old homepage has **no** `<meta name="description">` and **no** `<link rel="canonical">`.
- Old and new sites carry near-identical Mission / Vision / Objectives text.
- Old site contains **no reference to garbiagroup.com** anywhere.
- DNS: `garbiagroup.com` → Namecheap (`dns1.registrar-servers.com`), mail on `mx1.privateemail.com`, SPF present. `garbiasgs.com` → **register.com** nameservers.
- `public/garbia1.jpg` and the CDN copy are both **958×960**, not 1200×630.
- CDN logo `garbiaLogo.jpg` is **1951×544, 176 KB**, rendered at 160×48.
- `DJI_0226.jpg` **4000×2250, 2.5 MB**; `DJI_0180.JPG` **3.97 MB**; a project *thumbnail* is **2.6 MB**.
- The Google Maps place "Garbia Structural and Geotechnical Solutions" exists (place ID `0x3397c7ee9904b0a1:0x6b1b7ceb994b6a40`, embedded on `/location`).
- Public profiles found: [Facebook](https://www.facebook.com/garbiastrucgeotech/), [LinkedIn](https://www.linkedin.com/in/garbia-structural-and-geotechnical-solutions-a6113b18a/).

**Suspected, stated as such:**

- The old domain almost certainly holds the brand's existing organic and
  branded visibility — every third-party result for the company name points at
  `garbiasgs.com` or Facebook, none at `garbiagroup.com`. Search Console is
  required to confirm.
- Google is very likely treating the two domains as separate sites: different
  registrars, different hosts, no redirects, no canonicals, no cross-links.

**Not verifiable from here — needs account access:**

- Which URLs are actually indexed on either domain, and their impressions/clicks.
- Whether the Google Business Profile is claimed, and which website it links to.
- Whether either domain is verified in Search Console.
- Whether the old domain has backlinks worth preserving.
- Whether the company controls the `garbiasgs.com` registrar login.
- Whether `@garbiagroup` exists on X — the tag was removed rather than guessed.

---

## 3. Primary-domain and old-domain findings

| | garbiagroup.com | garbiasgs.com |
|---|---|---|
| Host | VPS, nginx 1.24.0, Docker | Weebly (Square) |
| Registrar DNS | Namecheap | register.com |
| Canonical host | non-`www` (**now enforced**) | `www` (already 301s) |
| HTTPS | enforced | yes |
| Canonical tags | on every page, absolute | **none** |
| Meta description | every page, unique | **absent on homepage** |
| Sitemap | 8 URLs, generated | 6 URLs, `lastmod` Jan 2025 |
| Content overlap | Mission / Vision / Objectives / licences | same text |
| Cross-references | now `sameAs` → old domain | none |

**NAP discrepancy — needs the owner.** The two sites state different addresses:

- New site: `Lot 10 Block 7 Jasmine Street, Cainta, Rizal 1900`
- Old site: `Jasmine St. Phase 5 Greenland Executive Village Barangay San Juan, Cainta 1900 Rizal`

They are probably the same place written at different levels of detail, but for
local search the address must be **byte-identical** across the site, the Google
Business Profile, and directory listings. I have not merged them, because
inventing a combined address would be inventing business information. All four
phone numbers match exactly across both sites.

---

## 4. Keyword-to-page map

One page per intent. No new routes were created — extra pages targeting near
duplicate keywords are exactly the pattern that gets sites demoted.

| Route | Primary intent | Secondary |
|---|---|---|
| `/` | Garbia · Garbia Group · GarbiaGroup · Garbia SGS · geotechnical company Philippines | soil testing, construction services, foundation |
| `/services` | geotechnical services · soil investigation · site investigation · geotechnical testing | SPT, coring, test pit, micropiling, bored piling, jet/cement grouting, CBR, Atterberg, consolidation |
| `/services#soil-investigation` | soil investigation, sub-surface exploration | SPT, coring, sampling |
| `/services#geotechnical-reports` | geotechnical report, foundation design recommendation | liquefaction analysis |
| `/services#micropiling` | micropiling, bored piling, deep foundation | restricted access piling |
| `/services#laboratory-testing` | soil laboratory testing | ASTM test methods |
| `/about` | about Garbia Group, geotechnical company | ISO 9001:2015, DPWH-BRS, PCAB Category A, PhilGEPS, ASTM |
| `/projects` | geotechnical projects | Antipolo, Marikina, Pasig, Taguig |
| `/location` | Garbia office Cainta Rizal | directions, map |
| `/contact` | contact Garbia, request a quote | soil investigation quote |
| `/mission-vision` | Garbia mission and vision | quality construction, safe infrastructure |
| `/program` | Garbia charity programs | community outreach |

"Contruction" and other misspellings appear **nowhere** in visible content,
metadata, or structured data — as instructed.

---

## 5. Changed files

**New**

| File | Purpose |
|---|---|
| `src/entry-server.jsx` | Build-time render entry (`renderBody`, `renderHead`) |
| `scripts/prerender.mjs` | Writes per-route HTML + generates `sitemap.xml` |
| `src/seo/headTags.js` | Head tags as data — one source for prerender and runtime |
| `src/seo/structuredData.js` | The whole schema.org `@graph` |
| `src/utils/imageDimensions.js` | Intrinsic CDN image sizes (measured) |
| `src/Sections/HomeIntroSection/` | Homepage "Who we are" section |
| `src/Sections/ServicesDetailSection/` | Per-service explanations + process + CTA |
| `public/site.webmanifest` | Web app manifest |
| `SEO.md` | This document |

**Modified:** `index.html`, `vite.config.js`, `package.json`, `eslint.config.js`,
`.dockerignore`, `DEPLOY.md`, `deploy/docker-nginx.conf`, `deploy/nginx.conf`,
`public/robots.txt`, `public/_redirects`, `src/main.jsx`, `src/App.jsx`,
`src/seo/constants.js`, `src/seo/pageMeta.js`, `src/hooks/usePageSEO.js`,
`src/hooks/useAutoplayAllowed.js`, `src/components/SEO/{JsonLd,PageSEO,RouteSEO}.jsx`,
`src/components/Footer/{index.jsx,index.module.css}`,
`src/Pages/{Home,Services,DefaultPage}/…`, and the section files listed in §10.

**Deleted:** `public/sitemap.xml` — now generated into `dist/` by the build, so
it can no longer drift from the routes that actually exist.

---

## 6. Metadata by route

Titles lead with the distinguishing term and close with the brand; all are
unique, as are all descriptions. Every canonical is absolute, on
`https://garbiagroup.com`, with no trailing slash except the homepage.

| Route | Title | Desc. length |
|---|---|---|
| `/` | GarBia Group \| Geotechnical & Construction Services Philippines | 160 |
| `/services` | Geotechnical & Soil Investigation Services \| GarBia Group | 162 |
| `/about` | About GarBia Group \| Geotechnical Company in the Philippines | 153 |
| `/projects` | Geotechnical & Construction Projects \| GarBia Group | 150 |
| `/location` | Office Location in Cainta, Rizal \| GarBia Group | 152 |
| `/contact` | Contact GarBia Group \| Geotechnical Services Philippines | 148 |
| `/mission-vision` | Mission & Vision \| GarBia Group Geotechnical Solutions | 162 |
| `/program` | Community Charity Programs \| GarBia Group | 136 |
| 404 | Page Not Found \| GarBia Group | `noindex, follow`, **no canonical** |

Every page also ships `og:type`, `og:site_name`, `og:title`, `og:description`,
`og:url`, `og:image` (+ correct `width`/`height`/`alt`), `og:locale`,
`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`,
`twitter:image:alt` — **in the served HTML**, not applied later by script.

The 404 deliberately carries no canonical: it is returned for whatever URL was
missing, so a self-reference would point every dead URL at a `noindex` page.

---

## 7. Structured data

One JSON-LD `@graph` per page. Previously three separate documents declared an
`Organization` and a `LocalBusiness` at the same URL under different names, with
nothing linking them.

Always present:

- **Organization + ProfessionalService** (`#organization`) — `name`, `legalName`,
  `alternateName` (GarBia, Garbia Group, GarbiaGroup, GarBia SGS, GarBia
  Structural & Geotechnical Solutions), `description`, `logo`, `foundingDate`,
  `email`, `telephone`, four `contactPoint`s, `address`, `areaServed`,
  `knowsAbout`, `sameAs`, `location` → `#office`.
- **Place** (`#office`) — address, coordinates, `hasMap`.
- **WebSite** (`#website`) — `alternateName`, `publisher` → `#organization`.

Per page: `WebPage` (url matches the canonical), `BreadcrumbList` on every
non-home route, seven `Service` nodes on `/services` (each `url` resolving to a
real anchor on the page), `FAQPage` on `/` and `/services`.

`sameAs` includes **`https://www.garbiasgs.com/`**. That is the honest,
non-destructive way to tell search engines the two sites are one business while
the old domain is still up — it asserts identity without touching the old
domain's rankings.

**Deliberately absent** — all would be fabrication: `aggregateRating`, `review`,
`openingHours`, `numberOfEmployees`, awards, client names, certifications beyond
the five printed on `/about`.

Validated by script across all 9 pages: valid JSON, every `@id` reference
resolves, breadcrumb positions sequential, every `Service` anchor exists in the
markup, every FAQ answer present in visible page text, no unverified properties.
**Still worth running Google's Rich Results Test on the live URLs after deploy** —
my checks cover shape and honesty, not Google's own eligibility rules.

---

## 8. Sitemap and robots.txt

`sitemap.xml` is generated by `scripts/prerender.mjs` from the same
`INDEXABLE_ROUTES` array that drives the prerender, so it cannot list a page the
build did not produce. 8 URLs, all `https://garbiagroup.com`, no trailing
slashes, no staging or `www` URLs, `lastmod` stamped at build time. The build
verifies each entry has a matching file.

`robots.txt` allows everything, points at the sitemap, and adds one rule:

```
Disallow: /*?_alive=
```

The app appends `?_alive=<timestamp>` to `/` when probing connectivity
(`src/App.jsx`). Crawling that would generate unlimited duplicate homepage URLs.

---

## 9. Internal linking

Previously the only in-content internal links were the nav, the footer, and two
links on `/contact`. Added, all in prose and all descriptive:

- Homepage → `/services`, `/projects`, `/about`, `/contact` (one per intro card, plus a CTA).
- `/services` → `/contact` ×2, `/projects`, `/location`, and seven in-page anchors.
- 404 → all eight routes plus email and phone.
- Footer → name, legal name, full address, office line, and mobile.

No "click here" links; every anchor describes its destination.

---

## 10. Images and performance

**Fixed**

- Intrinsic `width`/`height` from measured CDN files, plus explicit `height:auto`,
  on the five fluid-width photos that had no reserved box —
  `HomeMissionVisionSection` (×2), `HomeObjectivesSection`,
  `MissionVisionMissionSection`, `MissionVisionVisionSection`, `ServicesSection` (×2).
- `aspect-ratio: 16 / 9` on the inline charity video (verified 1280×720 from the
  MP4 header). With `preload="none"` it was rendering at the UA default 300×150
  and jumping late.
- Google Fonts made non-render-blocking (`preload` + `media="print"` + `onload`,
  with a `<noscript>` fallback). `display=swap` was already set, so the end state
  is unchanged — only the blocking is gone.
- Per-route CSS chunks linked in each prerendered page (via the Vite client
  manifest), so static markup paints styled instead of restyling on hydration.
- `hydrateRoot` instead of `createRoot` when prerendered markup is present.
  This mattered a lot: `createRoot` deletes every existing child and re-inserts
  an identical tree, and the page collapsing for one frame **doubled CLS to 0.229**
  before this was caught.
- `AllProjectsSection` fallback colour changed from pure `blue` to the section's own dark tone.
- Contrast fix on the new homepage card links (`#0d9488` on `#f0f4f8` was ~3.3:1).

**Not fixed — needs new image assets (§16)**

`uses-responsive-images` reports **4,800 KB** and `modern-image-formats` **2,516 KB**
of available savings. DigitalOcean Spaces has no on-the-fly resizing, so this
cannot be solved in code; it needs correctly sized derivatives uploaded to the CDN.

---

## 11. Measured results

Lighthouse 12.8.2, headless Chrome, homepage, before = baseline commit `a963ad4`,
after = this branch. Both served from an identical local static server.

**Two caveats, stated plainly:** the local server sends **no gzip** (production
nginx does), so both runs are pessimistic and the "after" build — whose HTML is
larger — is penalised more than the baseline. And these are lab numbers, not
field data; real Core Web Vitals come from CrUX in Search Console after ~28 days
of traffic.

**Desktop**

| Metric | Before | After |
|---|---|---|
| Performance | 82 | **97** |
| First Contentful Paint | 0.7 s | **0.6 s** |
| Largest Contentful Paint | 2.2 s | **1.2 s** |
| Speed Index | 1.0 s | **0.9 s** |
| Total Blocking Time | 50 ms | **0 ms** |
| Cumulative Layout Shift | 0.161 | **0** |

**Mobile (Lighthouse default throttling)**

| Metric | Before | After |
|---|---|---|
| Performance | 61 | **72** |
| First Contentful Paint | 3.4 s | **3.2 s** |
| Largest Contentful Paint | 11.7 s | **5.8 s** |
| Speed Index | 3.4 s | **3.2 s** |
| Total Blocking Time | 60 ms | **10 ms** |
| Cumulative Layout Shift | 0.159 | **0** |

Category scores after: **SEO 100, Best Practices 100, Accessibility 96**
(the remaining item is the footer contrast in §16).

Also verified: `/services`, `/about`, `/projects`, `/contact` and an unknown URL
all render correctly in headless Chrome with **no console errors and no
hydration warnings**; total page weight 15,177 KiB → 12,723 KiB.

**Not measured, and not claimed:** rankings, impressions, clicks, indexed page
counts. None of the work below improves rankings by itself — it improves
crawlability, indexing eligibility, relevance signals, and user experience.

---

## 12. Remaining technical risks

1. **Adding a React route without registering it now yields a 404.** Unknown
   paths return a real 404 instead of the SPA shell, which is correct for SEO but
   means a new page must be added in three places (`DEPLOY.md` documents this;
   the build fails loudly if `ROUTE_MODULES` is missed).
2. **Prerender runs in CI/Docker on Node 20.** Uses `react-dom/static`
   `prerenderToNodeStream` — React 19, Node 18+. The Dockerfile pins `node:20.11.1`, which is what was tested.
3. **Hydration mismatches** would now surface as console warnings. None occur
   today; a future component reading `window`/`navigator` during render could
   introduce one.
4. **CDN image weight** remains the largest performance item.
5. **Old domain still live** with overlapping content — the biggest *ranking*
   risk, and not solvable in this repo (§13).
6. `www.garbiagroup.com` must keep a valid TLS certificate, or the new 301
   becomes a certificate error. It currently has one; keep `www` in the certbot
   certificate.

---

## 13. Old-domain migration plan

**Do not act on this before deciding — it moves rankings.**

Complete old-URL inventory (from `https://www.garbiasgs.com/sitemap.xml`, all
verified 200):

| Old URL | Redirect to | Confidence |
|---|---|---|
| `https://www.garbiasgs.com/index.html` | `https://garbiagroup.com/` | High — same homepage |
| `https://www.garbiasgs.com/` | `https://garbiagroup.com/` | High |
| `https://www.garbiasgs.com/about.html` | `https://garbiagroup.com/about` | High — same licences/office content |
| `https://www.garbiasgs.com/services.html` | `https://garbiagroup.com/services` | High — same service list |
| `https://www.garbiasgs.com/contact.html` | `https://garbiagroup.com/contact` | High — same phone numbers |
| `https://www.garbiasgs.com/store/p1/Soil_Investigation_or_Soil_Testing.html` | `https://garbiagroup.com/services#soil-investigation` | Medium — **review first**, it is a Weebly store product page |
| `https://www.garbiasgs.com/store/c1/Featured_Products.html` | `https://garbiagroup.com/services` | Low — **review individually**, no equivalent page exists |
| anything else | `https://garbiagroup.com/` | Last resort only |

`garbiasgs.com` (apex) already 301s to `www`, so redirecting `www` covers both.

**Why this cannot be done from this repo:** the old site is hosted on **Weebly**
and its DNS is at **register.com**. Neither is in this repository, and neither is
reachable from the codebase. The options, best first:

1. **Weebly/Square domain redirect** — if the domain is managed inside the
   Weebly account, its own redirect feature can issue a 301. Simplest, but
   usually only supports a whole-domain redirect to one URL, which loses the
   per-page mapping.
2. **Move `garbiasgs.com` DNS to Cloudflare (free)** and add Bulk Redirects or a
   redirect rule implementing the table above. This preserves per-page mapping,
   issues real 301s, and needs no hosting change. **Recommended.**
3. **Point `garbiasgs.com` at the existing VPS** and add an nginx server block:

   ```nginx
   server {
       listen 443 ssl;
       server_name garbiasgs.com www.garbiasgs.com;
       # certbot -d garbiasgs.com -d www.garbiasgs.com

       location = /index.html  { return 301 https://garbiagroup.com/; }
       location = /about.html    { return 301 https://garbiagroup.com/about; }
       location = /services.html { return 301 https://garbiagroup.com/services; }
       location = /contact.html  { return 301 https://garbiagroup.com/contact; }
       location = /store/p1/Soil_Investigation_or_Soil_Testing.html {
           return 301 https://garbiagroup.com/services#soil-investigation;
       }
       location = /store/c1/Featured_Products.html { return 301 https://garbiagroup.com/services; }
       location / { return 301 https://garbiagroup.com/; }
   }
   ```

   Most control, but takes the old site offline the moment DNS moves — so do it
   only once the new site is fully indexed.

**Interim strategy while both stay online.** If the old site must remain up,
avoid conflicting signals without redirecting: add
`<link rel="canonical" href="https://garbiagroup.com/…">` to each old page
pointing at its new equivalent, using the table above. Weebly allows custom
`<head>` code per page. This is reversible and much softer than a redirect. **Do
not** put `noindex` on the old pages — `noindex` destroys their value instead of
passing it on, and a `noindex`ed page cannot forward authority.

**Order of operations, and why:** deploy this branch → verify both domains in
Search Console → submit the new sitemap → wait until the new pages are indexed
(check Search Console coverage) → *then* apply redirects, using Search Console's
Change of Address tool. Redirecting before the new site is indexed removes the
only copy Google can currently see.

Also: **keep the `garbiasgs.com` registration and the redirects alive
indefinitely** — at minimum 12 months, and in practice permanently. Old links,
directory entries, and printed material will keep pointing there.

---

## 14. Google Search Console checklist

Needs GSC access — none of this is possible from the codebase.

1. Add and verify a **Domain property** for `garbiagroup.com` (DNS TXT at
   Namecheap — covers `www`, non-`www`, http, and https in one property).
2. Add and verify a property for `garbiasgs.com` too. Required for the Change of
   Address tool, and the only way to see what the old domain actually ranks for.
3. Submit `https://garbiagroup.com/sitemap.xml`.
4. **Before changing anything on the old domain**, export from the old property:
   Performance (last 16 months, queries + pages), and Pages coverage. This is the
   only record of what there is to protect — and it is deleted when the property lapses.
5. URL Inspection → Live Test on `/`, `/services`, `/about`, `/contact`. Confirm
   the rendered HTML now shows each page's own title and canonical, then
   "Request Indexing" for each.
6. Check that `garbiagroup.com` is the reported canonical for every page and that
   no `www` URLs appear.
7. Confirm Search Console reports **no** soft 404s (the fix in §1 addresses this;
   the report lags several days).
8. Once the new pages are indexed and redirects are live, run **Change of
   Address** from `garbiasgs.com` → `garbiagroup.com`.
9. Watch Crawl Stats and Coverage weekly for the first month.

---

## 15. Google Business Profile checklist

A Google Maps entity for the company exists (it is embedded on `/location`), but
whether it is *claimed* is not verifiable from here.

1. Claim/verify the listing for "Garbia Structural and Geotechnical Solutions".
2. Set the website field to **`https://garbiagroup.com/`**. This is one of the
   strongest branded-search signals available and one of the fastest to apply.
3. Make the address **byte-identical** to the site's footer — resolve the §3
   discrepancy first, then update both to match.
4. Confirm the primary phone matches `+63 (02) 8280-1763`.
5. Set a primary category — *Geotechnical Engineer* or *Engineering Consultant* —
   and secondary categories for the services actually offered.
6. Add opening hours (currently stated nowhere; deliberately omitted from schema).
7. Add photos of the office, laboratory, and field work.
8. Add Services entries matching `/services`, each linking to its anchor.
9. Update the same website URL on **Facebook** and **LinkedIn** — both currently
   point at `www.garbiasgs.com`, and both are indexed brand signals.
10. Update any directory listing found for the company (PhilGEPS, DPWH lists,
    industry directories) to the new URL.

---

## 16. Content still needed from the business

Nothing below was invented or guessed; each is a real gap.

| # | Needed | Why |
|---|---|---|
| 1 | **The single correct postal address**, written one way | §3 — site, GBP, and directories must match exactly for local search |
| 2 | **A 1200×630 share image** | Current file is 958×960, so social cards render wrong. Declared dimensions in `src/seo/constants.js` must be updated with it |
| 3 | **A web-sized logo** (~320×90, under 20 KB) | The CDN logo is 1951×544 / 176 KB, loaded eagerly on every page for a 160×48 slot |
| 4 | **Resized CDN derivatives** — max 1600 px wide for section photos, ~600 px for thumbnails, WebP where possible | 4,800 KB of measured savings; DO Spaces cannot resize on the fly |
| 5 | **Business opening hours** | Omitted from LocalBusiness schema and GBP rather than guessed |
| 6 | **Confirmation of the X/Twitter handle**, or that there is none | `twitter:site` was removed rather than asserting `@garbiagroup` unverified |
| 7 | **Confirm founding year 2018** | Both sites say 2018; a third-party directory says 2017 |
| 8 | **Decision on the old domain** | Registrar access, and which of the three options in §13 |
| 9 | **Two or three project case studies** (problem → investigation → finding → outcome) | `/projects` is currently photos only; case studies are what rank for "soil investigation \<city\>" |
| 10 | **Client-permitted names or sectors served** | Strong trust signal; needs permission, so nothing was assumed |
| 11 | **Approval to darken the footer** from `#0081b8` to about `#00679a` | White-on-`#0081b8` is ~4.4:1, just under WCAG AA. Left alone because it is a brand colour |

---

## 17. Deployment and rollback

Deployment is unchanged: push to `master` → GitHub Actions → VPS rebuild. The
build now runs three steps (`DEPLOY.md`); the Docker image and container model
are the same.

**Before merging**

```sh
npm ci && npm run lint && npm run build
```

Expect: lint clean, 9 prerendered files, `sitemap.xml` with 8 URLs.

**After deploying, verify on the live host**

```sh
curl -sI https://garbiagroup.com/services | head -1                  # 200
curl -sI https://www.garbiagroup.com/services | grep -i location     # 301 -> https://garbiagroup.com/services
curl -sI https://garbiagroup.com/services/ | grep -i location        # 301 -> /services
curl -sI https://garbiagroup.com/no-such-page | head -1              # 404  (was 200)
curl -s  https://garbiagroup.com/services | grep -o '<title>[^<]*'   # the services title, not the homepage's
curl -s  https://garbiagroup.com/sitemap.xml | grep -c '<loc>'       # 8
```

Then re-share a `/services` link on Facebook or LinkedIn — the preview should
show the services page, not the homepage.

**Rollback.** All changes are in the image; redeploy the previous one:

```sh
docker stop garbiasgs-green && docker rm garbiasgs-green
docker run -d --name garbiasgs-green --restart always -p 127.0.0.1:5174:5173 <previous-image>
```

Tag the current image before deploying if you want a named fallback. The riskiest
single change is the nginx routing block — if pages 404 unexpectedly, reverting
`deploy/docker-nginx.conf` to `try_files $uri $uri/ /index.html;` restores the
old behaviour immediately, at the cost of soft 404s returning.

Nothing here touches DNS, the old domain, or any Google property, so no part of
this deployment can damage existing rankings.

---

## 18. Monitoring plan

**Days 1–30 — is it being crawled and indexed?**

- Day 1: run the §17 verification commands; confirm the six checks pass.
- Day 1: submit the sitemap; URL-inspect and request indexing for the eight routes.
- Week 1: Search Console → Pages. Expect indexed pages to climb toward 8. Watch
  for "Duplicate without user-selected canonical" — that would mean the old
  domain is competing.
- Week 1: confirm soft-404 count drops to zero.
- Week 2: Rich Results Test on `/` and `/services`; confirm Organization, FAQ,
  Breadcrumb, and Service are recognised.
- Week 2–4: baseline branded queries — *garbia*, *garbia group*, *garbiagroup*,
  *garbia sgs*, *garbia geotechnical* — recording impressions and average
  position for **both** properties.
- Week 4: Core Web Vitals report starts carrying field data. Compare against the
  lab numbers in §11.

**Days 30–60 — is the entity consolidating?**

- Confirm the GBP website field, Facebook, and LinkedIn all point at
  garbiagroup.com; watch for the knowledge panel to follow.
- Compare branded impressions on the two properties. The new domain should be
  rising; the old flat or falling.
- If the new pages are reliably indexed, execute the §13 redirect plan and file
  Change of Address.
- Start tracking non-branded terms: *soil investigation Philippines*,
  *geotechnical services Philippines*, *site investigation Rizal*.
- Review Search Console query data for terms the site ranks for but has no good
  page for — the honest basis for the next round of content.

**Days 60–90 — is it ranking, and is the migration clean?**

- Confirm old-domain URLs return 301s and that impressions have transferred
  rather than vanished. Some dip after a migration is normal; a sustained drop
  across both properties is not, and means checking redirect targets.
- Confirm Google reports garbiagroup.com as canonical for every page.
- Re-run Lighthouse; check whether the §16 image work landed and re-measure.
- Review which of the §16 content items were delivered and re-prioritise.
- Begin backlink work: ask for the URL to be updated wherever the company is
  already listed (PhilGEPS, DPWH accreditation lists, ASTM membership, industry
  associations, suppliers, past clients). Genuine citations from bodies the
  company genuinely belongs to. **No purchased links, no link exchanges, no
  directory blasts** — these carry real penalty risk and are not worth it.

Throughout: record what changed and when. When rankings move, the log is the
only way to know which change moved them.
