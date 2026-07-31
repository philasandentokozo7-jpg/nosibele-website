/* @ds-bundle: {"format":3,"namespace":"NosibeleDesignSystem_4fcb98","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CatalogueCard","sourcePath":"components/core/CatalogueCard.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ProductCard","sourcePath":"components/core/ProductCard.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"WhatsAppButton","sourcePath":"components/core/WhatsAppButton.jsx"}],"sourceHashes":{"components/core/Button.jsx":"bf265f5636c3","components/core/Card.jsx":"3397104ffcf1","components/core/CatalogueCard.jsx":"8ff2e1b26ebf","components/core/Input.jsx":"8bdc9afbfbc1","components/core/ProductCard.jsx":"1ddd1981acf3","components/core/Tag.jsx":"f52077456403","components/core/WhatsAppButton.jsx":"caaa3ad86187"},"inlinedExternals":[],"unexposedExports":[],"note":"Page components intentionally excluded — use app.compiled.js"} */

(() => {

const __ds_ns = (window.NosibeleDesignSystem_4fcb98 = window.NosibeleDesignSystem_4fcb98 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component styles once (real :hover/:active/:focus states) */
const STYLE_ID = 'nb-button-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-btn {
    --_h: var(--control-h-md);
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    height: var(--_h); padding: 0 26px; border: 1px solid transparent;
    border-radius: var(--radius-pill); cursor: pointer; white-space: nowrap;
    font-family: var(--font-body); font-weight: 600; font-size: var(--fs-body);
    letter-spacing: 0.01em; text-decoration: none; user-select: none;
    transition: transform var(--dur-base) var(--ease-out),
                box-shadow var(--dur-base) var(--ease-out),
                background var(--dur-base) var(--ease-out),
                color var(--dur-base) var(--ease-out),
                border-color var(--dur-base) var(--ease-out),
                filter var(--dur-base) var(--ease-out);
  }
  .nb-btn:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .nb-btn:active { transform: scale(0.97); }
  .nb-btn[disabled] { opacity: 0.45; pointer-events: none; }
  .nb-btn--sm { --_h: var(--control-h-sm); padding: 0 18px; font-size: var(--fs-small); }
  .nb-btn--lg { --_h: var(--control-h-lg); padding: 0 34px; font-size: var(--fs-lead); }
  .nb-btn--block { display: flex; width: 100%; }

  /* Primary — crimson fill */
  .nb-btn--primary { background: var(--crimson-500); color: var(--cream-50); box-shadow: var(--shadow-sm); }
  .nb-btn--primary:hover { background: var(--crimson-600); box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .nb-btn--primary:active { background: var(--crimson-700); transform: scale(0.97); }

  /* Gold — metallic accent (charcoal ink) */
  .nb-btn--gold { background: var(--grad-gold); color: var(--charcoal-900); box-shadow: var(--shadow-sm); }
  .nb-btn--gold:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); filter: brightness(1.04); }
  .nb-btn--gold:active { filter: brightness(0.96); transform: scale(0.97); }

  /* Outline — gold hairline on cream */
  .nb-btn--outline { background: transparent; color: var(--text-strong); border-color: var(--gold-500); }
  .nb-btn--outline:hover { background: rgba(200,161,74,0.12); border-color: var(--gold-600); }
  .nb-btn--outline:active { background: rgba(200,161,74,0.20); transform: scale(0.97); }

  /* Ghost — quiet text button */
  .nb-btn--ghost { background: transparent; color: var(--text-strong); }
  .nb-btn--ghost:hover { background: rgba(28,23,20,0.06); }

  /* On-dark — cream outline that fills gold */
  .nb-btn--ondark { background: transparent; color: var(--cream-50); border-color: var(--border-on-dark); }
  .nb-btn--ondark:hover { background: var(--gold-500); color: var(--charcoal-900); border-color: var(--gold-500); }
  .nb-btn--ondark:active { transform: scale(0.97); }
  `;
  document.head.appendChild(el);
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  className = '',
  ...rest
}) {
  ensureStyles();
  const Tag = as;
  const cls = ['nb-btn', `nb-btn--${variant}`, size !== 'md' ? `nb-btn--${size}` : '', block ? 'nb-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft, children != null && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'nb-card-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-card {
    border-radius: var(--radius-card); box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-hairline); overflow: hidden;
    transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
  }
  .nb-card--default  { background: var(--surface-card); color: var(--text-body); }
  .nb-card--cream    { background: var(--surface-cream); color: var(--text-body); border-color: var(--border-soft); }
  .nb-card--crimson  { background: var(--grad-crimson); color: var(--cream-50); border-color: transparent; box-shadow: var(--shadow-crimson); }
  .nb-card--ink      { background: var(--grad-ink); color: var(--cream-50); border-color: var(--border-on-dark); }
  .nb-card--gold     { background: var(--surface-card); border-color: var(--gold-500); box-shadow: var(--shadow-md); }
  .nb-card--interactive { cursor: pointer; }
  .nb-card--interactive:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .nb-card--interactive.nb-card--crimson:hover { box-shadow: 0 28px 64px rgba(108,8,16,0.42); }
  `;
  document.head.appendChild(el);
}
const PAD = {
  none: '0',
  sm: 'var(--space-4)',
  md: 'var(--space-5)',
  lg: 'var(--space-7)'
};
function Card({
  children,
  variant = 'default',
  interactive = false,
  padding = 'md',
  as = 'div',
  className = '',
  style,
  ...rest
}) {
  ensureStyles();
  const Tag = as;
  const cls = ['nb-card', `nb-card--${variant}`, interactive ? 'nb-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: {
      padding: PAD[padding] ?? PAD.md,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'nb-input-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-field { display: flex; flex-direction: column; gap: 7px; font-family: var(--font-body); }
  .nb-field__label { font-size: var(--fs-small); font-weight: 600; color: var(--text-strong); }
  .nb-field__req { color: var(--crimson-500); margin-left: 2px; }
  .nb-field__hint { font-size: var(--fs-caption); color: var(--text-muted); }
  .nb-field__control {
    width: 100%; box-sizing: border-box; font-family: var(--font-body); font-size: var(--fs-body);
    color: var(--text-strong); background: var(--surface-card);
    border: 1px solid var(--border-soft); border-radius: var(--radius-md);
    padding: 0 16px; height: var(--control-h-md);
    transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
  }
  textarea.nb-field__control { height: auto; min-height: 116px; padding: 13px 16px; line-height: var(--lh-normal); resize: vertical; }
  .nb-field__control::placeholder { color: var(--warm-400); }
  .nb-field__control:hover { border-color: var(--warm-400); }
  .nb-field__control:focus { outline: none; border-color: var(--gold-500); box-shadow: 0 0 0 3px rgba(200,161,74,0.18); }
  .nb-field--invalid .nb-field__control { border-color: var(--crimson-500); }
  .nb-field--invalid .nb-field__control:focus { box-shadow: 0 0 0 3px rgba(200,18,26,0.15); }
  .nb-field__control:disabled { background: var(--cream-200); opacity: 0.7; cursor: not-allowed; }
  `;
  document.head.appendChild(el);
}
function Input({
  label,
  hint,
  error,
  required = false,
  multiline = false,
  id,
  className = '',
  ...rest
}) {
  ensureStyles();
  const fid = id || (label ? `nb-${String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined);
  const Control = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("label", {
    className: ['nb-field', error ? 'nb-field--invalid' : '', className].filter(Boolean).join(' '),
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "nb-field__label"
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "nb-field__req"
  }, "*")), /*#__PURE__*/React.createElement(Control, _extends({
    id: fid,
    className: "nb-field__control",
    "aria-invalid": !!error || undefined
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "nb-field__hint",
    style: {
      color: 'var(--crimson-600)'
    }
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "nb-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'nb-tag-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: var(--radius-pill);
    font-family: var(--font-body); font-weight: 600; font-size: var(--fs-caption);
    letter-spacing: 0.02em; line-height: 1; border: 1px solid transparent; white-space: nowrap;
  }
  .nb-tag--sm { padding: 3px 9px; font-size: 0.7rem; }
  .nb-tag__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.85; }
  /* gold hairline — the default "premium label" */
  .nb-tag--gold { background: rgba(200,161,74,0.12); color: var(--gold-700); border-color: rgba(200,161,74,0.45); }
  /* solid crimson */
  .nb-tag--solid { background: var(--crimson-500); color: var(--cream-50); }
  /* soft cream chip */
  .nb-tag--soft { background: var(--cream-200); color: var(--brown-600); }
  /* outline neutral */
  .nb-tag--outline { background: transparent; color: var(--text-body); border-color: var(--border-soft); }
  /* on dark surfaces */
  .nb-tag--ondark { background: rgba(241,221,166,0.14); color: var(--gold-pale); border-color: var(--border-on-dark); }
  `;
  document.head.appendChild(el);
}
function Tag({
  children,
  variant = 'gold',
  size = 'md',
  dot = false,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['nb-tag', `nb-tag--${variant}`, size === 'sm' ? 'nb-tag--sm' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "nb-tag__dot"
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/CatalogueCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WA_GLYPH = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.737-.981a9.9 9.9 0 0 0 .241-.726z"
}));
const STYLE_ID = 'nb-catalogue-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-cat {
    display: flex; flex-direction: column; background: var(--surface-card);
    border-radius: var(--radius-lg); border: 1px solid var(--border-hairline);
    box-shadow: var(--shadow-sm); overflow: hidden; position: relative;
    transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
  }
  .nb-cat:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: rgba(200,161,74,0.45); }
  .nb-cat__media { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: var(--cream-200); }
  .nb-cat__media img { width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 900ms var(--ease-out); }
  .nb-cat:hover .nb-cat__media img { transform: scale(1.06); }
  .nb-cat__badge { position: absolute; top: 14px; left: 14px; }
  .nb-cat__price-chip {
    position: absolute; top: 14px; right: 14px; background: rgba(253,250,243,0.92);
    backdrop-filter: blur(4px); border: 1px solid rgba(200,161,74,0.5); border-radius: var(--radius-pill);
    padding: 6px 14px; font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; color: var(--burgundy-500);
  }
  .nb-cat__price-chip small { font-family: var(--font-body); font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--gold-700); margin-right: 5px; }
  .nb-cat__price-note{margin:6px 0 0;font-size:11px;line-height:1.35;color:var(--text-muted)}.nb-cat__priceline { display: flex; align-items: baseline; gap: 7px; margin: 2px 0 0; }
  .nb-cat__priceline b { font-family: var(--font-display); font-weight: 700; font-size: 1.7rem; color: var(--crimson-500); line-height: 1; }
  .nb-cat__priceline small { font-family: var(--font-body); font-size: 0.66rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-700); }
  .nb-cat__priceline.is-enquiry b { font-size: 1.05rem; color: var(--burgundy-500); }
  .nb-cat__body { padding: var(--space-6) var(--space-5) var(--space-5); display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .nb-cat__eyebrow { font-size: var(--fs-overline); font-weight: 700; text-transform: uppercase;
    letter-spacing: var(--ls-overline); color: var(--gold-600); }
  .nb-cat__title { font-family: var(--font-display); font-weight: 600; font-size: var(--fs-h3);
    line-height: var(--lh-snug); color: var(--text-strong); margin: 0; }
  .nb-cat__rule { width: 26px; height: 2px; background: var(--gold-500); border-radius: 2px; margin: 2px 0;
    transition: width var(--dur-base) var(--ease-out); }
  .nb-cat:hover .nb-cat__rule { width: 52px; }
  .nb-cat__desc { font-size: var(--fs-small); line-height: var(--lh-normal); color: var(--text-muted); margin: 0;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .nb-cat__actions { display: flex; flex-direction: column; align-items: stretch; gap: 12px; margin-top: auto; padding-top: 18px; }
  .nb-cat__btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
    height: 48px; border-radius: var(--radius-pill); font-family: var(--font-body); font-weight: 600;
    font-size: var(--fs-small); letter-spacing: 0.01em; border: 1px solid transparent; width: 100%; text-decoration: none;
    background: var(--crimson-500); color: var(--cream-50); box-shadow: var(--shadow-xs);
    transition: transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
  }
  .nb-cat__btn:hover { background: var(--crimson-600); box-shadow: var(--shadow-sm); transform: translateY(-1px); }
  .nb-cat__btn:active { transform: scale(0.98); }
  .nb-cat__wa {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 24px;
    font-family: var(--font-body); font-weight: 600; font-size: var(--fs-caption); color: var(--gold-700);
    text-decoration: none; letter-spacing: 0.02em; transition: color var(--dur-base) var(--ease-out);
  }
  .nb-cat__wa svg { width: 15px; height: 15px; }
  .nb-cat__wa:hover { color: var(--burgundy-500); }
  `;
  document.head.appendChild(el);
}
function CatalogueCard({
  image,
  imageAlt = '',
  eyebrow,
  title,
  description,
  price,
  priceLabel = 'From',
  badge,
  badgeVariant = 'gold',
  kind = 'product',
  whatsappPhone = '',
  whatsappMessage,
  onRequest,
  className = '',
  ...rest
}) {
  ensureStyles();
  const requestLabel = kind === 'service' ? 'Request this service' : 'Request a quote';
  const C = window.NB_CONFIG || {};
  const waMsg = whatsappMessage || (C.waMessage ? C.waMessage(title) : `Hello Nosibele Design & Embroidery, I would like a quotation for the ${title}.`);
  const numeric = price && /^[Rr]?\s?\d/.test(String(price));
  const priceDisplay = numeric
    ? (String(price).replace(/^\s*[Rr]\s*/, 'R').replace(/^R(?=\d)/, 'R'))
    : price;
  const priceLabelText = (priceLabel || 'From') + (numeric ? ' ' : '');
  const waHref = typeof C.waLink === 'function'
    ? C.waLink(waMsg)
    : (() => {
        let d = String(whatsappPhone || C.whatsapp || C.whatsappDigits || '0614453680').replace(/[^0-9]/g, '');
        if (d.charAt(0) === '0') d = '27' + d.slice(1);
        if (!d) d = '27614453680';
        return 'https://wa.me/' + d + '?text=' + encodeURIComponent(waMsg);
      })();
  return /*#__PURE__*/React.createElement("article", _extends({
    className: ['nb-cat', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__media"
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt || title,
    loading: "lazy"
  }), badge && /*#__PURE__*/React.createElement("span", {
    className: "nb-cat__badge"
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: badgeVariant,
    size: "sm"
  }, badge)), numeric && /*#__PURE__*/React.createElement("span", {
    className: "nb-cat__price-chip"
  }, /*#__PURE__*/React.createElement("small", null, priceLabelText), priceDisplay)), /*#__PURE__*/React.createElement("div", {
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
  }, "Guide price in ZAR \u2014 final quotation may vary. VAT charged only where legally applicable and shown on the quotation. Garment, branding, quantity and courier confirmed on quote."), description && /*#__PURE__*/React.createElement("p", {
    className: "nb-cat__desc"
  }, description), /*#__PURE__*/React.createElement("div", {
    className: "nb-cat__actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nb-cat__btn",
    onClick: () => onRequest && onRequest({
      title,
      kind
    })
  }, requestLabel), /*#__PURE__*/React.createElement("a", {
    className: "nb-cat__wa",
    href: waHref,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Chat with Nosibele Design & Embroidery on WhatsApp"
  }, WA_GLYPH, "WhatsApp enquiry"))));
}
Object.assign(__ds_scope, { CatalogueCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CatalogueCard.jsx", error: String((e && e.message) || e) }); }

// components/core/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'nb-product-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-product {
    display: flex; flex-direction: column; background: var(--surface-card);
    border-radius: var(--radius-card); border: 1px solid var(--border-hairline);
    box-shadow: var(--shadow-sm); overflow: hidden; cursor: pointer; text-decoration: none;
    transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
  }
  .nb-product:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
  .nb-product__media { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: var(--cream-200); }
  .nb-product__media img { width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform var(--dur-slow) var(--ease-out); }
  .nb-product:hover .nb-product__media img { transform: scale(1.05); }
  .nb-product__badge { position: absolute; top: 12px; left: 12px; }
  .nb-product__body { padding: var(--space-5); display: flex; flex-direction: column; gap: 6px; }
  .nb-product__eyebrow { font-size: var(--fs-overline); font-weight: 700; text-transform: uppercase;
    letter-spacing: var(--ls-overline); color: var(--gold-600); }
  .nb-product__title { font-family: var(--font-display); font-weight: 600; font-size: var(--fs-h3);
    line-height: var(--lh-snug); color: var(--text-strong); margin: 0; }
  .nb-product__row { display: flex; align-items: baseline; justify-content: space-between; margin-top: 4px; gap: 12px; }
  .nb-product__price { font-family: var(--font-display); font-weight: 600; font-size: 1.35rem; color: var(--text-strong); }
  .nb-product__price small { font-family: var(--font-body); font-size: 0.72rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-right: 5px; }
  .nb-product__cta { font-family: var(--font-body); font-size: var(--fs-small); font-weight: 600; color: var(--crimson-500);
    display: inline-flex; align-items: center; gap: 5px; }
  .nb-product:hover .nb-product__cta { gap: 9px; }
  `;
  document.head.appendChild(el);
}
function ProductCard({
  image,
  imageAlt = '',
  category,
  title,
  price,
  badge,
  badgeVariant = 'gold',
  cta = 'Request a quote',
  href = '#',
  className = '',
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ['nb-product', className].filter(Boolean).join(' '),
    href: href
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "nb-product__media"
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    loading: "lazy"
  }), badge && /*#__PURE__*/React.createElement("span", {
    className: "nb-product__badge"
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: badgeVariant,
    size: "sm"
  }, badge))), /*#__PURE__*/React.createElement("div", {
    className: "nb-product__body"
  }, category && /*#__PURE__*/React.createElement("span", {
    className: "nb-product__eyebrow"
  }, category), /*#__PURE__*/React.createElement("h3", {
    className: "nb-product__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "nb-product__row"
  }, price != null && /*#__PURE__*/React.createElement("span", {
    className: "nb-product__price"
  }, /*#__PURE__*/React.createElement("small", null, "From"), price), /*#__PURE__*/React.createElement("span", {
    className: "nb-product__cta"
  }, cta, " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'nb-wa-styles';
function ensureStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
  .nb-wa {
    display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
    height: var(--control-h-md); padding: 0 22px; border-radius: var(--radius-pill);
    font-family: var(--font-body); font-weight: 600; font-size: var(--fs-body); cursor: pointer;
    border: 1px solid transparent; white-space: nowrap;
    transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), filter var(--dur-base) var(--ease-out);
  }
  .nb-wa:active { transform: scale(0.97); }
  .nb-wa svg { width: 20px; height: 20px; flex: none; }
  .nb-wa--green { background: #25D366; color: #0B3D2E; box-shadow: var(--shadow-sm); }
  .nb-wa--green:hover { filter: brightness(1.05); box-shadow: var(--shadow-md); transform: translateY(-1px); }
  .nb-wa--dark  { background: var(--charcoal-900); color: var(--cream-50); }
  .nb-wa--dark:hover { background: var(--charcoal-800); transform: translateY(-1px); }
  .nb-wa--dark svg { color: #25D366; }
  .nb-wa--outline { background: transparent; color: var(--text-strong); border-color: var(--border-soft); }
  .nb-wa--outline:hover { border-color: #25D366; }
  .nb-wa--outline svg { color: #25D366; }
  .nb-wa--floating {
    position: fixed; right: clamp(16px,4vw,32px); bottom: clamp(16px,4vw,32px); z-index: 90;
    height: 56px; padding: 0 24px; box-shadow: var(--shadow-lg);
  }
  @media (max-width: 520px){
    .nb-wa--floating { width: 56px; padding: 0; justify-content: center; }
    .nb-wa--floating span { display: none; }
  }
  `;
  document.head.appendChild(el);
}
const Glyph = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.737-.981a9.9 9.9 0 0 0 .241-.726zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
}));
function WhatsAppButton({
  phone = '',
  message = '',
  children = 'Chat on WhatsApp',
  variant = 'green',
  floating = false,
  className = '',
  href,
  ...rest
}) {
  ensureStyles();
  const C = window.NB_CONFIG || {};
  const fallbackMsg = C.waMessages && C.waMessages.general || 'Hello Nosibele Design & Embroidery, I would like to enquire about your services.';
  const text = message || fallbackMsg;
  // Prefer central config so an empty phone prop can never become a share URL (wa.me/?text=).
  let link = href;
  if (!link) {
    if (typeof C.waLink === 'function') {
      link = C.waLink(text);
    } else {
      let digits = String(phone || C.whatsapp || C.whatsappDigits || '0614453680').replace(/[^0-9]/g, '');
      if (digits.charAt(0) === '0') digits = '27' + digits.slice(1);
      if (!digits) digits = '27614453680';
      link = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(text);
    }
  }
  const cls = ['nb-wa', `nb-wa--${variant}`, floating ? 'nb-wa--floating' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: link,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Chat with Nosibele Design & Embroidery on WhatsApp",
    title: "Chat with Nosibele Design & Embroidery on WhatsApp"
  }, rest), /*#__PURE__*/React.createElement(Glyph, null), children && /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CatalogueCard = __ds_scope.CatalogueCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

})();
