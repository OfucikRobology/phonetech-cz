// ──────────────────────────────────────────────────────────────
//  Build script: CSS bundle
//  Spojí 6 CSS souborů do jednoho bundle.css → eliminuje
//  @import waterfall (na Lighthouse to bylo +3200ms blokující LCP).
// ──────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

const STYLES_DIR = path.join(process.cwd(), 'src/styles');
const ORDER = [
  'tokens.css',
  'base.css',
  'animations.css',
  'components.css',
  'sections.css',
  'pages.css',
];

console.log('🎨 Bundling CSS…');

const bundle = ORDER
  .map((file) => {
    const filePath = path.join(STYLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    // Odstranit lokální @import statements (už nepotřebujeme)
    const cleaned = content.replace(/@import\s+url\(['"]?\.\/[^'"]+['"]?\);?\s*/g, '');
    return `/* ─── ${file} ──────────────── */\n${cleaned}`;
  })
  .join('\n\n');

const bundlePath = path.join(STYLES_DIR, 'bundle.css');
fs.writeFileSync(bundlePath, bundle);

const sizeKB = (bundle.length / 1024).toFixed(1);
console.log(`   ✓ bundle.css vygenerován (${sizeKB} KB)`);
