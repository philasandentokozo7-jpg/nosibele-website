/* Nosibele catalogue — real Canva catalogue imagery.
   Prices intentionally "Price on enquiry" until the studio confirms rates.
   Each item carries a descriptive `alt` for image SEO/accessibility. */
const A = 'assets/catalogue/';
const X = '.webp';
const PRODUCTS = [
  { slug:'corporate-wear', group:'Corporate Wear', cat:'Corporate Wear', title:'Corporate wear', img:A+'corporate-wear'+X, price:null,
    desc:'Branded golf shirts and team tees with your logo and lettering, finished for a sharp professional look.', badge:'Popular',
    alt:'Branded corporate golf shirts with an embroidered company logo by Nosibele Design & Embroidery, Durban' },
  { slug:'custom-apparel', group:'Sportswear', cat:'Custom Apparel', title:'Custom sportswear', img:A+'custom-apparel'+X, price:'R100',
    desc:'Personalised jerseys and kit with embroidered names and DTF sticker numbers.',
    alt:'Custom sports jerseys personalised with embroidered names and DTF printed numbers' },
  { slug:'sublimation-shirts', group:'Sportswear', cat:'Sublimation Shirts', title:'Sublimation shirts', img:A+'sublimation-shirts'+X, price:'R300',
    desc:'Edge-to-edge dye-sublimated short-sleeve shirts that never crack or fade — front and back.',
    alt:'Edge-to-edge dye-sublimation printed short-sleeve shirts, front and back full colour' },
  { slug:'traditional-golf', group:'Traditional Wear', cat:'Traditional Golf Shirts', title:'Traditional pattern golf shirts', img:A+'traditional-golf'+X, price:'R300',
    desc:'Full-colour sublimated short-sleeve shirts with rhinestone or embroidered names.', badge:'Bestseller',
    alt:'Traditional African pattern golf shirts, full-colour sublimated with embroidered names' },
  { slug:'sublimation-dresses', group:'Traditional Wear', cat:'Sublimation Dresses', title:'Sublimation dresses', img:A+'sublimation-dresses'+X, price:null,
    desc:'Made-to-fit event and supporters’ dresses printed in vivid, lasting colour.',
    alt:'Made-to-fit sublimation printed event and supporters’ dresses in vivid colour' },
  { slug:'dtf-shirts', group:'Traditional Wear', cat:'DTF Shirts', title:'DTF printed shirts', img:A+'dtf-shirts'+X, price:'R75',
    desc:'Direct-to-film printing on a garment for crisp, detailed full-colour designs.',
    alt:'DTF direct-to-film printed shirts with crisp, detailed full-colour designs' },
  { slug:'school-jackets', group:'School & Outerwear', cat:'School Jackets', title:'School sublimation jackets', img:A+'school-jackets'+X, price:'R600',
    desc:'Durable sublimation jackets with names and branding — from R600 on our stock jacket, R650 if you bring your own.',
    alt:'School sublimation jackets printed with learner names and school branding' },
  { slug:'jackets', group:'School & Outerwear', cat:'Jackets', title:'Custom jackets', img:A+'jackets'+X, price:null,
    desc:'Premium custom jackets — bombers, softshells and statement pieces with embroidered crests.',
    alt:'Premium custom bomber and softshell jackets with embroidered crests' },
  { slug:'workwear', group:'Workwear', cat:'Workwear', title:'Branded workwear', img:A+'workwear'+X, price:'R100',
    desc:'Hard-wearing workwear with large back embroidery — priced from R100 for large-size back branding.',
    alt:'Hard-wearing branded workwear with large embroidered back logos' },
  { slug:'beanies', group:'Accessories', cat:'Beanies', title:'Embroidered beanies', img:A+'beanies'+X, price:null,
    desc:'Warm knit beanies with raised embroidered names, logos and lettering.',
    alt:'Warm knit beanies with raised embroidered names, logos and lettering' },
  { slug:'scarves', group:'Accessories', cat:'Scarves', title:'Embroidered scarves', img:A+'scarves'+X, price:'R80',
    desc:'Soft scarves embroidered with names and motifs — a personal, giftable touch.', badge:'Gifting',
    alt:'Soft scarves embroidered with personalised names and decorative motifs' },
];

const PRODUCT_GROUPS = ['Corporate Wear', 'Sportswear', 'Traditional Wear', 'School & Outerwear', 'Workwear', 'Accessories'];

const SERVICES = [
  { slug:'embroidery', title:'Embroidery', img:A+'custom-apparel.jpg',
    desc:'Premium thread-level branding for names, logos and numbers — our signature craft.',
    alt:'Premium machine embroidery of logos, names and numbers on garments' },
  { slug:'dtf-printing', title:'DTF Printing', img:A+'dtf-shirts.jpg',
    desc:'Vivid full-colour transfers for detailed logos and photographic artwork on any garment.',
    alt:'DTF printing — vivid full-colour transfers applied to garments' },
  { slug:'sublimation-printing', title:'Sublimation Printing', img:A+'sublimation-shirts.jpg',
    desc:'Edge-to-edge dye prints for shirts, dresses and supporters’ wear that never crack or fade.',
    alt:'Edge-to-edge sublimation printing on shirts, dresses and supporters’ wear' },
  { slug:'logo-name-branding', title:'Logo & Name Branding', img:A+'scarves.jpg',
    desc:'Add names, numbers and logos to garments, gifts and accessories.',
    alt:'Names, numbers and logos branded onto garments, gifts and accessories' },
  { slug:'artwork-design', title:'Artwork Design', img:A+'sublimation-dresses.jpg',
    desc:'We design and digitise your artwork, ready for print or embroidery.',
    alt:'Artwork design and digitising service for print and embroidery' },
  { slug:'corporate-branding', title:'Corporate Branding', img:A+'corporate-wear.jpg',
    desc:'Full uniform and apparel branding programmes for businesses and teams.',
    alt:'Corporate uniform and apparel branding for businesses and teams' },
  { slug:'school-uniform-branding', title:'School Uniform Branding', img:A+'school-jackets.jpg',
    desc:'Badges, names and crests applied to school and club uniforms in bulk.',
    alt:'School uniform branding — badges, names and crests applied in bulk' },
  { slug:'bulk-orders', title:'Bulk Orders', img:A+'beanies.jpg',
    desc:'Reliable large-run production for events, teams and organisations.',
    alt:'Bulk apparel branding and large-run production for events and teams' },
];

/* ---- Customer reviews (REAL only — add new ones here) ----
   Add an object per review: { name, org, rating (1–5), text, source }.
   Leave the array honest; do not invent reviews. */
const REVIEWS = [
  { name: 'Ayanda', org: 'AOL Accounting Academy SA', rating: 5, source: 'Customer',
    text: 'Nosibele embroidered uniforms for our whole team. The detail is immaculate and people keep asking where we had them made. Worth every rand.' },
];

/* ---- Frequently asked questions (shared across pages) ---- */
const FAQS = [
  { q: 'How do I get a quote?', a: 'Fill in the quote form or message us on WhatsApp with what you’d like, roughly how many pieces, and your logo or artwork. We’ll reply with a tailored quote, usually within a day.' },
  { q: 'What’s your turnaround time?', a: 'Most orders are ready in 7–10 working days once the design is approved. Larger or more complex orders may take a little longer — we’ll always confirm upfront.' },
  { q: 'Do you handle bulk and corporate orders?', a: 'Yes. Uniforms, workwear, team kit and corporate branding are a big part of what we do. Bulk pricing depends on garment, quantity and branding method.' },
  { q: 'Can you work from my own logo or artwork?', a: 'Absolutely. Send us a PNG, JPG or PDF and we’ll digitise it for embroidery or prepare it for print. We can also design artwork from scratch.' },
  { q: 'Embroidery, sublimation or DTF — which do I need?', a: 'Embroidery is premium thread branding for logos and names. Sublimation prints edge-to-edge colour into the fabric. DTF transfers crisp, detailed full-colour designs onto a garment. Not sure? We’ll advise the best fit.' },
  { q: 'Where are you based and do you deliver?', a: 'Our studio is in Durban (Shop 55, Charlotte Maxeke Street, Dominion Arcade). Collect from us, or we courier nationwide across South Africa.' },
];

window.NB_CATALOGUE = { PRODUCTS, SERVICES, PRODUCT_GROUPS, REVIEWS, FAQS, WHATSAPP: '0614453680' };
