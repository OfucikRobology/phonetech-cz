const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  if (Number.isNaN(target)) return;

  const duration = 2000;
  const start = performance.now();
  const isInteger = target % 1 === 0;

  // Reserve final width to prevent layout shift during count.
  // display: inline-flex spolu s min-width zaručí, že:
  // 1. Counter má rezervovanou šířku finálního textu (žádný skok)
  // 2. Sourozenci v rodiči (např. "+") zůstanou na stejném řádku
  const finalText = isInteger ? String(target) : target.toFixed(1);
  el.style.minWidth = `${finalText.length}ch`;
  el.style.display = 'inline-block';
  el.style.fontVariantNumeric = 'tabular-nums';

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = target * easeOut(progress);
    el.textContent = isInteger ? Math.floor(value) : value.toFixed(1);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isInteger ? target : target.toFixed(1);
    }
  };
  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter[data-target]').forEach((el) => {
  counterObserver.observe(el);
});
