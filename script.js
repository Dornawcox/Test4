(function(){
  const btn = document.getElementById('menuButton');
  const drawer = document.getElementById('drawer');
  const closeBtn = document.getElementById('drawerClose');
  const scrim = document.getElementById('scrim');

  const focusableSelector = 'a[href], button:not([disabled]), details summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let lastFocus = null;

  function openDrawer(){
    lastFocus = document.activeElement;
    drawer.classList.add('open');
    scrim.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');

    const firstLink = drawer.querySelector('.drawer-link');
    if (firstLink) firstLink.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer(){
    drawer.classList.remove('open');
    scrim.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closeDrawer() : openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Close after clicking a link
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // Focus trap
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('open')) return;
    if (e.key !== 'Tab') return;

    const focusables = drawer.querySelectorAll(focusableSelector);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();