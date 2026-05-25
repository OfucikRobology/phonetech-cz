// ──────────────────────────────────────────────────────────────
//  Build script: Markdown → HTML
//  Generuje:
//    1. /blog/<slug>.html — detail stránky z _template.html
//    2. /blog.html — aktualizuje featured + grid karet mezi markery
//  Spouští se automaticky na Vercel deployi (viz package.json "build").
// ──────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content/blog');
const TEMPLATE_PATH = path.join(ROOT, 'blog/_template.html');
const BLOG_INDEX_PATH = path.join(ROOT, 'blog.html');
const BLOG_DIR = path.join(ROOT, 'blog');

// Markdown render konfigurace
marked.setOptions({
  gfm: true,
  breaks: false,
});

// ─── Helpers ──────────────────────────────────────────────────
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Date z frontmatter může být string ("2026-03-15") nebo Date objekt (gray-matter
// auto-parsuje ISO data). Normalizujeme na ISO string YYYY-MM-DD.
const normalizeDate = (val) => {
  if (!val) return new Date().toISOString().split('T')[0];
  if (val instanceof Date) return val.toISOString().split('T')[0];
  return String(val).split('T')[0];
};

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const replaceBetweenMarkers = (source, markerName, replacement) => {
  const startMarker = `<!-- BLOG_${markerName}:START -->`;
  const endMarker = `<!-- BLOG_${markerName}:END -->`;
  const pattern = new RegExp(
    `${startMarker}[\\s\\S]*?${endMarker}`,
    'g'
  );
  if (!source.match(pattern)) {
    console.warn(`⚠️  Marker ${markerName} nenalezen v blog.html, přeskakuji`);
    return source;
  }
  return source.replace(pattern, `${startMarker}\n${replacement}\n      ${endMarker}`);
};

// ─── Načti všechny články ─────────────────────────────────────
const loadArticles = () => {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('⚠️  /content/blog/ neexistuje, build pokračuje bez článků');
    return [];
  }
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const articles = files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, '');
    return {
      slug,
      title: data.title || 'Bez názvu',
      date: normalizeDate(data.date),
      category: data.category || 'Návody',
      readTime: data.readTime || 5,
      thumbnail: data.thumbnail || '',
      thumbnailAlt: data.thumbnailAlt || data.title || '',
      excerpt: data.excerpt || '',
      featured: data.featured || false,
      author: data.author || 'PhoneTech',
      bodyHtml: marked.parse(content),
    };
  });
  // Seřaď od nejnovějších
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  return articles;
};

// ─── Šablona detailu článku ───────────────────────────────────
const renderDetailPage = (article, template) => {
  return template
    .replaceAll('{{TITLE}}', escapeHtml(article.title))
    .replaceAll('{{TITLE_HTML}}', escapeHtml(article.title))
    .replaceAll('{{EXCERPT}}', escapeHtml(article.excerpt))
    .replaceAll('{{DATE_ISO}}', article.date)
    .replaceAll('{{DATE_FORMATTED}}', formatDate(article.date))
    .replaceAll('{{CATEGORY}}', escapeHtml(article.category))
    .replaceAll('{{READ_TIME}}', String(article.readTime))
    .replaceAll('{{THUMBNAIL}}', escapeHtml(article.thumbnail))
    .replaceAll('{{THUMBNAIL_ALT}}', escapeHtml(article.thumbnailAlt))
    .replaceAll('{{AUTHOR}}', escapeHtml(article.author))
    .replaceAll('{{BODY}}', article.bodyHtml)
    .replaceAll('{{SLUG}}', article.slug);
};

// ─── Featured karta (jediná, největší) ────────────────────────
const renderFeaturedCard = (article) => `        <a href="./blog/${article.slug}" class="blog-featured reveal">
          <div class="blog-featured__image">
            <img src="${escapeHtml(article.thumbnail)}" alt="${escapeHtml(article.thumbnailAlt)}" loading="lazy">
          </div>
          <div class="blog-featured__body">
            <div class="blog-featured__meta">
              <span class="badge">Doporučujeme</span>
              <span>${escapeHtml(article.category)}</span>
              <span>·</span>
              <span>${article.readTime} min čtení</span>
            </div>
            <h2 class="blog-featured__title">${escapeHtml(article.title)}</h2>
            <p class="blog-featured__excerpt">${escapeHtml(article.excerpt)}</p>
            <span class="blog-featured__link">
              <span>Přečíst článek</span>
              <i class="ph ph-arrow-right" weight="bold"></i>
            </span>
          </div>
        </a>`;

// ─── Karta v gridu ────────────────────────────────────────────
const renderGridCard = (article) => `          <a href="./blog/${article.slug}" class="article-card">
            <div class="article-card__image">
              <img src="${escapeHtml(article.thumbnail)}" alt="${escapeHtml(article.thumbnailAlt)}" loading="lazy">
            </div>
            <div class="article-card__body">
              <div class="article-card__meta">
                <span class="article-card__category">${escapeHtml(article.category)}</span>
                <span class="dot"></span>
                <span>${article.readTime} min čtení</span>
              </div>
              <h3 class="article-card__title">${escapeHtml(article.title)}</h3>
              <p class="article-card__excerpt">${escapeHtml(article.excerpt)}</p>
              <span class="article-card__link">
                <span>Číst dále</span>
                <i class="ph ph-arrow-right" weight="bold"></i>
              </span>
            </div>
          </a>`;

// ─── Main build ───────────────────────────────────────────────
const main = () => {
  console.log('🔨 Building blog…');

  const articles = loadArticles();
  console.log(`   • Nalezeno ${articles.length} článků`);

  if (articles.length === 0) {
    console.log('   ✓ Žádné MD články k buildu, končím');
    return;
  }

  // 1. Generuj detail stránky
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`✗ Šablona ${TEMPLATE_PATH} neexistuje!`);
    process.exit(1);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  articles.forEach((article) => {
    const html = renderDetailPage(article, template);
    const outPath = path.join(BLOG_DIR, `${article.slug}.html`);
    fs.writeFileSync(outPath, html);
    console.log(`   ✓ ${article.slug}.html`);
  });

  // 2. Aktualizuj blog.html (featured + grid)
  let blogIndex = fs.readFileSync(BLOG_INDEX_PATH, 'utf8');

  // Featured: první článek s featured=true, jinak nejnovější
  const featured = articles.find((a) => a.featured) || articles[0];
  blogIndex = replaceBetweenMarkers(blogIndex, 'FEATURED', renderFeaturedCard(featured));

  // Grid: všechny ostatní (kromě featured)
  const gridArticles = articles.filter((a) => a.slug !== featured.slug);
  const gridHtml = gridArticles.length > 0
    ? gridArticles.map(renderGridCard).join('\n\n')
    : '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-mute);">Další články brzy přibudou.</p>';
  blogIndex = replaceBetweenMarkers(blogIndex, 'GRID', gridHtml);

  fs.writeFileSync(BLOG_INDEX_PATH, blogIndex);
  console.log('   ✓ blog.html aktualizován');

  console.log('✅ Build hotov');
};

main();
