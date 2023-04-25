/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class LightBox {
  constructor() {
    this.background = document.getElementById('background_modal');
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
    this.sliderContainer = document.getElementById('slider-container');
    this.closeModal();
  }

  openModal = () => {
    this.initMedias();
    this.background.style.display = 'block';
    this.lightboxContainer.style.display = 'block';
  };

  closeModal = () => {
    this.closebutton.addEventListener('click', () => {
      this.background.style.display = 'none';
      this.lightboxContainer.style.display = 'none';
      this.sliderContainer.innerHTML = '';
    });
  };

  initMedias = () => {
    console.log(this.currentMedia);
    this.sliderContainer.appendChild(this.currentMedia.MediaTemplate.render());
    if (this.previousMedia.MediaTemplate) {
      this.sliderContainer.appendChild(
        this.previousMedia.MediaTemplate.render()
      );
    }
    if (this.nextMedia.MediaTemplate) {
      this.sliderContainer.appendChild(this.nextMedia.MediaTemplate.render());
    }
  };
}
