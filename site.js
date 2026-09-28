const modal = document.getElementById('lightbox');
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
