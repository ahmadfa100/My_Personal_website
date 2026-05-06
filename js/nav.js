/**
 * nav.js — Navigation behaviors
 * - Scroll-triggered sticky style
 * - Active link highlighting
 * - Mobile menu toggle
 * - Theme toggle
 * - Live clock
 */
(function () {
  'use strict';

  var navbar    = document.getElementById('navbar');
  var menuBtn   = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var navLinks  = document.querySelectorAll('.nav-links a, #mobileMenu a[data-section]');

  /* ── Scroll: sticky style ─────────── */
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active link ──────────────────── */
  var sections = ['hero', 'certifications', 'skills', 'experience', 'projects', 'courses', 'contact'];

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    var current = 'hero';

    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    });

    navLinks.forEach(function (a) {
      var sec = a.getAttribute('data-section');
      a.classList.toggle('active', sec === current);
    });
  }



  /* ── Mobile menu ──────────────────── */
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }

  /* ── Footer year ──────────────────── */
  var yrEl = document.getElementById('footer-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

}());