// PIZZASTA — small, dependency-free interactions

(function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close menu when a link is tapped (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Highlight active menu chip while scrolling the Full Menu section
  var chips = document.querySelectorAll('.menu-chips a');
  var cats = document.querySelectorAll('.menu-cat');

  if (chips.length && cats.length && 'IntersectionObserver' in window) {
    var map = {};
    chips.forEach(function (chip) {
      map[chip.getAttribute('href')] = chip;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map['#' + entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            chips.forEach(function (c) { c.removeAttribute('aria-current'); });
            link.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-140px 0px -70% 0px' }
    );

    cats.forEach(function (cat) { observer.observe(cat); });
  }
  // Gentle reveal-on-scroll for cards and section heads (progressive
  // enhancement only — content is fully visible without JS/with reduced motion)
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealTargets = document.querySelectorAll(
      '.section-head, .feature-card, .location-card, .contact-card, .menu-cat, .about-copy, .about-visual'
    );
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  // Subtle shadow on the sticky header once the page scrolls
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
