/* Nosibele prerender — static-generates every page so real content exists in raw HTML.
   Idempotent: safe to re-run after any content change (catalogue.js / config.js / app.compiled.js).
   Usage: node prerender.js */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const { JSDOM } = require('jsdom');

const PB = path.join(__dirname, '..', 'prod-build');
const SITE = 'https://www.nosibeleembroidery.co.za';

/* Drop stale page duplicates from the design-system bundle before render. */
require('./strip-nb-app-pages.js');

const PAGES = [
  { file: 'index.html',    component: 'App',          loc: SITE + '/',              changefreq: 'weekly',  priority: '1.0' },
  { file: 'products.html', component: 'ProductsPage', loc: SITE + '/products.html', changefreq: 'weekly',  priority: '0.9' },
  { file: 'services.html', component: 'ServicesPage', loc: SITE + '/services.html', changefreq: 'monthly', priority: '0.8' },
  { file: 'gallery.html',  component: 'GalleryPage',  loc: SITE + '/gallery.html',  changefreq: 'weekly',  priority: '0.7' },
  { file: 'about.html',    component: 'AboutPage',    loc: SITE + '/about.html',    changefreq: 'monthly', priority: '0.6' },
  { file: 'contact.html',  component: 'ContactPage',  loc: SITE + '/contact.html',  changefreq: 'monthly', priority: '0.9' },
];

/* Static legal pages (not React-prerendered) — still listed in the sitemap. */
const STATIC_SITEMAP = [
  { loc: SITE + '/privacy.html', changefreq: 'yearly', priority: '0.4' },
  { loc: SITE + '/cookies.html', changefreq: 'yearly', priority: '0.3' },
  { loc: SITE + '/terms.html',   changefreq: 'yearly', priority: '0.4' },
  { loc: SITE + '/commercial-terms.html', changefreq: 'yearly', priority: '0.5' },
  { loc: SITE + '/policies.html', changefreq: 'yearly', priority: '0.4' },
  { loc: SITE + '/paia.html', changefreq: 'yearly', priority: '0.3' },
  { loc: SITE + '/accessibility.html', changefreq: 'yearly', priority: '0.3' },
  { loc: SITE + '/privacy-request.html', changefreq: 'yearly', priority: '0.3' },
  { loc: SITE + '/cancellation-refund.html', changefreq: 'yearly', priority: '0.4' },
];

const APP_SCRIPTS = ['nb-app.js', 'config.js', 'catalogue.js', 'app.compiled.js'];

function xmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

/* ---------- 1. Build a browser-like context and render a component ---------- */
function renderComponent(componentName, pageUrl) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url: pageUrl,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
  const ctx = dom.getInternalVMContext();

  // Minimal stubs for APIs jsdom lacks; render (no effects) rarely needs them,
  // but module-scope code in the bundles might touch them.
  vm.runInContext(`
    if (typeof IntersectionObserver === 'undefined')
      window.IntersectionObserver = function(){ return { observe(){}, unobserve(){}, disconnect(){} }; };
    if (typeof ResizeObserver === 'undefined')
      window.ResizeObserver = function(){ return { observe(){}, unobserve(){}, disconnect(){} }; };
    window.scrollTo = function(){};
  `, ctx);

  const scripts = [
    path.join(PB, 'vendor', 'react.production.min.js'),
    path.join(PB, 'vendor', 'react-dom.production.min.js'),
    path.join(__dirname, '..', 'react-dom-server.min.js'),
    ...APP_SCRIPTS.map((s) => path.join(PB, s)),
  ];
  for (const file of scripts) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: path.basename(file) });
  }

  const html = vm.runInContext(
    `ReactDOMServer.renderToString(React.createElement(window[${JSON.stringify(componentName)}]))`,
    ctx
  );
  const data = vm.runInContext('({ cfg: window.NB_CONFIG, cat: window.NB_CATALOGUE })', ctx);
  dom.window.close();
  return { html, data };
}

/* ---------- 2. Patch page HTML: self-hosted scripts, hydration, SSR content ---------- */
function patchPage(page, rendered) {
  const file = path.join(PB, page.file);
  let html = fs.readFileSync(file, 'utf8');

  // (a) Self-host React instead of unpkg.
  html = html
    .replace(/<script src="https:\/\/unpkg\.com\/react@[^"]*"[^>]*><\/script>/, '<script src="vendor/react.production.min.js"></script>')
    .replace(/<script src="https:\/\/unpkg\.com\/react-dom@[^"]*"[^>]*><\/script>/, '<script src="vendor/react-dom.production.min.js"></script>');

  // (b) Hydrate the prerendered markup instead of rendering into an empty div.
  const hydrate = `<script>(function(){var el=document.getElementById("root"),v=React.createElement(${page.component});if(el.firstElementChild){ReactDOM.hydrateRoot(el,v);}else{ReactDOM.createRoot(el).render(v);}})();</script>`;
  html = html.replace(
    /<script>ReactDOM\.createRoot\(document\.getElementById\("root"\)\)\.render\(React\.createElement\(\w+\)\);<\/script>/,
    hydrate
  );
  html = html.replace(/<script>\(function\(\)\{var el=document\.getElementById\("root"\)[\s\S]*?<\/script>/, hydrate);

  // (c) Inject the server-rendered content between stable markers (idempotent).
  const block = `<!--NB_SSR--><div id="root">${rendered}</div><!--/NB_SSR-->`;
  if (html.includes('<!--NB_SSR-->')) {
    html = html.replace(/<!--NB_SSR-->[\s\S]*?<!--\/NB_SSR-->/, block);
  } else {
    html = html.replace('<div id="root"></div>', block);
  }

  fs.writeFileSync(file, html);
  return html;
}

/* ---------- 3. Product ItemList JSON-LD on the products page ---------- */
function productsJsonLd(cat) {
  const items = cat.PRODUCTS.map((p, i) => {
    const product = {
      '@type': 'Product',
      name: p.title,
      description: p.desc,
      image: SITE + '/' + p.img,
      category: p.cat,
      url: SITE + '/products.html#' + p.slug,
      brand: { '@type': 'Brand', name: 'Nosibele Design & Embroidery' },
    };
    const m = p.price && String(p.price).match(/(\d+(?:\.\d+)?)/);
    if (m) {
      product.offers = {
        '@type': 'AggregateOffer',
        lowPrice: m[1],
        priceCurrency: 'ZAR',
        availability: 'https://schema.org/InStock',
      };
    }
    return { '@type': 'ListItem', position: i + 1, item: product };
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nosibele Design & Embroidery — Products',
    numberOfItems: items.length,
    itemListElement: items,
  };
}

function injectProductsJsonLd(cat) {
  const file = path.join(PB, 'products.html');
  let html = fs.readFileSync(file, 'utf8');
  const tag = `<script type="application/ld+json" id="nb-products-jsonld">\n${JSON.stringify(productsJsonLd(cat), null, 2)}\n</script>`;
  if (html.includes('id="nb-products-jsonld"')) {
    html = html.replace(/<script type="application\/ld\+json" id="nb-products-jsonld">[\s\S]*?<\/script>/, tag);
  } else {
    html = html.replace('</head>', tag + '\n</head>');
  }
  fs.writeFileSync(file, html);
}

/* ---------- 4. Sitemap with image entries harvested from rendered HTML ---------- */
function collectImages(renderedHtml) {
  const seen = new Set();
  const out = [];
  const re = /<img\b[^>]*>/g;
  let m;
  while ((m = re.exec(renderedHtml))) {
    const tag = m[0];
    const src = (tag.match(/\bsrc="([^"]+)"/) || [])[1];
    const alt = (tag.match(/\balt="([^"]*)"/) || [])[1] || '';
    if (!src || src.startsWith('data:')) continue;
    if (alt === '') continue; // decorative
    const abs = src.startsWith('http') ? src : SITE + '/' + src.replace(/^\.?\//, '');
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push({ loc: abs, title: alt });
  }
  return out;
}

function writeSitemap(pageImages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.map((p) => {
    const imgs = (pageImages[p.file] || [])
      .map((i) => `    <image:image><image:loc>${xmlEscape(i.loc)}</image:loc><image:title>${xmlEscape(i.title)}</image:title></image:image>`)
      .join('\n');
    return `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n${imgs}\n  </url>`;
  }).concat(STATIC_SITEMAP.map((p) => (
    `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  ))).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(PB, 'sitemap.xml'), xml);
}

/* ---------- 5. Cache-bust CSS/JS so long-lived CDN/browser caches cannot pin stale UI ---------- */
const VERSIONED_ASSETS = [
  'styles.css',
  'mobile.css',
  'css/consent.css',
  'css/legal.css',
  'nb-app.js',
  'config.js',
  'catalogue.js',
  'app.compiled.js',
  'reveal.js',
  'js/consent.js',
  'js/analytics-events.js',
  'vendor/react.production.min.js',
  'vendor/react-dom.production.min.js',
];

function assetVersionMap() {
  const map = {};
  for (const rel of VERSIONED_ASSETS) {
    const full = path.join(PB, rel);
    if (!fs.existsSync(full)) continue;
    map[rel] = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex').slice(0, 10);
  }
  return map;
}

function applyAssetVersions() {
  const versions = assetVersionMap();
  const htmlFiles = fs.readdirSync(PB).filter((f) => f.endsWith('.html'));
  for (const file of htmlFiles) {
    let html = fs.readFileSync(path.join(PB, file), 'utf8');
    let changed = false;
    for (const [rel, ver] of Object.entries(versions)) {
      const esc = rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Replace href/src for this asset, dropping any previous ?v=
      const re = new RegExp(`((?:href|src)=")${esc}(?:\\?[^"]*)?(")`, 'g');
      const next = html.replace(re, `$1${rel}?v=${ver}$2`);
      if (next !== html) {
        html = next;
        changed = true;
      }
    }
    if (changed) fs.writeFileSync(path.join(PB, file), html);
  }
  fs.writeFileSync(path.join(PB, 'asset-versions.json'), JSON.stringify(versions, null, 2) + '\n');
  console.log('asset versions:', Object.keys(versions).length, 'files stamped into HTML');
}

/* ---------- run ---------- */
const pageImages = {};
let catalogueData = null;
for (const page of PAGES) {
  const { html: rendered, data } = renderComponent(page.component, page.loc);
  catalogueData = data.cat;
  patchPage(page, rendered);
  pageImages[page.file] = collectImages(rendered);
  console.log(`${page.file}: ${(rendered.length / 1024).toFixed(1)} KB prerendered, ${pageImages[page.file].length} indexable images`);
}
injectProductsJsonLd(catalogueData);
writeSitemap(pageImages);
applyAssetVersions();
console.log('products.html: ItemList JSON-LD injected');
console.log('sitemap.xml: rewritten with image entries');
