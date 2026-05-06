/**
 * main.js — Scroll reveal + misc
 */
(function () {
  'use strict';

  /* ── Intersection Observer: reveal ── */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything */
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── Preloader ── */
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('loaded');
      /* Optional: remove from DOM after transition */
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 1000);
    }
  });

}());