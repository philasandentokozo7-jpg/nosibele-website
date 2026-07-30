# Nosibele — Data and cookie inventory

**Date:** 28 July 2026  
**Site:** https://www.nosibeleembroidery.co.za/

## Personal data collected via website forms

| Field | Required | Purpose | Processor |
|-------|----------|---------|-----------|
| Name | Yes | Identify enquiry | Formspree → business email |
| WhatsApp / phone | Yes | Respond to enquiry | Formspree → business email |
| Product / service | Yes | Quotation scope | Formspree |
| Quantity | No | Quotation scope | Formspree |
| Delivery or collection | Yes (UI default) | Fulfilment preference | Formspree |
| Notes | No | Order detail | Formspree |
| Artwork filename | No | Identify artwork to follow | Formspree (filename only) |
| Lead source | No | Lightweight attribution | Formspree |
| Privacy acknowledgement | Yes | Record notice awareness | Formspree |
| Marketing opt-in | No (default off) | Optional updates | Formspree |
| Honeypot `_gotcha` | Hidden | Spam trap | Formspree |

Form method: `POST` via `fetch` to `https://formspree.io/f/maqgekdl`.  
Personal data is not appended to URL query strings by the form script.

## WhatsApp

Visitors may open `wa.me` links. Message content is processed by WhatsApp/Meta. Links disclose that WhatsApp opens in a new tab and leaves the website.

## Analytics

| Item | Status |
|------|--------|
| Google Analytics 4 | `G-WH87LWEPJB` |
| Load condition | Only after Accept all or Analytics preference in current session |
| Before consent | Blocked (`analytics_storage` denied; script not injected) |
| IP anonymisation | Requested via `anonymize_ip: true` |

## Storage used by consent system

| Name | Technology | Duration | Category | Purpose |
|------|------------|----------|----------|---------|
| `nb_consent_v2` | sessionStorage | Session | Necessary | Stores Accept / Reject / custom choice for current browser session |
| Legacy `nb_consent` | localStorage | Cleared when new choice saved | Legacy | Previous banner; not used to permanently suppress new session banner |
| `_ga`, `_ga_*`, `_gid` | Cookies | Per Google | Analytics (optional) | Only after analytics consent |

## Hosting / technical processors

- Static site files in `prod-build/`
- Netlify configured in repo (`netlify.toml`) for build + headers + redirects
- Live DNS currently observed serving via GitHub Pages/Fastly (see SEO report)
- Google Fonts (Cormorant Garamond, Manrope, Pinyon Script)
- Google Maps embed/link on Contact
- Instagram / TikTok outbound links

## Not found / not used

- Marketing pixels / Meta Pixel
- Hotjar / Clarity
- Payment card capture on-site
- Chat widgets other than WhatsApp deep links
