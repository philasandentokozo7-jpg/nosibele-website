/* ============================================================
   NOSIBELE — single source of truth for all business info.
   Change values HERE only; every page reads window.NB_CONFIG.
   Use null for facts not yet verified by the owner.
   ============================================================ */
window.NB_CONFIG = {
  name: 'Nosibele Design & Embroidery',
  short: 'Nosibele',
  legalName: 'Nosibele (Pty) Ltd',
  registeredName: 'NOSIBELE',
  registrationNo: '2024/152263/07',
  companyType: 'Private Company',
  tradingName: 'Nosibele Design & Embroidery',
  slogan: 'We Design. We Stitch. We Inspire.',
  description: 'Nosibele Design & Embroidery is a Durban-based embroidery and custom apparel studio specialising in embroidery, school uniforms, corporate wear, workwear, golf shirts, sublimation printing, branded apparel, promotional clothing and personalised garments.',

  domain: 'nosibeleembroidery.co.za',
  url: 'https://www.nosibeleembroidery.co.za',
  /* Canonical host preference for SEO / redirects documentation */
  canonicalHost: 'www.nosibeleembroidery.co.za',

  phone: '061 445 3680',
  phoneIntl: '+27 61 445 3680',
  phoneHref: 'tel:+27614453680',
  /* Local display / legacy key. Always build chat URLs via waDigits() / waLink(). */
  whatsapp: '0614453680',
  /* Verified international digits for wa.me (from 061 445 3680 → 27614453680). */
  whatsappDigits: '27614453680',

  address: {
    line1: 'Shop 55',
    line2: 'Charlotte Maxeke Street',
    line3: 'Dominion Arcade',
    city: 'Durban',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    /* Unverified — confirm with owner before publishing on legal pages */
    postalCode: null,
    maps: 'https://www.google.com/maps/search/?api=1&query=Dominion+Arcade+Charlotte+Maxeke+Street+Durban',
    embed: 'https://www.google.com/maps?q=Dominion%20Arcade%20Charlotte%20Maxeke%20Street%20Durban&output=embed',
  },

  hours: [
    ['Monday – Friday', '08:00 – 17:00'],
    ['Saturday', '08:00 – 13:00'],
    ['Sunday', 'Closed'],
  ],

  emails: {
    primary: 'hello@nosibeleembroidery.co.za',
    info: 'info@nosibeleembroidery.co.za',
    sales: 'sales@nosibeleembroidery.co.za',
    quotes: 'quotes@nosibeleembroidery.co.za',
    support: 'support@nosibeleembroidery.co.za',
    orders: 'orders@nosibeleembroidery.co.za',
    artwork: 'artwork@nosibeleembroidery.co.za',
    accounts: 'accounts@nosibeleembroidery.co.za',
    admin: 'admin@nosibeleembroidery.co.za',
    careers: 'careers@nosibeleembroidery.co.za',
    /* Dedicated addresses — null until owner confirms a distinct inbox */
    privacy: null,
    complaints: null,
    legalNotices: null,
  },

  /* POPIA / PAIA contacts — publish only verified values */
  informationOfficer: {
    name: null,
    email: null,
    phone: null,
  },
  deputyInformationOfficer: {
    name: null,
    email: null,
  },

  /* Commercial / tax — null until owner confirms */
  vat: {
    registered: null,
    number: null,
    pricesIncludeVat: null,
  },

  /* Policy metadata */
  policies: {
    effectiveDate: '30 July 2026',
    lastReviewed: '30 July 2026',
    nextReviewDue: null,
  },

  /* Order process facts — null means do not invent on public pages */
  commercial: {
    quoteValidityDays: null,
    depositPercent: null,
    depositRequired: null,
    productionStartsAfter: [
      'Approved quotation',
      'Any agreed payment or deposit',
      'Artwork approval (spelling, colours, placement, sizes)',
    ],
    acceptedPaymentMethods: null,
    typicalLeadTimeNote: 'Lead times depend on quantity, method and studio workload and are confirmed on each quotation.',
    courierAvailable: true,
    courierNationwideClaimVerified: false,
  },

  socials: {
    tiktok: { label: 'TikTok', handle: '@nosibeledesignandembroid', name: 'Nosibele Embroidery', url: 'https://www.tiktok.com/@nosibeledesignandembroid' },
    instagram: { label: 'Instagram', handle: '@nosi.designsandembroidery', name: 'Nosibele Embroidery', url: 'https://www.instagram.com/nosi.designsandembroidery' },
    facebook: { label: 'Facebook', handle: 'Nosibele Embroidery', name: 'Nosibele Embroidery', url: '' },
  },

  seo: {
    title: 'Nosibele Design & Embroidery | Embroidery, Printing & Branded Clothing in Durban',
    description: 'Nosibele Design & Embroidery in Durban — embroidery, printing and branded clothing for schools, corporates and custom apparel orders. Request a quotation online.',
    ogImage: 'https://www.nosibeleembroidery.co.za/og-image.jpg',
  },

  /* Quote form delivery — Formspree (sends submissions to quotes@nosibeleembroidery.co.za). */
  formEndpoint: 'https://formspree.io/f/maqgekdl',
  /* Website form does not accept file uploads (security). Artwork via WhatsApp/email. */
  artworkUploadEnabled: false,
  artworkAccept: ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'],
  artworkMaxBytes: 8 * 1024 * 1024,

  /* Google Analytics 4 — consent-gated */
  analyticsId: 'G-WH87LWEPJB',

  /* Google Business Profile — reviews live on Google; the site links customers to them. */
  googleReviewUrl: 'https://www.google.com/maps?cid=9296423630800181378',
  googleProfileUrl: 'https://maps.app.goo.gl/hDM9Pwpr78Trkx427',

  /* Website credit */
  credit: { name: 'RiseEdge Digital', tagline: 'Designed & Built by RiseEdge Digital.', url: 'https://digital.riseedgeventures.co.za' },

  /* Prefill templates — keep free of characters that SSR can mangle inside hrefs. */
  waMessages: {
    general: 'Hello Nosibele Design & Embroidery, I would like to enquire about your services.',
    quote: 'Hello Nosibele Design & Embroidery, I would like to request a quotation.',
  },

  /* Normalise any configured local/international number to bare wa.me digits. */
  waDigits: function () {
    var raw = String(this.whatsapp || this.phone || this.whatsappDigits || '').replace(/[^0-9]/g, '');
    if (!raw && this.whatsappDigits) return String(this.whatsappDigits).replace(/[^0-9]/g, '');
    if (raw.indexOf('27') === 0 && raw.length >= 11) return raw;
    if (raw.charAt(0) === '0') return '27' + raw.slice(1);
    if (raw.length === 9) return '27' + raw;
    return String(this.whatsappDigits || '27614453680').replace(/[^0-9]/g, '');
  },

  /* Direct chat URL: https://wa.me/27614453680?text=... */
  waLink: function (message) {
    var digits = this.waDigits();
    var text = message || this.waMessages.general;
    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(text);
  },

  /* Product/service-aware quotation prefill; falls back to quote template. */
  waMessage: function (item) {
    if (item) {
      return 'Hello Nosibele Design & Embroidery, I would like a quotation for the ' + item + '.';
    }
    return this.waMessages.quote;
  },

  /* Helper: privacy / complaints email fallbacks */
  privacyEmail: function () {
    return this.emails.privacy || this.emails.info || this.emails.primary;
  },
  complaintsEmail: function () {
    return this.emails.complaints || this.emails.info || this.emails.primary;
  },
};
