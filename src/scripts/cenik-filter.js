// Real-time filter pro device-grid na ceníku.

const input = document.getElementById('device-filter');
const clearBtn = document.getElementById('device-filter-clear');
const grid = document.getElementById('device-grid');
const empty = document.getElementById('device-grid-empty');

if (input && grid) {
  const cards = Array.from(grid.querySelectorAll('.device-card'));

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    if (q) clearBtn?.removeAttribute('hidden');
    else clearBtn?.setAttribute('hidden', '');

    let visible = 0;
    cards.forEach((card) => {
      const name = (card.dataset.name || card.textContent || '').toLowerCase();
      const match = !q || name.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (empty) empty.hidden = visible > 0;
    if (grid) grid.style.display = visible > 0 ? '' : 'none';
  };

  input.addEventListener('input', apply);

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    input.focus();
    apply();
  });
}
