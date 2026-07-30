# Nosibele — Compliance open items (owner decisions required)

**Branch:** `compliance-mobile-security-seo`  
**Date:** 28 July 2026  
**Status:** Internal working notes. Not for public display.

These items need owner confirmation. Public pages use cautious wording where a decision is unresolved. Do not treat the website legal pages as fully signed-off legal advice until reviewed.

## Business / legal confirmation

1. **Retention periods** — Exact retention for enquiries, quotes, artwork files, order records, and marketing preferences is not confirmed. Privacy Notice uses purpose-based wording until owner sets periods.
2. **Deposit / payment policy** — Exact deposit percentage, accepted payment methods, and when production starts are not confirmed. Terms use cautious “confirmed per order” wording.
3. **Cancellation / refund practice** — Actual studio practice for cancellations after artwork approval and for defective remakes should be confirmed against Consumer Protection Act advice.
4. **Customer-supplied garment risk** — Confirm whether liability for damage to customer-supplied stock is limited or excluded in order paperwork.
5. **Quote validity window** — Confirm a standard validity period (e.g. 14 or 30 days) if one exists.
6. **Marketing programme** — Confirm whether Nosibele currently sends marketing email/WhatsApp campaigns. Site supports optional opt-in but should not imply an active programme if none exists.
7. **Facebook URL** — `config.js` has an empty Facebook URL. Either add the verified page URL or leave blank (current).
8. **Postal code** — Privacy page previously showed `4001`; confirm if that should remain on legal pages (address lines in `config.js` do not include a postcode field).
9. **“1000+ garments finished”** — Hero statistic is already on the site; confirm accuracy or replace with a verified figure.
10. **Testimonials** — Existing homepage testimonial content should be confirmed as real, permissioned customer feedback.
11. **Trademark claims** — Do not claim registered trademark status for “Nosibele” unless registration evidence is provided.
12. **Information Officer / Deputy** — POPIA responsible person contact beyond general info@ is not separately listed.

## Hosting / SEO owner actions

13. **Live hosting is GitHub Pages** — Production responses currently show `server: GitHub.com`. `netlify.toml` redirects/headers will not apply until the live site is served by Netlify (or equivalent). Decide whether to complete Netlify cutover (without changing the public domain) when deployment is approved.
14. **Google Business Profile website URL** — Verify it is exactly `https://www.nosibeleembroidery.co.za/` and not Gallery.
15. **Google Search Console** — Confirm www property, submit updated sitemap, inspect homepage, request indexing.
16. **Formspree inbox** — Confirm `maqgekdl` still delivers to `quotes@nosibeleembroidery.co.za` and spam filtering is acceptable.
17. **Google Analytics** — Confirm GA4 property `G-WH87LWEPJB` is still the intended property.

## Asset rights

18. Complete owner review of `docs/NOSIBELE-ASSET-RIGHTS-AUDIT.md` for customer logos appearing in gallery/product photos and any stock imagery.
19. Confirm whether customer brand marks in portfolio images have permission for public marketing use.

## Deployment gate

20. Owner explicit approval required before commit/push/deploy (per project instruction for this pass).
