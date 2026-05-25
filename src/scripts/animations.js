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

// Safety net: po krátkém delay po loadu zkontroluj, jestli některé
// elementy neměly trigger (bug v iOS Safari nebo jiný edge case).
// JEN na load - scroll listener byl odstraněn, protože volal
// getBoundingClientRect() na 30+ elementech při každém scroll event
// (= jank/lag na mobilu).
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

// Scroll progress bar - rAF throttled (předtím sledoval každý scroll
// event bez throttle = duplicitní práce s navbar.js).
const progress = document.getElementById('scroll-progress');
if (progress) {
  let progressTicking = false;
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct + '%';
    progressTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!progressTicking) {
      requestAnimationFrame(updateProgress);
      progressTicking = true;
    }
  }, { passive: true });
  updateProgress();
}
