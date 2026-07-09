/* ============================================================
   NOSIBELE — single source of truth for all business info.
   Change values HERE only; every page reads window.NB_CONFIG.
   ============================================================ */
window.NB_CONFIG = {
  name: 'Nosibele Design & Embroidery',
  short: 'Nosibele',
  legalName: 'Nosibele (Pty) Ltd',
  registeredName: 'NOSIBELE',
  registrationNo: '2024/152263/07',
  companyType: 'Private Company',
  slogan: 'We Design. We Stitch. We Inspire.',
  description: 'Nosibele Design & Embroidery is a Durban-based embroidery and custom apparel studio specialising in premium embroidery, school uniforms, corporate wear, workwear, golf shirts, sublimation printing, branded apparel, promotional clothing and personalised garments.',

  domain: 'nosibeleembroidery.co.za',
  url: 'https://www.nosibeleembroidery.co.za',

  phone: '061 445 3680',
  phoneIntl: '+27 61 445 3680',
  phoneHref: 'tel:+27614453680',
  whatsapp: '0614453680',          // normalised to 27… by the WhatsApp helpers

  address: {
    line1: 'Shop 55',
    line2: 'Charlotte Maxeke Street',
    line3: 'Dominion Arcade',
    city: 'Durban',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
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
  },

  socials: {
    tiktok: { label: 'TikTok', handle: '@nosibeledesignandembroid', name: 'Nosibele Embroidery', url: 'https://www.tiktok.com/@nosibeledesignandembroid' },
    instagram: { label: 'Instagram', handle: '@nosi.designsandembroidery', name: 'Nosibele Embroidery', url: 'https://www.instagram.com/nosi.designsandembroidery' },
    facebook: { label: 'Facebook', handle: 'Nosibele Embroidery', name: 'Nosibele Embroidery', url: '' },
  },

  seo: {
    title: 'Nosibele Design & Embroidery | Premium Embroidery & Custom Apparel in Durban',
    description: 'Premium embroidery, custom uniforms, golf shirts, school uniforms, workwear, corporate branding, sublimation printing and personalised apparel in Durban, South Africa.',
    ogImage: 'https://www.nosibeleembroidery.co.za/og-image.jpg',
  },

  /* Quote form delivery — Formspree (sends submissions to quotes@nosibeleembroidery.co.za). */
  formEndpoint: 'https://formspree.io/f/maqgekdl',

  /* Google Business Profile — reviews live on Google; the site links customers to them.
     Review URL opens the profile overview where the "Write a review" star box is shown;
     profile URL shows the existing reviews. */
  googleReviewUrl: 'https://www.google.com/maps?cid=9296423630800181378',
  googleProfileUrl: 'https://maps.app.goo.gl/hDM9Pwpr78Trkx427',

  /* Website credit */
  credit: { name: 'RiseEdge Ventures', tagline: 'Websites • Business Automation • Branding', url: 'https://www.riseedgeventures.co.za' },

  /* Pre-filled WhatsApp message, product-aware. */
  waMessage: function (item) {
    return 'Hello Nosibele Design & Embroidery,\n\nI would like a quotation for the ' + (item || 'custom apparel') + '.';
  },
};
