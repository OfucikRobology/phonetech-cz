// Only allow one FAQ item open at a time per group (optional).
// By default browsers already handle <details> toggling — this adds a smooth height transition.

document.querySelectorAll('.faq-item').forEach((item) => {
  const content = item.querySelector('.faq-item__content');
  if (!content) return;

  item.addEventListener('toggle', () => {
    if (item.open) {
      const h = content.scrollHeight;
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height .4s cubic-bezier(0.16, 1, 0.3, 1)';
      requestAnimationFrame(() => {
        content.style.maxHeight = h + 'px';
      });
      setTimeout(() => {
        content.style.maxHeight = '';
        content.style.overflow = '';
        content.style.transition = '';
      }, 450);
    }
  });
});
