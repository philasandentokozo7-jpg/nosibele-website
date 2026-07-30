# File upload security review — Nosibele website

**Date:** 30 July 2026  
**Scope:** Quotation form artwork handling on https://www.nosibeleembroidery.co.za  
**Hosting:** Live site served by GitHub Pages; Netlify config present for optional cutover  
**Form provider:** Formspree (`https://formspree.io/f/maqgekdl`)

## Finding (critical)

The previous UI presented an “Upload PNG, JPG or PDF” control, but the client **did not upload the file** to Formspree or any server. Only the **filename** was appended to the FormData payload (`Artwork (to be sent separately)`). That pattern:

- Misled customers into believing the artwork was attached.
- Provided no MIME validation, size limit, antivirus, or private storage.
- Still exposed a file picker that could encourage users to select sensitive files on shared devices.

## Correction implemented

Website file upload is **disabled**.

- The quotation form no longer includes a file input.
- Customers are instructed to send PNG / JPG / PDF artwork **after** the quotation request via:
  - WhatsApp: verified number `061 445 3680` (`wa.me/27614453680`)
  - Email: `artwork@nosibeleembroidery.co.za`
- Formspree receives a plain note: artwork will be sent separately via WhatsApp or email.
- `NB_CONFIG.artworkUploadEnabled = false` documents the policy in `prod-build/config.js`.

## Control matrix

| Control | Status |
|--------|--------|
| Allowed formats published | Yes — PNG, JPG, PDF via WhatsApp/email (not via web form) |
| MIME validation on website | N/A — no web upload |
| Extension validation on website | N/A |
| File-size limit on website | N/A (config placeholder `artworkMaxBytes` for future) |
| Sanitised / unique server filenames | N/A — no website storage |
| Executable blocking | N/A |
| Public upload directory | None in repo |
| Private storage | Customer artwork arrives in WhatsApp / email inboxes (operator-controlled) |
| Directory listing | No upload path |
| Cross-customer access via URL | Not applicable (no public artwork URLs) |
| Git exposure of customer files | None — no upload directory committed |
| Customer names in public file URLs | None |
| Retention / deletion | **Owner action** — document studio practice; see OWNER_ACTIONS_REQUIRED |

## If web upload is re-enabled later

Do not re-enable until all of the following exist:

1. Server-side MIME sniffing (not trust `Content-Type` alone).
2. Allow-list: `image/png`, `image/jpeg`, `application/pdf` only.
3. Hard size limit (recommend ≤ 8 MB).
4. Private object storage outside the public site root.
5. Randomised object keys (no customer names in URLs).
6. Auth or unguessable tokens; no directory listing.
7. Malware scanning or quarantine for high-risk types.
8. Retention schedule and deletion process.
9. Form provider (or custom API) that supports authenticated multipart uploads with rate limits.

Formspree free/standard file attachment behaviour is **not** assumed safe for production customer artwork without a dedicated review.

## Residual risk

Artwork sent over WhatsApp or email inherits those channels’ security and retention properties. Operators should avoid forwarding artwork into public channels and should delete files when no longer needed for the order.
