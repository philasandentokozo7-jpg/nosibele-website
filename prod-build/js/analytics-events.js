/* Nosibele analytics events — PII-free; runs only after analytics consent.
   Plan: docs/ANALYTICS_EVENT_PLAN.md */
(function () {
  'use strict';

  function consented() {
    try {
      var raw = sessionStorage.getItem('nb_consent_v2');
      if (!raw) return false;
      var o = JSON.parse(raw);
      return !!(o && o.analytics);
    } catch (e) {
      return false;
    }
  }

  function gtagEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    try {
      window.gtag('event', name, params || {});
    } catch (e) {}
  }

  window.nbTrack = function (name, params) {
    if (!consented()) return;
    var safe = {};
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(function (k) {
        var v = params[k];
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
          // Never forward free-text that may contain PII
          if (/name|phone|email|message|notes|artwork|file/i.test(k)) return;
          safe[k] = v;
        }
      });
    }
    gtagEvent(name, safe);
  };

  function pageKind() {
    var p = (location.pathname || '').toLowerCase();
    if (p === '/' || p.endsWith('/index.html')) return 'home';
    if (p.indexOf('products') !== -1) return 'products';
    if (p.indexOf('services') !== -1) return 'services';
    if (p.indexOf('gallery') !== -1) return 'gallery';
    if (p.indexOf('about') !== -1) return 'about';
    if (p.indexOf('contact') !== -1) return 'contact';
    return 'other';
  }

  function boot() {
    var kind = pageKind();
    if (kind === 'products') window.nbTrack('category_view', { page: 'products' });
    if (kind === 'gallery') window.nbTrack('gallery_view', { page: 'gallery' });
    if (kind === 'contact' || document.getElementById('quote')) {
      window.nbTrack('quote_start', { page: kind });
    }

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        window.nbTrack('whatsapp_click', { page: kind });
        return;
      }
      if (href.indexOf('tel:') === 0) {
        window.nbTrack('phone_click', { page: kind });
        return;
      }
      if (href.indexOf('mailto:') === 0) {
        window.nbTrack('email_click', { page: kind });
        return;
      }
      if (href.indexOf('google.com/maps') !== -1 || href.indexOf('maps.app.goo.gl') !== -1 || href.indexOf('maps?') !== -1) {
        if (/review|cid=/i.test(href) || (a.textContent || '').toLowerCase().indexOf('review') !== -1) {
          window.nbTrack('google_review_click', { page: kind });
        } else {
          window.nbTrack('directions_click', { page: kind });
        }
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
