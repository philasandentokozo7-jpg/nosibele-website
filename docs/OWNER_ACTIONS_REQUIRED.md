# Owner actions required — Nosibele website

**Date:** 30 July 2026  
**Do not deploy until you have reviewed the items you care about for go-live.**

## Must confirm before stronger legal claims

| # | Fact | Config field / location | Current public handling |
|---|------|-------------------------|-------------------------|
| 1 | Information Officer name & email | `NB_CONFIG.informationOfficer` | PAIA / privacy request pages use `info@` interim |
| 2 | Privacy / complaints dedicated emails | `emails.privacy`, `emails.complaints` | Fall back to `info@` |
| 3 | Postal / street code | `address.postalCode` | Omitted |
| 4 | VAT registered? VAT number? Prices incl. VAT? | `vat.*` | Guide prices say VAT confirmed on quote |
| 5 | Quote validity (days) | `commercial.quoteValidityDays` | “Reasonable period” wording |
| 6 | Deposit % / when due | `commercial.depositPercent` | Not published |
| 7 | Accepted payment methods | `commercial.acceptedPaymentMethods` | Not listed |
| 8 | Artwork retention for enquiries, artwork, orders | Privacy Notice | Purpose-based only |
| 9 | Uncollected order / storage practice | Commercial terms | No automatic fees invented |
| 10 | Customer-supplied garment liability wording | Commercial terms | Soft; confirm for order paperwork |
| 11 | Facebook URL | `socials.facebook.url` | Empty (hidden) |
| 12 | Ayanda testimonial permission | `REVIEWS[].permissionConfirmed` | **Hidden** until `true` |
| 13 | Care instructions for sublimation/embroidery | New asset / PDF | Soft “cared for as advised” |
| 14 | Formspree inbox still correct | Formspree dashboard | Endpoint public by design — enable CAPTCHA / domain allowlist |
| 15 | Google Business Profile website URL | GBP settings | Must be `https://www.nosibeleembroidery.co.za/` |
| 16 | Search Console www property + sitemap | GSC | Submit updated sitemap after deploy |
| 17 | Hosting cutover: GitHub Pages vs Netlify | Ops | Live is GitHub Pages — `netlify.toml` headers/redirects inactive until Netlify serves the domain |
| 18 | Asset rights for customer logos in gallery | Portfolio | Confirm marketing permission |
| 19 | Policy next review date | `policies.nextReviewDue` | null |
| 20 | Explicit approval to commit / merge / deploy | — | **Required** — this pass does not auto-deploy |

## Immediate operational hardening (Formspree)

1. Restrict form to your domain.
2. Enable Formspree CAPTCHA / spam filters.
3. Confirm notifications go to `quotes@nosibeleembroidery.co.za`.
4. Do not store card numbers in form replies.

## After deploy

1. Spot-check WhatsApp links open chat (not share) to `27614453680`.
2. Submit a test quote (mark as test).
3. Confirm cookie banner → Accept loads GA; Reject does not.
4. Request Google indexing for `/` and `/products.html`.
