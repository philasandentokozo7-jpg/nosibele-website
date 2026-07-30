# Changelog — completion remediation

**Branch:** `cursor/compliance-mobile-security-seo-6710`  
**Date:** 30 July 2026

## Detected stack

- Static HTML + React hydration (`prod-build/`, `app.compiled.js`, `nb-app.js`)
- Catalogue data: `catalogue.js`
- Business config: `config.js`
- Prerender: `build-tools/prerender.js` (jsdom)
- Forms: Formspree `maqgekdl`
- Analytics: GA4 `G-WH87LWEPJB` consent-gated
- Live hosting: **GitHub Pages** (Netlify config present but headers/redirects not active live)

## Changes

### Legal / commercial
- Expanded `NB_CONFIG` with legal, VAT, IO, commercial null-safe fields.
- Added `commercial-terms.html`, `policies.html`, `paia.html`, `accessibility.html`, `privacy-request.html`.
- Updated legal nav on privacy/cookies/terms.
- Footer links expanded.
- Quote form requires Privacy Notice + Quotation & Order Terms acknowledgement.

### POPIA / form
- Field purpose copy; marketing separate & unticked.
- Quotation ≠ order messaging; production start conditions stated.
- Success `aria-live`; stronger failure fallback (WhatsApp / email / phone).
- Duplicate submit guarded via `submitting`.
- No PII in analytics events.

### Upload security
- Removed website file upload UI; secure WhatsApp/email artwork path.
- Documented in `FILE_UPLOAD_SECURITY_REVIEW.md`.

### Claims / social proof
- Removed “1000+ garments” and absolute durability / nationwide / “usually within a day” absolutes.
- Rewrote process steps to match quotation workflow.
- Testimonials require `permissionConfirmed: true`; otherwise Google reviews CTA.

### Pricing
- “From” + price spacing; guide-price note on cards.
- Catalogue descriptions clarify made-to-order / quotation basis.

### SEO / crawl
- Sitemap includes new legal pages.
- Redirects prepared for extensionless legal URLs (Netlify / `_redirects`).
- Canonical host remains www custom domain.

### A11y / performance / analytics
- Global `:focus-visible` + reduced motion in `styles.css`.
- Image recompression (catalogue, service cards, hero, logo tile).
- `js/analytics-events.js` PII-free event plan.

### Docs
- All Phase 16 required reports under `docs/`.

## Not done / blocked on owner

- Deposit %, VAT, IO identity, retention periods, Facebook URL, testimonial permission, GBP/Search Console logins, Netlify cutover, production deploy.
