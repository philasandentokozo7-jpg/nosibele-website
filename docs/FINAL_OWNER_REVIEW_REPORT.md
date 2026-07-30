# Final owner review report — Nosibele website remediation

**Date:** 30 July 2026  
**Branch:** `cursor/compliance-mobile-security-seo-6710`  
**PR:** #1 (draft)  
**Deploy / merge:** **Not performed**

---

## 1. Deposit wording — implemented

Customer-facing rule published in:

- `prod-build/config.js` → `commercial.depositWording` / `depositExceptionWording` / `depositPercent: 50`
- `commercial-terms.html` §4
- `cancellation-refund.html`
- `terms.html` (summary + links)
- Quote form acknowledgement checkbox
- Craft process steps (Home/About)

Wording includes: 50% before production; balance before collection/delivery; higher/full payment for urgent/large/special-cost work; work may be withheld until balance paid; quote ≠ order; no invented payment methods.

---

## 2. VAT wording — implemented

- Public wording: “Prices are quoted in South African rand. VAT will only be charged where legally applicable and shown on the quotation.”
- `vat.registered`, `vat.number`, `pricesIncludeVat` remain **null**
- No “VAT inclusive / exclusive / registered vendor” claims on catalogue cards or legal pages

---

## 3. Information Officer wording — implemented

- Role-based: “The Owner or authorised representative of Nosibele Design & Embroidery.”
- `informationOfficer.name` remains **null**
- Privacy contact email used: `info@nosibeleembroidery.co.za`
- Published on Privacy Notice, PAIA, privacy-request page

---

## 4. Testimonial status

- All named testimonials **hidden** (`permissionConfirmed: false`)
- Google reviews CTA shown instead (no awkward empty section)
- Consent register: `docs/TESTIMONIAL_CONSENT_REGISTER.md` (no private screenshots in repo)

---

## 5. Formspree code controls

Implemented: honeypot, submitting lock, 8s cooldown, local validation, max lengths, autocomplete, neutral errors, no upload, no ID/card fields, marketing unticked, aria alerts, PII-free analytics.

**CAPTCHA:** not enabled in code; **not claimed**. Owner dashboard steps: `docs/FORMSPREE_OWNER_DASHBOARD_ACTIONS.md`.

---

## 6. Legal consistency result

Cross-checked Privacy, Cookies, Website Terms, Quotation & Order Terms, Cancellation & Refunds, PAIA, contact/complaints, form acknowledgement.

Aligned on: quote vs order; 50% deposit; balance before release; customised cancellation (no automatic refund promise); artwork responsibility; customer-supplied content; non-guaranteed timing; courier estimates; privacy contact; separate marketing consent; testimonial permission; VAT wording.

Absolute promises (never fades/cracks, nationwide guaranteed, 1000+, 100% satisfaction) remain removed/absent.

---

## 7. Mobile / responsive result (code + local preview)

Local preview `http://127.0.0.1:4173/` — legal URLs 200; quote form markers present; Google reviews CTA present; footer legal links wrap on small screens (`mobile.css`); contact map overlay pattern retained; marketing not preselected.

Full device-lab screenshots at 1440/1024/768/430/390/360 were not captured as private artifacts in-repo; CSS rules target those breakpoints. Owner should spot-check in browser before deploy.

---

## 8. Tests / build result

| Check | Result |
|-------|--------|
| Lint / typecheck | N/A (no project eslint/tsc) |
| Unit tests | N/A (none configured) |
| `npm ci` in build-tools | Pass |
| `node prerender.js` | Pass |
| Local legal URL 200s | Pass (see list below) |
| Broken-link scan (legal + core) | Pass locally |

---

## 9. Legal URLs (local)

- `/privacy.html`
- `/cookies.html`
- `/terms.html`
- `/commercial-terms.html`
- `/cancellation-refund.html`
- `/policies.html`
- `/paia.html`
- `/accessibility.html`
- `/privacy-request.html`

---

## 10. Remaining owner decisions

1. Formspree dashboard: domain allowlist, spam/CAPTCHA if available, inbox confirm  
2. Explicit full name for Information Officer (optional)  
3. Testimonial written consent → flip `permissionConfirmed`  
4. VAT number if/when registered  
5. Quote validity days (optional)  
6. Facebook URL  
7. Approve merge + **manual** deploy  
8. Google Business Profile / Search Console after deploy  

---

## 11. PR #1 ready for final owner review?

**Technically yes** for owner review of the draft PR — commercial defaults applied, legal pages consistent, form hardened, docs updated.  
**Not** ready to merge/deploy until the owner accepts the legal drafts and completes Formspree dashboard actions they care about for go-live.
