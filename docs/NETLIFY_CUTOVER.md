# Netlify cutover — Nosibele

**Goal:** Serve `https://www.nosibeleembroidery.co.za` from Netlify again (not GitHub Pages).  
**Existing Netlify site:** [nosibele-embroidery](https://app.netlify.com/projects/nosibele-embroidery)  
**Site ID:** `1727001e-1100-433f-96fc-17a1c2041d95`  
**Netlify URL:** https://nosibele-embroidery.netlify.app/  
**Repo production branch:** `main` (remediation merged)

## What is already done

1. Remediation merged to `main` (`dbe9624`).
2. Latest `prod-build` published to `gh-pages` so the **current** public DNS (still GitHub Pages) serves the new site.
3. Netlify site still exists with `custom_domain = www.nosibeleembroidery.co.za`, but **Git continuous builds did not fire** on the latest push (`build_settings` empty / builds idle).
4. Agent requested Netlify CLI login authorization (ticket) — owner must approve in browser if still pending.

## Owner: reconnect Netlify → GitHub (2 minutes)

1. Open https://app.netlify.com/projects/nosibele-embroidery  
2. **Site configuration → Build & deploy → Continuous deployment**  
3. Link / re-link repository `philasandentokozo7-jpg/nosibele-website`  
4. Production branch: **`main`**  
5. Build command / publish dir: leave as `netlify.toml` (`cd build-tools && npm install && node prerender.js` → `prod-build`)  
6. Trigger **Deploy site** (or push an empty commit to `main`)

Confirm https://nosibele-embroidery.netlify.app/ shows:
- “Made to order” / Google reviews CTA (not “1000+”)
- `/cookies.html` and `/commercial-terms.html` return **200**

## Owner: point DNS to Netlify (critical)

Current DNS (as observed):

| Host | Current | Change to |
|------|---------|-----------|
| `www` | CNAME → `philasandentokozo7-jpg.github.io` | CNAME → **`nosibele-embroidery.netlify.app`** |
| apex `@` | A → GitHub Pages IPs | Netlify apex guidance: ALIAS/ANAME to `nosibele-embroidery.netlify.app` **or** Netlify’s documented A records (see Netlify → Domain management) |

Nameservers observed: `anycast-ns.com` / `anycast-ns.net` (registrar DNS panel).

After DNS change:
1. In Netlify → **Domain management**, verify `www.nosibeleembroidery.co.za` and apex if used.  
2. Wait for SSL to show **Issued** on Netlify.  
3. Confirm live headers: `server: Netlify` and CSP / redirects from `netlify.toml` active.

## Owner: disable GitHub Pages (after Netlify is live)

1. GitHub repo → **Settings → Pages** → Remove custom domain / disable Pages.  
2. Keep `gh-pages` branch only as backup if desired.

## Agent deploy (when NETLIFY_AUTH_TOKEN available)

```bash
export NETLIFY_AUTH_TOKEN=...   # personal access token from Netlify user settings
cd /workspace
npx netlify deploy --prod --dir=prod-build --site=1727001e-1100-433f-96fc-17a1c2041d95
```

Or re-authorize CLI:
```bash
npx netlify login
npx netlify link --id 1727001e-1100-433f-96fc-17a1c2041d95
npx netlify deploy --prod --dir=prod-build
```

## Verify after cutover

```bash
curl -sI https://www.nosibeleembroidery.co.za/ | grep -i '^server:'
# expect: Netlify
curl -sI https://www.nosibeleembroidery.co.za/cookies.html | head -1
curl -sI https://www.nosibeleembroidery.co.za/index.html | grep -i location
# expect 301 to /
```
