# File upload security review — Nosibele website

**Date:** 31 July 2026  
**Scope:** Quotation form artwork attachments on https://www.nosibeleembroidery.co.za  
**Form provider:** Formspree (`https://formspree.io/f/maqgekdl`)

## Current policy

Website quotation form **accepts** optional artwork attachments so logos arrive with the same quote submission (destination mailbox: `quotes@nosibeleembroidery.co.za`).

## Client controls implemented

| Control | Status |
|--------|--------|
| Allowed types | PNG, JPG/JPEG, PDF only |
| Extension allow-list | `.png` `.jpg` `.jpeg` `.pdf` |
| MIME allow-list | `image/png`, `image/jpeg`, `application/pdf` |
| Magic-byte check | PNG / JPEG / PDF signatures verified in browser before send |
| Per-file size limit | 8 MB (`NB_CONFIG.artworkMaxBytes`) |
| Max files per request | 3 |
| Executable / other types | Rejected |
| Public upload directory in repo | None |
| Storage | Formspree hosts submission files; delivered with notification email |

## Formspree owner requirement

File attachments require a Formspree plan that supports uploads. Owner must confirm in the Formspree dashboard that:

1. File uploads are enabled for form `maqgekdl`
2. Notification email is `quotes@nosibeleembroidery.co.za`
3. A test submission with a small PNG arrives with a downloadable attachment

## Residual risk

- Client-side checks can be bypassed by a modified browser; Formspree still receives the bytes.
- Operators should not open unexpected file types and should delete artwork when no longer needed for the order.
- Do not upload ID documents or card images via this form (stated in Privacy Notice and form copy).
