'use strict';
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'prod-build', 'app.compiled.js');
let src = fs.readFileSync(file, 'utf8');
const orig = src;

src = src.replace(/\['Home', 'index\.html', 'home'\]/g, "['Home', '/', 'home']");
src = src.replace(/href: "index\.html"/g, 'href: "/"');
src = src.replace(/'Home': 'index\.html'/g, "'Home': '/'");

const navStart = src.indexOf('/* ===== Nav.jsx ===== */');
const navEndMarker = 'Object.assign(window, {\n  Nav\n});';
const navEnd = src.indexOf(navEndMarker, navStart);
if (navStart < 0 || navEnd < 0) throw new Error('Nav block not found');

const newNav = `/* ===== Nav.jsx ===== */
/* Nosibele website — sticky, page-aware navigation with accessible mobile menu */
function Nav({
  current = 'home',
  onQuote,
  whatsapp = '0614453680'
}) {
  const {
    Button,
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const burgerRef = React.useRef(null);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (!open) {
      document.body.classList.remove('nb-nav-lock');
      return;
    }
    document.body.classList.add('nb-nav-lock');
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (burgerRef.current) burgerRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const first = menuRef.current && menuRef.current.querySelector('a, button');
    if (first) first.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('nb-nav-lock');
    };
  }, [open]);
  const links = [['Home', '/', 'home'], ['Products', 'products.html', 'products'], ['Services', 'services.html', 'services'], ['Gallery', 'gallery.html', 'gallery'], ['About', 'about.html', 'about'], ['Contact', 'contact.html', 'contact']];
  const solid = scrolled || open;
  const closeMenu = () => {
    setOpen(false);
    if (burgerRef.current) burgerRef.current.focus();
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "nb-site-header",
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 60,
      background: solid ? 'rgba(253,250,243,0.92)' : 'transparent',
      backdropFilter: solid ? 'var(--blur-nav)' : 'none',
      WebkitBackdropFilter: solid ? 'var(--blur-nav)' : 'none',
      borderBottom: solid ? '1px solid var(--border-hairline)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-navbar",
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '12px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    className: "nb-brand",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-red-tile.jpeg",
    alt: "Nosibele Design & Embroidery",
    width: "42",
    height: "42",
    style: {
      borderRadius: 10,
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "nb-brand-name",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 24,
      color: 'var(--text-strong)',
      letterSpacing: '0.01em'
    }
  }, "Nosibele")), /*#__PURE__*/React.createElement("nav", {
    className: "nb-navlinks",
    "aria-label": "Primary"
  }, links.map(([l, href, id]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: href,
    className: 'nb-navlink' + (current === id ? ' nb-navlink--on' : ''),
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 600,
      textDecoration: 'none',
      position: 'relative',
      paddingBottom: 2,
      color: current === id ? 'var(--text-strong)' : 'var(--text-body)'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "nb-navcta"
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: whatsapp,
    variant: "outline",
    message: window.NB_CONFIG ? window.NB_CONFIG.waMessage() : "Hello Nosibele Design & Embroidery, I would like a quotation."
  }, "WhatsApp"), onQuote ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onQuote
  }, "Request a quote") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    as: "a",
    href: "contact.html"
  }, "Request a quote")), /*#__PURE__*/React.createElement("button", {
    ref: burgerRef,
    type: "button",
    "aria-label": open ? "Close menu" : "Open menu",
    "aria-expanded": open ? "true" : "false",
    "aria-controls": "nb-mobile-nav",
    onClick: () => setOpen(o => !o),
    className: "nb-burger",
    style: {
      flexDirection: 'column',
      gap: 5,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 10,
      minWidth: 44,
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: 'var(--text-strong)',
      borderRadius: 2,
      transition: 'transform var(--dur-base)',
      transform: open ? 'translateY(7px) rotate(45deg)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: 'var(--text-strong)',
      borderRadius: 2,
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: 'var(--text-strong)',
      borderRadius: 2,
      transition: 'transform var(--dur-base)',
      transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none'
    }
  }))), open && /*#__PURE__*/React.createElement("div", {
    id: "nb-mobile-nav",
    ref: menuRef,
    className: "nb-mobilemenu",
    role: "navigation",
    "aria-label": "Mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-mobilemenu__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nb-mobilemenu__label"
  }, "Menu"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nb-mobilemenu__close",
    "aria-label": "Close menu",
    onClick: closeMenu
  }, "Close")), links.map(([l, href, id]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: href,
    className: current === id ? 'is-on' : undefined,
    onClick: () => setOpen(false)
  }, l)), /*#__PURE__*/React.createElement("div", {
    className: "nb-mobilemenu__cta"
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: whatsapp,
    message: window.NB_CONFIG ? window.NB_CONFIG.waMessage() : "Hello Nosibele Design & Embroidery, I would like a quotation.",
    style: {
      flex: 1,
      justifyContent: 'center'
    }
  }, "WhatsApp"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    as: "a",
    href: "contact.html",
    style: {
      flex: 1
    }
  }, "Request a quote"))), /*#__PURE__*/React.createElement("style", null, \`
        .nb-navlinks { display: flex; gap: 26px; align-items: center; }
        .nb-navcta { display: flex; align-items: center; gap: 12px; }
        .nb-burger { display: none; align-items: center; justify-content: center; }
        .nb-navlink::after { content:''; position:absolute; left:0; bottom:-2px; height:1.5px; width:0;
          background: var(--gold-500); transition: width var(--dur-base) var(--ease-out); }
        .nb-navlink:hover::after, .nb-navlink--on::after { width:100%; }
        .nb-navlink:focus-visible, .nb-burger:focus-visible, .nb-brand:focus-visible {
          outline: 3px solid var(--gold-500); outline-offset: 3px; border-radius: 6px;
        }
        body.nb-nav-lock { overflow: hidden; touch-action: none; }
        .nb-mobilemenu {
          padding: 8px var(--gutter) 22px; display: flex; flex-direction: column; gap: 2px;
          max-height: min(78vh, 640px); overflow: auto; -webkit-overflow-scrolling: touch;
          border-top: 1px solid var(--border-hairline);
          background: rgba(253,250,243,0.97);
        }
        .nb-mobilemenu__bar { display:flex; align-items:center; justify-content:space-between; margin-bottom: 6px; }
        .nb-mobilemenu__label { font-size: var(--fs-overline); font-weight:700; letter-spacing: var(--ls-overline); text-transform:uppercase; color: var(--gold-600); }
        .nb-mobilemenu__close {
          min-height:44px; min-width:44px; border:1px solid var(--border-soft); border-radius:12px;
          background: var(--surface-card); color: var(--text-strong); font-weight:700; cursor:pointer; padding:0 14px;
        }
        .nb-mobilemenu a {
          font-family: var(--font-display); font-size: clamp(1.35rem, 5vw, 1.7rem); font-weight:600;
          text-decoration:none; color: var(--text-strong); padding: 14px 4px; border-bottom: 1px solid var(--border-hairline);
        }
        .nb-mobilemenu a.is-on { color: var(--crimson-500); }
        .nb-mobilemenu__cta { display:flex; gap:10px; margin-top:16px; flex-wrap:wrap; }
        @media (max-width: 1240px){ .nb-navlinks{ display:none; } .nb-navcta{ display:none; } .nb-burger{ display:flex; } }
        @media (prefers-reduced-motion: reduce) {
          .nb-burger span, .nb-navlink::after { transition: none !important; }
        }
      \`));
}
`;
src = src.slice(0, navStart) + newNav + src.slice(navEnd);

// Footer copyright + legal links
const oldFootLegal = `/*#__PURE__*/React.createElement("span", null, "\\xA9 2026 ", C.legalName || 'Nosibele (Pty) Ltd', " \\xB7 ", C.phone || '061 445 3680', " \\xB7 Durban, South Africa"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: (C.url || '') + '',
    className: "nb-foot-link",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, C.domain || 'nosibeleembroidery.co.za'), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nb-foot-link",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Privacy")))`;

const newFootLegal = `/*#__PURE__*/React.createElement("span", null, "\\xA9 ", new Date().getFullYear(), " Nosibele Design & Embroidery. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    className: "nb-foot-legal",
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
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
    },
    onClick: e => {
      e.preventDefault();
      if (window.nbOpenCookieSettings) window.nbOpenCookieSettings();
    }
  }, "Cookie Settings")))`;

if (!src.includes(oldFootLegal)) throw new Error('footer legal block not found');
src = src.replace(oldFootLegal, newFootLegal);

const oldCredit = `"Website designed & developed by", ' ', /*#__PURE__*/React.createElement("a", {
    href: C.credit.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nb-foot-link",
    style: {
      color: 'var(--gold-pale)',
      textDecoration: 'none',
      fontWeight: 600
    }
  }, C.credit.name), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7
    }
  }, " \\xB7 ", C.credit.tagline))`;

const newCredit = `"Designed & Built by ", /*#__PURE__*/React.createElement("a", {
    href: C.credit.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nb-foot-link",
    style: {
      color: 'var(--gold-pale)',
      textDecoration: 'none',
      fontWeight: 600
    }
  }, C.credit.name))`;

if (!src.includes(oldCredit)) throw new Error('credit block not found');
src = src.replace(oldCredit, newCredit);

// Quote submit hardening
const oldSubmit = `    const fd = new FormData(e.target);
    const leadObj = {
      name: fd.get('name') || '—',
      item: item || '—',
      qty: fd.get('qty') || '—',
      status: 'New'
    };
    const endpoint = window.NB_CONFIG && window.NB_CONFIG.formEndpoint;
    if (!endpoint) {
      setLead(leadObj);
      setSent(true);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const data = new FormData();
      data.append('Name', fd.get('name') || '');
      data.append('WhatsApp', fd.get('phone') || '');
      data.append('Product / service', item || '');
      data.append('Quantity', fd.get('qty') || '');
      data.append('Delivery or collection', fulfilment || '');
      data.append('Notes', fd.get('notes') || '');
      data.append('Lead source', fd.get('source') || '');
      if (fileName) data.append('Artwork (to be sent separately)', fileName);
      data.append('_subject', 'New quote request — ' + (item || 'custom apparel'));
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json'
        }
      });
      if (!res.ok) throw new Error('bad response');
      setLead(leadObj);
      setSent(true);
    } catch (err) {
      setError('We couldn’t send your request just now. Please WhatsApp us and we’ll sort it out straight away.');
    } finally {
      setSubmitting(false);
    }`;

const newSubmit = `    const fd = new FormData(e.target);
    if ((fd.get('_gotcha') || '').toString().trim()) {
      setLead({ name: fd.get('name') || '—', item: item || '—', qty: fd.get('qty') || '—', status: 'New' });
      setSent(true);
      return;
    }
    if (!fd.get('privacy_ack')) {
      setError('Please confirm you have read the Privacy Notice before sending.');
      return;
    }
    const leadObj = {
      name: fd.get('name') || '—',
      item: item || '—',
      qty: fd.get('qty') || '—',
      status: 'New'
    };
    const endpoint = window.NB_CONFIG && window.NB_CONFIG.formEndpoint;
    if (!endpoint) {
      setLead(leadObj);
      setSent(true);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const data = new FormData();
      data.append('Name', fd.get('name') || '');
      data.append('WhatsApp', fd.get('phone') || '');
      data.append('Product / service', item || '');
      data.append('Quantity', fd.get('qty') || '');
      data.append('Delivery or collection', fulfilment || '');
      data.append('Notes', fd.get('notes') || '');
      data.append('Lead source', fd.get('source') || '');
      data.append('Privacy acknowledgement', 'Yes');
      data.append('Marketing opt-in', fd.get('marketing_opt_in') ? 'Yes' : 'No');
      data.append('_gotcha', fd.get('_gotcha') || '');
      if (fileName) data.append('Artwork (to be sent separately)', fileName);
      data.append('_subject', 'New quote request — ' + (item || 'custom apparel'));
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json'
        }
      });
      if (!res.ok) throw new Error('bad response');
      setLead(leadObj);
      setSent(true);
    } catch (err) {
      setError('We couldn’t send your request just now. Please WhatsApp us and we’ll sort it out straight away.');
    } finally {
      setSubmitting(false);
    }`;

if (!src.includes(oldSubmit)) throw new Error('submit block not found');
src = src.replace(oldSubmit, newSubmit);

if (!src.includes('privacy_ack')) {
  const errAnchor = `), error && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--crimson-600)',
      fontSize: 'var(--fs-small)',
      textAlign: 'center',
      margin: '16px 0 0'
    }
  }, error), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    block: true,
    type: "submit",
    disabled: submitting,`;

  const privacyInsert = `), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "_gotcha",
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": "true",
    className: "nbq-hp",
    style: {
      position: 'absolute',
      left: '-10000px',
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  }), /*#__PURE__*/React.createElement("label", {
    className: "nbq-check",
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginTop: 16,
      fontSize: 'var(--fs-small)',
      color: 'var(--text-body)',
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "privacy_ack",
    required: true,
    style: {
      marginTop: 3,
      width: 18,
      height: 18,
      flex: 'none',
      accentColor: 'var(--crimson-500)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "I have read the ", /*#__PURE__*/React.createElement("a", {
    href: "/privacy.html",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: 'var(--crimson-600)',
      fontWeight: 700
    }
  }, "Privacy Notice"), " and understand how my information will be used to respond to this enquiry.")), /*#__PURE__*/React.createElement("label", {
    className: "nbq-check",
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      marginTop: 10,
      fontSize: 'var(--fs-small)',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "marketing_opt_in",
    defaultChecked: false,
    style: {
      marginTop: 3,
      width: 18,
      height: 18,
      flex: 'none',
      accentColor: 'var(--crimson-500)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Optional: I am happy for Nosibele to contact me with occasional updates about products or offers. This is separate from my enquiry.")), error && /*#__PURE__*/React.createElement("p", {
    role: "alert",
    style: {
      color: 'var(--crimson-600)',
      fontSize: 'var(--fs-small)',
      textAlign: 'center',
      margin: '16px 0 0'
    }
  }, error), /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    block: true,
    type: "submit",
    disabled: submitting,`;

  if (!src.includes(errAnchor)) throw new Error('error anchor not found');
  src = src.replace(errAnchor, privacyInsert);
}

src = src.replace(
  'We\\u2019ll only use your details to reply about your order.',
  'Your enquiry details are used to reply about this quote. Optional marketing is only recorded if you tick the separate box. Form submissions are processed via Formspree.'
);

src = src.replace(
  `}, /*#__PURE__*/React.createElement("img", {
    src: "assets/hero-uniform.webp",
    alt: "The Nosibele branded sublimation jersey with embroidered gold crest",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 30%',
      display: 'block'
    }
  }))`,
  `}, /*#__PURE__*/React.createElement("img", {
    src: "assets/hero-uniform.webp",
    alt: "The Nosibele branded sublimation jersey with embroidered gold crest",
    width: "900",
    height: "1125",
    fetchPriority: "high",
    decoding: "async",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 30%',
      display: 'block'
    }
  }))`
);

// Add main landmark wrapper helpers on page shells: id="main" on page root divs
src = src.replace(
  /return \/\*#__PURE__\*\/React\.createElement\("div", \{\n    style: \{\n      background: 'var\(--bg-page\)',\n      minHeight: '100vh'\n    \}\n  \}, \/\*#__PURE__\*\/React\.createElement\(Nav,/g,
  `return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-page)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "nb-skip-react",
    href: "#main",
    style: {
      position: 'absolute',
      left: -9999,
      top: 0
    }
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav,`
);

// Add id=main after Nav on App - more reliably tag first section id top as main via CSS; inject id on a wrapping main
// Convert first content after Nav into main by wrapping - simpler: set id main on hero section already id=top
src = src.replace(
  `return /*#__PURE__*/React.createElement("section", {
    id: "top",`,
  `return /*#__PURE__*/React.createElement("section", {
    id: "main",
    "data-hero": "true",`
);

// PageHero titles pages — add id main on PageHero section if present
if (src.includes('function PageHero(')) {
  src = src.replace(
    `function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = 'cream',
  crest = true
}) {
  const dark = tone === 'crimson';
  return /*#__PURE__*/React.createElement("section", {`,
    `function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = 'cream',
  crest = true
}) {
  const dark = tone === 'crimson';
  return /*#__PURE__*/React.createElement("section", {
    id: "main",`
  );
}

fs.writeFileSync(file, src);
console.log(JSON.stringify({
  changed: src !== orig,
  bytes: src.length,
  privacy_ack: src.includes('privacy_ack'),
  cookieSettings: src.includes('nbOpenCookieSettings'),
  homeRoot: src.includes("['Home', '/', 'home']"),
  designedBuilt: src.includes('Designed & Built by'),
  heroMain: src.includes('id: "main"'),
}, null, 2));
