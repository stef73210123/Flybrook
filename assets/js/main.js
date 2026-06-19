/* Flybrook — interactions */
(function () {
  'use strict';

  // Sticky header background on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const scrim = document.querySelector('.nav-scrim');
  const closeNav = () => document.body.classList.remove('nav-open');
  if (toggle) {
    toggle.addEventListener('click', () =>
      document.body.classList.toggle('nav-open')
    );
  }
  if (scrim) scrim.addEventListener('click', closeNav);
  document.querySelectorAll('.nav a').forEach((a) =>
    a.addEventListener('click', closeNav)
  );

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Forms — front-end only (no backend wired yet)
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form__status');
      if (note) {
        note.textContent =
          'Thank you — we’ll be in touch. (This form isn’t connected yet.)';
        note.style.color = 'var(--gold-wheat)';
      }
      form.reset();
    });
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
