/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class LightBox {
  constructor(LightboxContext) {
    this.LightboxContext = LightboxContext;
    this.background = document.getElementById('background_modal');
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
    this.sliderContainer = document.getElementById('slider-container');
    this.backwardsBtn = document.getElementById('btn-backwards');
    this.forwardsBtn = document.getElementById('btn-forwards');
    this.displayNextMedia();
    this.displayPreviousMedia();
    this.closeModal();
  }

  openModal = () => {
    this.initSlider();
    this.background.style.display = 'block';
    this.lightboxContainer.style.display = 'block';
  };

  closeModal = () => {
    this.closebutton.addEventListener('click', () => {
      this.background.style.display = 'none';
      this.lightboxContainer.style.display = 'none';
      this.forwardsBtn.style.display = 'block';
      this.backwardsBtn.style.display = 'block';
      this.sliderContainer.innerHTML = '';
      this.removeMediaObjects();
    });
  };

  initSlider = () => {
    this.appendMedia(this.currentMedia);
    if (this.previousMedia) {
      this.appendMedia(this.previousMedia);
    } else {
      this.backwardsBtn.style.display = 'none';
    }
    if (this.nextMedia) {
      this.appendMedia(this.nextMedia);
    } else {
      this.forwardsBtn.style.display = 'none';
    }
  };

  appendMedia = (MediaTemplate) => {
    this.sliderContainer.appendChild(MediaTemplate.render());
  };

  createCurrentMedia = (MediaModel) => {
    this.currentMedia = LightBox.createMedia(MediaModel);
  };

  createNextMedia = (MediaModel) => {
    this.nextMedia = LightBox.createMedia(MediaModel);
  };

  createPreviousMedia = (MediaModel) => {
    this.previousMedia = LightBox.createMedia(MediaModel);
  };

  static createMedia = (MediaModel) =>
    new GalleryFactory(MediaModel, 'modalElement').template;

  displayPreviousMedia = () => {
    this.backwardsBtn.addEventListener('click', () => {
      this.LightboxContext.moveBackwards();
    });
  };

  displayNextMedia = () => {
    this.forwardsBtn.addEventListener('click', () => {
      this.LightboxContext.moveForwards();
    });
  };

  removeMediaObjects = () => {
    this.previousMedia = null;
    this.nextMedia = null;
    this.currentMedia = null;
  };
}
