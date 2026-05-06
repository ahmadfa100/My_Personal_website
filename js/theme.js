/**
 * theme.js — Synchronous IIFE
 * Must be loaded in <head> (not deferred) to prevent
 * any flash of wrong theme on page load.
 */
(function () {
  'use strict';
  var saved = localStorage.getItem('af-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}());