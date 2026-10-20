/* Small accessibility helpers; no analytics, ESP or subscriber operations. */
(() => {
  'use strict';
  const menu = document.getElementById('navLinks');
  const menuButton = document.getElementById('menuBtn');
  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.classList.contains('open')) {
      closeMenu(); menuButton.focus();
    }
    const viewer = document.getElementById('pePortfolioModal');
    if (event.key !== 'Tab' || !viewer?.classList.contains('is-open')) return;
    const items = [...viewer.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')].filter(item => item.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  document.addEventListener('click', event => {
    if (menu && !menu.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });
  const viewer = document.getElementById('pePortfolioModal');
  if (viewer) new MutationObserver(() => {
    const open = viewer.classList.contains('is-open');
    const home = document.getElementById('homeView'), header = document.getElementById('header');
    if (home) home.inert = open;
    if (header) header.inert = open;
  }).observe(viewer, {attributes:true, attributeFilter:['class']});
})();
