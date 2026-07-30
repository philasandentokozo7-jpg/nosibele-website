#!/usr/bin/env node
/**
 * Apply owner-approved temporary commercial/legal defaults + form hardening.
 * Idempotent where practical.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PB = path.join(ROOT, 'prod-build');

function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { fs.writeFileSync(p, s); console.log('wrote', path.relative(ROOT, p)); }

/* ---------- config.js ---------- */
write(path.join(PB, 'config.js'), read(path.join(PB, 'config.js'))
  // already custom — rewrite commercial + IO + VAT public copy helpers via full replace of those blocks
);

// Full rewrite of config commercial/IO/VAT sections using targeted replaces on current file
{
  let c = read(path.join(PB, 'config.js'));
  c = c.replace(
    /\/\* POPIA \/ PAIA contacts[\s\S]*?deputyInformationOfficer: \{[\s\S]*?\},/,
    `/* POPIA / PAIA contacts — do not invent a person's name */
  informationOfficer: {
    /* Public role label only until a full name is explicitly approved */
    name: null,
    roleLabel: 'The Owner or authorised representative of Nosibele Design & Embroidery',
    email: null, /* falls back to privacyEmail() → info@ */
    phone: null,
  },
  deputyInformationOfficer: {
    name: null,
    email: null,
  },`
  );
  c = c.replace(
    /\/\* Commercial \/ tax[\s\S]*?vat: \{[\s\S]*?\},/,
    `/* Commercial / tax — VAT number remains null until verified */
  vat: {
    registered: null,
    number: null,
    pricesIncludeVat: null,
    publicWording: 'Prices are quoted in South African rand. VAT will only be charged where legally applicable and shown on the quotation.',
  },`
  );
  c = c.replace(
    /\/\* Order process facts[\s\S]*?courierNationwideClaimVerified: false,\n  },/,
    `/* Order process — owner-approved temporary defaults (30 July 2026) */
  commercial: {
    quoteValidityDays: null,
    depositPercent: 50,
    depositRequired: true,
    depositWording: 'A 50% deposit is required before production begins. The remaining balance is payable before collection or delivery.',
    depositExceptionWording: 'Nosibele may require a higher deposit or full payment for urgent orders, special-order materials, unusually large orders or work carrying significant upfront costs.',
    productionStartsAfter: [
      'Approved quotation',
      'Required deposit (normally 50%, or a higher amount / full payment when notified)',
      'Artwork and order details confirmed (spelling, colours, placement, sizes)',
    ],
    balanceBeforeRelease: true,
    acceptedPaymentMethods: null, /* do not list unverified methods */
    typicalLeadTimeNote: 'Lead times depend on quantity, method and studio workload and are confirmed on each quotation. Timing estimates are not guarantees.',
    courierAvailable: true,
    courierNationwideClaimVerified: false,
  },`
  );
  if (!c.includes('ioPublicLabel')) {
    c = c.replace(
      /complaintsEmail: function \(\) \{[\s\S]*?\},\n\};/,
      `complaintsEmail: function () {
    return this.emails.complaints || this.emails.info || this.emails.primary;
  },
  ioPublicLabel: function () {
    return (this.informationOfficer && this.informationOfficer.roleLabel) ||
      'The Owner or authorised representative of Nosibele Design & Embroidery';
  },
  vatPublicWording: function () {
    return (this.vat && this.vat.publicWording) ||
      'Prices are quoted in South African rand. VAT will only be charged where legally applicable and shown on the quotation.';
  },
  depositPublicWording: function () {
    return (this.commercial && this.commercial.depositWording) || '';
  },
};
`
    );
  }
  write(path.join(PB, 'config.js'), c);
}

/* ---------- catalogue price note ---------- */
{
  let cat = read(path.join(PB, 'catalogue.js'));
  cat = cat.replace(
    /const PRICE_GUIDE_NOTE = '[^']*';/,
    `const PRICE_GUIDE_NOTE = 'Guide “from” price in South African rand for quotation. Final price depends on garment, branding method, quantity, artwork, placement and timing. VAT will only be charged where legally applicable and shown on the quotation. Courier costs confirmed on quote.';`
  );
  write(path.join(PB, 'catalogue.js'), cat);
}

/* ---------- nb-app price note ---------- */
{
  let nb = read(path.join(PB, 'nb-app.js'));
  nb = nb.split(
    'Guide price \\u2014 final quotation may vary. VAT status, garment, branding method, quantity and courier confirmed on quote.'
  ).join(
    'Guide price in ZAR \\u2014 final quotation may vary. VAT charged only where legally applicable and shown on the quotation. Garment, branding, quantity and courier confirmed on quote.'
  );
  write(path.join(PB, 'nb-app.js'), nb);
}

/* ---------- app.compiled.js: craft steps, privacy ack, form harden ---------- */
{
  let app = read(path.join(PB, 'app.compiled.js'));

  app = app.replace(
    /const steps = \[\['01', 'Request a quotation'[\s\S]*?\];/,
    `const steps = [['01', 'Request a quotation', 'Share what you need — garment, quantity, artwork or inspiration — via the quote form, WhatsApp or email. This is a quotation request, not an accepted order.'], ['02', 'Review & quotation', 'We review the request and send a tailored quotation. Lead times are estimates confirmed on the quotation — not guarantees.'], ['03', 'Approve quote, deposit & artwork', 'Production begins only after you approve the quotation, pay the required deposit (normally 50%), and confirm artwork and order details (spelling, colours, placement and sizes).'], ['04', 'Production', 'Approved work is embroidered, printed or finished in our Durban studio according to the agreed specification.'], ['05', 'Quality check', 'Garments are checked for stitching, colour and finish before release.'], ['06', 'Balance, then collect or courier', 'The remaining balance is payable before collection or delivery. Collect from the studio or arrange courier as agreed on your quotation.']];`
  );

  // Replace submit handler block for hardening
  const oldSubmit = `  const [fileName, setFileName] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    if (preselect) setItem(preselect.replace(/\\s#\\d+$/, ''));
  }, [preselect]);
  const submit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
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
      data.append('Artwork delivery', 'Customer will send artwork separately via WhatsApp or email (website upload disabled for security)');
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
      try { if (typeof window.nbTrack === 'function') window.nbTrack('quote_submit', { item: item ? 'set' : 'unset' }); } catch (t) {}
    } catch (err) {
      try { if (typeof window.nbTrack === 'function') window.nbTrack('form_error', { form: 'quote' }); } catch (t) {}
      setError('We couldn’t send your request just now. Please WhatsApp us on 061 445 3680, email quotes@nosibeleembroidery.co.za, or call us — and we will help you.');
    } finally {
      setSubmitting(false);
    }
  };
  const reset = () => {
    setSent(false);
    setItem('');
    setFileName('');
    setLead(null);
    setError('');
    setFulfilment('Collect from studio');
  };`;

  const newSubmit = `  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const lastSubmitAt = React.useRef(0);
  const COOLDOWN_MS = 8000;
  const MAX = { name: 80, phone: 40, qty: 12, notes: 1000, source: 80, item: 120 };
  React.useEffect(() => {
    if (preselect) setItem(preselect.replace(/\\s#\\d+$/, '').slice(0, MAX.item));
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
    if (!phone || phone.replace(/\\D/g, '').length < 9) { setError('Please enter a valid WhatsApp number.'); return; }
    if (!product) { setError('Please select a product or service.'); return; }
    if (!fd.get('privacy_ack')) {
      setError('Please confirm you have read the Privacy Notice and Quotation & Order Terms before sending.');
      return;
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
      data.append('Artwork delivery', 'Customer will send artwork separately via WhatsApp or email (website upload disabled)');
      data.append('_subject', 'New quote request');
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
      setError('We could not send your request just now. Please try WhatsApp, email or telephone instead.');
    } finally {
      setSubmitting(false);
    }
  };
  const reset = () => {
    setSent(false);
    setItem('');
    setLead(null);
    setError('');
    setFulfilment('Collect from studio');
  };`;

  if (!app.includes('COOLDOWN_MS')) {
    if (app.includes(oldSubmit)) {
      app = app.replace(oldSubmit, newSubmit);
      console.log('submit harden OK');
    } else {
      console.warn('submit harden MISS — trying looser');
    }
  } else console.log('submit already hardened');

  // privacy ack deposit wording
  app = app.split(
    '. I understand this is a quotation request only, and that production starts only after an approved quotation, any agreed payment or deposit, and artwork approval.'
  ).join(
    '. I understand this is a quotation request only. Production starts only after an approved quotation, the required deposit (normally 50%), and confirmed artwork/order details. The balance is payable before collection or delivery.'
  );

  // success message — first name only already; keep neutral
  app = app.split(
    'We\\u2019ve received your quotation request. We will review it and reply with a tailored quotation. This is not yet an accepted order.'
  ).join(
    'Your quotation request has been received. We will review it and reply with a tailored quotation. This is not an accepted order.'
  );

  // Add maxLength + autocomplete on inputs if missing
  if (!app.includes('maxLength: 80') && !app.includes('maxLength:80')) {
    app = app.replace(
      /name: "name",\n    required: true,\n    placeholder: "e\.g\. Thandi M\."/,
      'name: "name",\n    required: true,\n    autoComplete: "name",\n    maxLength: 80,\n    placeholder: "e.g. Thandi M."'
    );
    app = app.replace(
      /name: "phone",\n    type: "tel",\n    required: true,\n    placeholder: "082 000 0000"/,
      'name: "phone",\n    type: "tel",\n    required: true,\n    autoComplete: "tel",\n    inputMode: "tel",\n    maxLength: 40,\n    placeholder: "082 000 0000"'
    );
    app = app.replace(
      /name: "qty",\n    type: "number",\n    min: "1",\n    placeholder: "e\.g\. 25"/,
      'name: "qty",\n    type: "number",\n    min: "1",\n    max: "999999",\n    maxLength: 12,\n    inputMode: "numeric",\n    placeholder: "e.g. 25"'
    );
    app = app.replace(
      /name: "notes",\n    rows: "3",\n    placeholder: "Colours, sizes, deadline, or anything else we should know."/,
      'name: "notes",\n    rows: "3",\n    maxLength: 1000,\n    placeholder: "Colours, sizes, deadline, or anything else we should know. Please do not include ID numbers or card details."'
    );
    console.log('input attrs patched');
  }

  write(path.join(PB, 'app.compiled.js'), app);
}

console.log('finalize-owner-defaults.js done');
