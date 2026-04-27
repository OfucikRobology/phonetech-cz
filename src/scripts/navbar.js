const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('nav-drawer');

let lastScrollY = window.scrollY;
let ticking = false;

const updateScroll = () => {
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;

  // Visual state přechod (background blur)
  navbar?.classList.toggle('scrolled', currentY > 10);

  // Show: u vrcholu NEBO jakýkoliv pohyb nahoru → zobraz okamžitě
  if (currentY < 100 || delta < 0) {
    document.body.classList.remove('nav-hidden');
  }
  // Hide: scroll dolů s malým dampingem, jen po 200px od vrcholu
  else if (delta > 4 && currentY > 200) {
    document.body.classList.add('nav-hidden');
  }

  lastScrollY = currentY;
  ticking = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  },
  { passive: true }
);
updateScroll();

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  drawer?.classList.toggle('open', isOpen);
  drawer?.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

drawer?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// Smooth anchor scroll (same page only)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = (navbar?.offsetHeight ?? 76) + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
