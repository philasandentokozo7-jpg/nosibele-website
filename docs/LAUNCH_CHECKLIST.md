# Launch checklist — Nosibele website

**Do not auto-deploy.** Complete checks, then deploy deliberately (GitHub Pages and/or Netlify).

## Pre-merge

- [ ] Owner reviewed `docs/OWNER_ACTIONS_REQUIRED.md`
- [ ] Legal drafts acknowledged in `docs/LEGAL_CONTENT_APPROVAL_REQUIRED.md`
- [ ] Claims register accepted (`docs/CLAIMS_EVIDENCE_REGISTER.md`)
- [ ] Upload approach accepted (WhatsApp/email only)
- [ ] Branch built locally: `cd build-tools && npm ci && node prerender.js`
- [ ] Local smoke: `/`, products, services, gallery, about, contact, all legal pages, 404
- [ ] WhatsApp opens chat to `27614453680`
- [ ] Quote form: privacy + commercial terms ack required; marketing unticked; success state; failure fallback
- [ ] No file upload control on form
- [ ] Cookie banner Accept / Reject / Manage
- [ ] Footer legal links work
- [ ] RiseEdge Digital credit intact

## Deploy (manual)

1. Merge approved branch to the publishing branch (`main` / `gh-pages` as you use today).
2. If moving to Netlify: point DNS/custom domain, confirm `netlify.toml` headers apply, keep canonical `https://www.nosibeleembroidery.co.za`.
3. Confirm `CNAME` / custom domain still www.
4. Purge CDN cache if needed.

## Post-deploy

- [ ] Live HTTP 200 for all HTML routes in sitemap
- [ ] `cookies.html`, `terms.html`, `commercial-terms.html`, `policies.html`, `paia.html`, `accessibility.html`, `privacy-request.html` live (currently 404 on production until deploy)
- [ ] robots.txt + sitemap.xml reachable
- [ ] Google Business Profile website URL = homepage
- [ ] Search Console: submit sitemap; inspect `/`
- [ ] Formspree test submission
- [ ] Mobile check 320–430 widths on home + contact
- [ ] No secrets committed (scan repo)

## Rollback

Keep previous `gh-pages` / `main` commit hash ready. Revert publish commit if form or WhatsApp regressions appear.
