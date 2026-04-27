// Magnetic hover effect — element drifts slightly toward cursor.
// Apply to any element with .magnetic; strength can be tuned via data-strength (default 0.3).
// Disabled on touch devices.

if (!matchMedia('(hover: hover)').matches) {
  // Skip on touch
} else {
  const els = document.querySelectorAll('.magnetic');
  els.forEach((el) => {
    const strength = parseFloat(el.dataset.strength) || 0.3;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const step = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
      if (!raf) raf = requestAnimationFrame(step);
    });

    el.addEventListener('mouseleave', () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(step);
    });
  });
}

// Button shine — track mouse position for radial-gradient overlay
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--mx', x + '%');
    btn.style.setProperty('--my', y + '%');
  });
});
