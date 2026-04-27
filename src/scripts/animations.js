// Unified scroll-reveal observer for .reveal, .stagger, .clip-reveal, .mask-reveal, .text-reveal
const selectors = [
  '.reveal',
  '.stagger',
  '.clip-reveal',
  '.mask-reveal',
  '.text-reveal',
  '.animate-on-scroll', // legacy fallback
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
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
