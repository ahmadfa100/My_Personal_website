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
  var themeBtn  = document.getElementById('themeBtn');
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
  var sections = ['hero', 'experience', 'projects', 'skills', 'education', 'courses', 'contact'];

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

  /* ── Theme toggle ─────────────────── */
  function syncThemeIcon() {
    if (!themeBtn) return;
    var dark = document.documentElement.getAttribute('data-theme') !== 'light';
    themeBtn.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.innerHTML = dark
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (themeBtn) {
    syncThemeIcon();
    themeBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('af-theme', next);
      syncThemeIcon();
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

  /* ── Live clock ───────────────────── */
  var DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function tickClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');

    var tEl = document.getElementById('nav-clock-time');
    var dEl = document.getElementById('nav-clock-date');

    if (tEl) {
      tEl.innerHTML =
        h + '<span class="nav-clock-colon">:</span>' +
        m + '<span class="nav-clock-colon">:</span>' + s;
    }
    if (dEl) {
      dEl.textContent =
        DAYS[now.getDay()] + ', ' +
        MONTHS[now.getMonth()] + ' ' +
        now.getDate() + ' ' +
        now.getFullYear();
    }
  }

  tickClock();
  setInterval(tickClock, 1000);

  /* ── Footer year ──────────────────── */
  var yrEl = document.getElementById('footer-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

}());