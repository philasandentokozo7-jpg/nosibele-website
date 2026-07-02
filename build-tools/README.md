# Nosibele build tools — SEO prerender

`prod-build/` is the deployable site. Every page ships with its full content
prerendered into the HTML (inside `<!--NB_SSR-->…<!--/NB_SSR-->` markers), so
crawlers and no-JS clients see the real site. React then *hydrates* over that
markup in the browser — the visual design and all interactivity are unchanged.

## When to re-run the prerender

Any time you change site content — `catalogue.js`, `config.js`,
`app.compiled.js` or `_ds_bundle.js` — regenerate the static HTML:

```
cd build-tools
npm install        # first time only (installs jsdom)
node prerender.js
```

The script is idempotent (safe to run repeatedly). It:

1. Renders each page component (App, ProductsPage, ServicesPage, GalleryPage,
   AboutPage, ContactPage) to HTML with ReactDOMServer inside a jsdom window.
2. Replaces the content between the `NB_SSR` markers in each `.html` file.
3. Regenerates the `ItemList`/`Product` JSON-LD on `products.html` from the
   live catalogue data.
4. Rewrites `sitemap.xml` with `<image:image>` entries for every indexable
   (non-decorative) image on each page.

## Other notes

- React is self-hosted in `prod-build/vendor/` (no unpkg.com dependency).
  `../react-dom-server.min.js` is used only at build time and is not deployed.
- `patch-svc-alts.js` was a one-time patch that added descriptive `alt` text
  to the featured service cards; it has already been applied and is kept for
  reference (also idempotent).
- Image alt text for products/services lives in `catalogue.js` (`alt` field
  per item). Edit it there, then re-run `node prerender.js`.
