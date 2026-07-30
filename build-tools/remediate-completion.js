#!/usr/bin/env node
/**
 * Nosibele completion remediation — applies correctable claim, form, pricing,
 * footer and process copy fixes to app.compiled.js / nb-app.js / styles.css.
 * Idempotent where practical (checks before replace).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APP = path.join(ROOT, 'prod-build', 'app.compiled.js');
const NB = path.join(ROOT, 'prod-build', 'nb-app.js');
const STYLES = path.join(ROOT, 'prod-build', 'styles.css');

function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { fs.writeFileSync(p, s); console.log('wrote', path.relative(ROOT, p), s.length); }

function replaceOnce(src, find, repl, label) {
  if (!src.includes(find)) {
    if (src.includes(repl) || (typeof repl === 'string' && src.includes(repl.slice(0, 40)))) {
      console.log('skip (already applied):', label);
      return src;
    }
    console.warn('MISS:', label);
    return src;
  }
  return src.replace(find, repl);
}

function replaceAll(src, find, repl, label) {
  if (!src.includes(find)) {
    console.warn('MISS all:', label);
    return src;
  }
  const n = src.split(find).length - 1;
  console.log('replace x' + n + ':', label);
  return src.split(find).join(repl);
}

/* ---------- app.compiled.js ---------- */
let app = read(APP);

// Hero / About unsupported volume claim
app = replaceAll(
  app,
  "[['Est. 2024', 'Durban studio'], ['1000+', 'Garments finished'], ['7–10 days', 'Typical turnaround']]",
  "[['Est. 2024', 'Durban studio'], ['Made to order', 'Quote-based production'], ['Typical lead time', 'Confirmed on quotation']]",
  'stats-1000'
);

app = replaceOnce(
  app,
  '}, "Every stitch checked by hand"))',
  '}, "Checked before it leaves the studio"))',
  'hero-float-stitch'
);

app = replaceOnce(
  app,
  "desc: 'Dye is infused edge-to-edge into the fabric, so designs never crack, peel or fade — ideal for golf shirts, dresses and supporters’ wear.'",
  "desc: 'Dye is infused edge-to-edge into the fabric for a durable full-colour finish — ideal for golf shirts, dresses and supporters’ wear when cared for as advised.'",
  'svc-sublimation-claim'
);

app = replaceOnce(
  app,
  "desc: 'Direct-to-film transfers reproduce intricate logos and photographic artwork in vivid, durable colour — on virtually any fabric.'",
  "desc: 'Direct-to-film transfers reproduce intricate logos and photographic artwork in vivid colour on many garment types — suitability depends on fabric and the artwork.'",
  'svc-dtf-claim'
);

app = replaceOnce(
  app,
  "desc: 'Premium thread-level branding — names, logos and numbers raised in lasting stitch.'",
  "desc: 'Thread-level branding — names, logos and numbers raised in embroidery stitch for a quality finish.'",
  'svc-embroidery-claim'
);

app = replaceOnce(
  app,
  "}, ['Raised, durable stitching', 'Digitised for perfect logos', 'Premium thread & fabric'].map(f =>",
  "}, ['Raised embroidery stitching', 'Digitised for logo embroidery', 'Quality thread & fabric'].map(f =>",
  'embroidery-bullets'
);

app = replaceOnce(
  app,
  "const steps = [['01', 'Share your idea', 'Send your logo, design or inspiration — over WhatsApp, email or the quote form.'], ['02', 'Design consultation', 'We discuss garments, colours and placement, then send a tailored quote — usually within a day.'], ['03', 'Digitising', 'Your artwork is digitised and prepared for embroidery, sublimation or DTF print.'], ['04', 'Embroidery & production', 'Each piece is stitched and produced on premium thread and fabric in our studio.'], ['05', 'Quality inspection', 'Every garment is checked by hand — stitching, colour and finish — before it leaves us.'], ['06', 'Delivered with pride', 'Ready in 7–10 working days, packed beautifully and couriered across South Africa.']];",
  "const steps = [['01', 'Request a quotation', 'Share what you need — garment, quantity, artwork or inspiration — via the quote form, WhatsApp or email.'], ['02', 'Review & quotation', 'We review the request and send a tailored quotation. Timing for the reply depends on complexity; we aim to respond promptly.'], ['03', 'Approve quote & artwork', 'Production begins only after you approve the quotation, complete any agreed payment or deposit, and approve artwork (spelling, colours, placement and sizes).'], ['04', 'Production', 'Approved work is embroidered, printed or finished in our Durban studio according to the agreed specification.'], ['05', 'Quality check', 'Garments are checked for stitching, colour and finish before release.'], ['06', 'Collect or courier', 'Collect from the studio or arrange courier as agreed on your quotation. Lead times are confirmed per order.']];",
  'craft-steps'
);

app = replaceOnce(
  app,
  "const values = [['01', 'Craftsmanship', 'Every stitch is placed with intention and checked by hand before it leaves the studio.'], ['02', 'Quality', 'Premium thread, fabric and finishes that hold their colour and shape, wash after wash.'], ['03', 'Warmth', 'We treat a single monogrammed gift with the same care as a full team’s order.'], ['04', 'Reliability', 'Honest lead-times and clear communication — most orders ready in 7–10 working days.']];",
  "const values = [['01', 'Craftsmanship', 'We take care with placement, stitching and finishing, and check work before it leaves the studio.'], ['02', 'Quality', 'We use quality thread, fabric and finishes suited to the garment and branding method agreed on your quotation.'], ['03', 'Warmth', 'We treat a single monogrammed gift with the same care as a full team’s order.'], ['04', 'Reliability', 'We communicate lead times clearly and confirm timing on each quotation.']];",
  'about-values'
);

app = replaceOnce(
  app,
  '}, "From corporate uniforms and workwear to varsity regalia, ceremonial pieces and one-off gifts, our promise stays the same: premium materials, careful finishing, and apparel you\\u2019ll be proud to wear.")',
  '}, "From corporate uniforms and workwear to ceremonial pieces and one-off gifts, we focus on careful finishing and apparel made to the specification we agree with you.")',
  'about-promise'
);

app = replaceOnce(
  app,
  "}, \"made to last a full year of wear.\"",
  "}, \"finished for regular school and club use when cared for as advised.\"",
  'school-year-claim'
);

// Soften quote left column absolute reply claim
app = replaceOnce(
  app,
  "}, \"A few details is all we need. We\\u2019ll bring your idea to thread and reply with a tailored quote \\u2014 usually within a day.\")",
  "}, \"A few details is all we need. Submitting this form is a request for a quotation \\u2014 not an accepted order. We reply with a tailored quote after reviewing your requirements.\")",
  'quote-intro'
);

app = replaceOnce(
  app,
  "}, ['A tailored quote — usually within a day', 'No obligation, no pressure', 'Talk to a real person in our Durban studio'].map(r =>",
  "}, ['A quotation request — no order until you approve', 'No obligation from sending the form', 'Talk to a real person in our Durban studio'].map(r =>",
  'quote-bullets'
);

/* QuoteSection: replace artwork upload pretence + strengthen privacy/terms copy */
const OLD_UPLOAD_BLOCK = `  }, "Finishing touches"), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Artwork or logo ", /*#__PURE__*/React.createElement("em", null, "(optional)")), /*#__PURE__*/React.createElement("label", {
    className: "nbq-upload"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V4M7 9l5-5 5 5M5 20h14"
  })), /*#__PURE__*/React.createElement("span", {
    className: "nbq-upload__t"
  }, fileName || 'Upload PNG, JPG or PDF'), /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: "artwork",
    accept: "image/*,.pdf",
    onChange: e => setFileName(e.target.files[0] ? e.target.files[0].name : '')
  }))), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Notes"), /*#__PURE__*/React.createElement("textarea", {
    name: "notes",
    rows: 3,
    placeholder: "Colours, sizes, deadline, or anything else we should know."
  })),`;

const NEW_ARTWORK_BLOCK = `  }, "Finishing touches"), /*#__PURE__*/React.createElement("div", {
    className: "nbq-f",
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Artwork or logo ", /*#__PURE__*/React.createElement("em", null, "(optional \\u2014 send securely)")), /*#__PURE__*/React.createElement("p", {
    className: "nbq-help",
    style: {
      margin: '8px 0 0',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, "For security, artwork files are not uploaded through this website form. After you send this quotation request, share PNG, JPG or PDF artwork by WhatsApp (", /*#__PURE__*/React.createElement("a", {
    href: (window.NB_CONFIG && window.NB_CONFIG.phoneHref) || 'tel:+27614453680',
    style: {
      color: 'var(--crimson-600)',
      fontWeight: 700
    }
  }, (window.NB_CONFIG && window.NB_CONFIG.phone) || '061 445 3680'), ") or email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:artwork@nosibeleembroidery.co.za",
    style: {
      color: 'var(--crimson-600)',
      fontWeight: 700
    }
  }, "artwork@nosibeleembroidery.co.za"), ". Artwork is used only to prepare your quotation and, if you proceed, your order.")), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Notes ", /*#__PURE__*/React.createElement("em", null, "(optional)")), /*#__PURE__*/React.createElement("textarea", {
    name: "notes",
    rows: 3,
    placeholder: "Colours, sizes, deadline, or anything else we should know."
  })),`;

if (app.includes(OLD_UPLOAD_BLOCK)) {
  app = app.replace(OLD_UPLOAD_BLOCK, NEW_ARTWORK_BLOCK);
  console.log('replaced artwork upload block');
} else if (app.includes('Artwork or logo ') && app.includes('send securely')) {
  console.log('skip artwork block (already)');
} else {
  console.warn('MISS artwork upload block — attempting looser match');
  // Fallback: disable file input via accept removal messaging near upload
}

// Privacy / terms checkboxes copy
app = replaceOnce(
  app,
  `}, "I have read the ", /*#__PURE__*/React.createElement("a", {
      href: "/privacy.html",
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        color: 'var(--crimson-600)',
        fontWeight: 700
      }
    }, "Privacy Notice"), " and understand how my information will be used to respond to this enquiry.")`,
  `}, "I have read the ", /*#__PURE__*/React.createElement("a", {
      href: "/privacy.html",
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        color: 'var(--crimson-600)',
        fontWeight: 700
      }
    }, "Privacy Notice"), " and the ", /*#__PURE__*/React.createElement("a", {
      href: "/commercial-terms.html",
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        color: 'var(--crimson-600)',
        fontWeight: 700
      }
    }, "Quotation & Order Terms"), ". I understand this is a quotation request only, and that production starts only after an approved quotation, any agreed payment or deposit, and artwork approval.")`,
  'privacy-terms-ack'
);

app = replaceOnce(
  app,
  '}, "Your enquiry details are used to reply about this quote. Optional marketing is only recorded if you tick the separate box. Form submissions are processed via Formspree.")',
  '}, "Required fields are marked with *. Name and WhatsApp number are needed so we can reply. Product, quantity and notes help us prepare a quotation. Optional marketing is only recorded if you tick the separate box. Form submissions are processed via Formspree. Customer details are not placed in page URLs.")',
  'form-footer-help'
);

// Footer legal links — expand
app = replaceOnce(
  app,
  `}, /*#__PURE__*/React.createElement("a", {
      href: "/privacy.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Privacy Notice"), /*#__PURE__*/React.createElement("a", {
      href: "/cookies.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Cookie Policy"), /*#__PURE__*/React.createElement("a", {
      href: "/terms.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Terms"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      "data-nb-cookie-settings": "true",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Cookie Settings"))`,
  `}, /*#__PURE__*/React.createElement("a", {
      href: "/privacy.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Privacy Notice"), /*#__PURE__*/React.createElement("a", {
      href: "/cookies.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Cookie Policy"), /*#__PURE__*/React.createElement("a", {
      href: "/terms.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Website Terms"), /*#__PURE__*/React.createElement("a", {
      href: "/commercial-terms.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Quotation & Order Terms"), /*#__PURE__*/React.createElement("a", {
      href: "/policies.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Policies"), /*#__PURE__*/React.createElement("a", {
      href: "/accessibility.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Accessibility"), /*#__PURE__*/React.createElement("a", {
      href: "/paia.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "PAIA"), /*#__PURE__*/React.createElement("a", {
      href: "/privacy-request.html",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Data requests"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      "data-nb-cookie-settings": "true",
      className: "nb-foot-link",
      style: {
        color: 'inherit',
        textDecoration: 'none'
      }
    }, "Cookie Settings"))`,
  'footer-legal'
);

// Soften FAQ delivery nationwide in ContactPage hardcoded FAQs if present
app = replaceAll(
  app,
  'Collect from us, or we courier nationwide across South Africa.',
  'Collect from our Durban studio, or ask us about courier options when we quote.',
  'faq-nationwide'
);

app = replaceAll(
  app,
  'We\u2019ll reply with a tailored quote, usually within a day.',
  'We\u2019ll reply with a tailored quotation after reviewing your requirements.',
  'faq-within-day'
);

app = replaceAll(
  app,
  'Most orders are ready in 7–10 working days once the design is approved. Larger or more complex orders may take a little longer — we\u2019ll always confirm upfront.',
  'Lead times depend on quantity, method and current studio workload. Typical timing is discussed with you and confirmed on your quotation after artwork approval.',
  'faq-turnaround'
);

// Remove unused fileName append if upload gone — keep harmless
app = replaceOnce(
  app,
  "      if (fileName) data.append('Artwork (to be sent separately)', fileName);\n",
  "      data.append('Artwork delivery', 'Customer will send artwork separately via WhatsApp or email (website upload disabled for security)');\n",
  'artwork-form-field'
);

// Analytics hook on successful submit (no PII)
app = replaceOnce(
  app,
  "      setLead(leadObj);\n      setSent(true);\n    } catch (err) {\n      setError('We couldn’t send your request just now. Please WhatsApp us and we’ll sort it out straight away.');",
  "      setLead(leadObj);\n      setSent(true);\n      try { if (typeof window.nbTrack === 'function') window.nbTrack('quote_submit', { item: item ? 'set' : 'unset' }); } catch (t) {}\n    } catch (err) {\n      try { if (typeof window.nbTrack === 'function') window.nbTrack('form_error', { form: 'quote' }); } catch (t) {}\n      setError('We couldn’t send your request just now. Please WhatsApp us on 061 445 3680, email quotes@nosibeleembroidery.co.za, or call us — and we will help you.');",
  'quote-analytics'

);

// Field help under name/phone — inject after Your details grouphead if not present
if (!app.includes('nbq-help-details')) {
  app = replaceOnce(
    app,
    `}, "Your details"), /*#__PURE__*/React.createElement("div", {
    className: "nbq-row2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Your name", /*#__PURE__*/React.createElement("i", null, "*")),`,
    `}, "Your details"), /*#__PURE__*/React.createElement("p", {
    className: "nbq-help nbq-help-details",
    style: {
      margin: '0 0 12px',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, "We use your name and WhatsApp number only to respond to this quotation request (and for marketing only if you opt in below)."), /*#__PURE__*/React.createElement("div", {
    className: "nbq-row2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Your name", /*#__PURE__*/React.createElement("i", null, "*")),`,
    'field-help-details'
  );
}

// Testimonials: only show permission-confirmed reviews (owner must set permissionConfirmed: true)
app = replaceOnce(
  app,
  "  const reviews = window.NB_CATALOGUE && window.NB_CATALOGUE.REVIEWS || [];\n  const WA = window.NB_CONFIG && window.NB_CONFIG.whatsapp || '0614453680';\n  if (!reviews.length) return null;\n  const featured = reviews[0];\n  const rest = reviews.slice(1);",
  "  const reviews = (window.NB_CATALOGUE && window.NB_CATALOGUE.REVIEWS || []).filter(function (r) { return r && r.permissionConfirmed === true; });\n  const WA = window.NB_CONFIG && window.NB_CONFIG.whatsapp || '0614453680';\n  // Always show Google review CTA band; quote cards only when permission-confirmed.\n  const featured = reviews[0] || null;\n  const rest = reviews.slice(1);",
  'testimonial-permission-filter'
);

// Soften overline when no confirmed quotes — leave structure; if no featured, skip quote card portion
if (app.includes('Loved by our customers') && !app.includes('Find us on Google')) {
  app = replaceOnce(
    app,
    '}), "Loved by our customers", /*#__PURE__*/React.createElement("span", {',
    '}), featured ? "Customer feedback" : "Reviews on Google", /*#__PURE__*/React.createElement("span", {',
    'testimonial-overline'
  );
}

// Wrap featured quote rendering — if the code uses featured.text without null check, add guard near return
// The section currently assumes featured exists. Insert early alternative when !featured after waReview.
app = replaceOnce(
  app,
  "  const waReview = window.NB_CONFIG ? 'Hello Nosibele Design & Embroidery,\\n\\nI’d like to share a review of my order.' : 'Hello Nosibele, I’d like to leave a review.';\n  return /*#__PURE__*/React.createElement(\"section\", {",
  "  const waReview = window.NB_CONFIG ? 'Hello Nosibele Design & Embroidery,\\n\\nI’d like to share a review of my order.' : 'Hello Nosibele, I’d like to leave a review.';\n  if (!featured) {\n    return /*#__PURE__*/React.createElement(\"section\", {\n      style: { background: 'var(--surface-cream)', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      style: { maxWidth: 'var(--container-xl)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)', textAlign: 'center' }\n    }, /*#__PURE__*/React.createElement(\"h2\", {\n      style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-h2)', color: 'var(--text-strong)', margin: '0 0 12px' }\n    }, \"See what customers say on Google\"), /*#__PURE__*/React.createElement(\"p\", {\n      style: { fontSize: 'var(--fs-body)', color: 'var(--text-body)', maxWidth: 520, margin: '0 auto 20px' }\n    }, \"We publish named testimonials on this site only with customer permission. In the meantime, you can read and leave reviews on our Google Business Profile.\"), /*#__PURE__*/React.createElement(\"a\", {\n      className: 'nb-btn nb-btn--crimson',\n      href: window.NB_CONFIG && window.NB_CONFIG.googleProfileUrl || '#',\n      target: '_blank',\n      rel: 'noopener noreferrer',\n      onClick: function () { try { if (typeof window.nbTrack === 'function') window.nbTrack('google_review_click', { page: 'testimonial' }); } catch (e) {} }\n    }, \"View Google reviews\")));\n  }\n  return /*#__PURE__*/React.createElement(\"section\", {",
  'testimonial-google-fallback'
);

write(APP, app);

/* ---------- nb-app.js CatalogueCard pricing spacing ---------- */
let nb = read(NB);
nb = replaceOnce(
  nb,
  `  const numeric = price && /^[Rr]?\\s?\\d/.test(String(price));
  const waHref = typeof C.waLink === 'function'`,
  `  const numeric = price && /^[Rr]?\\s?\\d/.test(String(price));
  const priceDisplay = numeric
    ? (String(price).replace(/^\\s*[Rr]\\s*/, 'R').replace(/^R(?=\\d)/, 'R'))
    : price;
  const priceLabelText = (priceLabel || 'From') + (numeric ? ' ' : '');
  const waHref = typeof C.waLink === 'function'`,
  'nb-price-format-vars'
);

nb = replaceOnce(
  nb,
  `  }, /*#__PURE__*/React.createElement("small", null, priceLabel), price)), /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__body"
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "nb-cat__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    className: "nb-cat__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "nb-cat__rule",
    "aria-hidden": "true"
  }), numeric ? /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__priceline"
  }, /*#__PURE__*/React.createElement("small", null, priceLabel), /*#__PURE__*/React.createElement("b", null, price)) : /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__priceline is-enquiry"
  }, /*#__PURE__*/React.createElement("b", null, "Price on enquiry")), description && /*#__PURE__*/React.createElement("p", {
    className: "nb-cat__desc"
  }, description),`,
  `  }, /*#__PURE__*/React.createElement("small", null, priceLabelText), priceDisplay)), /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__body"
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "nb-cat__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h3", {
    className: "nb-cat__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "nb-cat__rule",
    "aria-hidden": "true"
  }), numeric ? /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__priceline"
  }, /*#__PURE__*/React.createElement("small", null, priceLabelText), /*#__PURE__*/React.createElement("b", null, priceDisplay)) : /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__priceline is-enquiry"
  }, /*#__PURE__*/React.createElement("b", null, "Price on enquiry")), numeric && /*#__PURE__*/React.createElement("p", {
    className: "nb-cat__price-note"
  }, "Guide price \\u2014 final quotation may vary. VAT status, garment, branding method, quantity and courier confirmed on quote."), description && /*#__PURE__*/React.createElement("p", {
    className: "nb-cat__desc"
  }, description),`,
  'nb-price-display'
);

// CSS for price note inside CatalogueCard ensureStyles if present
if (nb.includes('.nb-cat__priceline') && !nb.includes('.nb-cat__price-note')) {
  nb = nb.replace(
    '.nb-cat__priceline',
    '.nb-cat__price-note{margin:6px 0 0;font-size:11px;line-height:1.35;color:var(--text-muted)}.nb-cat__priceline'
  );
  console.log('added price-note css');
}
write(NB, nb);

/* ---------- styles.css focus + reduced motion ---------- */
let css = read(STYLES);
if (!css.includes('/* NB a11y focus */')) {
  css += `

/* NB a11y focus */
:focus{outline:none}
:focus-visible{
  outline:2px solid var(--gold-600, #C8A14A);
  outline-offset:3px;
}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible{
  outline:2px solid var(--gold-600, #C8A14A);
  outline-offset:3px;
}
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:0.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:0.01ms !important;
    scroll-behavior:auto !important;
  }
}
.nb-cat__price-note{margin:6px 0 0;font-size:11px;line-height:1.35;color:var(--text-muted)}
.nb-cat__priceline small{margin-right:0.25em}
`;
  write(STYLES, css);
} else {
  console.log('skip styles a11y (already)');
}

console.log('remediate-completion.js done');
