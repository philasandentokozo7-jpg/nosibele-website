# Formspree owner dashboard actions — Nosibele

**Form endpoint (public by design):** `https://formspree.io/f/maqgekdl`  
**Code controls already implemented on the website** (see quote form in `app.compiled.js`):

| Control | Status in code |
|--------|----------------|
| Hidden honeypot `_gotcha` | Yes |
| Double-submit prevention (`submitting` disable) | Yes |
| 8-second client cooldown | Yes |
| Local validation (name, phone digits, product, privacy/terms ack) | Yes |
| Max field lengths (name 80, phone 40, notes 1000, etc.) | Yes |
| Neutral success / error messages (no PII echo beyond first name on success summary) | Yes |
| No web artwork upload | Yes |
| No ID / card field collection | Yes (placeholder warns against card/ID in notes) |
| Marketing unticked by default | Yes |
| Autocomplete on name/tel | Yes |
| Accessible `role="alert"` / `role="status"` | Yes |
| No PII in GA4 event payloads | Yes (`nbTrack`) |
| CAPTCHA | **Not claimed** — enable in Formspree dashboard if available on your plan |

## Manual actions for the owner (Formspree dashboard)

Complete these in Formspree — they cannot be finished from the repo alone:

1. **Set notification email** to `quotes@nosibeleembroidery.co.za` (required for quote-form routing).
   - Formspree dashboard → select the Nosibele quote form (`maqgekdl`) → notification settings → destination email → `quotes@nosibeleembroidery.co.za`
2. **Restrict form to your domain** (allow `www.nosibeleembroidery.co.za` / `nosibeleembroidery.co.za` only) if the plan supports it.
3. **Enable spam filtering / CAPTCHA** if offered on your Formspree plan. Do not state on the website that CAPTCHA is on until it is actually enabled.
4. **Review reCAPTCHA / hCaptcha** settings after enabling; retest the live form.
5. **Set a monthly submission alert** so abuse is noticed quickly.
6. **Do not store card numbers** in Formspree replies — if a customer pastes one, delete and ask them to use a secure payment channel you confirm offline.
7. After deploy, send one **TEST** submission and delete it from the Formspree inbox.

**Status:** The website form posts to Formspree endpoint `maqgekdl` with optional PNG/JPG/PDF attachments. Copy routes customers to **`quotes@` only** for quotation requests (including artwork). The Formspree inbox destination and file-upload plan feature **cannot** be changed from this repository — complete the dashboard steps below.

## File uploads (required for artwork attachments)

1. Confirm your Formspree plan supports **file uploads**.
2. In the form Workflow/settings, allow file fields / attachments for the quote form.
3. Send a TEST submission with a small PNG and confirm the notification email to `quotes@nosibeleembroidery.co.za` includes the attachment.
4. If uploads fail on a free plan, upgrade or enable the upload feature before advertising attachments publicly.

## What not to claim publicly

- Do not advertise “CAPTCHA protected” until step 3 is done.
- Do not claim the Formspree form ID is secret (it ships in page source).
