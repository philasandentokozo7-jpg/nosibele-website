# Owner actions required — Nosibele website

**Date:** 30 July 2026 (updated after owner-approved temporary defaults)  
**Do not merge or deploy until you are ready.**

## Temporary defaults now published (owner-approved)

| Topic | Published default |
|-------|-------------------|
| Deposit | 50% before production; balance before collection/delivery; higher/full payment may be required for urgent/large/special-cost work |
| VAT | ZAR quotes; VAT only where legally applicable and shown on quotation; **no** VAT number / registration claim |
| Information Officer | Role-based label only; privacy email `info@` |
| Testimonials | Hidden until consent register + `permissionConfirmed: true` |

## Still for you to complete

1. **Formspree dashboard** — follow `docs/FORMSPREE_OWNER_DASHBOARD_ACTIONS.md` (domain allowlist, spam/CAPTCHA if available, inbox test). Do not claim CAPTCHA on the site until enabled.
2. **Information Officer full name** — optional; keep null until you explicitly approve a name.
3. **Testimonial consent** — file permission offline; update `docs/TESTIMONIAL_CONSENT_REGISTER.md`; then set `permissionConfirmed: true`.
4. **VAT number** — only if verified registration exists; then update `config.js` `vat.*`.
5. **Quote validity days** — optional standard window.
6. **Facebook URL** — add verified URL or leave blank.
7. **Postal code** — optional on legal address.
8. **Retention periods** — refine Privacy Notice when decided.
9. **Google Business Profile** website URL = `https://www.nosibeleembroidery.co.za/`
10. **Search Console** — submit sitemap after deploy.
11. **Hosting** — live is GitHub Pages; Netlify headers/redirects apply only after cutover.
12. **Gallery logo permissions** — confirm marketing use of customer marks.
13. **Explicit approval to merge PR #1 and deploy.**

## After deploy

- Spot-check WhatsApp `27614453680`, quote form, cookie banner, all legal URLs live.
- Send one TEST Formspree submission and delete it.
