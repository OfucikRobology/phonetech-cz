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
  if (currentY < 80 || delta < 0) {
    document.body.classList.remove('nav-hidden');
  }
  // Hide: JAKÝKOLI pohyb dolů jakmile je user 80px od vrcholu.
  // Žádný threshold - chceme aby header zmizel okamžitě i při
  // pomalém prstovém scrollu na mobilu.
  else if (delta > 0) {
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

// Scroll lock pro hamburger menu - blokuje touch i wheel.
// Predcházející position:fixed přístup způsoboval bugy s drawer
// (drawer position:absolute relativně k navbar, ale fixed body
// měnilo scroll context).
//
// Nový přístup: preventDefault na touchmove/wheel mimo drawer.
// Zachová scroll pozici, nezpůsobuje layout shift.
let blockHandler = null;

const lockBodyScroll = () => {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  // Block touch scroll mimo drawer (iOS Safari)
  blockHandler = (e) => {
    if (drawer && !drawer.contains(e.target)) {
      e.preventDefault();
    }
  };
  document.addEventListener('touchmove', blockHandler, { passive: false });
  document.addEventListener('wheel', blockHandler, { passive: false });
};

const unlockBodyScroll = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  if (blockHandler) {
    document.removeEventListener('touchmove', blockHandler);
    document.removeEventListener('wheel', blockHandler);
    blockHandler = null;
  }
};

const closeMenu = () => {
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
  unlockBodyScroll();
};

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  drawer?.classList.toggle('open', isOpen);
  drawer?.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
});

drawer?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', closeMenu);
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
