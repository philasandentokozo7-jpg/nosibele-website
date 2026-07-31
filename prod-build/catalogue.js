/* Nosibele catalogue — real Canva catalogue imagery.
   Guide prices shown where the studio has published a starting amount.
   All priced items are made-to-order / quotation-based unless stock is confirmed.
   Each item carries a descriptive `alt` for image SEO/accessibility. */
const A = 'assets/catalogue/';
const X = '.webp';

/* Shared pricing note — do not invent VAT or inclusions. */
const PRICE_GUIDE_NOTE = 'Guide “from” price in South African rand for quotation. Final price depends on garment, branding method, quantity, artwork, placement and timing. VAT will only be charged where legally applicable and shown on the quotation. Courier costs confirmed on quote.';

const PRODUCTS = [
  { slug:'corporate-wear', group:'Corporate Wear', cat:'Corporate Wear', title:'Corporate wear', img:A+'corporate-wear'+X, price:null,
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Branded shirts, golf shirts and team tees with your logo and lettering, finished for a sharp professional look. Price on enquiry — made to order from quotation.', badge:'Popular',
    alt:'Embroidered corporate work shirts with full-colour company logos by Nosibele Design & Embroidery, Durban' },
  { slug:'bhinca-tshirt', group:'Traditional Wear', cat:'Bhinca Wear', title:'Bhinca t-shirts', img:A+'bhinca-tshirt'+X, price:'R300',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Statement Bhinca-style cow-print golf shirts — ezama Bhinca, made in Durban. Guide from R300; confirm garment and branding on quotation.', badge:'New',
    alt:'Bhinca cow-print golf shirt with black collar by Nosibele Design & Embroidery, Durban' },
  { slug:'isisholi', group:'Traditional Wear', cat:'Isisholi', title:'Isisholi (embroidered shawls)', img:A+'isisholi'+X, price:'R420',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Embroidered traditional shawls with names, messages and beadwork detail — made for umembeso, weddings and special days. Guide from R420.', badge:'New',
    alt:'White isisholi traditional shawl embroidered with names and blue flower detail' },
  { slug:'school-shirts', group:'School & Outerwear', cat:'School Uniforms', title:'School shirts & sports kits', img:A+'school-shirts'+X, price:null,
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Embroidered school shirts, sports kits and uniforms — crests, names and numbers for schools. Price on enquiry; minimum quantities confirmed on quotation.', badge:'New',
    alt:'Yellow and green Sifiso Primary School sports kit with embroidered school crest' },
  { slug:'custom-apparel', group:'Sportswear', cat:'Custom Apparel', title:'Custom sportswear', img:A+'custom-apparel'+X, price:'R100',
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Personalised jerseys and kit with embroidered names and DTF sticker numbers. Guide from R100 depending on branding scope — confirm on quotation.',
    alt:'Custom sports jerseys personalised with embroidered names and DTF printed numbers' },
  { slug:'sublimation-shirts', group:'Sportswear', cat:'Sublimation Shirts', title:'Sublimation shirts', img:A+'sublimation-shirts'+X, price:'R300',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Edge-to-edge dye-sublimated short-sleeve shirts with a durable full-colour finish when cared for as advised — front and back. Guide from R300.',
    alt:'Edge-to-edge dye-sublimation printed short-sleeve shirts, front and back full colour' },
  { slug:'dtf-shirts', group:'Traditional Wear', cat:'DTF Printing', title:'DTF printing', img:A+'dtf-shirts'+X, price:'R40',
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Crisp full-colour direct-to-film prints on shirts, bags and packaging — guide A5 prints from R40, A4 from R80. Bring your artwork or we can design it. Final quote confirms size, garment and quantity.',
    alt:'DTF printed branded gift bags and full-colour transfer sheets by Nosibele Design & Embroidery' },
  { slug:'school-jackets', group:'School & Outerwear', cat:'School Jackets', title:'School sublimation jackets', img:A+'school-jackets'+X, price:'R600',
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Sublimation jackets with names and branding — guide from R600 on our stock jacket, or from R650 if you bring your own jacket. Final quotation confirms sizes and artwork.',
    alt:'School sublimation jackets printed with learner names and school branding' },
  { slug:'jackets', group:'School & Outerwear', cat:'Jackets', title:'Custom jackets', img:A+'jackets'+X, price:null,
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Custom jackets — bombers, softshells and statement pieces with embroidered crests. Price on enquiry.',
    alt:'Custom bomber and softshell jackets with embroidered crests' },
  { slug:'workwear', group:'Workwear', cat:'Workwear', title:'Branded workwear', img:A+'workwear'+X, price:'R100',
    availability:'made_to_order', quote:'direct', supply:'business_or_customer',
    desc:'Hard-wearing workwear with large back embroidery — guide from R100 for large-size back branding. Garment cost and positions confirmed on quotation.',
    alt:'Hard-wearing branded workwear with large embroidered back logos' },
  { slug:'beanies', group:'Accessories', cat:'Beanies', title:'Embroidered beanies', img:A+'beanies'+X, price:null,
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Warm knit beanies with raised embroidered names, logos and lettering. Price on enquiry.',
    alt:'Warm knit beanies with raised embroidered names, logos and lettering' },
  { slug:'scarves', group:'Accessories', cat:'Scarves', title:'Embroidered scarves', img:A+'scarves'+X, price:'R80',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Soft scarves embroidered with names and motifs — a personal, giftable touch. Guide from R80.', badge:'Gifting',
    alt:'Soft scarves embroidered with personalised names and decorative motifs' },
  { slug:'fur-wrap', group:'Traditional Wear', cat:'Fur Wraps', title:'Embroidered fur wraps', img:A+'fur-wrap'+X, price:'R350',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Soft faux-fur shoulder wraps embroidered with your clan name or message — guide R350 with embroidery.',
    alt:'White faux-fur shoulder wrap embroidered with a clan name in orange thread' },
  { slug:'embroidered-bags', group:'Accessories', cat:'Bags', title:'Embroidered bags', img:A+'embroidered-bags'+X, price:'R140',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Lunch, cooler and lady’s bags embroidered with logos or names — guide plain from R140, with logo from R160. Lady’s bag from R260, large bag with a name from R300, large + lunch set from R450. Confirm options on quotation.', badge:'New',
    alt:'Red cooler bag embroidered with a church logo and personal name by Nosibele' },
  { slug:'traditional-golf', group:'Traditional Wear', cat:'Traditional Golf Shirts', title:'Traditional pattern golf shirts', img:A+'traditional-golf'+X, price:'R300',
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Full-colour sublimated short-sleeve shirts with rhinestone or embroidered names. Guide from R300.', badge:'Bestseller',
    alt:'Traditional African pattern golf shirts, full-colour sublimated with embroidered names' },
  { slug:'sublimation-dresses', group:'Traditional Wear', cat:'Sublimation Dresses', title:'Sublimation dresses', img:A+'sublimation-dresses'+X, price:null,
    availability:'made_to_order', quote:'direct', supply:'business_supplied',
    desc:'Made-to-fit event and supporters’ dresses printed in full colour. Price on enquiry; sizing and artwork confirmed before production.',
    alt:'Made-to-fit sublimation printed event and supporters’ dresses in vivid colour' },
];

/* ---- Gallery-only pieces (shown in the Lookbook, not sale cards) ---- */
const GALLERY = [
  { slug:'gallery-mzinyeni', group:'Craftsmanship', cat:'School Uniforms', title:'Mzinyeni Primary School shirts', img:A+'gallery-mzinyeni'+X,
    desc:'Embroidered crests and lettering for Mzinyeni Primary School.',
    alt:'Yellow Mzinyeni Primary School shirts with embroidered crest and lettering' },
  { slug:'gallery-school-bags', group:'Craftsmanship', cat:'Bags', title:'School bag sets', img:A+'gallery-school-bags'+X,
    desc:'Matching embroidered school bags and lunch bags.',
    alt:'Navy school bag and lunch bag set with embroidered gold school shields' },
  { slug:'gallery-dtf-sweater', group:'Craftsmanship', cat:'DTF Printing', title:'Custom DTF sweater', img:A+'gallery-dtf-sweater'+X,
    desc:'Full-colour DTF print on a satin sweater.',
    alt:'Brown satin sweater with a full-colour I Am Blessed DTF print' },
  { slug:'gallery-bhudayami', group:'Craftsmanship', cat:'Corporate Wear', title:'Bhudayami Clothing branding', img:A+'gallery-bhudayami'+X,
    desc:'Gold brand embroidery for Bhudayami Clothing.',
    alt:'Black t-shirt with gold Bhudayami Clothing logo embroidery' },
  { slug:'gallery-lashed-laid', group:'Craftsmanship', cat:'Corporate Wear', title:'Lashed & Laid salon golfers', img:A+'gallery-lashed-laid'+X,
    desc:'Embroidered logo golfers for a Durban beauty salon.',
    alt:'Pink golf shirt with embroidered Lashed & Laid salon logo' },
];

const PRODUCT_GROUPS = ['Corporate Wear', 'Sportswear', 'Traditional Wear', 'School & Outerwear', 'Workwear', 'Accessories'];

const SERVICES = [
  { slug:'embroidery', title:'Embroidery', img:A+'custom-apparel.jpg',
    desc:'Thread-level branding for names, logos and numbers — our signature craft.',
    alt:'Machine embroidery of logos, names and numbers on garments' },
  { slug:'dtf-printing', title:'DTF Printing', img:A+'dtf-shirts.jpg',
    desc:'Full-colour transfers for detailed logos and photographic artwork on many garment types.',
    alt:'DTF printing — full-colour transfers applied to garments' },
  { slug:'sublimation-printing', title:'Sublimation Printing', img:A+'sublimation-shirts.jpg',
    desc:'Edge-to-edge dye prints for shirts, dresses and supporters’ wear with a durable colour finish when cared for as advised.',
    alt:'Edge-to-edge sublimation printing on shirts, dresses and supporters’ wear' },
  { slug:'logo-name-branding', title:'Logo & Name Branding', img:A+'scarves.jpg',
    desc:'Add names, numbers and logos to garments, gifts and accessories.',
    alt:'Names, numbers and logos branded onto garments, gifts and accessories' },
  { slug:'artwork-design', title:'Artwork Design', img:A+'sublimation-dresses.jpg',
    desc:'We design and digitise your artwork, ready for print or embroidery.',
    alt:'Artwork design and digitising service for print and embroidery' },
  { slug:'corporate-branding', title:'Corporate Branding', img:A+'corporate-wear.jpg',
    desc:'Uniform and apparel branding programmes for businesses and teams.',
    alt:'Corporate uniform and apparel branding for businesses and teams' },
  { slug:'school-uniform-branding', title:'School Uniform Branding', img:A+'school-jackets.jpg',
    desc:'Badges, names and crests applied to school and club uniforms in bulk.',
    alt:'School uniform branding — badges, names and crests applied in bulk' },
  { slug:'bulk-orders', title:'Bulk Orders', img:A+'beanies.jpg',
    desc:'Large-run production for events, teams and organisations — timing and pricing confirmed on quotation.',
    alt:'Bulk apparel branding and large-run production for events and teams' },
];

/* ---- Customer reviews (REAL only — add new ones here) ----
   Add an object per review: { name, org, rating (1–5), text, source, permissionConfirmed }.
   Leave the array honest; do not invent reviews.
   permissionConfirmed must be true only after the owner confirms customer permission. */
const REVIEWS = [
  { name: 'Ayanda', org: 'AOL Accounting Academy SA', rating: 5, source: 'Customer',
    permissionConfirmed: false,
    text: 'Nosibele embroidered uniforms for our whole team. The detail is immaculate and people keep asking where we had them made. Worth every rand.' },
];

/* ---- Frequently asked questions (shared across pages) ---- */
const FAQS = [
  { q: 'How do I get a quote?', a: 'Fill in the quote form or message us on WhatsApp with what you’d like, roughly how many pieces, and your logo or artwork. We’ll reply with a tailored quotation after reviewing your requirements. Submitting a form is a request for a quotation, not an accepted order.' },
  { q: 'What’s your turnaround time?', a: 'Lead times depend on quantity, branding method and current studio workload. Timing is discussed with you and confirmed on your quotation after artwork approval.' },
  { q: 'Do you handle bulk and corporate orders?', a: 'Yes. Uniforms, workwear, team kit and corporate branding are a core part of what we do. Bulk pricing depends on garment, quantity and branding method.' },
  { q: 'Can you work from my own logo or artwork?', a: 'Yes. Attach PNG, JPG or PDF artwork on the quotation form so it arrives with your request at quotes@nosibeleembroidery.co.za. You can also send files later by WhatsApp if needed. We’ll digitise for embroidery or prepare for print, or design artwork from scratch if required.' },
  { q: 'Embroidery, sublimation or DTF — which do I need?', a: 'Embroidery is thread branding for logos and names. Sublimation prints edge-to-edge colour into suitable fabric. DTF transfers detailed full-colour designs onto many garments. Not sure? We’ll advise the best fit for your brief.' },
  { q: 'Where are you based and do you deliver?', a: 'Our studio is in Durban (Shop 55, Charlotte Maxeke Street, Dominion Arcade). Collect from us, or ask about courier options when we prepare your quotation.' },
];

window.NB_CATALOGUE = { PRODUCTS, SERVICES, PRODUCT_GROUPS, GALLERY, REVIEWS, FAQS, PRICE_GUIDE_NOTE };
