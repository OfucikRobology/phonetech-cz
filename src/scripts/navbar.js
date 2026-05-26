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

// iOS-safe scroll lock pro hamburger menu.
// overflow:hidden na body samo NESTAČÍ na iOS Safari - musí se použít
// position:fixed trick. Stejný pattern jako v cenik-modal.js.
const lockBodyScroll = () => {
  const scrollY = window.scrollY;
  document.body.dataset.menuLockY = String(scrollY);
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
};

const unlockBodyScroll = () => {
  const scrollY = parseInt(document.body.dataset.menuLockY || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  delete document.body.dataset.menuLockY;
  window.scrollTo(0, scrollY);
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
