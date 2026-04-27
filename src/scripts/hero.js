// Hero entrance — unhide first, then GSAP timeline can animate `.from()` reliably.

const unhideHero = () => {
  document.querySelectorAll('.hero-reveal').forEach((el) => {
    el.style.opacity = '1';
  });
};

window.addEventListener('load', () => {
  // Always unhide — so content is visible even if GSAP / reduced motion kicks in
  unhideHero();

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof window.gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero__title', { opacity: 0, y: 28, duration: 0.7 })
    .from('.hero__description', { opacity: 0, y: 20, duration: 0.55 }, '-=0.35')
    .from('.hero__search', { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
    .from('.hero__buttons > *', { opacity: 0, y: 14, stagger: 0.08, duration: 0.5 }, '-=0.25')
    .from('.hero__trust > *', { opacity: 0, y: 14, stagger: 0.08, duration: 0.55 }, '-=0.3')
    .from('.hero__visual', { opacity: 0, scale: 0.94, duration: 1.0, ease: 'expo.out' }, '-=1.1')
    .from('.floating-card', {
      opacity: 0, y: 20, scale: 0.85,
      stagger: 0.12, duration: 0.6, ease: 'back.out(1.5)',
    }, '-=0.7')
    .from('.floating-stat', { opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.5');
});
