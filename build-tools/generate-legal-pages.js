#!/usr/bin/env node
/** Generate static legal/policy HTML pages with shared head/nav/footer. */
'use strict';
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'prod-build');
const EFFECTIVE = '30 July 2026';

const NAV = [
  ['Privacy Notice', '/privacy.html'],
  ['Cookies', '/cookies.html'],
  ['Website Terms', '/terms.html'],
  ['Quotation & Order', '/commercial-terms.html'],
  ['Policies', '/policies.html'],
  ['PAIA', '/paia.html'],
  ['Accessibility', '/accessibility.html'],
  ['Data requests', '/privacy-request.html'],
  ['Contact', '/contact.html'],
];

function shell({ title, description, canonicalPath, currentPath, bodyHtml, robots = 'index, follow' }) {
  const nav = NAV.map(([label, href]) => {
    const cur = href === currentPath ? ' aria-current="page"' : '';
    return `    <a href="${href}"${cur}>${label}</a>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://formspree.io; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; frame-src https://www.google.com https://maps.google.com; connect-src 'self' https://formspree.io https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://*.analytics.google.com; upgrade-insecure-requests" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="https://www.nosibeleembroidery.co.za${canonicalPath}" />
<meta name="theme-color" content="#8C0C12" />
<meta name="robots" content="${robots}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Nosibele Design &amp; Embroidery" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="https://www.nosibeleembroidery.co.za${canonicalPath}" />
<meta property="og:image" content="https://www.nosibeleembroidery.co.za/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" type="image/png" href="favicon.png" />
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="css/legal.css" />
<link rel="stylesheet" href="css/consent.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
<a class="nb-skip" href="#main">Skip to content</a>
<header class="nb-legal-top">
  <a class="nb-legal-brand" href="/">
    <img src="assets/logo-red-tile.jpeg" alt="" width="40" height="40" />
    <span>Nosibele</span>
  </a>
  <nav class="nb-legal-nav" aria-label="Legal and policies">
${nav}
  </nav>
</header>
<main id="main" class="nb-legal">
${bodyHtml}
</main>
<footer class="nb-legal-foot">
  <p>© ${new Date().getFullYear()} Nosibele Design &amp; Embroidery · <a href="/">Home</a> · <a href="/contact.html">Contact</a> · <a href="#" data-nb-cookie-settings="true">Cookie Settings</a></p>
  <p>Designed &amp; Built by <a href="https://digital.riseedgeventures.co.za" rel="noopener noreferrer" target="_blank">RiseEdge Digital</a></p>
</footer>
<script src="config.js" defer></script>
<script src="js/consent.js" defer></script>
</body>
</html>
`;
}

const pages = [];

pages.push({
  file: 'policies.html',
  title: 'Policies hub | Nosibele Design &amp; Embroidery',
  description: 'Privacy, cookies, website terms, quotation and order terms, PAIA, accessibility and data-subject requests for Nosibele Design &amp; Embroidery.',
  path: '/policies.html',
  body: `
  <h1>Policies</h1>
  <p class="nb-updated">Effective date: ${EFFECTIVE} · Last updated: ${EFFECTIVE}</p>
  <p>These documents explain how Nosibele Design &amp; Embroidery operates this website and quotation process.
     They are practical drafts for owner and legal review. They do not replace a signed quotation, order confirmation or invoice terms.</p>
  <ul class="nb-policy-list">
    <li><a href="/privacy.html">Privacy Notice</a> — how personal information is used (POPIA).</li>
    <li><a href="/cookies.html">Cookie Policy</a> — necessary cookies and consent-gated analytics.</li>
    <li><a href="/terms.html">Website Terms of Use</a> — browsing and using this site.</li>
    <li><a href="/commercial-terms.html">Quotation &amp; Order Terms</a> — quotes, artwork, production, delivery, collection, cancellation, returns, personalised goods and complaints.</li>
    <li><a href="/paia.html">PAIA Manual</a> — access to information (draft for owner completion).</li>
    <li><a href="/accessibility.html">Accessibility Statement</a> — accessibility goals and feedback.</li>
    <li><a href="/privacy-request.html">Data-subject requests</a> — how to ask about your personal information.</li>
  </ul>
  <p><strong>Business:</strong> Nosibele (Pty) Ltd trading as Nosibele Design &amp; Embroidery · Registration No. 2024/152263/07<br />
  Shop 55, Charlotte Maxeke Street, Dominion Arcade, Durban, KwaZulu-Natal, South Africa<br />
  Phone / WhatsApp: <a href="tel:+27614453680">+27 61 445 3680</a> · Email: <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a></p>
`,
});

pages.push({
  file: 'commercial-terms.html',
  title: 'Quotation &amp; Order Terms | Nosibele Design &amp; Embroidery',
  description: 'Quotation, artwork approval, production, delivery, collection, cancellation, returns and personalised goods terms for Nosibele Design &amp; Embroidery.',
  path: '/commercial-terms.html',
  body: `
  <h1>Quotation &amp; Order Terms</h1>
  <p class="nb-updated">Effective date: ${EFFECTIVE} · Last updated: ${EFFECTIVE}</p>
  <p>These terms apply to quotation requests and custom embroidery, printing and apparel orders with Nosibele Design &amp; Embroidery (“Nosibele”, “we”, “us”).
     Exact commercial terms for a specific order are confirmed on the quotation and any order confirmation issued to you.
     Where a fact is not yet confirmed by the business (for example a fixed deposit percentage), this page does not invent one.</p>

  <h2 id="quotation">1. Quotation and order process</h2>
  <ol>
    <li>You submit a quotation request (website form, WhatsApp, email or in studio).</li>
    <li>Nosibele reviews product, quantity, garment source and artwork.</li>
    <li>A formal quotation is issued.</li>
    <li>You approve the quotation.</li>
    <li>Any deposit or payment required for that order is made according to the approved quotation.</li>
    <li>An artwork proof is prepared where needed.</li>
    <li>You approve spelling, colours, positioning and sizes.</li>
    <li>Production begins only after the approved quotation, any agreed payment or deposit, and artwork approval.</li>
    <li>Quality check.</li>
    <li>Collection or courier as agreed.</li>
    <li>Any remaining balance, where applicable, is paid as stated on the quotation or invoice.</li>
  </ol>
  <p><strong>Important:</strong> Submitting the website form is a <em>request for a quotation</em>, not acceptance of an order and not a contract to produce goods.</p>

  <h2 id="validity">2. Quotation validity</h2>
  <p>Unless a quotation states a validity period, pricing and timing remain open for a reasonable discussion period.
     A standard validity window in days will be published here once confirmed by the owner. Pricing may change if materials, artwork, quantity or requirements change.</p>

  <h2 id="pricing">3. Prices and what “from” means</h2>
  <p>Website prices marked “from” or “price on enquiry” are guides only. A quotation confirms, as applicable:</p>
  <ul>
    <li>whether VAT applies and whether amounts include VAT (VAT registration status is confirmed by the business — not invented here);</li>
    <li>whether garment cost is included;</li>
    <li>whether branding / print / embroidery is included;</li>
    <li>digitising or artwork setup charges, if any;</li>
    <li>minimum quantity;</li>
    <li>size, colour and placement limits;</li>
    <li>courier cost, if any;</li>
    <li>urgency or overtime surcharges, if any.</li>
  </ul>

  <h2 id="deposits">4. Deposits and payments</h2>
  <p>Payment arrangements, including any deposit before production, are confirmed on the quotation for each order.
     No fixed deposit percentage is published on this website until the owner verifies it.
     Do not send card details through the public website form.</p>

  <h2 id="artwork">5. Artwork approval terms</h2>
  <p>Artwork may be provided by you (PNG, JPG or PDF preferred) or prepared by us.
     For security, the website quotation form does <strong>not</strong> accept file uploads; send artwork by WhatsApp or email after requesting a quote.
     Before production of custom work, we may ask you to approve artwork, spelling, sizing, placement and colours.
     You are responsible for checking those details. Production proceeds on the approved version.
     Changes after approval may affect price and lead time.
     Artwork revision limits, if any, will be stated on the quotation.</p>

  <h2 id="production">6. Production terms</h2>
  <p>Production starts only after approved quotation, any agreed payment or deposit, and artwork approval.
     Lead times depend on quantity, method and studio workload and are confirmed per order.
     Colour appearance can vary between screens, proofs and finished garments; we work to match approved artwork within normal production tolerances for the chosen method.</p>

  <h2 id="personalised">7. Personalised goods policy</h2>
  <p>Most catalogue items are made to order and personalised. Personalised goods are generally not returnable for change of mind once production has started or artwork has been approved, except where South African consumer law requires otherwise or where we confirm a defect attributable to us.</p>

  <h2 id="customer-garments">8. Customer-supplied garments</h2>
  <p>If you supply garments for branding, tell us about fabric type and condition.
     Risks relating to customer-supplied stock (for example fabric reaction to heat or dyes) are discussed when we quote.
     Detailed liability wording for customer-supplied garments should be confirmed on the order paperwork — owner decision required before stronger exclusions are published.</p>

  <h2 id="delivery">9. Delivery and courier policy</h2>
  <p>Collection from our Durban studio is available during published business hours.
     Courier options may be available; cost, carrier and risk transfer points are confirmed on the quotation.
     We do not publish an unqualified “nationwide” delivery guarantee on this site.
     Inspect goods on delivery and report damage or short-shipment promptly using the contacts below.</p>

  <h2 id="collection">10. Collection policy</h2>
  <p>When goods are ready, we will notify you using the contact details you provided.
     Please collect within a reasonable time after notification. Uncollected-order handling (storage fees or disposal) will be confirmed in writing if it becomes necessary — no automatic fee is invented here.</p>

  <h2 id="cancellation">11. Cancellation policy</h2>
  <p>You may cancel a quotation request at any time before accepting a quotation.
     After quotation acceptance, deposit payment and/or artwork approval, cancellation may not be possible for work already started, or may involve charges for materials and labour already committed.
     Exact cancellation rules for your order are confirmed in writing when you accept the quotation.</p>

  <h2 id="returns">12. Returns, refunds and exchanges</h2>
  <p>Because goods are typically personalised:</p>
  <ul>
    <li>change-of-mind returns after production starts are generally not available;</li>
    <li>if we accept that goods are defective or not as approved, we will discuss remake, repair or refund options appropriate to the order;</li>
    <li>nothing in these terms limits rights you may have under the Consumer Protection Act 68 of 2008 where it applies.</li>
  </ul>

  <h2 id="complaints">13. Complaints procedure</h2>
  <ol>
    <li>Contact us first: <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a> or WhatsApp <a href="tel:+27614453680">061 445 3680</a>, with your quote/order reference and a clear description of the issue (photos help).</li>
    <li>We will acknowledge and review the complaint.</li>
    <li>We aim to respond with a proposed resolution as soon as reasonably possible for the studio’s capacity.</li>
    <li>If unresolved, you may escalate using any remedies available under South African law, including the Consumer Goods &amp; Services Ombud or other competent body where applicable.</li>
  </ol>
  <p>A dedicated complaints email will be listed here once the owner confirms one. Until then use <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a>.</p>

  <h2>14. Related documents</h2>
  <p><a href="/privacy.html">Privacy Notice</a> · <a href="/terms.html">Website Terms</a> · <a href="/policies.html">Policies hub</a> · <a href="/privacy-request.html">Data requests</a></p>
`,
});

pages.push({
  file: 'paia.html',
  title: 'PAIA Manual | Nosibele Design &amp; Embroidery',
  description: 'Promotion of Access to Information Act (PAIA) manual draft for Nosibele (Pty) Ltd trading as Nosibele Design &amp; Embroidery.',
  path: '/paia.html',
  body: `
  <h1>PAIA Manual</h1>
  <p class="nb-updated">Effective date: ${EFFECTIVE} · Last updated: ${EFFECTIVE}</p>
  <p><strong>Status:</strong> Draft framework for owner and legal completion. This page publishes only verified company identity details.
     It is not a substitute for a fully completed PAIA manual signed off by the Information Officer.</p>

  <h2>1. Introduction</h2>
  <p>This manual is prepared in the spirit of the Promotion of Access to Information Act 2 of 2000 (“PAIA”) and should be read with the Protection of Personal Information Act 4 of 2013 (“POPIA”).
     Nosibele is a private company providing embroidery, printing and branded apparel services.</p>

  <h2>2. Company details (verified)</h2>
  <ul>
    <li><strong>Registered name:</strong> Nosibele (Pty) Ltd</li>
    <li><strong>Trading name:</strong> Nosibele Design &amp; Embroidery</li>
    <li><strong>Registration number:</strong> 2024/152263/07</li>
    <li><strong>Physical address:</strong> Shop 55, Charlotte Maxeke Street, Dominion Arcade, Durban, KwaZulu-Natal, South Africa</li>
    <li><strong>Telephone:</strong> <a href="tel:+27614453680">+27 61 445 3680</a></li>
    <li><strong>Email:</strong> <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a></li>
    <li><strong>Website:</strong> <a href="https://www.nosibeleembroidery.co.za/">https://www.nosibeleembroidery.co.za/</a></li>
  </ul>

  <h2>3. Information Officer</h2>
  <p>The name, email and telephone number of the Information Officer (and any Deputy) will be published here once appointed and confirmed by the owner.
     Until then, PAIA and POPIA requests may be sent to <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a> with the subject line “PAIA / POPIA request”.</p>

  <h2>4. Guide on how to use PAIA</h2>
  <p>The Information Regulator has published a guide on how to use PAIA. See <a href="https://inforegulator.org.za/" rel="noopener noreferrer" target="_blank">inforegulator.org.za</a>.</p>

  <h2>5. Records available</h2>
  <p>Categories of records typically held by a business of this type may include company statutory records, financial records, customer quotation and order records, supplier records, and operational documents.
     A detailed schedule (Form C style categories, availability and fees) will be completed by the Information Officer.
     Records that are publicly available on this website do not require a PAIA request.</p>

  <h2>6. Request procedure</h2>
  <p>Requests for access to records should be made in writing to the contact above, with enough detail to identify the record and the requester.
     Prescribed forms and fees under PAIA may apply. We will respond within the time frames required by law once a complete request is received.</p>

  <h2>7. Personal information (POPIA)</h2>
  <p>Processing of personal information is described in our <a href="/privacy.html">Privacy Notice</a>. Data-subject requests may also be made via the <a href="/privacy-request.html">data-subject request page</a>.</p>

  <h2>8. Updates</h2>
  <p>This manual will be updated when the Information Officer details, record schedules or fees are confirmed.</p>
`,
});

pages.push({
  file: 'accessibility.html',
  title: 'Accessibility Statement | Nosibele Design &amp; Embroidery',
  description: 'Accessibility statement for the Nosibele Design &amp; Embroidery website — goals, known limits and how to request help.',
  path: '/accessibility.html',
  body: `
  <h1>Accessibility Statement</h1>
  <p class="nb-updated">Effective date: ${EFFECTIVE} · Last updated: ${EFFECTIVE}</p>
  <p>Nosibele Design &amp; Embroidery aims to make this website usable for as many people as possible.
     We work toward WCAG 2.2 Level AA where practical for a static catalogue and quotation site.</p>

  <h2>What we do</h2>
  <ul>
    <li>Provide skip links to main content on key pages.</li>
    <li>Use semantic headings and labels on the quotation form.</li>
    <li>Support keyboard focus styles on interactive controls.</li>
    <li>Offer alternatives to the form (WhatsApp, telephone and email).</li>
    <li>Respect reduced-motion preferences where CSS supports it.</li>
    <li>Gate non-essential analytics behind cookie consent.</li>
  </ul>

  <h2>Known limitations</h2>
  <ul>
    <li>Some older catalogue images may lack ideal compression or explicit width/height attributes.</li>
    <li>The gallery lightbox and masonry layout continue to be improved for keyboard and screen-reader users.</li>
    <li>Embedded Google Maps on the contact page is a third-party iframe with its own accessibility characteristics.</li>
    <li>Colour contrast for gold text on burgundy is monitored; please tell us if you find a combination hard to read.</li>
  </ul>

  <h2>Feedback and assistance</h2>
  <p>If you need information in another format, or find a barrier on this site, contact us:</p>
  <ul>
    <li>Email: <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a></li>
    <li>Phone / WhatsApp: <a href="tel:+27614453680">061 445 3680</a></li>
    <li>Visit: Shop 55, Charlotte Maxeke Street, Dominion Arcade, Durban</li>
  </ul>
  <p>Please include the page URL and a description of the problem. We will try to help.</p>
`,
});

pages.push({
  file: 'privacy-request.html',
  title: 'Data-subject requests | Nosibele Design &amp; Embroidery',
  description: 'How to request access, correction or deletion of personal information held by Nosibele Design &amp; Embroidery (POPIA).',
  path: '/privacy-request.html',
  body: `
  <h1>Data-subject requests</h1>
  <p class="nb-updated">Effective date: ${EFFECTIVE} · Last updated: ${EFFECTIVE}</p>
  <p>Under the Protection of Personal Information Act 4 of 2013 (POPIA), you may request access to personal information we hold about you, ask for correction or deletion where appropriate, object to certain processing, or withdraw marketing consent.</p>

  <h2>How to submit a request</h2>
  <ol>
    <li>Email <a href="mailto:info@nosibeleembroidery.co.za">info@nosibeleembroidery.co.za</a> with the subject line <strong>POPIA data-subject request</strong>.</li>
    <li>Include your full name, the contact details you used with us (WhatsApp number and/or email), and what you are asking for.</li>
    <li>We may need to verify your identity before acting on the request.</li>
  </ol>
  <p>A dedicated privacy email will be published once the owner confirms one. Until then use the address above.
     Information Officer details will appear in the <a href="/paia.html">PAIA Manual</a> when appointed.</p>

  <h2>What we usually need</h2>
  <ul>
    <li>Enough information to find your records (for example approximate enquiry date or product discussed).</li>
    <li>Whether you want access, correction, deletion, objection, or marketing withdrawal.</li>
  </ul>

  <h2>Related</h2>
  <p>Read the full <a href="/privacy.html">Privacy Notice</a> and <a href="/cookies.html">Cookie Policy</a>.
     You may also contact the <a href="https://inforegulator.org.za/" rel="noopener noreferrer" target="_blank">Information Regulator</a>.</p>
`,
});

for (const p of pages) {
  const html = shell({
    title: p.title,
    description: p.description,
    canonicalPath: p.path,
    currentPath: p.path,
    bodyHtml: p.body,
  });
  fs.writeFileSync(path.join(OUT, p.file), html);
  console.log('wrote', p.file, html.length);
}

// Refresh legal nav on existing privacy/cookies/terms if they still have short nav
for (const file of ['privacy.html', 'cookies.html', 'terms.html']) {
  const fp = path.join(OUT, file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, 'utf8');
  const navRe = /<nav class="nb-legal-nav"[^>]*>[\s\S]*?<\/nav>/;
  const current = '/' + file;
  const navInner = NAV.map(([label, href]) => {
    const cur = href === current ? ' aria-current="page"' : '';
    return `    <a href="${href}"${cur}>${label}</a>`;
  }).join('\n');
  const nav = `<nav class="nb-legal-nav" aria-label="Legal and policies">\n${navInner}\n  </nav>`;
  if (navRe.test(html)) {
    html = html.replace(navRe, nav);
    fs.writeFileSync(fp, html);
    console.log('updated nav', file);
  }
}

console.log('generate-legal-pages done');
