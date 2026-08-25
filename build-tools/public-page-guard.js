#!/usr/bin/env node
/**
 * Guard: public multi-page routes must stay reachable.
 *
 * A previous package permanently 301'd /products|/services|/gallery|/about|/contact
 * (and their .html URLs) to "/". Browsers cache 301s aggressively, so visitors
 * could not open those pages even after the server was fixed.
 *
 * This check fails the build if that mistake returns.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PB = path.join(ROOT, 'prod-build');

const PUBLIC_PAGES = ['products', 'services', 'gallery', 'about', 'contact'];

function fail(msg) {
  console.error('PUBLIC PAGE GUARD FAILED:', msg);
  process.exit(1);
}

function parseNetlifyRedirects(toml) {
  const blocks = toml.split('[[redirects]]').slice(1);
  return blocks.map((b) => {
    const from = (b.match(/from\s*=\s*"([^"]+)"/) || [])[1];
    const to = (b.match(/to\s*=\s*"([^"]+)"/) || [])[1];
    const status = Number((b.match(/status\s*=\s*(\d+)/) || [])[1] || 0);
    return { from, to, status };
  }).filter((r) => r.from && r.to);
}

function parseUnderscoreRedirects(text) {
  return text.split(/\r?\n/).map((line) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return null;
    const parts = t.split(/\s+/);
    if (parts.length < 3) return null;
    return { from: parts[0], to: parts[1], status: Number(String(parts[2]).replace('!', '')) || 0 };
  }).filter(Boolean);
}

function assertNotHomeRedirect(redirects, source) {
  for (const page of PUBLIC_PAGES) {
    const paths = ['/' + page, '/' + page + '.html'];
    for (const from of paths) {
      const hit = redirects.find((r) => r.from === from || r.from === from.slice(1));
      if (!hit) continue;
      if (hit.to === '/' || hit.to === '/index.html') {
        fail(`${source}: ${from} must not redirect to homepage (found → ${hit.to}, status ${hit.status}). ` +
          `Public pages must stay open. Pretty URLs should map to /${page}.html only.`);
      }
    }
  }
}

function assertPrettyUrlTargets(redirects, source) {
  for (const page of PUBLIC_PAGES) {
    const from = '/' + page;
    const hit = redirects.find((r) => r.from === from);
    if (!hit) {
      fail(`${source}: missing pretty URL redirect for ${from} → /${page}.html`);
    }
    if (hit.to !== '/' + page + '.html') {
      fail(`${source}: ${from} must redirect to /${page}.html (found → ${hit.to})`);
    }
  }
}

function assertHtmlFilesExist() {
  for (const page of PUBLIC_PAGES) {
    const file = path.join(PB, page + '.html');
    if (!fs.existsSync(file)) fail(`missing publish file prod-build/${page}.html`);
  }
}

function assertSitemapListsPages() {
  const xml = fs.readFileSync(path.join(PB, 'sitemap.xml'), 'utf8');
  for (const page of PUBLIC_PAGES) {
    const loc = `https://www.nosibeleembroidery.co.za/${page}.html`;
    if (!xml.includes(`<loc>${loc}</loc>`)) {
      fail(`sitemap.xml must list ${loc}`);
    }
  }
}

function main() {
  const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
  const redirectsFile = fs.readFileSync(path.join(PB, '_redirects'), 'utf8');
  const tomlRedirects = parseNetlifyRedirects(toml);
  const fileRedirects = parseUnderscoreRedirects(redirectsFile);

  assertNotHomeRedirect(tomlRedirects, 'netlify.toml');
  assertNotHomeRedirect(fileRedirects, 'prod-build/_redirects');
  assertPrettyUrlTargets(tomlRedirects, 'netlify.toml');
  assertHtmlFilesExist();
  assertSitemapListsPages();

  console.log('public-page-guard: OK — products/services/gallery/about/contact stay reachable');
}

main();
