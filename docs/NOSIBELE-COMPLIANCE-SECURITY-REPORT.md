# Nosibele — Compliance & security report

**Branch:** `compliance-mobile-security-seo`  
**Date:** 28 July 2026  
**Local preview:** `http://127.0.0.1:4173/`  
**Deployment:** Not deployed. Not committed. Not pushed. Awaiting owner approval.

## Repository confirmation

- Remote: `github.com/philasandentokozo7-jpg/nosibele-website`
- Base inspected: `main`
- Working branch: `compliance-mobile-security-seo` (local only)

## Editable vs generated

| Editable source | Generated / overwritten by prerender |
|-----------------|--------------------------------------|
| `prod-build/config.js` | `<!--NB_SSR-->` blocks in page HTML |
| `prod-build/catalogue.js` | `sitemap.xml` image entries / lastmod |
| `prod-build/app.compiled.js` | Products ItemList JSON-LD |
| `prod-build/nb-app.js` (design system) | |
| `prod-build/mobile.css`, `tokens/*`, `styles.css` | |
| `prod-build/js/consent.js`, `css/*` | |
| Legal HTML shells (`privacy`, `cookies`, `terms`) | |
| `netlify.toml`, `_redirects` | |
| HTML `<head>` metadata (survives prerender) | |

Build: `cd build-tools && npm ci && node prerender.js`  
Publish folder: `prod-build`

## Pages created

- `privacy.html` — full Privacy Notice (rewritten)
- `cookies.html` — Cookie Policy
- `terms.html` — Terms and Conditions
- `404.html`
- `prod-build/_redirects`
- `prod-build/js/consent.js`
- `prod-build/css/consent.css`
- `prod-build/css/legal.css`
- Documentation under `docs/`

## Pages repaired

- Homepage SEO/metadata/structured data
- All marketing HTML shells (consent + CSP + skip link)
- Products / Services / Gallery / About / Contact (nav, footer, forms via prerender)
- Mobile CSS layer
- Netlify security/redirect configuration

## Mobile redesign summary

Dedicated phone/tablet redesign: accessible mobile nav, rebuilt hero composition, stacking CTAs, form/footer/gallery/cookie improvements. Desktop brand retained. See `NOSIBELE-MOBILE-QA-REPORT.md`.

## Mobile breakpoints tested

360, 375, 390, 412, 430, 768, 1024, 1280, 1440 (CSS + local preview fetches). Real-device visual QA still recommended.

## Homepage routing diagnosis

Live www/non-www/http→https OK. `/index.html` and `/gallery` still 200 on **GitHub Pages** live host. Netlify redirects prepared but not live yet. In-repo Home/logo links corrected to `/`.

## Google Gallery issue diagnosis

No code path sets Gallery as homepage. Likely external indexing/ranking or GBP URL. See `NOSIBELE-SEO-INDEXING-REPORT.md`.

## Canonical corrections

- Homepage canonical/OG/WebSite URL: `https://www.nosibeleembroidery.co.za/`
- Gallery remains self-canonical to `gallery.html`
- Home internal links: `/` (was `index.html`)

## Redirects added (Netlify-ready)

`/index.html`, `/home`, `/home.html` → `/`  
`/products|services|gallery|about|contact|privacy|cookies|terms` → corresponding `.html`

## Sitemap / robots

- Sitemap homepage first; legal pages included
- `robots.txt`: Allow all + sitemap URL

## Structured data

Homepage `@graph` with `WebSite` + `Organization`/`LocalBusiness`/`ClothingStore`, URL homepage. Products ItemList retained.

## Privacy Notice status

Meaningful POPIA-oriented notice covering required topics 1–27 with verified business details only. Draft for owner review — **not claimed fully legally compliant**.

## Cookie Policy status

Dedicated page with storage table, analytics cookies, session behaviour, browser controls.

## Cookie consent behaviour

- sessionStorage key `nb_consent_v2`
- Appears every fresh browser session until choice
- Accept all / Reject non-essential / Manage preferences equally available
- Optional analytics off by default
- Stays closed during same session navigation
- Footer “Cookie Settings” reopens panel
- Legacy localStorage consent no longer auto-loads analytics across sessions

## Consent categories

- Necessary (always on)
- Analytics (optional — GA4)
- Marketing / External media listed as unused/disabled currently

## Third parties found

Formspree, Google Analytics, Google Fonts, Google Maps, WhatsApp/Meta, Instagram, TikTok, hosting (GitHub Pages live / Netlify configured)

## Forms changed

- Required Privacy Notice acknowledgement (separate)
- Optional marketing checkbox default unchecked
- Formspree honeypot `_gotcha`
- POST via fetch; CSP updated to allow Formspree
- No console logging of personal data added

## Copyright changes

- `© [year] Nosibele Design & Embroidery. All rights reserved.` (dynamic year in React; prerender bakes current year for no-JS)
- Footer attribution: **Designed & Built by RiseEdge Digital.**
- IP section included in Terms

## Asset-rights concerns

Customer logos in gallery/product imagery; see `NOSIBELE-ASSET-RIGHTS-AUDIT.md`.

## Security headers (Netlify config)

- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (no preload)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restricted
- Enforcing `Content-Security-Policy` with Formspree + Google Fonts/Analytics/Maps allowlist
- Matching CSP also in HTML meta (needed while GitHub Pages hosts)

## CSP status

Enforcing CSP after inventory (self, Formspree, GTM/GA, Google Fonts, Maps). Local build functional. Live GitHub Pages uses meta CSP; Netlify headers apply after Netlify serves traffic.

## Vulnerabilities / dependency audit

`cd build-tools && npm ci && npm audit` → **0 vulnerabilities** (no `npm audit fix --force` used).

## Accessibility result

Improved: skip link, focus styles, mobile nav Escape/focus/scroll-lock, dialog labelling on consent + gallery lightbox, form labels + privacy ack, WhatsApp leave-site labelling, reduced-motion respect in key UI. Full WCAG audit tool not run; further manual AT testing recommended.

## Performance result

- Hero image: `fetchPriority=high`, dimensions set, not lazy-loaded
- Gallery images remain `loading="lazy"`
- Gold logo PNG recompressed (~656KB → ~120KB)
- Consent-gated analytics avoids unused third-party JS before choice
- Baseline Lighthouse scores not captured in this environment

## Production build / prerender result

PASS:

```
cd build-tools && npm ci && node prerender.js
```

All six React pages prerendered; sitemap rewritten.

## Local preview URL

`http://127.0.0.1:4173/`

## Files changed (high level)

- `netlify.toml`
- `build-tools/prerender.js`, patch helpers
- `prod-build/app.compiled.js`, `nb-app.js`, `config.js`, `mobile.css`
- All main HTML pages + new legal/404/consent assets
- `prod-build/sitemap.xml`, `_redirects`
- `prod-build/assets/logo-gold-transparent.png`
- `docs/*`

## Git status

Working tree dirty with local changes on `compliance-mobile-security-seo`. **Not committed. Not pushed** (per owner instruction).

## Owner details still required

See `NOSIBELE-COMPLIANCE-OPEN-ITEMS.md` (retention, deposits/refunds practice, marketing programme, Facebook URL, statistics/testimonials verification, asset permissions, Netlify cutover decision).

## Google Search Console / Business Profile actions required

See SEO report — login-required checks for GBP website URL, URL Inspection, Request Indexing, sitemap submission.

## Deployment readiness

**Technically ready for owner review.**  
**Not ready to declare live until:**

1. Owner reviews legal drafts  
2. Owner confirms open items / accepts cautious wording  
3. Explicit deployment approval  
4. Hosting path decided (Netlify headers/redirects vs current GitHub Pages)  
5. Post-deploy GSC/GBP actions performed  

This report does **not** claim the website is fully legally compliant.
