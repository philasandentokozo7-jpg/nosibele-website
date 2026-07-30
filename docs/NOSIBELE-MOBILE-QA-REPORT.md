# Nosibele — Mobile QA report

**Branch:** `compliance-mobile-security-seo`  
**Local preview:** `http://127.0.0.1:4173/`  
**Date:** 28 July 2026

## Mobile redesign summary

Phone layout was rebuilt as a dedicated responsive layer (`mobile.css`) plus accessible mobile navigation in `app.compiled.js`, not a minor patch:

- Accessible burger menu with open/close, visible Close control, Escape, focus return, body scroll lock, WhatsApp + Quote CTAs
- Homepage hero re-composed for narrow screens (image-first, controlled type scale, full-width CTAs, overlays hidden to avoid clutter)
- Product grids collapse toward single column on phones
- Quote form large tap targets, 16px inputs, privacy acknowledgement + optional marketing checkbox
- Footer becomes a structured 2-column then 1-column stack with legal links
- Cookie banner/preferences stack on phones with safe-area padding and floating CTA clearance
- Gallery lightbox Escape/close, scroll lock, single-column dialog on small screens

Desktop brand colours, typography (Cormorant Garamond / Manrope), crimson/gold identity retained.

## Breakpoints tested (layout checks via CSS + local HTML inspection)

| Width | Result |
|------:|--------|
| 360px | Pass — type/CTA/footer stack; no intentional horizontal scroll rules |
| 375px | Pass |
| 390px | Pass |
| 412px | Pass (covered by ≤860 / ≤480 rules) |
| 430px | Pass |
| 768px | Pass — tablet/phone boundary |
| 1024px | Pass — gutter/section tightening |
| 1280px | Pass — desktop nav |
| 1440px | Pass — desktop composition |

Automated browser device lab was not available in this environment; CSS media queries and prerendered markup were validated, and pages were fetched from the local preview server.

## Cookie banner mobile

- Buttons stack vertically ≤640px
- Panel scrolls internally when preferences open
- Safe-area insets applied
- Floating WhatsApp / back-to-top lift while consent UI open

## Remaining watch-outs

- Very dense service journey still tall on phones (content volume, not overflow)
- Hero “1000+” statistic should be owner-verified
- Visual confirmation in a real phone browser still recommended before deploy
