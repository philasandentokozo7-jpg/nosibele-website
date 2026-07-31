# Why website updates looked like they “did nothing”

## Root causes

1. **Stale duplicates inside `nb-app.js`**  
   The design-system bundle also embedded an old `app.compiled.js` plus outdated `ui_kits/website/*` pages. Those ran *inside* `nb-app.js` and assigned old `App` / `QuoteSection` / `ContactPage` / `NB_CONFIG` onto `window` (including `artwork@` mailto UI and the old hidden `nbq-upload` control).  
   Canonical code in `app.compiled.js` is supposed to overwrite that, but any failure or **cached old `app.compiled.js`** left visitors on the stale UI.

2. **Long-lived JS caching without content hashes**  
   Netlify had previously served `/*.js` with a year-long / immutable-style edge TTL. HTML revalidated (`max-age=0`), so visitors could get **new SSR HTML** (e.g. “Choose artwork files”) and then hydrate with **year-old JS**, which replaced the DOM with the old form — looking like “nothing changed”.

## Fix

- `build-tools/strip-nb-app-pages.js` — keep only design-system components in `nb-app.js`.
- `build-tools/prerender.js` — strip on every build, then stamp `?v=<sha>` on CSS/JS in all HTML.
- `netlify.toml` — shorter JS/CSS TTL; do not mark unhashed JS as immutable.

After deploy, hard-refresh once (or open a private window) so HTML picks up the new `?v=` URLs.
