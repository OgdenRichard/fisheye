export default class LightBox {
  constructor() {
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
  }

  openModal = () => {
    this.background.style.display = 'block';
    this.lightboxContainer.style.display = 'block';
  };

  closeModal = () => {
    this.closeButton.addEventListener('click', () => {
      this.background.style.display = 'none';
      this.lightboxContainer.style.display = 'none';
    });
  };
}
