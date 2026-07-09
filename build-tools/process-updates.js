/* One-off: process the July 2026 client photo batch into web-ready catalogue assets. */
'use strict';
const path = require('path');
const sharp = require('sharp');

const SRC = 'C:/Users/USER/Desktop/nosibele-updates';
const OUT = path.join(__dirname, '..', 'prod-build', 'assets', 'catalogue');

// crop: fractions of source {left, top, width, height}; rotate: degrees clockwise
const JOBS = [
  { src: 'corporate-shirts-source.jpg', out: 'corporate-wear', rotate: 90 },
  { src: 'dtf-goodhair-source.jpg', out: 'dtf-shirts', crop: { left: 0, top: 0.2, width: 1, height: 0.8 } },
  { src: 'bhinca-promo-source.jpg', out: 'bhinca-tshirt', crop: { left: 0.36, top: 0, width: 0.64, height: 1 } },
  { src: 'isisholi-shawl.jpg', out: 'isisholi' },
  { src: 'fur-wrap-embroidered.jpg', out: 'fur-wrap' },
  { src: 'bag-red-manyano.jpg', out: 'embroidered-bags' },
  { src: 'school-kit-sifiso.jpg', out: 'school-shirts' },
  { src: 'gallery-mzinyeni-source.jpg', out: 'gallery-mzinyeni', crop: { left: 0, top: 0.2, width: 1, height: 0.8 } },
  { src: 'gallery-dtf-sweater.jpg', out: 'gallery-dtf-sweater' },
  { src: 'gallery-bhudayami-source.jpg', out: 'gallery-bhudayami', rotate: 90 },
  { src: 'gallery-lashed-laid.jpg', out: 'gallery-lashed-laid' },
  { src: 'bags-school-set.jpg', out: 'gallery-school-bags' },
];

(async () => {
  for (const job of JOBS) {
    const srcPath = path.join(SRC, job.src);
    let img = sharp(srcPath);
    if (job.rotate) img = img.rotate(job.rotate);
    if (job.crop) {
      // need post-rotation dimensions for cropping; apply crop on buffered stage
      const buf = await img.toBuffer();
      img = sharp(buf);
      const meta = await img.metadata();
      const region = {
        left: Math.round(meta.width * job.crop.left),
        top: Math.round(meta.height * job.crop.top),
        width: Math.round(meta.width * job.crop.width),
        height: Math.round(meta.height * job.crop.height),
      };
      img = img.extract(region);
    }
    const staged = await img.resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true }).toBuffer();
    await sharp(staged).webp({ quality: 82 }).toFile(path.join(OUT, job.out + '.webp'));
    await sharp(staged).jpeg({ quality: 85 }).toFile(path.join(OUT, job.out + '.jpg'));
    console.log(`${job.out}: done`);
  }
})();
