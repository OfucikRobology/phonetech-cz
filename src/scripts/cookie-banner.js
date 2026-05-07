// Cookie banner — jednoduchá GDPR lišta s volbou souhlas / odmítnout.
// Web používá jen nezbytné cookies, takže odmítnutí nemá funkční dopad,
// ale uživatel má právo volby (GDPR / ePrivacy).
const STORAGE_KEY = 'phonetech-cookies-consent'; // 'accepted' | 'rejected'

const close = (banner) => {
  banner.classList.remove('cookie-banner--visible');
  setTimeout(() => banner.remove(), 350);
};

const init = () => {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Show after a brief delay, ne hned při loadu
  requestAnimationFrame(() => {
    setTimeout(() => banner.classList.add('cookie-banner--visible'), 600);
  });

  banner.querySelectorAll('[data-cookie-accept]').forEach((btn) => {
    btn.addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch {}
      close(banner);
    });
  });
  banner.querySelectorAll('[data-cookie-reject]').forEach((btn) => {
    btn.addEventListener('click', () => {
      try { localStorage.setItem(STORAGE_KEY, 'rejected'); } catch {}
      close(banner);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
