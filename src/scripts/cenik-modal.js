import { getDevice, getServicesForDevice, formatPrice } from '../data/pricing.js';

const modal = document.getElementById('device-modal');
if (modal) {
  const titleEl = modal.querySelector('.modal__title');
  const subtitleEl = modal.querySelector('.modal__subtitle');
  const bodyEl = modal.querySelector('.modal__body');
  const ctaEl = modal.querySelector('.modal__cta');
  const closeButtons = modal.querySelectorAll('[data-close]');
  let lastFocus = null;

  const open = (deviceId, fallbackName) => {
    const dev = getDevice(deviceId);
    const services = getServicesForDevice(deviceId);
    const name = dev?.name || fallbackName || 'Zařízení';
    const year = dev?.year ?? '';

    titleEl.textContent = name;
    subtitleEl.textContent = year ? `Apple · ${year} · ceny za servis` : 'Apple · ceny za servis';

    const slug = (str) => str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    bodyEl.innerHTML = services
      .map((s) => `
        <li class="repair-item">
          <div class="repair-item__icon"><i class="ph ${s.icon}" weight="duotone"></i></div>
          <div class="repair-item__label">
            <strong>${s.label}</strong>
            ${s.variant ? `<span class="repair-item__variant repair-item__variant--${slug(s.variant)}">${s.variant}</span>` : ''}
          </div>
          <span class="repair-item__price ${s.price == null ? 'repair-item__price--muted' : ''}">${formatPrice(s.price)}</span>
        </li>
      `).join('');

    if (ctaEl) ctaEl.href = `./kontakt.html?device=${encodeURIComponent(name)}`;

    lastFocus = document.activeElement;
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal__close');
    closeBtn?.focus();
  };

  const close = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      lastFocus?.focus();
    }, 280);
  };

  closeButtons.forEach((b) => b.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) close();
  });

  // Hook into device-card clicks
  document.querySelectorAll('.device-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Allow CMD/CTRL+click to open kontakt page in new tab
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const deviceId = card.dataset.id;
      const fallbackName = card.dataset.name;
      open(deviceId, fallbackName);
    });
  });

  // Auto-otevři modal pokud URL obsahuje ?model=<slug>
  const urlModel = new URLSearchParams(window.location.search).get('model');
  if (urlModel && getDevice(urlModel)) {
    // Po krátkém delay (animace, focus atd.)
    setTimeout(() => {
      open(urlModel);
      // Vyčistit URL aby refresh modal znovu neotvíral
      history.replaceState({}, '', window.location.pathname + '#iphone');
    }, 350);
  }
}
