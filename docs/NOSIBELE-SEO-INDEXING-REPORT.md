# Nosibele — SEO & Gallery indexing diagnosis

**Date:** 28 July 2026  
**Canonical homepage:** `https://www.nosibeleembroidery.co.za/`

## Verdict

**No in-code redirect or canonical mistake makes Gallery the homepage.**  
Logo, Home nav, footer Home, homepage canonical, Open Graph URL, WebSite/Organization structured data, and sitemap all point to `/`.

If Google Search still opens Gallery for some queries, remaining causes are likely **external ranking/selection** (image-rich Gallery, Business Profile URL, historical indexing), not a website redirect bug.

## Live URL behaviour verified (28 July 2026)

| URL | Result |
|-----|--------|
| `https://www.nosibeleembroidery.co.za/` | 200 homepage |
| `https://nosibeleembroidery.co.za/` | 301 → www homepage |
| `http://www.nosibeleembroidery.co.za/` | 301 → https www |
| `http://nosibeleembroidery.co.za/` | 301 → https www |
| `https://www.nosibeleembroidery.co.za/index.html` | **200** (does **not** currently 301 to `/`) |
| `https://www.nosibeleembroidery.co.za/gallery` | **200** (does **not** currently 301 to `gallery.html`) |
| `https://www.nosibeleembroidery.co.za/gallery.html` | 200 Gallery |

**Hosting observation:** Live responses are served by **GitHub Pages** (`server: GitHub.com`), not Netlify. Therefore `netlify.toml` redirects/headers are **not active on the live domain today**.

## Code / config findings

- No meta refresh to Gallery
- No JS `location` redirect to Gallery
- Homepage canonical already `/`
- Gallery canonical already `/gallery.html`
- Sitemap lists homepage first at priority 1.0; Gallery later at 0.7
- Gallery is image-dense (many sitemap image entries) — plausible Google preference for visual queries
- Internal Home links previously used `index.html` (duplicate URL risk) — **changed to `/`**
- Footer Privacy previously `#` — **fixed**
- Added WebSite + Organization/LocalBusiness graph on homepage pointing to `/`

## Redirects prepared (apply when Netlify hosts / on deploy approval)

In `netlify.toml` and `prod-build/_redirects`:

- `/index.html` → `/` (301, force)
- `/home`, `/home.html` → `/`
- Extensionless page aliases → `.html` equivalents (including `/gallery` → `/gallery.html`)
- `/privacy`, `/cookies`, `/terms` aliases

These will **not** affect the live GitHub Pages host until cutover.

## Homepage SEO updates made

- Title/description emphasise embroidery, printing, branded clothing, Durban
- Absolute canonical + OG/Twitter to `/`
- Structured data WebSite + Organization URL = homepage
- Legal pages added to sitemap after core pages
- robots.txt unchanged Allow + sitemap

## Owner actions (require your Google login)

### Google Business Profile
1. Open Google Business Profile for Nosibele.
2. Check **Website** field.
3. Set/confirm: `https://www.nosibeleembroidery.co.za/`
4. Ensure it is **not** `.../gallery` or `.../gallery.html`.

### Google Search Console
1. Open the **www** property for `nosibeleembroidery.co.za` (or domain property covering www).
2. **URL Inspection** → enter `https://www.nosibeleembroidery.co.za/` → confirm indexed as homepage.
3. **Request Indexing** for the homepage after deploy.
4. **Sitemaps** → submit/re-submit `https://www.nosibeleembroidery.co.za/sitemap.xml`.
5. Review “Page with redirect” / duplicate `/index.html` coverage after Netlify redirects go live.
6. Only use Removals for outdated URLs if Inspection shows a clear obsolete/wrong URL that should not appear — do not blanket-remove Gallery.

### Important limitation
Code and redirect fixes improve signals but **cannot instantly force** Google’s search-result choice. Expect recrawl delay after deploy.
