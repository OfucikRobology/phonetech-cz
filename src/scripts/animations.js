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
// (předtím 0.12 znamenalo 12% velikosti elementu, což pro velmi
// velké elementy jako .stagger device-grid (6900px) znamenalo, že
// se nikdy nezobrazí na mobilech protože 12% > výška viewportu).
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

document.querySelectorAll(selectors.join(',')).forEach((el) => observer.observe(el));

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
