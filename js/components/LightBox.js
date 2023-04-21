export default class LightBox {
  constructor() {
    this.background = document.getElementById('background_modal');
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
    this.closeModal();
  }

  openModal = () => {
    this.background.style.display = 'block';
    this.lightboxContainer.style.display = 'block';
  };

  closeModal = () => {
    this.closebutton.addEventListener('click', () => {
      this.background.style.display = 'none';
      this.lightboxContainer.style.display = 'none';
    });
  };
}
