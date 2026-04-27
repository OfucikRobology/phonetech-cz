window.addEventListener('load', () => {
  if (typeof window.Swiper === 'undefined') return;

  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    grabCursor: true,
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    a11y: {
      prevSlideMessage: 'Předchozí recenze',
      nextSlideMessage: 'Další recenze',
    },
  });
});
