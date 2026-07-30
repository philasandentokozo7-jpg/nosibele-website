/*!
 * Nosibele cookie consent — session-scoped choices (sessionStorage).
 * Optional analytics (Google Analytics) stays blocked until Accept / category allow.
 * Appears on every fresh browser session until the visitor chooses.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'nb_consent_v2';
  var LEGACY_KEY = 'nb_consent';
  var GA_ID = 'G-WH87LWEPJB';

  var DEFAULTS = {
    necessary: true,
    analytics: false,
    marketing: false,
    media: false
  };

  function readChoice() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeChoice(choice) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    } catch (e) { /* private mode */ }
    try {
      localStorage.removeItem(LEGACY_KEY);
    } catch (e2) { /* ignore */ }
  }

  function clearOptionalCookies() {
    try {
      var cookies = document.cookie ? document.cookie.split(';') : [];
      for (var i = 0; i < cookies.length; i++) {
        var name = cookies[i].split('=')[0].trim();
        if (!name) continue;
        if (/^(_ga|_gid|_gat|AMP_TOKEN)/i.test(name) || name.indexOf('_ga_') === 0) {
          document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
          document.cookie = name + '=; Max-Age=0; path=/; domain=.' + location.hostname + '; SameSite=Lax';
        }
      }
    } catch (e) { /* ignore */ }
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  window.nbLoadAnalytics = function () {
    if (window.__nbGA) return;
    window.__nbGA = true;
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      } catch (e) { /* ignore */ }
    }
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  };

  function setDefaultConsentDenied() {
    try {
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500
      });
    } catch (e) { /* ignore */ }
  }

  function applyChoice(choice) {
    if (!choice) return;
    if (choice.analytics) {
      window.nbLoadAnalytics();
    } else {
      clearOptionalCookies();
      try {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      } catch (e) { /* ignore */ }
    }
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  var lastFocus = null;
  var panelOpen = false;

  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    var focusables = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    var list = Array.prototype.filter.call(focusables, function (n) { return !n.disabled && n.offsetParent !== null; });
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function hide(ui) {
    ui.root.hidden = true;
    ui.root.setAttribute('aria-hidden', 'true');
    ui.prefs.hidden = true;
    document.documentElement.classList.remove('nb-consent-open');
    panelOpen = false;
    if (lastFocus && typeof lastFocus.focus === 'function') {
      try { lastFocus.focus(); } catch (e) { /* ignore */ }
    }
  }

  function showBanner(ui) {
    ui.root.hidden = false;
    ui.root.setAttribute('aria-hidden', 'false');
    ui.banner.hidden = false;
    ui.prefs.hidden = true;
    document.documentElement.classList.add('nb-consent-open');
    panelOpen = true;
    setTimeout(function () {
      var btn = ui.banner.querySelector('button');
      if (btn) btn.focus();
    }, 0);
  }

  function showPrefs(ui, seed) {
    ui.root.hidden = false;
    ui.root.setAttribute('aria-hidden', 'false');
    ui.banner.hidden = true;
    ui.prefs.hidden = false;
    document.documentElement.classList.add('nb-consent-open');
    panelOpen = true;
    ui.analytics.checked = !!(seed && seed.analytics);
    ui.marketing.checked = !!(seed && seed.marketing);
    ui.media.checked = !!(seed && seed.media);
    setTimeout(function () {
      ui.analytics.focus();
    }, 0);
  }

  function decide(ui, choice) {
    writeChoice(choice);
    applyChoice(choice);
    hide(ui);
    var live = document.getElementById('nb-consent-live');
    if (live) live.textContent = 'Cookie preferences saved for this browsing session.';
  }

  function buildUI() {
    var root = el('div', {
      id: 'nb-consent',
      className: 'nb-consent',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'nb-consent-title',
      'aria-describedby': 'nb-consent-desc',
      hidden: 'true',
      'aria-hidden': 'true'
    });

    var banner = el('div', { className: 'nb-consent__banner' }, [
      el('div', { className: 'nb-consent__copy' }, [
        el('h2', { id: 'nb-consent-title', className: 'nb-consent__title', text: 'Cookies & privacy choices' }),
        el('p', {
          id: 'nb-consent-desc',
          className: 'nb-consent__text',
          html: 'We use necessary storage to run this website. Optional analytics help us understand visits and only load if you agree. Read our <a href="/cookies.html">Cookie Policy</a> and <a href="/privacy.html">Privacy Notice</a>.'
        })
      ]),
      el('div', { className: 'nb-consent__actions' }, [
        el('button', { type: 'button', className: 'nb-consent__btn nb-consent__btn--ghost', id: 'nb-consent-reject', text: 'Reject non-essential' }),
        el('button', { type: 'button', className: 'nb-consent__btn nb-consent__btn--secondary', id: 'nb-consent-manage', text: 'Manage preferences' }),
        el('button', { type: 'button', className: 'nb-consent__btn nb-consent__btn--primary', id: 'nb-consent-accept', text: 'Accept all' })
      ])
    ]);

    var prefs = el('div', { className: 'nb-consent__prefs', hidden: 'true', id: 'nb-consent-prefs' }, [
      el('div', { className: 'nb-consent__prefs-head' }, [
        el('h2', { className: 'nb-consent__title', text: 'Cookie preferences' }),
        el('button', { type: 'button', className: 'nb-consent__close', id: 'nb-consent-close', 'aria-label': 'Close cookie preferences', text: '×' })
      ]),
      el('p', {
        className: 'nb-consent__text',
        html: 'Necessary storage always stays on. Optional categories are off unless you enable them. Details are in the <a href="/cookies.html">Cookie Policy</a>.'
      }),
      el('div', { className: 'nb-consent__cats' }, [
        el('label', { className: 'nb-consent__cat' }, [
          el('span', null, [
            el('strong', { text: 'Necessary' }),
            el('span', { className: 'nb-consent__cat-desc', text: 'Required for basic site function and remembering this session’s privacy choice.' })
          ]),
          el('input', { type: 'checkbox', checked: 'checked', disabled: 'disabled', 'aria-label': 'Necessary cookies always on' })
        ]),
        el('label', { className: 'nb-consent__cat' }, [
          el('span', null, [
            el('strong', { text: 'Analytics' }),
            el('span', { className: 'nb-consent__cat-desc', text: 'Google Analytics (privacy-friendly IP anonymisation) to measure page use.' })
          ]),
          el('input', { type: 'checkbox', id: 'nb-consent-analytics', 'aria-label': 'Allow analytics cookies' })
        ]),
        el('label', { className: 'nb-consent__cat' }, [
          el('span', null, [
            el('strong', { text: 'Marketing' }),
            el('span', { className: 'nb-consent__cat-desc', text: 'Not used on this website at present. Kept available if marketing tags are added later.' })
          ]),
          el('input', { type: 'checkbox', id: 'nb-consent-marketing', 'aria-label': 'Allow marketing cookies', disabled: 'disabled' })
        ]),
        el('label', { className: 'nb-consent__cat' }, [
          el('span', null, [
            el('strong', { text: 'External media' }),
            el('span', { className: 'nb-consent__cat-desc', text: 'Not used for tracking embeds today. Google Maps on Contact loads as a first-party page feature when you open that page.' })
          ]),
          el('input', { type: 'checkbox', id: 'nb-consent-media', 'aria-label': 'Allow external media', disabled: 'disabled' })
        ])
      ]),
      el('div', { className: 'nb-consent__actions' }, [
        el('button', { type: 'button', className: 'nb-consent__btn nb-consent__btn--ghost', id: 'nb-consent-prefs-reject', text: 'Reject non-essential' }),
        el('button', { type: 'button', className: 'nb-consent__btn nb-consent__btn--primary', id: 'nb-consent-prefs-save', text: 'Save preferences' })
      ])
    ]);

    var live = el('div', { id: 'nb-consent-live', className: 'nb-consent__live', 'aria-live': 'polite', 'aria-atomic': 'true' });

    root.appendChild(banner);
    root.appendChild(prefs);
    root.appendChild(live);
    document.body.appendChild(root);

    var ui = {
      root: root,
      banner: banner,
      prefs: prefs,
      analytics: document.getElementById('nb-consent-analytics'),
      marketing: document.getElementById('nb-consent-marketing'),
      media: document.getElementById('nb-consent-media')
    };

    document.getElementById('nb-consent-accept').addEventListener('click', function () {
      decide(ui, { necessary: true, analytics: true, marketing: false, media: false, decision: 'accept_all', at: Date.now() });
    });
    document.getElementById('nb-consent-reject').addEventListener('click', function () {
      decide(ui, { necessary: true, analytics: false, marketing: false, media: false, decision: 'reject', at: Date.now() });
    });
    document.getElementById('nb-consent-prefs-reject').addEventListener('click', function () {
      decide(ui, { necessary: true, analytics: false, marketing: false, media: false, decision: 'reject', at: Date.now() });
    });
    document.getElementById('nb-consent-manage').addEventListener('click', function () {
      showPrefs(ui, DEFAULTS);
    });
    document.getElementById('nb-consent-close').addEventListener('click', function () {
      showBanner(ui);
    });
    document.getElementById('nb-consent-prefs-save').addEventListener('click', function () {
      decide(ui, {
        necessary: true,
        analytics: !!ui.analytics.checked,
        marketing: false,
        media: false,
        decision: 'custom',
        at: Date.now()
      });
    });

    root.addEventListener('keydown', function (e) {
      if (!panelOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        if (!ui.prefs.hidden) showBanner(ui);
        return;
      }
      trapFocus(root, e);
    });

    return ui;
  }

  window.nbOpenCookieSettings = function () {
    lastFocus = document.activeElement;
    var ui = window.__nbConsentUI || buildUI();
    window.__nbConsentUI = ui;
    showPrefs(ui, readChoice() || DEFAULTS);
  };

  function boot() {
    setDefaultConsentDenied();
    var existing = readChoice();
    var ui = buildUI();
    window.__nbConsentUI = ui;

    if (existing && existing.decision) {
      applyChoice(existing);
      hide(ui);
    } else {
      lastFocus = document.activeElement;
      showBanner(ui);
    }

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-nb-cookie-settings]');
      if (t) {
        e.preventDefault();
        window.nbOpenCookieSettings();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
