// Runtime i18n. Czech je výchozí (text v HTML), English se aplikuje po
// kliknutí na přepínač. Používá data-i18n="path.to.key" atribut na elementech
// a data-i18n-attr="attrName:key" pro atributy (placeholder, title, alt).

import { translations } from '../data/translations.js?v=21';

const STORAGE_KEY = 'phonetech-lang';
const DEFAULT_LANG = 'cs';
const SUPPORTED = ['cs', 'en'];

const getLang = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
};

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const apply = (lang) => {
  const dict = translations[lang] || translations[DEFAULT_LANG];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const val = get(dict, key);
    if (typeof val === 'string') el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (!attr || !key) return;
      const val = get(dict, key.trim());
      if (typeof val === 'string') el.setAttribute(attr.trim(), val);
    });
  });

  document.documentElement.lang = lang;
};

const updateSwitcherUI = (lang) => {
  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    btn.classList.toggle('lang-switch--active', btn.dataset.langSwitch === lang);
    btn.setAttribute('aria-pressed', btn.dataset.langSwitch === lang ? 'true' : 'false');
  });
};

const setLang = (lang) => {
  if (!SUPPORTED.includes(lang)) return;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  apply(lang);
  updateSwitcherUI(lang);
};

const init = () => {
  const lang = getLang();
  apply(lang);
  updateSwitcherUI(lang);

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langSwitch));
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
