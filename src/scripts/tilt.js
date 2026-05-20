// Subtle 3D tilt on cards marked .tilt. Disabled on touch.

if (matchMedia('(hover: hover)').matches) {
  const tilts = document.querySelectorAll('.tilt');
  const maxTilt = 8; // degrees

  tilts.forEach((el) => {
    let raf = 0;
    let current = { rx: 0, ry: 0 };
    let target = { rx: 0, ry: 0 };

    const step = () => {
      current.rx += (target.rx - current.rx) * 0.15;
      current.ry += (target.ry - current.ry) * 0.15;
      el.style.transform = `perspective(1000px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`;
      if (Math.abs(target.rx - current.rx) > 0.02 || Math.abs(target.ry - current.ry) > 0.02) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
        // Pokud cíl je identity (po mouseleave), vyčisti inline transform,
        // ať CSS :hover { transform: translateY(-6px) } může znovu fungovat
        // při následujících hoverech bez kurzorového pohybu.
        if (target.rx === 0 && target.ry === 0) {
          el.style.transform = '';
        }
      }
    };

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.ry = nx * maxTilt;
      target.rx = -ny * maxTilt;
      if (!raf) raf = requestAnimationFrame(step);
    });

    el.addEventListener('mouseleave', () => {
      target.rx = 0;
      target.ry = 0;
      if (!raf) raf = requestAnimationFrame(step);
    });
  });
}
