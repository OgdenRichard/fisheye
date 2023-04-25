/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class LightBox {
  constructor() {
    this.background = document.getElementById('background_modal');
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
    this.backwardsBtn = document.getElementById('btn-backwards');
    this.forwardsBtn = document.getElementById('btn-forwards');
    this.sliderContainer = document.getElementById('slider-container');
    this.closeModal();
    this.displayNextMedia();
    this.displayPreviousMedia();
  }

  openModal = (mediaModel) => {
    const testFig = this.buildModalElement(mediaModel);
    this.sliderContainer.appendChild(testFig.render());
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

  displayPreviousMedia = () => {
    this.backwardsBtn.addEventListener('click', () => {
      console.log('backwards');
    });
  };

  displayNextMedia = () => {
    this.forwardsBtn.addEventListener('click', () => {
      console.log('forwards');
    });
  };

  buildModalElement = (mediaModel) =>
    new GalleryFactory(mediaModel, 'modalElement').template;
}
