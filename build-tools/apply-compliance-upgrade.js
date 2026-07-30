'use strict';
/**
 * One-shot structural upgrades that must land consistently across HTML shells.
 * Safe to re-run. Does not replace React page content (prerender does that).
 */
const fs = require('fs');
const path = require('path');

const PB = path.join(__dirname, '..', 'prod-build');
const PAGES = ['index.html', 'products.html', 'services.html', 'gallery.html', 'about.html', 'contact.html'];

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://formspree.io",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self' https://formspree.io https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com",
  'upgrade-insecure-requests'
].join('; ');

const GA_STUB = `<!-- Google Analytics is CONSENT-GATED: loads only after Accept / analytics preference. See /privacy.html and /cookies.html -->
<script>
(function(){
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  try{
    gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
  }catch(e){}
  window.nbLoadAnalytics=function(){
    if(window.__nbGA)return; window.__nbGA=true;
    var s=document.createElement('script');
    s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id=G-WH87LWEPJB';
    document.head.appendChild(s);
    gtag('js',new Date());
    gtag('config','G-WH87LWEPJB',{anonymize_ip:true});
  };
})();
</script>`;

const CONSENT_ASSETS = `
<link rel="stylesheet" href="css/consent.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
`;

const SKIP = `<a class="nb-skip" href="#main">Skip to content</a>\n`;

const CONSENT_FOOT = `
<script src="js/consent.js" defer></script>
<script src="js/analytics-events.js" defer></script>
`;

function stripOldCookie(html) {
  return html
    .replace(/<!-- Cookie consent banner[\s\S]*?<\/script>\s*<\/body>/i, '</body>')
    .replace(/<div id="nb-cookie"[\s\S]*?<\/div>\s*<script>[\s\S]*?<\/script>\s*<\/body>/i, '</body>');
}

function replaceGa(html) {
  return html.replace(
    /<!-- Google Analytics[\s\S]*?<\/script>\s*(?=<meta charset)/i,
    GA_STUB + '\n'
  ).replace(
    /<script>\s*\(function\(\)\{\s*var ID='G-WH87LWEPJB'[\s\S]*?<\/script>\s*(?=<meta charset)/i,
    GA_STUB + '\n'
  );
}

function replaceCsp(html) {
  return html.replace(
    /<meta http-equiv="Content-Security-Policy"[^>]*>/i,
    `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`
  );
}

function ensureAssets(html) {
  if (!html.includes('css/consent.css')) {
    html = html.replace(
      /<link rel="stylesheet" href="mobile\.css"\s*\/?>/i,
      '<link rel="stylesheet" href="mobile.css" />\n' + CONSENT_ASSETS.trim()
    );
  }
  if (!html.includes('js/consent.js')) {
    html = html.replace(/<\/body>/i, CONSENT_FOOT + '</body>');
  } else if (!html.includes('js/analytics-events.js')) {
    html = html.replace(
      /<script src="js\/consent\.js" defer><\/script>/i,
      '<script src="js/consent.js" defer></script>\n<script src="js/analytics-events.js" defer></script>'
    );
  }
  if (!html.includes('class="nb-skip"')) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${SKIP}`);
  }
  if (!html.includes('id="main"') && html.includes('<!--NB_SSR-->')) {
    // main landmark is injected via React; add a fallback target on #root
    html = html.replace('id="root"', 'id="root" data-main-fallback="true"');
  }
  return html;
}

function patchPage(file) {
  const p = path.join(PB, file);
  let html = fs.readFileSync(p, 'utf8');
  html = stripOldCookie(html);
  html = replaceGa(html);
  html = replaceCsp(html);
  html = ensureAssets(html);
  // Prefer absolute home canonical already present; leave page-specific meta alone here.
  fs.writeFileSync(p, html);
  console.log('patched', file);
}

PAGES.forEach(patchPage);
console.log('HTML shell upgrade complete');
