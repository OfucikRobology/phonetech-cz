const timeline = document.getElementById('about-timeline');

if (timeline) {
  const items = timeline.querySelectorAll('.about-timeline__item');

  const activate = () => {
    timeline.classList.add('animated');
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add('active'), i * 280);
    });
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        activate();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(timeline);
}
