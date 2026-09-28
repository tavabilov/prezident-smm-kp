const modal = document.getElementById('lightbox');
const hero = document.querySelector('.hero');
const sidebar = document.querySelector('.proposal-sidebar');
if (hero && sidebar && 'IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(([entry]) => {
    sidebar.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0.08 });
  heroObserver.observe(hero);

  const links = [...sidebar.querySelectorAll('nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach(link => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.25, 0.5] });
  sections.forEach(section => sectionObserver.observe(section));
} else if (sidebar) {
  sidebar.classList.add('visible');
}
if (modal) {
  document.querySelectorAll('.shot,.zoom').forEach(button => button.addEventListener('click', () => {
    const image = modal.querySelector('img');
    const caption = button.dataset.caption || button.querySelector('img')?.alt || 'Снимок экрана';
    image.src = button.dataset.image;
    image.alt = caption;
    modal.querySelector('p').textContent = caption;
    modal.showModal();
  }));
  modal.querySelector('.lightbox-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
}
const auditDetails = document.getElementById('audit-details');
if (auditDetails) {
  const openAuditForChapter = () => {
    if (/^#section-\d+$/.test(window.location.hash)) auditDetails.open = true;
  };
  document.querySelectorAll('a[href^="#section-"]').forEach(link => {
    link.addEventListener('click', () => { auditDetails.open = true; });
  });
  window.addEventListener('hashchange', openAuditForChapter);
  openAuditForChapter();
}
