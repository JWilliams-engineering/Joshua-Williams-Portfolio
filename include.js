// Loads shared nav/footer into any page that has #nav and #footer placeholders.
// To add a new page: create the .html file, add <div id="nav"></div> and
// <div id="footer"></div> where you want them, include this script, and
// set <body data-page="yourpage"> to highlight the right nav link.
(async function () {
  const navSlot = document.getElementById('nav');
  const footerSlot = document.getElementById('footer');

  const [navHTML, footerHTML] = await Promise.all([
    fetch('partials/nav.html').then(r => r.text()),
    fetch('partials/footer.html').then(r => r.text())
  ]);

  if (navSlot) navSlot.innerHTML = navHTML;
  if (footerSlot) footerSlot.innerHTML = footerHTML;

  // Highlight current page in nav
  const current = document.body.dataset.page;
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === current) a.classList.add('active');
  });

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();
