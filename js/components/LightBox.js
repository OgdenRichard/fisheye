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
    this.setEventListeners();
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
    this.isActive = false;
    this.background.style.display = 'none';
    this.lightboxContainer.style.display = 'none';
    this.forwardsBtn.style.display = 'block';
    this.backwardsBtn.style.display = 'block';
    this.focusCurrentMediaOnClose();
    this.setAriaHidden();
    this.sliderContainer.innerHTML = '';
    this.removeMediaObjects();
  };

  setAriaHidden = () => {
    this.lightboxContainer.ariaHidden = !this.isActive;
    this.lightboxContainer.ariaModal = this.isActive;
    this.header.ariaHidden = this.isActive;
    this.main.ariaHidden = this.isActive;
  };

  loopFocus = () => {
    this.lightboxContainer.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && document.activeElement === this.closebutton) {
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

  setEventListeners = () => {
    // backwards navigation
    this.backwardsBtn.addEventListener('click', () => {
      this.displayPreviousMedia();
    });
    this.backwardsBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.displayPreviousMedia();
      }
    });
    this.lightboxContainer.addEventListener('keydown', (event) => {
      if (this.isActive && event.key === 'ArrowLeft' && this.previousMedia) {
        this.displayPreviousMedia();
      }
    });
    // forwards navigation
    this.forwardsBtn.addEventListener('click', () => {
      this.displayNextMedia();
    });
    this.forwardsBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.displayNextMedia();
      }
    });
    this.lightboxContainer.addEventListener('keydown', (event) => {
      if (this.isActive && event.key === 'ArrowRight' && this.nextMedia) {
        this.displayNextMedia();
      }
    });
    // close modal
    this.closebutton.addEventListener('click', () => {
      this.closeModal();
    });
    this.closebutton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.closeModal();
      }
    });
    this.lightboxContainer.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isActive) {
        this.closeModal();
      }
    });
  };

  displayPreviousMedia = () => {
    this.LightboxContext.moveBackwards();
    this.currentMedia.figure.focus();
  };

  displayNextMedia = () => {
    this.LightboxContext.moveForwards();
    this.currentMedia.figure.focus();
  };

  removeMediaObjects = () => {
    this.previousMedia = null;
    this.nextMedia = null;
    this.currentMedia = null;
  };
}
