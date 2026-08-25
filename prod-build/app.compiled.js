
/* ===== PageHero.jsx ===== */
/* Reusable slim page header — crimson or cream */
function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = 'cream',
  crest = true
}) {
  const dark = tone === 'crimson' || tone === 'ink';
  const bg = tone === 'crimson' ? 'var(--grad-crimson)' : tone === 'ink' ? 'var(--grad-ink)' : 'var(--surface-cream)';
  const goldEye = dark ? 'var(--gold-pale)' : 'var(--gold-600)';
  return /*#__PURE__*/React.createElement("section", {
    id: "main",
    style: {
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      borderBottom: dark ? 'none' : '1px solid var(--border-hairline)'
    }
  }, crest && /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-gold-transparent.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '-4%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 360,
      opacity: dark ? 0.08 : 0.06,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'clamp(56px,9vw,104px) var(--gutter) clamp(40px,6vw,72px)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: goldEye,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: goldEye
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      margin: '16px 0 0',
      color: dark ? 'var(--cream-50)' : 'var(--text-strong)',
      maxWidth: 880
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      margin: '18px 0 0',
      maxWidth: 600,
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-body)'
    }
  }, subtitle)));
}
Object.assign(window, {
  PageHero
});

/* ===== FAQList.jsx ===== */
/* FAQ accordion */
function FAQList({
  items,
  heading = 'Frequently asked'
}) {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, heading && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h2)',
      color: 'var(--text-strong)',
      margin: '0 0 var(--space-5)'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map((it, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: isOpen ? 'var(--shadow-sm)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '18px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-body)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, it.q, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flex: 'none',
        width: 26,
        height: 26,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--gold-700)',
        border: '1px solid var(--border-gold)',
        transform: isOpen ? 'rotate(45deg)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out)',
        fontSize: 18
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 320 : 0,
        overflow: 'hidden',
        transition: 'max-height var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        padding: '0 20px 20px',
        color: 'var(--text-body)',
        lineHeight: 'var(--lh-normal)',
        fontSize: 'var(--fs-small)'
      }
    }, it.a)));
  })));
}
Object.assign(window, {
  FAQList
});

/* ===== Nav.jsx ===== */
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
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services."
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
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services.",
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
  }, "Request a quote"))), /*#__PURE__*/React.createElement("style", null, `
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
      `));
}
Object.assign(window, {
  Nav
});

/* ===== Hero.jsx ===== */
/* Nosibele website — hero */
function Hero({
  onQuote,
  whatsapp = '0614453680'
}) {
  const {
    Button,
    WhatsAppButton,
    Tag
  } = window.NosibeleDesignSystem_4fcb98;
  return /*#__PURE__*/React.createElement("section", {
    id: "main",
    "data-hero": "true",
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'clamp(24px,5vw,56px) var(--gutter) var(--section-y)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
      gap: 'clamp(28px,5vw,72px)',
      alignItems: 'center'
    },
    className: "nb-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-hero-text"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-600)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-500)'
    }
  }), "Custom Embroidery \xB7 South Africa"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-display-1)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      margin: '18px 0 0'
    },
    className: "nb-hero-h1"
  }, "Your brand,", /*#__PURE__*/React.createElement("br", null), "beautifully ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--crimson-500)'
    }
  }, "threaded.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '22px 0 0',
      maxWidth: 480
    }
  }, "Bespoke embroidery and custom apparel, hand-finished in our studio. From a single monogrammed gift to a full team\u2019s uniforms \u2014 stitched with the same care."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      marginTop: 30
    },
    className: "nb-hero-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onQuote
  }, "Request a quote"), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: whatsapp,
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services.",
    style: {
      height: 'var(--control-h-lg)'
    }
  }, "Chat on WhatsApp")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      marginTop: 38,
      flexWrap: 'wrap'
    },
    className: "nb-hero-stats"
  }, [['Est. 2024', 'Durban studio'], ['Made to order', 'Quote-based production'], ['Typical lead time', 'Confirmed on quotation']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 28,
      color: 'var(--text-strong)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 2
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    className: "nb-hero-media"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl)',
      aspectRatio: '4/5'
    }
  }, /*#__PURE__*/React.createElement("img", {
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
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -18,
      bottom: 28,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: '1px solid var(--border-hairline)'
    },
    className: "nb-hero-float"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: 'var(--grad-gold)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--charcoal-900)',
      fontWeight: 800,
      fontFamily: 'var(--font-display)',
      fontSize: 22
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, "Hand-finished quality"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Checked before it leaves the studio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 18,
      right: 18
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    variant: "solid"
  }, "Made to order"))), /*#__PURE__*/React.createElement("style", null, `@media (max-width: 860px){ .nb-hero{ grid-template-columns: 1fr; } .nb-hero-float{ left: 12px; } }`));
}
Object.assign(window, {
  Hero
});

/* ===== TrustBand.jsx ===== */
/* Nosibele website — trust indicators band */
function TrustBand() {
  const items = [{
    t: 'Custom embroidery specialists',
    icon: 'M12 3l1.9 4.9L19 9.6l-3.8 3.4 1.1 5L12 15.8 7.7 18l1.1-5L5 9.6l5.1-.7z'
  }, {
    t: 'Durban-based studio',
    icon: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zM12 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'
  }, {
    t: 'Clear lead times',
    icon: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'
  }, {
    t: 'Quality workmanship',
    icon: 'M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 21.3 5 17.5 5 13V6z'
  }, {
    t: 'Bulk & corporate orders welcome',
    icon: 'M3 21V9l9-6 9 6v12M9 21v-6h6v6'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      background: 'var(--surface-cream)',
      borderTop: '1px solid var(--border-hairline)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'clamp(20px,2.6vw,30px) var(--gutter)',
      display: 'flex',
      alignItems: 'stretch',
      gap: 'clamp(8px,2vw,20px)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px,2vw,20px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      flex: 'none',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-gold)',
      color: 'var(--gold-700)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: it.icon
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 'var(--fs-small)',
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap'
    }
  }, it.t)), i < items.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--gold-500)',
      opacity: 0.5
    },
    className: "nb-trust-dot"
  })))), /*#__PURE__*/React.createElement("style", null, `@media (max-width: 720px){ .nb-trust-dot{ display:none; } }`));
}
Object.assign(window, {
  TrustBand
});

/* ===== Products.jsx ===== */
/* Shared section header */
function SectionHead({
  eyebrow,
  title,
  intro,
  align = 'left',
  onDark = false
}) {
  const gold = onDark ? 'var(--gold-pale)' : 'var(--gold-600)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      maxWidth: align === 'center' ? 660 : 760,
      margin: align === 'center' ? '0 auto' : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: gold,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: gold
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      color: onDark ? 'var(--cream-50)' : 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, title), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-body)',
      margin: '12px 0 0'
    }
  }, intro));
}
function Grid({
  items,
  onRequest,
  whatsapp
}) {
  const {
    CatalogueCard
  } = window.NosibeleDesignSystem_4fcb98;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 'clamp(20px,2.4vw,32px)'
    }
  }, items.map(p => /*#__PURE__*/React.createElement(CatalogueCard, {
    key: p.slug,
    kind: "product",
    image: p.img,
    imageAlt: p.alt || p.title,
    eyebrow: p.cat,
    title: p.title,
    description: p.desc,
    price: p.price,
    badge: p.badge,
    whatsappPhone: whatsapp,
    onRequest: onRequest
  })));
}

/* Products — what customers can buy */
function Products({
  onRequest,
  whatsapp,
  showHead = true,
  grouped = false,
  featuredLimit = null,
  ctaHref
}) {
  const {
    Button
  } = window.NosibeleDesignSystem_4fcb98;
  const products = window.NB_CATALOGUE && window.NB_CATALOGUE.PRODUCTS || [];
  const groups = window.NB_CATALOGUE && window.NB_CATALOGUE.PRODUCT_GROUPS || [];
  return /*#__PURE__*/React.createElement("section", {
    id: "products",
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, showHead && /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Our Collection",
    title: "A digital showroom of custom apparel",
    intro: "Everything is made to order and hand-finished in our studio. Choose a piece to start a tailored quote."
  }), grouped ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-9)',
      marginTop: showHead ? 'var(--space-8)' : 0
    }
  }, groups.map(g => {
    const items = products.filter(p => p.group === g);
    if (!items.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: g
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--border-hairline)',
        paddingBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-overline)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 'var(--ls-overline)',
        color: 'var(--gold-600)'
      }
    }, "Collection"), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'var(--fs-h2)',
        color: 'var(--text-strong)',
        margin: '6px 0 0',
        letterSpacing: 'var(--ls-display)'
      }
    }, g)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        color: 'var(--gold-500)'
      }
    }, String(items.length).padStart(2, '0'))), /*#__PURE__*/React.createElement(Grid, {
      items: items,
      onRequest: onRequest,
      whatsapp: whatsapp
    }));
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: showHead ? 'var(--space-8)' : 0
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    items: featuredLimit ? products.slice(0, featuredLimit) : products,
    onRequest: onRequest,
    whatsapp: whatsapp
  }), featuredLimit && ctaHref && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    as: "a",
    href: ctaHref
  }, "View the full collection"))));
}
Object.assign(window, {
  Products,
  SectionHead,
  Grid
});

/* ===== Services.jsx ===== */
/* ============================================================
   Nosibele — Services as an editorial craft experience.
   Not a card grid: a craft journey (self-drawing gold thread),
   a signature featured panel, alternating image+text rows, and
   a stitched "also offered" list. Self-contained.
   ============================================================ */
const NB_ASSETS = 'assets/';
const NB_JOURNEY = ['Your idea', 'Artwork', 'Digitising', 'Embroidery', 'Printing', 'Quality inspection', 'Delivered'];

/* Five featured editorial services (workshop placeholders, alternating).
   Replace each img with the real Higgsfield workshop photo when ready. */
const NB_SVC_FEATURE = [{
  title: 'DTF Printing',
  img: NB_ASSETS + 'services/cards/dtf.png',
  alt: "DTF printing at the Nosibele studio — crisp full-colour transfer detail on fabric",
  lead: 'Crisp, full-colour detail',
  desc: 'Direct-to-film transfers reproduce intricate logos and photographic artwork in vivid colour on many garment types — suitability depends on fabric and the artwork.'
}, {
  title: 'Sublimation Printing',
  img: NB_ASSETS + 'services/cards/sublimation.png',
  alt: "Sublimation printing — dye infused edge-to-edge into golf shirts and supporters’ wear",
  lead: 'Colour woven into the cloth',
  desc: 'Dye is infused edge-to-edge into the fabric for a durable full-colour finish — ideal for golf shirts, dresses and supporters’ wear when cared for as advised.'
}, {
  title: 'Corporate Branding',
  img: NB_ASSETS + 'services/cards/corporate.png',
  alt: "Corporate branding — uniform team apparel with consistent embroidered logos",
  lead: 'Your whole team, beautifully uniform',
  desc: 'Full apparel programmes for businesses and teams — consistent logos, names and finishes across every garment, every order.'
}, {
  title: 'School Uniforms',
  img: NB_ASSETS + 'services/cards/school.png',
  alt: "School uniforms measured, sewn and branded with school badges and names",
  lead: 'Smart, hard-wearing, precise',
  desc: 'Measured, cut and sewn with care, then branded with school badges and names — made to last a full year of wear.'
}, {
  title: 'Custom Apparel',
  img: NB_ASSETS + 'services/cards/custom.png',
  alt: "Custom apparel cut and sewn to exact spec at the Nosibele studio",
  lead: 'Made to your exact spec',
  desc: 'From fabric roll to finished garment — personalised jerseys, kit and one-off pieces cut and sewn to your requirements.'
}];

/* Remaining services — the stitched "also offered" line. */
const NB_SVC_MORE = [{
  title: 'Logo & Name Branding',
  icon: 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6zM7.5 7.5h.01'
}, {
  title: 'Artwork Design',
  icon: 'M12 19H5v-4L16 4l4 4zM14 6l4 4'
}, {
  title: 'Bulk Orders',
  icon: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5'
}];
function nbWaLink(title) {
  const C = window.NB_CONFIG || {};
  const msg = C.waMessage ? C.waMessage(title) : 'Hello Nosibele Design & Embroidery, I would like a quotation for the ' + title + '.';
  if (typeof C.waLink === 'function') return C.waLink(msg);
  let digits = String(C.whatsapp || C.whatsappDigits || '0614453680').replace(/[^0-9]/g, '');
  if (digits.charAt(0) === '0') digits = '27' + digits.slice(1);
  if (!digits) digits = '27614453680';
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(msg);
}
function Services({
  onRequest,
  whatsapp,
  showHead = true
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let io;
    try {
      io = new IntersectionObserver(ents => {
        ents.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-on');
            io.unobserve(e.target);
          }
        });
      }, {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12
      });
      root.querySelectorAll('[data-anim]').forEach(n => io.observe(n));
    } catch (err) {
      root.querySelectorAll('[data-anim]').forEach(n => n.classList.add('is-on'));
    }
    const t = setTimeout(() => {
      root.querySelectorAll('[data-anim]').forEach(n => n.classList.add('is-on'));
    }, 2600);
    return () => {
      if (io) io.disconnect();
      clearTimeout(t);
    };
  }, []);
  const request = title => onRequest && onRequest({
    title,
    kind: 'service'
  });
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    ref: ref,
    style: {
      position: 'relative',
      background: 'var(--surface-cream)',
      overflow: 'hidden',
      borderTop: '1px solid var(--border-hairline)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: NB_ASSETS + 'logo-gold-transparent.png',
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '-7%',
      top: '-6%',
      width: 460,
      opacity: 0.05,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      position: 'relative'
    }
  }, showHead && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: nbEye
  }, /*#__PURE__*/React.createElement("span", {
    style: nbEyeRule
  }), "The Nosibele craft"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      margin: '16px 0 0'
    }
  }, "Every way we bring your ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--crimson-500)'
    }
  }, "brand"), " to life."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '18px 0 0',
      maxWidth: 560
    }
  }, "Every order travels the same considered path \u2014 from a first idea to a finished piece, hand-checked and delivered with pride.")), /*#__PURE__*/React.createElement("div", {
    "data-anim": true,
    className: "nb-journey",
    style: {
      marginTop: showHead ? 'var(--space-9)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-journey__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-journey__stitch",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nb-journey__thread",
    "aria-hidden": "true"
  }), NB_JOURNEY.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    className: "nb-journey__node",
    style: {
      transitionDelay: 0.15 + i * 0.12 + 's'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nb-journey__dot"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    className: "nb-journey__label"
  }, s))))), /*#__PURE__*/React.createElement("div", {
    "data-anim": true,
    className: "nb-feature",
    style: {
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-feature__media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-hoop"
  }, /*#__PURE__*/React.createElement("img", {
    src: NB_ASSETS + 'embroidery-closeup.webp',
    alt: "Close-up of Nosibele gold embroidery",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nb-hoop__ring",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "nb-feature__body"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...nbEye,
      color: 'var(--gold-pale)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...nbEyeRule,
      background: 'var(--gold-pale)'
    }
  }), "Our signature craft"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--cream-50)',
      margin: '16px 0 0'
    }
  }, "Embroidery"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: 'rgba(250,244,232,0.82)',
      margin: '16px 0 0'
    }
  }, "Thread-level branding \u2014 names, logos and numbers raised in embroidery stitch. It is where Nosibele began, and a finish our customers value."), /*#__PURE__*/React.createElement("ul", {
    className: "nb-feature__list"
  }, ['Raised embroidery stitching', 'Digitised for logo embroidery', 'Quality thread & fabric'].map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, /*#__PURE__*/React.createElement("span", {
    className: "nb-tick",
    "aria-hidden": "true"
  }, "\u2713"), f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nb-fbtn nb-fbtn--gold",
    onClick: () => request('Embroidery')
  }, "Request this service"), /*#__PURE__*/React.createElement("a", {
    className: "nb-fbtn nb-fbtn--ghost",
    href: nbWaLink('Embroidery'),
    target: "_blank",
    rel: "noopener noreferrer"
  }, "WhatsApp enquiry")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-9)'
    }
  }, NB_SVC_FEATURE.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    "data-anim": true,
    className: 'nb-row' + (i % 2 ? ' nb-row--rev' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-row__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: s.img,
    alt: s.alt || s.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nb-row__corner",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nb-row__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nb-row__num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: nbEye
  }, /*#__PURE__*/React.createElement("span", {
    style: nbEyeRule
  }), s.lead), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      margin: '12px 0 0'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '14px 0 0',
      maxWidth: 460
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nb-row__cta",
    onClick: () => request(s.title)
  }, "Request this service ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "nb-row__wa",
    href: nbWaLink(s.title),
    target: "_blank",
    rel: "noopener noreferrer"
  }, "WhatsApp")))))), /*#__PURE__*/React.createElement("div", {
    "data-anim": true,
    className: "nb-more",
    style: {
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-more__head"
  }, /*#__PURE__*/React.createElement("span", {
    style: nbEye
  }, /*#__PURE__*/React.createElement("span", {
    style: nbEyeRule
  }), "Also offered"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h2)',
      color: 'var(--text-strong)',
      margin: '10px 0 0',
      letterSpacing: 'var(--ls-display)'
    }
  }, "Everything else your brand needs")), /*#__PURE__*/React.createElement("div", {
    className: "nb-more__list"
  }, NB_SVC_MORE.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.title,
    type: "button",
    className: "nb-more__item",
    onClick: () => request(s.title)
  }, /*#__PURE__*/React.createElement("span", {
    className: "nb-more__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: s.icon
  }))), /*#__PURE__*/React.createElement("span", {
    className: "nb-more__title"
  }, s.title), /*#__PURE__*/React.createElement("span", {
    className: "nb-more__arrow",
    "aria-hidden": "true"
  }, "\u2192")))))), /*#__PURE__*/React.createElement("style", null, nbServicesCSS));
}
const nbEye = {
  fontSize: 'var(--fs-overline)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: 'var(--ls-overline)',
  color: 'var(--gold-600)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10
};
const nbEyeRule = {
  width: 26,
  height: 1,
  background: 'var(--gold-500)',
  display: 'inline-block'
};
const nbServicesCSS = `
/* reveal */
[data-anim]{opacity:0;transform:translateY(30px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
[data-anim].is-on{opacity:1;transform:none}
@media (prefers-reduced-motion: reduce){[data-anim]{opacity:1!important;transform:none!important}}

/* ---- Journey ---- */
.nb-journey__track{position:relative;display:flex;justify-content:space-between;gap:12px}
.nb-journey__stitch{position:absolute;left:18px;right:18px;top:23px;height:0;border-top:2px dashed rgba(168,121,31,.45)}
.nb-journey__thread{position:absolute;left:18px;top:23px;height:2px;width:0;background:linear-gradient(90deg,var(--gold-600),var(--gold-pale),var(--gold-500));transition:width 2.4s cubic-bezier(.4,0,.2,1) .2s}
.is-on .nb-journey__thread{width:calc(100% - 36px)}
.nb-journey__node{position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;flex:1;text-align:center;opacity:0;transform:translateY(14px);transition:opacity .6s var(--ease-out),transform .6s var(--ease-out)}
.is-on .nb-journey__node{opacity:1;transform:none}
.nb-journey__dot{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--surface-card);border:1px solid var(--border-gold);color:var(--gold-700);font-family:var(--font-display);font-weight:600;font-size:1.05rem;box-shadow:var(--shadow-sm),inset 0 0 0 4px var(--bg-page-soft)}
.nb-journey__label{font-family:var(--font-body);font-weight:600;font-size:var(--fs-caption);color:var(--text-strong);letter-spacing:.01em;max-width:96px}
@media (max-width:760px){
 .nb-journey__track{flex-direction:column;align-items:flex-start;gap:20px}
 .nb-journey__stitch{left:22px;right:auto;top:22px;bottom:22px;height:auto;width:0;border-top:0;border-left:2px dashed rgba(168,121,31,.45)}
 .nb-journey__thread{left:22px;top:22px;width:2px!important;height:0;background:linear-gradient(180deg,var(--gold-600),var(--gold-pale),var(--gold-500));transition:height 2.4s cubic-bezier(.4,0,.2,1) .2s}
 .is-on .nb-journey__thread{height:calc(100% - 44px)}
 .nb-journey__node{flex-direction:row;gap:16px;text-align:left}
 .nb-journey__label{max-width:none;font-size:var(--fs-small)}
}

/* ---- Featured signature panel ---- */
.nb-feature{display:grid;grid-template-columns:minmax(0,0.92fr) minmax(0,1.08fr);gap:clamp(24px,4vw,64px);align-items:center;
 background:linear-gradient(155deg,var(--crimson-600) 0%,var(--burgundy-600) 62%,var(--burgundy-700) 100%);
 border-radius:var(--radius-xl);padding:clamp(28px,4vw,64px);box-shadow:var(--shadow-crimson);position:relative;overflow:hidden}
.nb-feature::after{content:'';position:absolute;inset:14px;border:1px solid rgba(200,161,74,.32);border-radius:calc(var(--radius-xl) - 12px);pointer-events:none}
.nb-hoop{position:relative;aspect-ratio:1;border-radius:50%;overflow:hidden;box-shadow:0 24px 60px rgba(28,8,10,.5)}
.nb-hoop img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.1s var(--ease-out)}
.nb-feature:hover .nb-hoop img{transform:scale(1.06)}
.nb-hoop__ring{position:absolute;inset:0;border-radius:50%;border:6px solid rgba(241,221,166,.85);box-shadow:inset 0 0 0 2px rgba(133,94,21,.5),0 0 0 2px rgba(200,161,74,.4)}
.nb-feature__list{list-style:none;padding:0;margin:22px 0 0;display:flex;flex-direction:column;gap:11px}
.nb-feature__list li{display:flex;align-items:center;gap:12px;color:var(--cream-100);font-size:var(--fs-body)}
.nb-tick{width:22px;height:22px;border-radius:50%;flex:none;display:grid;place-items:center;background:var(--grad-gold);color:var(--charcoal-900);font-size:12px;font-weight:800}
.nb-fbtn{display:inline-flex;align-items:center;justify-content:center;height:var(--control-h-md);padding:0 26px;border-radius:var(--radius-pill);font-family:var(--font-body);font-weight:600;font-size:var(--fs-body);cursor:pointer;border:1px solid transparent;text-decoration:none;transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),background var(--dur-base) var(--ease-out),color var(--dur-base) var(--ease-out)}
.nb-fbtn--gold{background:var(--grad-gold);color:var(--charcoal-900);box-shadow:var(--shadow-sm)}
.nb-fbtn--gold:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);filter:brightness(1.04)}
.nb-fbtn--ghost{background:transparent;color:var(--cream-50);border-color:rgba(241,221,166,.4)}
.nb-fbtn--ghost:hover{background:var(--gold-500);color:var(--charcoal-900);border-color:var(--gold-500)}
.nb-fbtn:active{transform:scale(.97)}
@media (max-width:820px){.nb-feature{grid-template-columns:1fr}.nb-hoop{max-width:360px;margin:0 auto}}

/* ---- Alternating editorial rows ---- */
.nb-row{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(24px,4vw,64px);align-items:center}
.nb-row--rev .nb-row__media{order:2}
.nb-row__media{position:relative;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:4/3;box-shadow:var(--shadow-md);background:var(--cream-200)}
.nb-row__media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.1s var(--ease-out)}
.nb-row:hover .nb-row__media img{transform:scale(1.05)}
.nb-row__corner{position:absolute;inset:14px;border:1px solid rgba(200,161,74,0);border-radius:var(--radius-md);transition:border-color var(--dur-slow) var(--ease-out);pointer-events:none}
.nb-row:hover .nb-row__corner{border-color:rgba(241,221,166,.7)}
.nb-row__num{font-family:var(--font-display);font-size:clamp(2.4rem,5vw,3.6rem);font-weight:600;color:var(--gold-300);line-height:1;display:block;margin-bottom:6px}
.nb-row__cta{background:none;border:none;padding:0;cursor:pointer;font-family:var(--font-body);font-weight:700;font-size:var(--fs-body);color:var(--crimson-500);display:inline-flex;align-items:center;gap:8px;transition:gap var(--dur-base) var(--ease-out)}
.nb-row__cta:hover{gap:13px}
.nb-row__wa{font-family:var(--font-body);font-weight:600;font-size:var(--fs-small);color:var(--gold-700);text-decoration:none}
.nb-row__wa:hover{color:var(--burgundy-500)}
@media (max-width:820px){.nb-row{grid-template-columns:1fr}.nb-row--rev .nb-row__media{order:0}}

/* ---- Also offered ---- */
.nb-more__head{text-align:center;max-width:560px;margin:0 auto var(--space-7)}
.nb-more__head span{justify-content:center}
.nb-more__list{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}
.nb-more__item{display:flex;align-items:center;gap:14px;width:100%;text-align:left;cursor:pointer;
 background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:var(--radius-pill);padding:12px 18px;
 transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)}
.nb-more__item:hover{border-color:rgba(200,161,74,.6);box-shadow:var(--shadow-sm);transform:translateY(-2px)}
.nb-more__icon{width:40px;height:40px;border-radius:50%;flex:none;display:grid;place-items:center;background:var(--cream-100);border:1px solid var(--border-gold);color:var(--gold-700)}
.nb-more__title{flex:1;font-family:var(--font-body);font-weight:600;font-size:var(--fs-small);color:var(--text-strong)}
.nb-more__arrow{color:var(--gold-600);transition:transform var(--dur-base) var(--ease-out)}
.nb-more__item:hover .nb-more__arrow{transform:translateX(4px)}
`;
Object.assign(window, {
  Services
});

/* ===== Craft.jsx ===== */
/* Nosibele website — the craft / process band (dark feature section) */
function Craft() {
  const steps = [['01', 'Request a quotation', 'Share what you need — garment, quantity, artwork or inspiration — via the quote form, WhatsApp or email. This is a quotation request, not an accepted order.'], ['02', 'Review & quotation', 'We review the request and send a tailored quotation. Lead times are estimates confirmed on the quotation — not guarantees.'], ['03', 'Approve quote, deposit & artwork', 'Production begins only after you approve the quotation, pay the required deposit (normally 50%), and confirm artwork and order details (spelling, colours, placement and sizes).'], ['04', 'Production', 'Approved work is embroidered, printed or finished in our Durban studio according to the agreed specification.'], ['05', 'Quality check', 'Garments are checked for stitching, colour and finish before release.'], ['06', 'Balance, then collect or courier', 'The remaining balance is payable before collection or delivery. Collect from the studio or arrange courier as agreed on your quotation.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "craft",
    style: {
      background: 'var(--grad-crimson)',
      color: 'var(--cream-50)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-gold-transparent.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '-6%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 540,
      opacity: 0.06,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-pale)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-pale)'
    }
  }), "Our Craft"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      margin: '14px 0 0',
      maxWidth: 620
    }
  }, "From a thread of an idea to a finished piece you\u2019ll be proud to wear."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))',
      gap: 'clamp(24px,3vw,44px)',
      marginTop: 'var(--space-8)'
    }
  }, steps.map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      fontWeight: 600,
      color: 'var(--gold-pale)',
      borderBottom: '1px solid var(--border-on-dark)',
      paddingBottom: 12,
      marginBottom: 14
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h3)',
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-on-dark-muted)',
      margin: 0
    }
  }, d))))));
}
Object.assign(window, {
  Craft
});

/* ===== Testimonial.jsx ===== */
/* Nosibele — customer reviews (real only; reads window.NB_CATALOGUE.REVIEWS) */
function Stars({
  n = 5,
  size = 18,
  color = 'var(--gold-500)'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 3
    },
    "aria-label": n + ' out of 5 stars'
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: i < n ? color : 'none',
    stroke: color,
    strokeWidth: "1.4",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l2.6 5.6 6.1.8-4.5 4.1 1.2 6L12 16.9 6.6 19.6l1.2-6L3.3 9.4l6.1-.8z"
  }))));
}
function Testimonial() {
  const {
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  const reviews = (window.NB_CATALOGUE && window.NB_CATALOGUE.REVIEWS || []).filter(function (r) { return r && r.permissionConfirmed === true; });
  const WA = window.NB_CONFIG && window.NB_CONFIG.whatsapp || '0614453680';
  // Always show Google review CTA band; quote cards only when permission-confirmed.
  const featured = reviews[0] || null;
  const rest = reviews.slice(1);
  const waReview = window.NB_CONFIG ? 'Hello Nosibele Design & Embroidery,\n\nI’d like to share a review of my order.' : 'Hello Nosibele, I’d like to leave a review.';
  if (!featured) {
    return /*#__PURE__*/React.createElement("section", {
      style: { background: 'var(--surface-cream)', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }
    }, /*#__PURE__*/React.createElement("div", {
      style: { maxWidth: 'var(--container-xl)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)', textAlign: 'center' }
    }, /*#__PURE__*/React.createElement("h2", {
      style: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-h2)', color: 'var(--text-strong)', margin: '0 0 12px' }
    }, "See what customers say on Google"), /*#__PURE__*/React.createElement("p", {
      style: { fontSize: 'var(--fs-body)', color: 'var(--text-body)', maxWidth: 520, margin: '0 auto 20px' }
    }, "We publish named testimonials on this site only with customer permission. In the meantime, you can read and leave reviews on our Google Business Profile."), /*#__PURE__*/React.createElement("a", {
      className: 'nb-btn nb-btn--crimson',
      href: window.NB_CONFIG && window.NB_CONFIG.googleProfileUrl || '#',
      target: '_blank',
      rel: 'noopener noreferrer',
      onClick: function () { try { if (typeof window.nbTrack === 'function') window.nbTrack('google_review_click', { page: 'testimonial' }); } catch (e) {} }
    }, "View Google reviews")));
  }
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-cream)',
      borderTop: '1px solid var(--border-hairline)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 640,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-600)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-500)'
    }
  }), featured ? "Customer feedback" : "Reviews on Google", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-500)'
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, "What our customers say")), /*#__PURE__*/React.createElement("figure", {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      textAlign: 'center',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-gold-transparent.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      width: 70,
      opacity: 0.9,
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    n: featured.rating,
    size: 22
  })), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--fs-h2)',
      fontStyle: 'italic',
      lineHeight: 'var(--lh-snug)',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "\u201C", featured.text, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 1,
      background: 'var(--gold-500)',
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, featured.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-muted)'
    }
  }, featured.org))), rest.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
      gap: 'clamp(16px,2vw,24px)',
      marginTop: 'var(--space-8)'
    }
  }, rest.map((r, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-sm)',
      padding: 'var(--space-6)',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    n: r.rating,
    size: 16
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '14px 0 0'
    }
  }, "\u201C", r.text, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-small)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, " \xB7 ", r.org))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-muted)',
      margin: '0 0 14px'
    }
  }, "Happy with your order? A quick Google review helps other Durban customers find us."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: window.NB_CONFIG && window.NB_CONFIG.googleReviewUrl || '#',
    target: "_blank",
    rel: "noopener",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '13px 24px',
      borderRadius: 999,
      background: 'var(--crimson-600)',
      color: '#fff',
      fontWeight: 700,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#fff",
    d: "M12 2l2.9 6.3L22 9.2l-5 4.7 1.3 6.9L12 17.5 5.7 20.8 7 13.9l-5-4.7 7.1-.9L12 2z"
  })), "Leave a Google review"), /*#__PURE__*/React.createElement("a", {
    href: window.NB_CONFIG && window.NB_CONFIG.googleProfileUrl || '#',
    target: "_blank",
    rel: "noopener",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '13px 24px',
      borderRadius: 999,
      border: '1px solid var(--border-hairline)',
      color: 'var(--text-strong)',
      fontWeight: 700,
      textDecoration: 'none'
    }
  }, "See us on Google")))));
}
Object.assign(window, {
  Testimonial,
  Stars
});

/* ===== HomeFaq.jsx ===== */
/* Nosibele homepage — FAQ section (reads window.NB_CATALOGUE.FAQS) */
function HomeFaq() {
  const {
    FAQList
  } = window;
  const faqs = window.NB_CATALOGUE && window.NB_CATALOGUE.FAQS || [];
  if (!faqs.length || !FAQList) return null;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-md)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-600)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-500)'
    }
  }), "Good to know", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-500)'
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, "Frequently asked")), /*#__PURE__*/React.createElement(FAQList, {
    items: faqs,
    heading: ""
  }));
}
Object.assign(window, {
  HomeFaq
});

/* ===== QuoteSection.jsx ===== */
/* ============================================================
   Nosibele — Quote section reimagined as a luxury "concierge" band.
   Immersive crimson→burgundy ground, bright gold-detailed order card,
   grouped steps, segmented controls, gold focus glows.
   All Formspree wiring, field names, pre-select & success state intact.
   ============================================================ */
function QuoteSection({
  preselect,
  whatsapp
}) {
  const {
    Button,
    WhatsAppButton,
    Tag
  } = window.NosibeleDesignSystem_4fcb98;
  const cat = window.NB_CATALOGUE || {
    PRODUCTS: [],
    SERVICES: []
  };
  const [item, setItem] = React.useState('');
  const [fulfilment, setFulfilment] = React.useState('Collect from studio');
  const [sent, setSent] = React.useState(false);
  const [lead, setLead] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [artworkFiles, setArtworkFiles] = React.useState([]);
  const [artworkHint, setArtworkHint] = React.useState('');
  const lastSubmitAt = React.useRef(0);
  const COOLDOWN_MS = 8000;
  const MAX = { name: 80, phone: 40, qty: 12, notes: 1000, source: 80, item: 120 };
  const ALLOWED_MIME = (window.NB_CONFIG && window.NB_CONFIG.artworkAccept) || ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
  const MAX_BYTES = (window.NB_CONFIG && window.NB_CONFIG.artworkMaxBytes) || (8 * 1024 * 1024);
  const MAX_FILES = 3;
  const readMagic = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read'));
    reader.onload = () => {
      const buf = new Uint8Array(reader.result || []);
      const isPng = buf.length >= 4 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
      const isJpg = buf.length >= 3 && buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
      const isPdf = buf.length >= 4 && buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46;
      resolve({ isPng, isJpg, isPdf });
    };
    reader.readAsArrayBuffer(file.slice(0, 8));
  });
  const validateArtworkFiles = async files => {
    const list = Array.from(files || []).slice(0, MAX_FILES);
    const ok = [];
    for (const file of list) {
      const name = String(file.name || '').toLowerCase();
      const extOk = /\.(png|jpe?g|pdf)$/.test(name);
      const mime = String(file.type || '').toLowerCase();
      const mimeOk = !mime || ALLOWED_MIME.indexOf(mime) !== -1 || mime === 'image/jpg';
      if (!extOk || !mimeOk) {
        return { error: 'Artwork must be PNG, JPG or PDF only.', files: [] };
      }
      if (file.size > MAX_BYTES) {
        return { error: 'Each artwork file must be 8 MB or smaller.', files: [] };
      }
      try {
        const mag = await readMagic(file);
        const looksImage = mag.isPng || mag.isJpg;
        const looksPdf = mag.isPdf;
        if (!(looksImage || looksPdf)) {
          return { error: 'That file type is not allowed. Please upload PNG, JPG or PDF artwork.', files: [] };
        }
        if (looksPdf && !name.endsWith('.pdf')) {
          return { error: 'PDF artwork must use a .pdf filename.', files: [] };
        }
        if (looksImage && !/\.(png|jpe?g)$/.test(name)) {
          return { error: 'Image artwork must use a .png, .jpg or .jpeg filename.', files: [] };
        }
      } catch (err) {
        return { error: 'We could not read that artwork file. Please try another PNG, JPG or PDF.', files: [] };
      }
      ok.push(file);
    }
    return { error: '', files: ok };
  };
  const onArtworkChange = async ev => {
    const result = await validateArtworkFiles(ev.target.files);
    if (result.error) {
      setArtworkFiles([]);
      setArtworkHint(result.error);
      ev.target.value = '';
      return;
    }
    setArtworkFiles(result.files);
    setArtworkHint(result.files.length ? (result.files.length + ' file(s) ready to attach with your quotation request.') : '');
  };
  React.useEffect(() => {
    if (preselect) setItem(preselect.replace(/\s#\d+$/, '').slice(0, MAX.item));
  }, [preselect]);
  const clip = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
  const submit = async e => {
    e.preventDefault();
    if (submitting) return;
    const now = Date.now();
    if (now - (lastSubmitAt.current || 0) < COOLDOWN_MS) {
      setError('Please wait a moment before sending again.');
      return;
    }
    const fd = new FormData(e.target);
    if ((fd.get('_gotcha') || '').toString().trim()) {
      setLead({ name: '—', item: '—', qty: '—', status: 'New' });
      setSent(true);
      return;
    }
    const name = clip(fd.get('name'), MAX.name);
    const phone = clip(fd.get('phone'), MAX.phone);
    const qty = clip(fd.get('qty'), MAX.qty);
    const notes = clip(fd.get('notes'), MAX.notes);
    const source = clip(fd.get('source'), MAX.source);
    const product = clip(item, MAX.item);
    if (!name) { setError('Please enter your name.'); return; }
    if (!phone || phone.replace(/\D/g, '').length < 9) { setError('Please enter a valid WhatsApp number.'); return; }
    if (!product) { setError('Please select a product or service.'); return; }
    if (!fd.get('privacy_ack')) {
      setError('Please confirm you have read the Privacy Notice and Quotation & Order Terms before sending.');
      return;
    }
    const picked = fd.getAll('artwork');
    const pickedFiles = picked.filter(v => v && typeof v === 'object' && v.size != null);
    let filesToSend = artworkFiles;
    if (pickedFiles.length) {
      const checked = await validateArtworkFiles(pickedFiles);
      if (checked.error) { setError(checked.error); return; }
      filesToSend = checked.files;
      setArtworkFiles(checked.files);
    }
    const leadObj = { name: name.split(' ')[0] || '—', item: product || '—', qty: qty || '—', status: 'New' };
    const endpoint = window.NB_CONFIG && window.NB_CONFIG.formEndpoint;
    if (!endpoint) {
      setError('The quotation form is temporarily unavailable. Please WhatsApp or email us instead.');
      return;
    }
    setSubmitting(true);
    setError('');
    lastSubmitAt.current = now;
    try {
      const data = new FormData();
      data.append('Name', name);
      data.append('WhatsApp', phone);
      data.append('Product / service', product);
      data.append('Quantity', qty);
      data.append('Delivery or collection', fulfilment || '');
      data.append('Notes', notes);
      data.append('Lead source', source);
      data.append('Privacy acknowledgement', 'Yes');
      data.append('Commercial terms acknowledgement', 'Yes');
      data.append('Marketing opt-in', fd.get('marketing_opt_in') ? 'Yes' : 'No');
      data.append('_gotcha', '');
      data.append('_subject', 'Nosibele quotation request' + (filesToSend.length ? ' (with artwork)' : ''));
      if (filesToSend.length) {
        filesToSend.forEach((file, idx) => {
          data.append(idx === 0 ? 'attachment' : ('attachment_' + (idx + 1)), file, file.name);
        });
        data.append('Artwork attached', filesToSend.map(f => f.name).join(', '));
      } else {
        data.append('Artwork attached', 'None — customer may supply artwork later if needed');
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('bad response');
      setLead(leadObj);
      setSent(true);
      try { if (typeof window.nbTrack === 'function') window.nbTrack('quote_submit', { item: product ? 'set' : 'unset' }); } catch (t) {}
    } catch (err) {
      try { if (typeof window.nbTrack === 'function') window.nbTrack('form_error', { form: 'quote' }); } catch (t) {}
      setError('We could not send your request just now. Please WhatsApp us on 061 445 3680, email quotes@nosibeleembroidery.co.za, or call us — and we will help you.');
    } finally {
      setSubmitting(false);
    }
  };
  const reset = () => {
    setSent(false);
    setItem('');
    setLead(null);
    setError('');
    setArtworkFiles([]);
    setArtworkHint('');
    setFulfilment('Collect from studio');
  };
  const waMsg = item
    ? (window.NB_CONFIG ? window.NB_CONFIG.waMessage(item) : 'Hello Nosibele Design & Embroidery, I would like a quotation for the ' + item + '.')
    : (window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.quote : 'Hello Nosibele Design & Embroidery, I would like to request a quotation.');
  const stepNum = n => /*#__PURE__*/React.createElement("span", {
    className: "nbq-step"
  }, n);
  return /*#__PURE__*/React.createElement("section", {
    id: "quote",
    className: "nbq",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(157deg, var(--crimson-600) 0%, var(--burgundy-600) 58%, var(--burgundy-700) 100%)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-gold-transparent.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '-5%',
      bottom: '-8%',
      width: 420,
      opacity: 0.06,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "nbq-stitch"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,0.9fr) minmax(0,1.1fr)',
      gap: 'clamp(32px,5vw,80px)',
      alignItems: 'center'
    },
    className: "nbq-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-pale)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 1,
      background: 'var(--gold-pale)'
    }
  }), "Request a quote"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-display-2)',
      lineHeight: 'var(--lh-tight)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--cream-50)',
      margin: '16px 0 0'
    }
  }, "Tell us what you\u2019re", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--gold-pale)'
    }
  }, "dreaming of.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: 'rgba(250,244,232,0.82)',
      margin: '18px 0 0',
      maxWidth: 420
    }
  }, "A few details is all we need. Submitting this form is a request for a quotation \u2014 not an accepted order. Quote requests are handled at ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:quotes@nosibeleembroidery.co.za?subject=Quotation%20Request",
    style: {
      color: 'var(--gold-pale)',
      fontWeight: 700,
      textDecoration: 'underline'
    }
  }, "quotes@nosibeleembroidery.co.za"), ". We reply with a tailored quote after reviewing your requirements."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '28px 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, ['Quote requests go to quotes@nosibeleembroidery.co.za', 'A quotation request — no order until you approve', 'No obligation from sending the form', 'Talk to a real person in our Durban studio'].map(r => /*#__PURE__*/React.createElement("li", {
    key: r,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      fontSize: 'var(--fs-body)',
      color: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--grad-gold)',
      flex: 'none',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--charcoal-900)',
      fontSize: 13,
      fontWeight: 800
    }
  }, "\u2713"), r))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: whatsapp,
    message: waMsg,
    variant: "green"
  }, "Chat on WhatsApp instead"))), /*#__PURE__*/React.createElement("div", {
    className: "nbq-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nbq-card__ribbon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-card__ribbon-eye"
  }, "Request a quotation"), /*#__PURE__*/React.createElement("span", {
    className: "nbq-card__ribbon-title"
  }, "Your quote, beautifully simple")), /*#__PURE__*/React.createElement("div", {
    className: "nbq-card__body"
  }, sent ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nbq-seal"
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h2)',
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, "Thank you, ", lead.name.split(' ')[0], "!"), /*#__PURE__*/React.createElement("p", {
    role: "status",
    "aria-live": "polite",
    style: {
      color: 'var(--text-body)',
      margin: '10px 0 18px',
      lineHeight: 'var(--lh-normal)'
    }
  }, "Your quotation request has been received. We will review it and reply with a tailored quotation. This is not an accepted order.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cream-100)',
      borderRadius: 'var(--radius-md)',
      padding: 16,
      border: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-600)',
      marginBottom: 10
    }
  }, "Request summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '6px 14px',
      fontSize: 'var(--fs-small)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Item"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, lead.item), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Quantity"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, lead.qty), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tag, {
    variant: "gold",
    size: "sm",
    dot: true
  }, lead.status)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: whatsapp,
    message: waMsg,
    style: {
      flex: 1,
      height: 'var(--control-h-md)',
      justifyContent: 'center'
    }
  }, "Continue on WhatsApp"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: reset
  }, "New request"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "nbq-grouphead"
  }, stepNum(1), " Your details"), /*#__PURE__*/React.createElement("p", {
    className: "nbq-help nbq-help-details",
    style: {
      margin: '0 0 12px',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, "We use your name and WhatsApp number only to respond to this quotation request (and for marketing only if you opt in below). Required fields are marked with *."), /*#__PURE__*/React.createElement("div", {
    className: "nbq-row2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Your name", /*#__PURE__*/React.createElement("i", null, "*")), /*#__PURE__*/React.createElement("input", {
    name: "name",
    required: true,
    autoComplete: "name",
    maxLength: 80,
    placeholder: "e.g. Thandi M."
  })), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "WhatsApp number", /*#__PURE__*/React.createElement("i", null, "*")), /*#__PURE__*/React.createElement("input", {
    name: "phone",
    type: "tel",
    required: true,
    autoComplete: "tel",
    inputMode: "tel",
    maxLength: 40,
    placeholder: "082 000 0000"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "nbq-grouphead",
    style: {
      marginTop: 22
    }
  }, stepNum(2), " What you need"), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Product or service", /*#__PURE__*/React.createElement("i", null, "*")), /*#__PURE__*/React.createElement("div", {
    className: "nbq-select"
  }, /*#__PURE__*/React.createElement("select", {
    value: item,
    onChange: e => setItem(e.target.value),
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Select an item\u2026"), /*#__PURE__*/React.createElement("optgroup", {
    label: "Products"
  }, cat.PRODUCTS.map(p => /*#__PURE__*/React.createElement("option", {
    key: p.slug,
    value: p.title
  }, p.title))), /*#__PURE__*/React.createElement("optgroup", {
    label: "Services"
  }, cat.SERVICES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.slug,
    value: s.title
  }, s.title)))), /*#__PURE__*/React.createElement("span", {
    className: "nbq-chev",
    "aria-hidden": "true"
  }, "\u25BE"))), /*#__PURE__*/React.createElement("div", {
    className: "nbq-row2",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Quantity"), /*#__PURE__*/React.createElement("input", {
    name: "qty",
    type: "number",
    min: "1",
    max: "999999",
    maxLength: 12,
    inputMode: "numeric",
    placeholder: "e.g. 25"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Delivery or collection"), /*#__PURE__*/React.createElement("div", {
    className: "nbq-seg",
    role: "group",
    "aria-label": "Delivery or collection"
  }, ['Collect from studio', 'Courier delivery'].map(opt => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: opt,
    className: 'nbq-seg__b' + (fulfilment === opt ? ' is-on' : ''),
    onClick: () => setFulfilment(opt)
  }, opt === 'Collect from studio' ? 'Collect' : 'Courier'))))), /*#__PURE__*/React.createElement("div", {
    className: "nbq-grouphead",
    style: {
      marginTop: 22
    }
  }, stepNum(3), " Finishing touches"), /*#__PURE__*/React.createElement("div", {
    className: "nbq-f"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Artwork or logo ", /*#__PURE__*/React.createElement("em", null, "(optional \u2014 attach here)")), /*#__PURE__*/React.createElement("p", {
    className: "nbq-help",
    style: {
      margin: '8px 0 10px',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, "Attach your logo or artwork here so it arrives with this quotation request at quotes@nosibeleembroidery.co.za. PNG, JPG or PDF \u2014 up to 3 files, 8 MB each."), /*#__PURE__*/React.createElement("label", {
    className: "nbq-file",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 4,
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px dashed rgba(200,161,74,0.65)',
      background: 'rgba(255,255,255,0.92)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontSize: 'var(--fs-small)'
    }
  }, "Choose artwork files"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: "artwork",
    accept: "image/png,image/jpeg,.png,.jpg,.jpeg,application/pdf,.pdf",
    multiple: true,
    onChange: onArtworkChange,
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-body)'
    }
  }), artworkHint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: artworkHint.indexOf('ready') !== -1 ? 'var(--text-strong)' : 'var(--crimson-600)',
      fontWeight: 600
    }
  }, artworkHint) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)'
    }
  }, "Optional. If you skip this now, we can still quote and request artwork later."))), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "Notes ", /*#__PURE__*/React.createElement("em", null, "(optional)")), /*#__PURE__*/React.createElement("textarea", {
    name: "notes",
    rows: "3",
    maxLength: 1000,
    placeholder: "Colours, sizes, deadline, or anything else we should know. Please do not include ID numbers or card details."
  })), /*#__PURE__*/React.createElement("label", {
    className: "nbq-f",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nbq-l"
  }, "How did you hear about us?"), /*#__PURE__*/React.createElement("div", {
    className: "nbq-select"
  }, /*#__PURE__*/React.createElement("select", {
    name: "source"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select\u2026"), /*#__PURE__*/React.createElement("option", null, "WhatsApp"), /*#__PURE__*/React.createElement("option", null, "Instagram"), /*#__PURE__*/React.createElement("option", null, "Facebook"), /*#__PURE__*/React.createElement("option", null, "Referral / word of mouth"), /*#__PURE__*/React.createElement("option", null, "Google search"), /*#__PURE__*/React.createElement("option", null, "Returning customer")), /*#__PURE__*/React.createElement("span", {
    className: "nbq-chev",
    "aria-hidden": "true"
  }, "\u25BE"))), /*#__PURE__*/React.createElement("input", {
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
  }, "Privacy Notice"), " and the ", /*#__PURE__*/React.createElement("a", {
    href: "/commercial-terms.html",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: 'var(--crimson-600)',
      fontWeight: 700
    }
  }, "Quotation & Order Terms"), ". I understand this is a quotation request only. Any artwork I attach must be files I am allowed to use. Production starts only after an approved quotation, the required deposit (normally 50%), and confirmed artwork/order details. The balance is payable before collection or delivery.")), /*#__PURE__*/React.createElement("label", {
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
    disabled: submitting,
    style: {
      marginTop: 20
    }
  }, submitting ? 'Sending…' : 'Send my quote request'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      textAlign: 'center',
      margin: '12px 0 0'
    }
  }, "Required fields are marked with *. Name and WhatsApp number are needed so we can reply. Product, quantity and notes help us prepare a quotation. Optional marketing is only recorded if you tick the separate box. Form submissions are processed via Formspree. Customer details are not placed in page URLs."))))), /*#__PURE__*/React.createElement("style", null, nbQuoteCSS));
}
const nbQuoteCSS = `
.nbq-stitch{position:absolute;inset:0;pointer-events:none;opacity:.5;
 background-image:repeating-linear-gradient(135deg,rgba(241,221,166,.05) 0 2px,transparent 2px 26px)}
.nbq-card{position:relative;background:var(--cream-50);border-radius:var(--radius-xl);overflow:hidden;
 box-shadow:0 40px 90px rgba(28,8,10,.45);border:1px solid rgba(200,161,74,.4)}
.nbq-card__ribbon{background:linear-gradient(100deg,var(--gold-600),var(--gold-pale) 45%,var(--gold-500) 70%,var(--gold-600));
 padding:18px clamp(22px,3vw,34px);display:flex;flex-direction:column;gap:2px;position:relative}
.nbq-card__ribbon::after{content:'';position:absolute;left:0;right:0;bottom:0;height:2px;
 background:repeating-linear-gradient(90deg,rgba(53,8,16,.35) 0 7px,transparent 7px 13px)}
.nbq-card__ribbon-eye{font-size:var(--fs-overline);font-weight:700;text-transform:uppercase;letter-spacing:var(--ls-overline);color:rgba(53,8,16,.7)}
.nbq-card__ribbon-title{font-family:var(--font-display);font-weight:600;font-size:1.5rem;color:var(--charcoal-900);line-height:1.1}
.nbq-card__body{padding:clamp(22px,3vw,34px)}

.nbq-grouphead{display:flex;align-items:center;gap:11px;font-family:var(--font-body);font-weight:700;font-size:var(--fs-small);
 color:var(--text-strong);text-transform:uppercase;letter-spacing:.04em;margin-bottom:14px}
.nbq-step{width:26px;height:26px;border-radius:50%;flex:none;display:grid;place-items:center;
 background:var(--grad-gold);color:var(--charcoal-900);font-family:var(--font-display);font-weight:700;font-size:.95rem}

.nbq-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.nbq-f{display:flex;flex-direction:column;gap:7px}
.nbq-l{font-size:var(--fs-small);font-weight:600;color:var(--text-strong)}
.nbq-l i{color:var(--crimson-500);font-style:normal;margin-left:2px}
.nbq-l em{color:var(--text-muted);font-weight:500;font-style:normal}
.nbq input,.nbq select,.nbq textarea{width:100%;box-sizing:border-box;font-family:var(--font-body);font-size:var(--fs-body);
 color:var(--text-strong);background:var(--surface-card);border:1.5px solid var(--border-soft);border-radius:var(--radius-md);
 padding:0 16px;height:var(--control-h-md);transition:border-color var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)}
.nbq textarea{height:auto;min-height:84px;padding:12px 16px;line-height:var(--lh-normal);resize:vertical}
.nbq input::placeholder,.nbq textarea::placeholder{color:var(--warm-400)}
.nbq input:hover,.nbq select:hover,.nbq textarea:hover{border-color:var(--warm-400)}
.nbq input:focus,.nbq select:focus,.nbq textarea:focus{outline:none;border-color:var(--gold-500);box-shadow:0 0 0 4px rgba(200,161,74,.22)}
.nbq-select{position:relative}
.nbq-select select{appearance:none;cursor:pointer;padding-right:42px}
.nbq-chev{position:absolute;right:16px;top:50%;transform:translateY(-50%);color:var(--gold-700);pointer-events:none;font-size:.8rem}

.nbq-seg{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:var(--cream-200);border:1px solid var(--border-soft);
 border-radius:var(--radius-md);padding:5px;height:var(--control-h-md)}
.nbq-seg__b{border:none;cursor:pointer;border-radius:calc(var(--radius-md) - 4px);font-family:var(--font-body);font-weight:600;
 font-size:var(--fs-small);color:var(--text-body);background:transparent;transition:all var(--dur-base) var(--ease-out)}
.nbq-seg__b.is-on{background:var(--crimson-500);color:var(--cream-50);box-shadow:var(--shadow-xs)}

.nbq-upload{display:flex;align-items:center;gap:10px;cursor:pointer;height:var(--control-h-md);padding:0 16px;
 border:1.5px dashed var(--gold-500);border-radius:var(--radius-md);color:var(--gold-700);font-weight:600;font-size:var(--fs-small);
 background:rgba(200,161,74,.06);transition:background var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out)}
.nbq-upload:hover{background:rgba(200,161,74,.13);border-color:var(--gold-600)}
.nbq-upload__t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nbq-upload input{display:none}

.nbq-seal{width:64px;height:64px;border-radius:50%;background:var(--grad-gold);margin:0 auto;display:grid;place-items:center;
 color:var(--charcoal-900);font-size:30px;font-weight:800;box-shadow:0 10px 28px rgba(168,121,31,.4)}

@media (max-width:860px){
 .nbq-grid{grid-template-columns:1fr}
 .nbq-row2{grid-template-columns:1fr}
}
`;
Object.assign(window, {
  QuoteSection
});

/* ===== CTABand.jsx ===== */
/* Reusable crimson call-to-action band */
function CTABand({
  whatsapp = '0614453680',
  title = 'Ready to bring your idea to thread?',
  text = 'Send us your details and we’ll reply with a tailored quotation after reviewing your requirements.'
}) {
  const {
    Button,
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--grad-crimson)',
      color: 'var(--cream-50)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-gold-transparent.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '-3%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 320,
      opacity: 0.07,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-md)',
      margin: '0 auto',
      padding: 'clamp(48px,7vw,88px) var(--gutter)',
      textAlign: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      color: 'rgba(250,244,232,0.82)',
      margin: '14px auto 0',
      maxWidth: 520,
      lineHeight: 'var(--lh-normal)'
    }
  }, text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    size: "lg",
    as: "a",
    href: "contact.html"
  }, "Request a quote"), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: whatsapp,
    variant: "dark",
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services.",
    style: {
      height: 'var(--control-h-lg)'
    }
  }, "Chat on WhatsApp"))));
}
Object.assign(window, {
  CTABand
});

/* ===== Footer.jsx ===== */
/* Nosibele website — footer (reads window.NB_CONFIG) */
const NB_SOCIAL_ICON = {
  tiktok: 'M16.5 3c.3 2 1.6 3.6 3.5 3.9v2.8c-1.3.1-2.6-.3-3.6-1v6.1a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.9a2.9 2.9 0 1 0 2 2.8V3z',
  instagram: 'M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zM12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM17.5 6.5h.01',
  facebook: 'M14 9V7.5c0-.7.3-1 1-1h1.5V3.5H14c-2.2 0-3.5 1.3-3.5 3.7V9H8v3h2.5v8.5h3.5V12h2.3l.4-3z'
};
function SocialIcon({
  kind
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: kind === 'tiktok' || kind === 'facebook' ? 'currentColor' : 'none',
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: NB_SOCIAL_ICON[kind]
  }));
}
function Footer({
  whatsapp
}) {
  const {
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  const C = window.NB_CONFIG || {};
  const WA = whatsapp || C.whatsapp || '0614453680';
  const a = C.address || {};
  const e = C.emails || {};
  const s = C.socials || {};
  const cols = [['Products', 'products.html', ['Corporate wear', 'Sportswear', 'Traditional wear', 'School & outerwear', 'Workwear', 'Accessories']], ['Services', 'services.html', ['Embroidery', 'DTF printing', 'Sublimation printing', 'Logo & name branding', 'Corporate branding', 'Bulk orders']], ['Explore', null, ['Home', 'Gallery', 'About us', 'Request a quote', 'WhatsApp us']]];
  const exploreHrefs = {
    'Home': '/',
    'Gallery': 'gallery.html',
    'About us': 'about.html',
    'Request a quote': 'contact.html',
    'WhatsApp us': (typeof window !== 'undefined' && window.NB_CONFIG && typeof window.NB_CONFIG.waLink === 'function') ? window.NB_CONFIG.waLink(window.NB_CONFIG.waMessages.general) : 'https://wa.me/27614453680?text=' + encodeURIComponent('Hello Nosibele Design & Embroidery, I would like to enquire about your services.')
  };
  const linkS = {
    color: 'var(--text-on-dark-muted)',
    textDecoration: 'none',
    fontSize: 'var(--fs-small)'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'linear-gradient(165deg, var(--burgundy-500) 0%, var(--burgundy-700) 100%)',
      color: 'var(--cream-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter) var(--space-7)',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: 'clamp(24px,3vw,48px)'
    },
    className: "nb-foot"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-gold-transparent.png",
    alt: "Nosibele Design & Embroidery",
    style: {
      width: 176,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--gold-pale)',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: '1.15rem',
      margin: '0 0 16px'
    }
  }, C.slogan || 'We Design. We Stitch. We Inspire.'), /*#__PURE__*/React.createElement("address", {
    style: {
      fontStyle: 'normal',
      color: 'var(--text-on-dark-muted)',
      fontSize: 'var(--fs-small)',
      lineHeight: 1.7,
      margin: '0 0 14px'
    }
  }, a.line1, /*#__PURE__*/React.createElement("br", null), a.line2, /*#__PURE__*/React.createElement("br", null), a.line3, /*#__PURE__*/React.createElement("br", null), a.city, ", ", a.province, /*#__PURE__*/React.createElement("br", null), a.country), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: C.phoneHref || 'tel:+27614453680',
    className: "nb-foot-link",
    style: linkS
  }, C.phone || '061 445 3680'), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.info || 'info@nosibeleembroidery.co.za') + '?subject=General%20Enquiry',
    className: "nb-foot-link",
    style: linkS
  }, e.info || 'info@nosibeleembroidery.co.za'), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.quotes || 'quotes@nosibeleembroidery.co.za') + '?subject=Quotation%20Request',
    className: "nb-foot-link",
    style: linkS
  }, e.quotes || 'quotes@nosibeleembroidery.co.za')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 18
    }
  }, ['tiktok', 'instagram', 'facebook'].map(k => s[k] && s[k].url && /*#__PURE__*/React.createElement("a", {
    key: k,
    href: s[k].url,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": s[k].label,
    className: "nb-foot-soc",
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: '1px solid var(--border-on-dark)',
      color: 'var(--gold-pale)',
      display: 'grid',
      placeItems: 'center',
      textDecoration: 'none',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(SocialIcon, {
    kind: k
  })))), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    message: C.waMessages ? C.waMessages.general : 'Hello Nosibele Design & Embroidery, I would like to enquire about your services.'
  }, "Chat on WhatsApp")), cols.map(([h, href, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-pale)',
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, items.map(i => {
    const itemHref = href || exploreHrefs[i] || '#';
    const isWa = /^https:\/\/wa\.me\//.test(itemHref);
    return /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: itemHref,
    className: "nb-foot-link",
    style: linkS,
    target: isWa ? '_blank' : undefined,
    rel: isWa ? 'noopener noreferrer' : undefined,
    "aria-label": isWa ? 'Chat with Nosibele Design & Embroidery on WhatsApp' : undefined
  }, i));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '18px var(--gutter) 6px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '6px 20px',
      flexWrap: 'wrap',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gold-pale)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, C.legalName || 'Nosibele (Pty) Ltd'), /*#__PURE__*/React.createElement("span", null, "Registration No. ", C.registrationNo || '2024/152263/07'), /*#__PURE__*/React.createElement("span", null, C.address && C.address.province || 'KwaZulu-Natal', ", ", C.address && C.address.country || 'South Africa')), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '8px var(--gutter) 20px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Nosibele Design & Embroidery. All rights reserved."), /*#__PURE__*/React.createElement("span", {
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
  }, "Website Terms"), /*#__PURE__*/React.createElement("a", {
    href: "/commercial-terms.html",
    className: "nb-foot-link",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Quotation & Order Terms"), /*#__PURE__*/React.createElement("a", {
    href: "/cancellation-refund.html",
    className: "nb-foot-link",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Cancellation & Refunds"), /*#__PURE__*/React.createElement("a", {
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
    },
    onClick: e => {
      e.preventDefault();
      if (window.nbOpenCookieSettings) window.nbOpenCookieSettings();
    }
  }, "Cookie Settings"))), C.credit && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '14px var(--gutter)',
      textAlign: 'center',
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-on-dark-muted)'
    }
  }, "Designed & Built by ", /*#__PURE__*/React.createElement("a", {
    href: C.credit.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nb-foot-link",
    style: {
      color: 'var(--gold-pale)',
      textDecoration: 'none',
      fontWeight: 600
    }
  }, C.credit.name)))), /*#__PURE__*/React.createElement("style", null, `.nb-foot-link:hover{ color: var(--gold-pale) !important; } .nb-foot-soc:hover{ background: var(--gold-500); color: var(--burgundy-700) !important; border-color: var(--gold-500); } @media (max-width:760px){ .nb-foot{ grid-template-columns: 1fr 1fr; } }`));
}
Object.assign(window, {
  Footer
});

/* ===== BackToTop.jsx ===== */
/* Nosibele — floating "back to top" button (returns to the hero) */
function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const toTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  return /*#__PURE__*/React.createElement("button", {
    onClick: toTop,
    "aria-label": "Back to top",
    title: "Back to top",
    style: {
      position: 'fixed',
      left: 'clamp(16px,4vw,32px)',
      bottom: 'clamp(16px,4vw,32px)',
      zIndex: 80,
      width: 52,
      height: 52,
      borderRadius: '50%',
      cursor: 'pointer',
      background: 'var(--surface-card)',
      color: 'var(--crimson-500)',
      border: '1px solid var(--border-gold)',
      boxShadow: 'var(--shadow-lg)',
      display: 'grid',
      placeItems: 'center',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(12px)',
      pointerEvents: show ? 'auto' : 'none',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)'
    },
    className: "nb-totop"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 19V5M5 12l7-7 7 7"
  })), /*#__PURE__*/React.createElement("style", null, `.nb-totop:hover{ background: var(--crimson-500); color: var(--cream-50); border-color: var(--crimson-500); }`));
}
Object.assign(window, {
  BackToTop
});

/* ===== App.jsx ===== */
/* Nosibele website — app shell */
function App() {
  const {
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  const WA = window.NB_CATALOGUE && window.NB_CATALOGUE.WHATSAPP || '0614453680';
  const [preselect, setPreselect] = React.useState('');
  const scrollToQuote = () => {
    const el = document.getElementById('quote');
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 12,
      behavior: 'smooth'
    });
  };
  const requestItem = it => {
    if (it && it.title) setPreselect(it.title + ' #' + Date.now()); // unique suffix forces effect re-run
    scrollToQuote();
  };
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const item = (params.get('item') || '').trim();
      if (item) {
        setPreselect(item.slice(0, 120) + ' #' + Date.now());
        // Defer scroll until after paint so #quote exists in the hydrated tree.
        requestAnimationFrame(() => scrollToQuote());
      } else if ((window.location.hash || '') === '#quote') {
        requestAnimationFrame(() => scrollToQuote());
      }
    } catch (err) { /* ignore malformed query */ }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
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
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav, {
    onQuote: scrollToQuote,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(Hero, {
    onQuote: scrollToQuote,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(TrustBand, null), /*#__PURE__*/React.createElement(Products, {
    onRequest: requestItem,
    whatsapp: WA,
    featuredLimit: 6,
    ctaHref: "products.html"
  }), /*#__PURE__*/React.createElement(Services, {
    onRequest: requestItem,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(Testimonial, null), /*#__PURE__*/React.createElement(HomeFaq, null), /*#__PURE__*/React.createElement(QuoteSection, {
    preselect: preselect,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(Footer, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    floating: true,
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services."
  }), /*#__PURE__*/React.createElement(BackToTop, null));
}
Object.assign(window, {
  App
});

/* ===== ProductsPage.jsx ===== */
/* Products page */
function ProductsPage() {
  const WA = window.NB_CATALOGUE && window.NB_CATALOGUE.WHATSAPP || '0614453680';
  const {
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  const toQuote = it => {
    location.href = 'contact.html?item=' + encodeURIComponent(it.title);
  };
  return /*#__PURE__*/React.createElement("div", {
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
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav, {
    current: "products",
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Our Products",
    tone: "cream",
    title: "A digital showroom of custom apparel",
    subtitle: "Every piece is made to order and hand-finished in our South African studio. Browse the range, then request a tailored quote on whatever catches your eye."
  }), /*#__PURE__*/React.createElement(Products, {
    showHead: false,
    grouped: true,
    onRequest: toQuote,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(CTABand, {
    whatsapp: WA,
    title: "Don\u2019t see exactly what you need?",
    text: "We make almost anything to order. Tell us your idea and we\u2019ll quote it."
  }), /*#__PURE__*/React.createElement(Footer, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    floating: true,
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services."
  }), /*#__PURE__*/React.createElement(BackToTop, null));
}
Object.assign(window, {
  ProductsPage
});

/* ===== ServicesPage.jsx ===== */
/* Services page */
function ServicesPage() {
  const WA = window.NB_CATALOGUE && window.NB_CATALOGUE.WHATSAPP || '0614453680';
  const {
    WhatsAppButton
  } = window.NosibeleDesignSystem_4fcb98;
  const toQuote = it => {
    location.href = 'contact.html?item=' + encodeURIComponent(it.title);
  };
  return /*#__PURE__*/React.createElement("div", {
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
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav, {
    current: "services",
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Our Services",
    tone: "cream",
    title: "Every way we bring your brand to life",
    subtitle: "From a single embroidered name to a full corporate uniform programme \u2014 choose a service and we\u2019ll take it from there."
  }), /*#__PURE__*/React.createElement(Services, {
    showHead: true,
    onRequest: toQuote,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(CTABand, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(Footer, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    floating: true,
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services."
  }), /*#__PURE__*/React.createElement(BackToTop, null));
}
Object.assign(window, {
  ServicesPage
});

/* ===== AboutPage.jsx ===== */
/* About page */
function AboutPage() {
  const WA = window.NB_CATALOGUE && window.NB_CATALOGUE.WHATSAPP || '0614453680';
  const {
    WhatsAppButton,
    Button
  } = window.NosibeleDesignSystem_4fcb98;
  const values = [['01', 'Craftsmanship', 'We take care with placement, stitching and finishing, and check work before it leaves the studio.'], ['02', 'Quality', 'We use quality thread, fabric and finishes suited to the garment and branding method agreed on your quotation.'], ['03', 'Warmth', 'We treat a single monogrammed gift with the same care as a full team’s order.'], ['04', 'Reliability', 'We communicate lead times clearly and confirm timing on each quotation.']];
  return /*#__PURE__*/React.createElement("div", {
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
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav, {
    current: "about",
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Our Story",
    tone: "crimson",
    title: "Threaded with intention, worn with pride.",
    subtitle: "Nosibele Design & Embroidery is a South African studio for bespoke embroidery, sublimation, DTF printing and custom apparel."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr)',
      gap: 'clamp(28px,5vw,72px)',
      alignItems: 'center'
    },
    className: "nb-2col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      aspectRatio: '4/5'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/catalogue/custom-apparel.webp",
    alt: "Custom embroidered apparel by Nosibele",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-600)'
    }
  }, "Who we are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h1)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      margin: '12px 0 0'
    }
  }, "A studio built on detail."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-lead)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '18px 0 0'
    }
  }, "We bring brands, teams and personal stories to life in thread and print. What started as a love of hand-finished detail has grown into a full custom-apparel house \u2014 embroidery, sublimation, DTF printing and made-to-order garments."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '14px 0 0'
    }
  }, "From corporate uniforms and workwear to ceremonial pieces and one-off gifts, we focus on careful finishing and apparel made to the specification we agree with you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      marginTop: 30,
      flexWrap: 'wrap'
    }
  }, [['Est. 2024', 'Durban studio'], ['Made to order', 'Quote-based production'], ['Typical lead time', 'Confirmed on quotation']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 30,
      color: 'var(--text-strong)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 2
    }
  }, l)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-cream)',
      borderTop: '1px solid var(--border-hairline)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "What we stand for",
    title: "The values behind every order",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))',
      gap: 'clamp(16px,2vw,26px)',
      marginTop: 'var(--space-7)'
    }
  }, values.map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-card)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-sm)',
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 30,
      color: 'var(--gold-600)',
      borderBottom: '1px solid var(--border-hairline)',
      paddingBottom: 12,
      marginBottom: 14
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h3)',
      color: 'var(--text-strong)',
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-small)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, d)))))), /*#__PURE__*/React.createElement(Craft, null), /*#__PURE__*/React.createElement(Testimonial, null), /*#__PURE__*/React.createElement(CTABand, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(Footer, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    floating: true,
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services."
  }), /*#__PURE__*/React.createElement(BackToTop, null), /*#__PURE__*/React.createElement("style", null, `@media (max-width: 860px){ .nb-2col{ grid-template-columns: 1fr; } }`));
}
Object.assign(window, {
  AboutPage
});

/* ===== GalleryPage.jsx ===== */
/* Gallery / lookbook page — masonry + craftsmanship close-ups + lightbox */
function GalleryPage() {
  const WA = window.NB_CATALOGUE && window.NB_CATALOGUE.WHATSAPP || '0614453680';
  const {
    WhatsAppButton,
    Button
  } = window.NosibeleDesignSystem_4fcb98;
  const products = window.NB_CATALOGUE && window.NB_CATALOGUE.PRODUCTS || [];
  const groups = window.NB_CATALOGUE && window.NB_CATALOGUE.PRODUCT_GROUPS || [];
  const craft = [{
    slug: 'closeup',
    group: 'Craftsmanship',
    cat: 'Craftsmanship',
    title: 'The embroidered gold crest',
    img: 'assets/embroidery-closeup.webp',
    desc: 'A close-up of our signature gold embroidery — raised, precise and built to last.'
  }, {
    slug: 'jersey',
    group: 'Craftsmanship',
    cat: 'Sportswear',
    title: 'Nosibele signature jersey',
    img: 'assets/hero-uniform.webp',
    desc: 'Full-colour sublimation finished with an embroidered chest crest.'
  }];
  const tiles = craft.concat((window.NB_CATALOGUE && window.NB_CATALOGUE.GALLERY) || [], products);
  const filters = ['All', 'Craftsmanship'].concat(groups);
  const [active, setActive] = React.useState('All');
  const [light, setLight] = React.useState(null);
  const closeRef = React.useRef(null);
  const shown = tiles.filter(t => active === 'All' || t.group === active);
  React.useEffect(() => {
    if (!light) {
      document.body.classList.remove('nb-nav-lock');
      return;
    }
    document.body.classList.add('nb-nav-lock');
    const onKey = e => {
      if (e.key === 'Escape') setLight(null);
    };
    window.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('nb-nav-lock');
    };
  }, [light]);
  return /*#__PURE__*/React.createElement("div", {
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
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav, {
    current: "gallery",
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Lookbook",
    tone: "crimson",
    title: "A gallery of work we\u2019re proud of",
    subtitle: "Real pieces from the Nosibele studio \u2014 embroidery, sublimation, DTF printing and custom apparel. Tap any image to take a closer look."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 'var(--space-8)'
    }
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setActive(f),
    style: {
      border: '1px solid',
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      padding: '9px 20px',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 'var(--fs-small)',
      transition: 'all var(--dur-base) var(--ease-out)',
      background: active === f ? 'var(--crimson-500)' : 'transparent',
      color: active === f ? 'var(--cream-50)' : 'var(--text-body)',
      borderColor: active === f ? 'var(--crimson-500)' : 'var(--border-soft)'
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      columnWidth: 'clamp(240px, 28vw, 320px)',
      columnGap: 'clamp(14px,1.6vw,22px)'
    }
  }, shown.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.slug,
    onClick: () => setLight(p),
    className: "nb-gal",
    style: {
      display: 'block',
      width: '100%',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      background: 'var(--cream-200)',
      position: 'relative',
      marginBottom: 'clamp(14px,1.6vw,22px)',
      breakInside: 'avoid',
      WebkitColumnBreakInside: 'avoid'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.alt || p.title,
    loading: "lazy",
    style: {
      width: '100%',
      height: 'auto',
      display: 'block',
      transition: 'transform 900ms var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "nb-gal__ov",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)',
      opacity: 0,
      transition: 'opacity var(--dur-base) var(--ease-out)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      padding: 18,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-pale)'
    }
  }, p.cat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '1.3rem',
      color: 'var(--cream-50)',
      lineHeight: 1.1,
      marginTop: 4
    }
  }, p.title)))))), /*#__PURE__*/React.createElement(CTABand, {
    whatsapp: WA,
    title: "Like what you see?",
    text: "Tell us what you\u2019d like made and we\u2019ll prepare a quotation after reviewing your requirements."
  }), /*#__PURE__*/React.createElement(Footer, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    floating: true,
    message: window.NB_CONFIG && window.NB_CONFIG.waMessages ? window.NB_CONFIG.waMessages.general : "Hello Nosibele Design & Embroidery, I would like to enquire about your services."
  }), /*#__PURE__*/React.createElement(BackToTop, null), light && /*#__PURE__*/React.createElement("div", {
    onClick: () => setLight(null),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": light.title || 'Gallery image',
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(53,8,16,0.86)',
      backdropFilter: 'blur(6px)',
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      maxWidth: 920,
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)',
      boxShadow: 'var(--shadow-xl)',
      position: 'relative'
    },
    className: "nb-light"
  }, /*#__PURE__*/React.createElement("button", {
    ref: closeRef,
    type: "button",
    onClick: () => setLight(null),
    "aria-label": "Close image",
    className: "nb-light__close",
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 2,
      minWidth: 44,
      minHeight: 44,
      borderRadius: 12,
      border: '1px solid var(--border-soft)',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      fontWeight: 700
    }
  }, "Close"), /*#__PURE__*/React.createElement("img", {
    src: light.img,
    alt: light.alt || light.title,
    loading: "eager",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      maxHeight: '82vh'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-7)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-overline)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-overline)',
      color: 'var(--gold-600)'
    }
  }, light.cat), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--fs-h2)',
      color: 'var(--text-strong)',
      margin: '10px 0 0'
    }
  }, light.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      margin: '12px 0 22px'
    }
  }, light.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    as: "a",
    href: 'contact.html?item=' + encodeURIComponent(light.title)
  }, "Request a quote"), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    message: window.NB_CONFIG ? window.NB_CONFIG.waMessage(light.title) : 'Hello Nosibele Design & Embroidery,\n\nI would like a quotation for the ' + light.title + '.'
  }, "WhatsApp"))))), /*#__PURE__*/React.createElement("style", null, `
        .nb-gal:hover img { transform: scale(1.05); }
        .nb-gal:hover .nb-gal__ov { opacity: 1; }
        @media (max-width: 720px){ .nb-light{ grid-template-columns: 1fr !important; } }
      `));
}
Object.assign(window, {
  GalleryPage
});

/* ===== ContactPage.jsx ===== */
/* Contact page (reads window.NB_CONFIG) */
function ContactPage() {
  const {
    WhatsAppButton,
    Button
  } = window.NosibeleDesignSystem_4fcb98;
  const C = window.NB_CONFIG || {};
  const WA = C.whatsapp || '0614453680';
  const a = C.address || {},
    e = C.emails || {},
    s = C.socials || {};
  const params = new URLSearchParams(location.search);
  const preItem = params.get('item') || '';
  const [mapActive, setMapActive] = React.useState(false);
  const cardS = {
    background: 'var(--surface-card)',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--border-hairline)',
    boxShadow: 'var(--shadow-sm)',
    padding: 'var(--space-6)',
    minWidth: 0,
    textAlign: 'left'
  };
  const eyeS = {
    fontSize: 'var(--fs-overline)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 'var(--ls-overline)',
    color: 'var(--gold-600)'
  };
  const valS = {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 'var(--fs-h3)',
    color: 'var(--text-strong)',
    margin: '8px 0 6px',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word'
  };
  const subS = {
    fontSize: 'var(--fs-small)',
    lineHeight: 'var(--lh-normal)',
    color: 'var(--text-body)',
    margin: 0,
    overflowWrap: 'anywhere'
  };
  const linkS = {
    color: 'var(--crimson-500)',
    textDecoration: 'none',
    fontWeight: 600,
    overflowWrap: 'anywhere'
  };
  const faqs = [{
    q: 'How do I get a quote?',
    a: 'Fill in the form below or message us on WhatsApp with what you’d like, roughly how many pieces, and your logo or artwork. We’ll reply with a tailored quotation after reviewing your requirements.'
  }, {
    q: 'What’s your turnaround time?',
    a: 'Lead times depend on quantity, method and current studio workload. Typical timing is discussed with you and confirmed on your quotation after artwork approval.'
  }, {
    q: 'Do you handle bulk and corporate orders?',
    a: 'Yes. Uniforms, workwear, team kit and corporate branding are a big part of what we do. Bulk pricing depends on garment, quantity and branding method.'
  }, {
    q: 'Can you work from my own logo or artwork?',
    a: 'Yes. Attach PNG, JPG or PDF artwork on the quotation form so it arrives with your request at quotes@nosibeleembroidery.co.za. You can also send files later by WhatsApp if needed. We’ll digitise for embroidery or prepare for print, or design artwork from scratch if required.'
  }, {
    q: 'How do I follow up on a confirmed order or payment?',
    a: 'For order updates, collection or delivery queries, email orders@nosibeleembroidery.co.za. For invoices, payments or account queries, email accounts@nosibeleembroidery.co.za.'
  }, {
    q: 'Embroidery, sublimation or DTF — which do I need?',
    a: 'Embroidery is premium thread branding for logos and names. Sublimation prints edge-to-edge colour into the fabric. DTF transfers crisp, detailed full-colour designs onto a garment. Not sure? We’ll advise the best fit.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "nb-contact-page",
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
  }, "Skip to content"), /*#__PURE__*/React.createElement(Nav, {
    current: "contact",
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Contact",
    tone: "cream",
    title: "Let\u2019s talk about your order",
    subtitle: "Visit our Durban studio, call us, or request a quotation below \u2014 submitting the form is a request for a quote, not an accepted order."
  }), /*#__PURE__*/React.createElement("section", {
    className: "nb-contact",
    "aria-label": "Contact details and studio map",
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.15fr)',
      gap: 'clamp(24px,4vw,56px)',
      alignItems: 'start'
    },
    className: "nb-2col nb-contact__grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 'clamp(14px,1.6vw,20px)'
    },
    className: "nb-info nb-contact__cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nb-contact-card",
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: eyeS
  }, "Call us"), /*#__PURE__*/React.createElement("div", {
    style: valS
  }, /*#__PURE__*/React.createElement("a", {
    href: C.phoneHref || 'tel:+27614453680',
    style: {
      color: 'inherit',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, C.phone || '061 445 3680')), /*#__PURE__*/React.createElement("p", {
    style: subS
  }, "Tap to call, or message us on WhatsApp.")), /*#__PURE__*/React.createElement("div", {
    className: "nb-contact-card",
    style: {
      ...cardS,
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: eyeS
  }, "Email"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...subS,
      marginTop: 10
    }
  }, "General enquiries: ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.info || 'info@nosibeleembroidery.co.za') + '?subject=General%20Enquiry',
    style: linkS
  }, e.info || 'info@nosibeleembroidery.co.za')), /*#__PURE__*/React.createElement("p", {
    style: {
      ...subS,
      marginTop: 6
    }
  }, "Quotation requests: ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.quotes || 'quotes@nosibeleembroidery.co.za') + '?subject=Quotation%20Request',
    style: linkS
  }, e.quotes || 'quotes@nosibeleembroidery.co.za')), /*#__PURE__*/React.createElement("p", {
    style: {
      ...subS,
      marginTop: 6
    }
  }, "Attach logos and artwork on the quotation form (PNG, JPG or PDF) so they arrive with your request at ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.quotes || 'quotes@nosibeleembroidery.co.za') + '?subject=Quotation%20Request',
    style: linkS
  }, e.quotes || 'quotes@nosibeleembroidery.co.za'), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...subS,
      marginTop: 6
    }
  }, "For order updates, email ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.orders || 'orders@nosibeleembroidery.co.za') + '?subject=Order%20Enquiry',
    style: linkS
  }, e.orders || 'orders@nosibeleembroidery.co.za')), /*#__PURE__*/React.createElement("p", {
    style: {
      ...subS,
      marginTop: 6
    }
  }, "For invoices or payment queries, email ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + (e.accounts || 'accounts@nosibeleembroidery.co.za') + '?subject=Payment%20or%20Invoice%20Query',
    style: linkS
  }, e.accounts || 'accounts@nosibeleembroidery.co.za'))), /*#__PURE__*/React.createElement("div", {
    className: "nb-contact-card",
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: eyeS
  }, "Visit the studio"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...valS,
      fontSize: '1.05rem'
    }
  }, a.line1, ", ", a.line2), /*#__PURE__*/React.createElement("p", {
    style: subS
  }, a.line3, /*#__PURE__*/React.createElement("br", null), a.city, ", ", a.province, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: a.maps,
    target: "_blank",
    rel: "noopener noreferrer",
    style: linkS
  }, "Get directions \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "nb-contact-card",
    style: cardS
  }, /*#__PURE__*/React.createElement("div", {
    style: eyeS
  }, "Business hours"), /*#__PURE__*/React.createElement("ul", {
    className: "nb-contact-hours",
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '10px 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, (C.hours || []).map(([d, h]) => /*#__PURE__*/React.createElement("li", {
    key: d,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      fontSize: 'var(--fs-small)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, d), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      flex: 'none',
      color: h === 'Closed' ? 'var(--crimson-500)' : 'var(--text-strong)'
    }
  }, h))))), /*#__PURE__*/React.createElement("div", {
    className: "nb-contact-card nb-contact-card--social",
    style: {
      ...cardS,
      gridColumn: '1 / -1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: eyeS
  }, "Follow the craft"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...subS,
      marginTop: 6
    }
  }, "One brand across TikTok, Instagram & Facebook.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, ['tiktok', 'instagram', 'facebook'].map(k => s[k] && s[k].url && /*#__PURE__*/React.createElement("a", {
    key: k,
    href: s[k].url,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": s[k].label,
    className: "nb-soc",
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      border: '1px solid var(--border-gold)',
      color: 'var(--gold-700)',
      display: 'grid',
      placeItems: 'center',
      textDecoration: 'none',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(SocialIcon, {
    kind: k
  })))))), /*#__PURE__*/React.createElement("div", {
    className: 'nb-contact-map' + (mapActive ? ' is-active' : ''),
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-hairline)',
      width: '100%',
      maxWidth: '100%',
      minHeight: 360,
      height: 'min(520px, 70vh)',
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Nosibele Design and Embroidery studio location on Google Maps",
    src: a.embed,
    width: "100%",
    height: "100%",
    style: {
      border: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      filter: 'saturate(0.92)',
      pointerEvents: mapActive ? 'auto' : 'none'
    },
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    allowFullScreen: true,
    tabIndex: mapActive ? 0 : -1
  }), !mapActive && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nb-contact-map__overlay",
    onClick: () => setMapActive(true),
    "aria-label": "Tap to interact with map"
  }, /*#__PURE__*/React.createElement("span", null, "Tap to interact with map")), /*#__PURE__*/React.createElement("a", {
    className: "nb-contact-map__directions",
    href: a.maps,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Get directions")))), /*#__PURE__*/React.createElement(QuoteSection, {
    preselect: preItem,
    whatsapp: WA
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-md)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(FAQList, {
    items: faqs,
    heading: "Frequently asked"
  })), /*#__PURE__*/React.createElement(Footer, {
    whatsapp: WA
  }), /*#__PURE__*/React.createElement(WhatsAppButton, {
    phone: WA,
    floating: true,
    message: C.waMessages ? C.waMessages.general : 'Hello Nosibele Design & Embroidery, I would like to enquire about your services.'
  }), /*#__PURE__*/React.createElement(BackToTop, null), /*#__PURE__*/React.createElement("style", null, `
.nb-soc:hover{ background: var(--gold-500); color: var(--charcoal-900) !important; border-color: var(--gold-500); }
.nb-contact-map__overlay{
  position:absolute; inset:0; z-index:2; border:0; cursor:pointer;
  display:flex; align-items:flex-end; justify-content:center;
  padding:16px; background:linear-gradient(180deg, transparent 45%, rgba(34,29,26,.45) 100%);
  color:#fffdf8; font: inherit; font-weight:700; font-size:.95rem;
}
.nb-contact-map__overlay span{
  background:rgba(34,29,26,.82); border:1px solid rgba(200,161,74,.55);
  border-radius:999px; padding:10px 16px; min-height:44px; display:inline-flex; align-items:center;
}
.nb-contact-map__directions{
  position:absolute; top:12px; left:12px; z-index:3;
  background:var(--surface-card); color:var(--crimson-600); font-weight:700; font-size:.85rem;
  text-decoration:none; border:1px solid var(--border-hairline); border-radius:999px;
  padding:8px 12px; min-height:40px; display:inline-flex; align-items:center;
  box-shadow:var(--shadow-sm);
}
.nb-contact-map.is-active .nb-contact-map__overlay{ display:none; }
@media (max-width: 1023px){
  .nb-contact__grid.nb-2col{ grid-template-columns: 1fr !important; }
  .nb-contact-map{
    height: 340px !important; min-height: 320px !important; max-height: 380px !important;
    width: 100% !important; max-width: 100% !important; position: relative !important;
  }
}
@media (max-width: 768px){
  .nb-contact__cards.nb-info{ grid-template-columns: minmax(0,1fr) minmax(0,1fr) !important; }
}
@media (max-width: 480px){
  .nb-contact__cards.nb-info{ grid-template-columns: 1fr !important; }
  .nb-contact-card--social{ flex-direction: column; align-items: flex-start !important; }
}
@media (min-width: 1024px){
  .nb-contact__grid.nb-2col{ grid-template-columns: minmax(280px,1fr) minmax(320px,1.15fr); }
}
`));
}
Object.assign(window, {
  ContactPage
});
