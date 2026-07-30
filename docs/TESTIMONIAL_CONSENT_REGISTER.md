# Testimonial consent register — Nosibele

**Purpose:** Track written publication permission before any named testimonial appears on the website.  
**Rule:** Keep every testimonial hidden unless `permissionConfirmed: true` in `prod-build/catalogue.js` **and** a row below records consent.  
**Do not** store private WhatsApp screenshots, ID documents or raw chat exports in this public repository. Store evidence offline (owner drive / email archive) and record only a non-sensitive evidence location here.

| Customer identifier (initials / org code) | Approved wording (summary or “see offline file”) | Approved attribution | Date of consent | Evidence location (offline) | Withdrawal status | Website status |
|---|---|---|---|---|---|---|
| Ayanda / AOL Accounting Academy SA | Stored historically in catalogue; **not published** pending consent | Name + organisation (if approved) | *Not recorded* | *Owner to file offline* | Unknown | **Hidden** (`permissionConfirmed: false`) |

## How to publish a testimonial later

1. Obtain written permission (email preferred) covering website use of wording + attribution.
2. Store the permission evidence **offline** (not in git).
3. Add/update a row in this register.
4. Set `permissionConfirmed: true` on the matching `REVIEWS[]` entry in `catalogue.js`.
5. Re-run `cd build-tools && node prerender.js`.
6. If consent is withdrawn, set `permissionConfirmed: false`, update this register, and redeploy.

## Current public behaviour

Home and About show a **Google reviews** call-to-action when no permission-confirmed testimonials exist. No customer name, photo, company or quote is shown without permission.
