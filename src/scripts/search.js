// Hero search — používá stejnou datovou sadu jako ceník (pricing.js)
import { devices, getServicesForDevice, formatPrice } from '../data/pricing.js';

const input = document.getElementById('device-search');
const results = document.getElementById('search-results');
const clearBtn = document.getElementById('search-clear');

if (input && results) {
  // Object → array
  const deviceList = Object.entries(devices).map(([id, d]) => ({ id, ...d }));

  const renderResults = (items) => {
    if (!items.length) {
      results.innerHTML = `<div class="search-results__empty">Žádný iPhone neodpovídá. <a href="./kontakt.html">Kontaktujte nás</a> - opravujeme i Android a další zařízení.</div>`;
    } else {
      const moreCount = Math.max(0, items.length - 5);
      results.innerHTML = items.slice(0, 5).map((d) => {
        const list = getServicesForDevice(d.id);
        const displayOg = list.find((s) => s.id === 'display_original');
        const priceText = displayOg ? formatPrice(displayOg.price) : 'Cena na dotaz';
        return `
          <a href="./cenik.html?model=${encodeURIComponent(d.id)}" class="search-results__item" role="option" data-device="${d.name}">
            <div class="search-results__icon" aria-hidden="true">
              <i class="ph ph-device-mobile" weight="fill"></i>
            </div>
            <div>
              <strong>${d.name}</strong>
              <span>Displej od ${priceText}</span>
            </div>
            <i class="ph ph-arrow-right search-results__arrow"></i>
          </a>
        `;
      }).join('') + (moreCount > 0
        ? `<a href="./cenik.html" class="search-results__more">Zobrazit dalších ${moreCount} <i class="ph ph-arrow-right"></i></a>`
        : '');
    }
    results.removeAttribute('hidden');
  };

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query) clearBtn?.removeAttribute('hidden');
    else clearBtn?.setAttribute('hidden', '');

    if (!query) {
      results.setAttribute('hidden', '');
      return;
    }

    const filtered = deviceList.filter((d) =>
      `apple ${d.name}`.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) results.removeAttribute('hidden');
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    clearBtn.setAttribute('hidden', '');
    results.setAttribute('hidden', '');
    input.focus();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#device-search-wrapper')) {
      results.setAttribute('hidden', '');
    }
  });
}

// Style for the icon wrapper
const style = document.createElement('style');
style.textContent = `.search-results__icon { width: 36px; height: 36px; border-radius: 8px; background: var(--color-orange-faint, var(--color-accent-faint)); color: var(--color-accent); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }`;
document.head.appendChild(style);
