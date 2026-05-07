// Unified scroll-reveal observer for .reveal, .stagger, .clip-reveal, .mask-reveal, .text-reveal
const selectors = [
  '.reveal',
  '.stagger',
  '.clip-reveal',
  '.mask-reveal',
  '.text-reveal',
  '.animate-on-scroll', // legacy fallback
];

// threshold: 0 - spustí se hned jak vrchol elementu vstoupí do viewportu
// rootMargin -60px aby se animace spustila krátce před tím, než
// element zcela vplul do viewportu.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: '0px 0px -60px 0px' }
);

const allTargets = document.querySelectorAll(selectors.join(','));
allTargets.forEach((el) => observer.observe(el));

// Safety net: po krátkém delay zkontroluj, jestli některé elementy
// neměly trigger (bug v iOS Safari nebo jiný edge case). Pokud je
// element částečně viditelný a stále nemá .is-visible, force-add ho.
const safetyCheck = () => {
  const winH = window.innerHeight;
  allTargets.forEach((el) => {
    if (el.classList.contains('is-visible')) return;
    const r = el.getBoundingClientRect();
    if (r.top < winH && r.bottom > 0) {
      el.classList.add('is-visible');
      observer.unobserve(el);
    }
  });
};
window.addEventListener('load', () => setTimeout(safetyCheck, 800));
window.addEventListener('scroll', safetyCheck, { passive: true });

// Scroll progress bar
const progress = document.getElementById('scroll-progress');
if (progress) {
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
