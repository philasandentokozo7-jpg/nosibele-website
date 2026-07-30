# Analytics event plan — Nosibele website

**Property:** GA4 `G-WH87LWEPJB` (consent-gated)  
**Implementation:** `prod-build/js/analytics-events.js` + `window.nbTrack`  
**Consent key:** `sessionStorage` `nb_consent_v2` with `analytics: true`

## Principles

- No names, telephone numbers, email addresses, artwork filenames, notes or message bodies.
- Events fire only after analytics consent.
- Use coarse enums (`item: set|unset`, `page: products`) — never free text from form fields.

## Events

| Event | When | Parameters (allowed) |
|-------|------|----------------------|
| `category_view` | Products page load | `page=products` |
| `gallery_view` | Gallery page load | `page=gallery` |
| `quote_start` | Contact page or `#quote` present | `page` |
| `quote_submit` | Formspree success | `item=set\|unset` |
| `form_error` | Formspree failure | `form=quote` |
| `whatsapp_click` | Click `wa.me` / WhatsApp link | `page` |
| `phone_click` | Click `tel:` | `page` |
| `email_click` | Click `mailto:` | `page` |
| `directions_click` | Maps / directions link | `page` |
| `google_review_click` | Google review / profile review CTA | `page` |
| `product_view` | Reserved — no PDP routes yet | — |
| `artwork_upload` | **Not used** — website upload disabled | — |

## Not tracked

- Form field values
- Query string `?item=` contents (avoid sending as event params)
- Cookie reject / accept details beyond Consent Mode defaults handled by `consent.js`

## QA checklist

1. Reject cookies → no GA network calls for events.
2. Accept analytics → `quote_submit` appears without phone/name.
3. WhatsApp click → `whatsapp_click` only.
