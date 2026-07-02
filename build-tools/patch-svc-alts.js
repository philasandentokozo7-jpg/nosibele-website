/* Add descriptive alt text to the NB_SVC_FEATURE service cards in every bundle copy. */
'use strict';
const fs = require('fs');
const path = require('path');

const PB = path.join(__dirname, '..', 'prod-build');
const ALTS = {
  'dtf.png': 'DTF printing at the Nosibele studio — crisp full-colour transfer detail on fabric',
  'sublimation.png': 'Sublimation printing — dye infused edge-to-edge into golf shirts and supporters’ wear',
  'corporate.png': 'Corporate branding — uniform team apparel with consistent embroidered logos',
  'school.png': 'School uniforms measured, sewn and branded with school badges and names',
  'custom.png': 'Custom apparel cut and sewn to exact spec at the Nosibele studio',
};

for (const file of ['app.compiled.js', '_ds_bundle.js']) {
  const p = path.join(PB, file);
  let src = fs.readFileSync(p, 'utf8');
  let patched = 0;
  for (const [img, alt] of Object.entries(ALTS)) {
    const needle = `img: NB_ASSETS + 'services/cards/${img}',`;
    const replacement = `${needle}\n  alt: ${JSON.stringify(alt)},`;
    // Only add where an alt doesn't already follow (idempotent).
    src = src.split(needle).map((part, i, arr) => {
      if (i === arr.length - 1) return part;
      patched += part.trimStart && !arr[i + 1].trimStart().startsWith('alt:') ? 0 : 0;
      return part;
    }).join(needle); // no-op scan; do the real replace below
    const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `(?!\\s*\\n\\s*alt:)`, 'g');
    const before = src;
    src = src.replace(re, replacement);
    if (src !== before) patched += (before.match(re) || []).length;
  }
  fs.writeFileSync(p, src);
  console.log(`${file}: ${patched} service-card alt(s) added`);
}
