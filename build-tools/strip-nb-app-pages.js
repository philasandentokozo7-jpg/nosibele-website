#!/usr/bin/env node
/**
 * Strip stale page duplicates from nb-app.js.
 *
 * nb-app.js is a design-system bundle that incorrectly also embedded:
 *   - an outdated copy of prod-build/app.compiled.js
 *   - outdated ui_kits/website/* page components + config
 *
 * Those ran after the design-system bits and assigned stale App / QuoteSection /
 * ContactPage / NB_CONFIG onto window. Browsers with long-cached nb-app.js then
 * hydrated the OLD UI over fresh SSR HTML — so site updates appeared to "do nothing".
 *
 * Canonical page code lives only in app.compiled.js (+ config.js / catalogue.js).
 * This script keeps Button/Card/Input/Tag/CatalogueCard/ProductCard/WhatsAppButton.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const NB = path.join(__dirname, '..', 'prod-build', 'nb-app.js');

function sha12(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 12);
}

function main() {
  const raw = fs.readFileSync(NB, 'utf8');
  const marker = '\n// prod-build/app.compiled.js\n';
  const idx = raw.indexOf(marker);
  if (idx === -1) {
    if (!raw.includes('ui_kits/website/') && !raw.includes('// prod-build/app.compiled.js') && !raw.includes('function QuoteSection')) {
      console.log('strip-nb-app-pages: already DS-only, nothing to do');
      return;
    }
    console.error('strip-nb-app-pages: unexpected bundle shape — aborting');
    process.exit(1);
  }

  const head = raw.slice(0, idx).replace(/\s+$/, '');
  const footer = `

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CatalogueCard = __ds_scope.CatalogueCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

})();
`;

  // Refresh @ds-bundle header to list only design-system components.
  const components = [
    ['Button', 'components/core/Button.jsx'],
    ['Card', 'components/core/Card.jsx'],
    ['CatalogueCard', 'components/core/CatalogueCard.jsx'],
    ['Input', 'components/core/Input.jsx'],
    ['ProductCard', 'components/core/ProductCard.jsx'],
    ['Tag', 'components/core/Tag.jsx'],
    ['WhatsAppButton', 'components/core/WhatsAppButton.jsx'],
  ];
  const sourceHashes = {};
  for (const [, p] of components) {
    const start = head.indexOf(`// ${p}\n`);
    const next = components.map((c) => head.indexOf(`// ${c[1]}\n`)).filter((n) => n > start).sort((a, b) => a - b)[0];
    const chunk = next != null ? head.slice(start, next) : head.slice(start);
    sourceHashes[p] = sha12(chunk);
  }
  const meta = {
    format: 3,
    namespace: 'NosibeleDesignSystem_4fcb98',
    components: components.map(([name, sourcePath]) => ({ name, sourcePath })),
    sourceHashes,
    inlinedExternals: [],
    unexposedExports: [],
    note: 'Page components intentionally excluded — use app.compiled.js',
  };
  const withoutOldHeader = head.replace(/^\/\* @ds-bundle: [\s\S]*? \*\/\n/, '');
  const out = `/* @ds-bundle: ${JSON.stringify(meta)} */\n` + withoutOldHeader + footer;

  fs.writeFileSync(NB, out);
  console.log('strip-nb-app-pages: wrote DS-only nb-app.js (' + out.length + ' bytes, was ' + raw.length + ')');
  if (out.includes('function QuoteSection') || out.includes('ui_kits/website/')) {
    console.error('strip-nb-app-pages: WARNING — page code still present');
    process.exit(1);
  }
}

main();
