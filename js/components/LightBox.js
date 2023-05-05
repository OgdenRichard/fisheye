/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class LightBox {
  constructor(LightboxContext) {
    this.LightboxContext = LightboxContext;
    this.header = document.getElementById('header');
    this.main = document.getElementById('main');
    this.background = document.getElementById('background_modal');
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
    this.sliderContainer = document.getElementById('slider-container');
    this.backwardsBtn = document.getElementById('btn-backwards');
    this.forwardsBtn = document.getElementById('btn-forwards');
    this.isActive = false;
    this.displayNextMedia();
    this.displayPreviousMedia();
    this.closeModal();
  }

  openModal = () => {
    this.isActive = true;
    this.initSlider();
    this.background.style.display = 'block';
    this.lightboxContainer.style.display = 'block';
    this.lightboxContainer.setAttribute('tabindex', '0');
    this.setAriaHidden();
    this.lightboxContainer.focus();
    this.loopFocus();
  };

  closeModal = () => {
    this.closebutton.addEventListener('click', () => {
      this.isActive = false;
      this.background.style.display = 'none';
      this.lightboxContainer.style.display = 'none';
      this.forwardsBtn.style.display = 'block';
      this.backwardsBtn.style.display = 'block';
      this.setAriaHidden();
      this.sliderContainer.innerHTML = '';
      this.removeMediaObjects();
      this.focusCurrentMediaOnClose();
    });
  };

  setAriaHidden = () => {
    this.lightboxContainer.ariaHidden = !this.isActive;
    this.lightboxContainer.ariaModal = this.isActive;
    this.header.ariaHidden = this.isActive;
    this.main.ariaHidden = this.isActive;
  };

  // TODO cleanup ou utilisation de focusable
  loopFocus = () => {
    let focusable = null;
    this.lightboxContainer.addEventListener('keydown', (event) => {
      focusable = this.previousMedia
        ? this.backwardsBtn
        : this.currentMedia.figure;
      const tabPressed = event.key === 'Tab';
      if (tabPressed && document.activeElement === this.closebutton) {
        this.lightboxContainer.focus();
      }
    });
  };

  focusCurrentMediaOnClose = () => {
    const currentGridElement = document.getElementById(this.currentMedia.id);
    currentGridElement.focus();
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
      this.currentMedia.figure.focus();
    });
  };

  displayNextMedia = () => {
    this.forwardsBtn.addEventListener('click', () => {
      this.LightboxContext.moveForwards();
      this.currentMedia.figure.focus();
    });
  };

  removeMediaObjects = () => {
    this.previousMedia = null;
    this.nextMedia = null;
    this.currentMedia = null;
  };
}
