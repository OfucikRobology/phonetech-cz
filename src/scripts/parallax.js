// Parallax scroll — reads data-speed (e.g. -0.3, 0.15) and updates --parallax-y on each element.
// Uses IntersectionObserver to only track elements that are near the viewport.

const items = document.querySelectorAll('.parallax');
if (items.length) {
  const visible = new Set();
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
    },
    { rootMargin: '400px 0px 400px 0px' }
  );
  items.forEach((el) => obs.observe(el));

  let ticking = false;
  const update = () => {
    const cy = window.innerHeight / 2;
    visible.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.speed) || 0.2;
      const distanceFromCenter = (rect.top + rect.height / 2) - cy;
      const y = distanceFromCenter * speed * -1;
      el.style.setProperty('--parallax-y', y.toFixed(1) + 'px');
    });
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}
