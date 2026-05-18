import { getDevice, getServicesForDevice, formatPrice } from '../data/pricing.js?v=47';

// Mini i18n pro dynamicky generovaný obsah modalu (cs default, en variant)
const LBL_EN = {
  display_original: 'Display replacement',
  display_premium: 'Display replacement',
  battery_original: 'Battery replacement',
  battery_premium: 'Battery replacement',
  charging_port: 'Charging port replacement',
  earpiece: 'Earpiece replacement',
  speaker: 'Speaker replacement',
  rear_camera: 'Rear camera replacement',
  back_glass: 'Back glass replacement',
  face_id: 'Face ID repair',
  tempered_premium: 'Tempered glass installation',
  screen_protector: 'Screen protector installation',
  other: 'Other repairs',
};
const STR_EN = {
  subtitleYear: () => 'Scroll down for more repairs',
  subtitleNoYear: 'Scroll down for more repairs',
  fallback: 'Device',
  byArrangement: 'By arrangement',
  onRequest: 'Price on request',
};
const STR_CS = {
  subtitleYear: () => 'Pro další opravy skrolujte dolů',
  subtitleNoYear: 'Pro další opravy skrolujte dolů',
  fallback: 'Zařízení',
  byArrangement: 'Dle dohody',
  onRequest: 'Cena na dotaz',
};

const getLang = () => (localStorage.getItem('phonetech-lang') === 'en' ? 'en' : 'cs');

const localizeLabel = (svc) => getLang() === 'en' ? (LBL_EN[svc.id] || svc.label) : svc.label;
const localizePrice = (price) => {
  if (price == null) return getLang() === 'en' ? STR_EN.onRequest : STR_CS.onRequest;
  if (typeof price === 'string') {
    if (price === 'Dle dohody' && getLang() === 'en') return STR_EN.byArrangement;
    return price;
  }
  return formatPrice(price);
};

const modal = document.getElementById('device-modal');
if (modal) {
  const titleEl = modal.querySelector('.modal__title');
  const subtitleEl = modal.querySelector('.modal__subtitle');
  const bodyEl = modal.querySelector('.modal__body');
  const ctaEl = modal.querySelector('.modal__cta');
  const closeButtons = modal.querySelectorAll('[data-close]');
  let lastFocus = null;
  let currentDeviceId = null;

  const open = (deviceId, fallbackName) => {
    currentDeviceId = deviceId;
    const dev = getDevice(deviceId);
    const services = getServicesForDevice(deviceId);
    const lang = getLang();
    const STR = lang === 'en' ? STR_EN : STR_CS;
    const name = dev?.name || fallbackName || STR.fallback;
    const year = dev?.year ?? '';

    titleEl.textContent = name;
    subtitleEl.textContent = year ? STR.subtitleYear(year) : STR.subtitleNoYear;

    const slug = (str) => str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    bodyEl.innerHTML = services
      .map((s) => `
        <li class="repair-item">
          <div class="repair-item__icon"><i class="ph ${s.icon}" weight="duotone"></i></div>
          <div class="repair-item__label">
            <strong>${localizeLabel(s)}</strong>
            ${s.variant ? `<span class="repair-item__variant repair-item__variant--${slug(s.variant)}">${s.variant}</span>` : ''}
          </div>
          <span class="repair-item__price ${s.price == null ? 'repair-item__price--muted' : ''}">${localizePrice(s.price)}</span>
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

  // Re-render modal content if language changes while modal is open
  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentDeviceId && !modal.hasAttribute('hidden')) {
        setTimeout(() => open(currentDeviceId), 50);
      }
    });
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
