# Claims evidence register — Nosibele website

**Date:** 30 July 2026  
**Rule:** Do not invent volumes, guarantees, testimonials or turnaround promises.

| Exact wording (before / after) | Page / source | Evidence required | Evidence available | Action |
|---|---|---|---|---|
| “1000+ / Garments finished” | Home & About hero stats | Verified production count | No | **Removed.** Replaced with “Made to order / Quote-based production”. |
| “7–10 days / Typical turnaround” (stat chip) | Home & About | Confirmed standard lead time | Partial FAQ language only | **Softened** to “Typical lead time / Confirmed on quotation”. |
| “Every stitch checked by hand” | Home hero float | QC process description approved by owner | Informal | **Softened** to “Checked before it leaves the studio”. |
| “Every stitch is placed with intention and checked by hand…” | About values | Same | Informal | **Softened** to care/check wording without absolute “every stitch”. |
| “hold their colour and shape, wash after wash” | About values | Care-instruction-backed durability claim | No formal care sheet on site | **Softened** to method-appropriate quality wording. |
| “most orders ready in 7–10 working days” | About / Craft / FAQ | Production log sample | Unverified absolute | **Softened** — lead times confirmed on quotation. |
| “Ready in 7–10 working days… couriered across South Africa” | Craft step 06 | Lead time + courier policy | Courier available; nationwide not verified | **Rewritten** process steps; courier “as agreed”. |
| “never crack or fade” / “never crack, peel or fade” | Catalogue sublimation product & service; services copy | Technical durability evidence / care instructions | None on file | **Removed absolute promise.** Replaced with durable finish “when cared for as advised”. |
| “Digitised for perfect logos” | Services embroidery bullets | — | — | **Softened** to “Digitised for logo embroidery”. |
| “made to last a full year of wear” | Services school uniforms (if present) | — | — | Softened / removed where found. |
| “usually within a day” (quote reply) | Quote section, CTAs, FAQ | Response-time SLA | Unverified | **Softened** to reply after review / promptly. |
| “Collect… or we courier nationwide across South Africa” | FAQ | Courier coverage evidence | Courier available; nationwide not verified | **Softened** to ask about courier options when quoting. |
| “FromR300” style formatting | Catalogue cards | — | Display bug risk | **Fixed** spacing via `From ` + `R…` and price note. |
| Testimonial: Ayanda / AOL Accounting Academy SA | Home & About (catalogue REVIEWS) | Genuine source + customer permission + approved wording | Text on site historically; **permission not confirmed in config** | **Hidden** until `permissionConfirmed: true`. Google review CTA shown instead. |
| AggregateRating / review counts | Structured data | Qualifying visible ratings | None | **Not used** (correct). |
| “Premium…” marketing adjectives | Meta / copy | Brand voice | Opinion | Allowed as descriptive; not as warranty. |

## Owner confirmations still needed

1. Confirm Ayanda testimonial permission → set `permissionConfirmed: true` in `catalogue.js`.
2. Confirm whether any verified garment count may be published.
3. Confirm standard lead-time band if one exists.
4. Confirm VAT inclusion language for guide prices.
5. Confirm courier coverage wording beyond “ask when we quote”.
6. Supply care instructions if durability language should be strengthened later.
