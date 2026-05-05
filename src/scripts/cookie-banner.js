// Cookie banner — jednoduchá GDPR informační lišta.
// Web nepoužívá žádné sledovací cookies, takže stačí informativní souhlas.
const STORAGE_KEY = 'phonetech-cookies-accepted';

const init = () => {
  if (localStorage.getItem(STORAGE_KEY) === '1') return;

  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Show after a brief delay, ne hned při loadu
  requestAnimationFrame(() => {
    setTimeout(() => banner.classList.add('cookie-banner--visible'), 600);
  });

  banner.querySelectorAll('[data-cookie-accept]').forEach((btn) => {
    btn.addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
      banner.classList.remove('cookie-banner--visible');
      setTimeout(() => banner.remove(), 350);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
