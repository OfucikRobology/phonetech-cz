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

const raw = ORDER
  .map((file) => {
    const filePath = path.join(STYLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    // Odstranit lokální @import statements (už nepotřebujeme)
    return content.replace(/@import\s+url\(['"]?\.\/[^'"]+['"]?\);?\s*/g, '');
  })
  .join('\n');

// Minifikace - zachová funkčnost, odstraní whitespace/komentáře.
// Záměrně NEpoužívá tooling (cssnano/esbuild) - jednoduchý regex stačí.
const minify = (css) => css
  .replace(/\/\*[\s\S]*?\*\//g, '')          // /* komentáře */
  .replace(/\s+/g, ' ')                        // multi-whitespace → space
  .replace(/\s*([{}:;,>+~])\s*/g, '$1')        // mezery kolem interpunkce
  .replace(/;}/g, '}')                          // poslední ; před }
  .replace(/\s*\n\s*/g, '')                    // newlines
  .trim();

const minified = minify(raw);
const bundlePath = path.join(STYLES_DIR, 'bundle.css');
fs.writeFileSync(bundlePath, minified);

const sizeRaw = (raw.length / 1024).toFixed(1);
const sizeMin = (minified.length / 1024).toFixed(1);
const saved = (((raw.length - minified.length) / raw.length) * 100).toFixed(0);
console.log(`   ✓ bundle.css (${sizeRaw} KB → ${sizeMin} KB, ušetřeno ${saved}%)`);
