# Website completion audit — Nosibele Design & Embroidery

**Audit date:** 30 July 2026  
**Live site:** https://www.nosibeleembroidery.co.za/  
**Repo:** static `prod-build/` + `build-tools/` prerender  
**Branch:** `cursor/compliance-mobile-security-seo-6710`  
**Deploy:** **Not performed** (per instructions)

## Executive verdict

Commercially and technically correctable weaknesses were remediated in source and verified on a local preview. The site is **not** “complete” for risk-free go-live until owner facts and legal approval in `OWNER_ACTIONS_REQUIRED.md` / `LEGAL_CONTENT_APPROVAL_REQUIRED.md` are settled, and until changes are deployed (live still lacks new legal routes).

---

## Phase 1 — Inventory (live + repo)

| Item | Finding |
|------|---------|
| Framework | Static HTML shells + React (`app.compiled.js` / `nb-app.js`), catalogue JS |
| Hosting (live) | GitHub Pages (`server: GitHub.com`) |
| Hosting (config) | `netlify.toml` publish `prod-build` — headers/redirects **inactive** until Netlify serves domain |
| Form provider | Formspree `https://formspree.io/f/maqgekdl` |
| Analytics | GA4 `G-WH87LWEPJB`, consent-gated |
| Pages (repo) | Home, products, services, gallery, about, contact, privacy, cookies, terms, commercial-terms, policies, paia, accessibility, privacy-request, 404 |
| Product detail pages | **None** — catalogue cards → quote (`contact.html?item=`) |
| Live gaps (pre-deploy) | `/cookies.html`, `/terms.html`, new policy pages → **404** on live until deploy |
| www / https | non-www → www 301; http → https 301 |
| Extensionless `/gallery` etc. | 200 on GH Pages (content negotiation); Netlify redirects prepared to `.html` |

---

## What was fixed

1. **Unsupported claims** softened/removed (1000+, never crack/fade, absolute turnaround, nationwide courier guarantee).
2. **Testimonials** gated on permission flag; Google review path promoted.
3. **Pricing display** spacing + guide-price / quotation notes; catalogue made-to-order flags.
4. **Quote form POPIA** purpose text, privacy + commercial terms ack, marketing separate, quote≠order, production start conditions, accessible errors/success, failure fallbacks.
5. **Uploads** disabled on web; WhatsApp/email artwork path; security review written.
6. **Order process** Craft steps rewritten to quotation → approve → produce → collect/courier.
7. **Legal pages** added/expanded; footer + form links; central config for missing facts (`null`).
8. **SEO** sitemap coverage for new pages; redirects prepared; no AggregateRating invented.
9. **A11y** skip links retained; focus-visible + reduced motion; form alerts.
10. **Performance** recompressed large catalogue/service/hero assets.
11. **Security headers** kept in meta + netlify.toml; Formspree in CSP `form-action` / `connect-src`.
12. **Analytics plan** + PII-free `nbTrack` events.
13. **Docs** Phase 16 set complete.

---

## What remains unverified / owner-blocked

See `OWNER_ACTIONS_REQUIRED.md`. Highlights: Information Officer, VAT, deposit %, quote validity days, retention, Facebook URL, testimonial permission, GBP website URL check, Search Console, Formspree spam controls, gallery logo permissions, Netlify cutover decision.

---

## Legal approval needed

All new/expanded legal pages are **drafts**. See `LEGAL_CONTENT_APPROVAL_REQUIRED.md`. PAIA schedule and commercial deposit rules especially need completion.

---

## Claims requiring evidence

Full register: `CLAIMS_EVIDENCE_REGISTER.md`. Critical removals already applied for volume and absolute durability claims.

---

## Upload risks

Mitigated by **disabling** website upload. Residual risk is WhatsApp/email channel handling — operator process. Details: `FILE_UPLOAD_SECURITY_REVIEW.md`.

---

## Crawlability status

| Check | Local (post-fix) | Live (pre-deploy) |
|-------|-------------------|-------------------|
| Homepage 200 | Yes | Yes |
| Core pages 200 | Yes | Yes |
| New legal pages 200 | Yes | **No (404)** until deploy |
| robots.txt allows + sitemap | Yes | Yes (old sitemap until deploy) |
| Canonical www | Yes | Yes |
| noindex accident on marketing pages | Not observed | — |
| 404 page | Present locally | GH Pages default 404 until custom 404 deployed |

---

## Test results (local `http://127.0.0.1:4173/`)

| Test | Result |
|------|--------|
| `/` … core pages | 200 |
| Legal pages + privacy-request | 200 |
| `js/consent.js`, `analytics-events.js` | 200 |
| `404.html` | 200 |
| WhatsApp digits `27614453680` | Present |
| Quote: send securely + commercial terms ack | Present |
| Hero “1000+” | Absent; “Made to order” present |
| Named testimonial without permission | Absent; Google reviews CTA |
| Prerender build | Pass (`node prerender.js`) |
| Lint / typecheck | N/A — no TS/eslint project |
| Dependency audit (`build-tools`) | `npm ci` — 0 vulnerabilities reported |
| Secret scan (heuristic) | Formspree ID public by design; no private API keys in repo |
| Widths 320–1440 | CSS mobile rules present; full device lab not automated in this environment |

---

## Safe deployment steps

Follow `LAUNCH_CHECKLIST.md`. Do **not** auto-deploy from this agent. Merge only after owner approval; verify live legal URLs and Formspree after publish.

---

## Completeness statement

The site looks polished **and** has had correctable commercial/legal/technical weaknesses addressed in source. It is **not** declared complete for unattended production launch while owner facts, legal sign-off, and deployment remain outstanding.
