/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

/**
 * @class LightBox
 * Manage DOM elements in LighBoxModal
 */
export default class LightBox {
  /**
   * @param {Object} LightboxContext
   */
  constructor(LightboxContext) {
    this.LightboxContext = LightboxContext;
    this.header = document.getElementById('banner-header');
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

  /**
   * Open modal action
   * @returns {void}
   */
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

  /**
   * Close modal action
   * @returns {void}
   */
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

  /**
   * Toggle aria-hidden property wether lightbox is open or not
   * @returns {void}
   */
  setAriaHidden = () => {
    this.lightboxContainer.ariaHidden = !this.isActive;
    this.lightboxContainer.ariaModal = this.isActive;
    this.header.ariaHidden = this.isActive;
    this.main.ariaHidden = this.isActive;
  };

  /**
   * Focus loop on Tab navigation while modal is open
   * @returns {void}
   */
  loopFocus = () => {
    this.lightboxContainer.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && document.activeElement === this.closebutton) {
        this.lightboxContainer.focus();
      }
    });
  };

  /**
   * Set focus on current lightbox media in Grid view when modal is closed
   * @returns {void}
   */
  focusCurrentMediaOnClose = () => {
    const currentGridElement = document.getElementById(this.currentMedia.id);
    currentGridElement.focus();
  };

  /**
   * Initialize lightbox view on open modal
   * @returns {void}
   */
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

  /**
   * Append new media in LightBox
   * @param {Object} MediaTemplate
   * @returns {void}
   */
  appendMedia = (MediaTemplate) => {
    this.sliderContainer.appendChild(MediaTemplate.render());
  };

  /**
   * Create new ModalElement object
   * @param {Object} MediaModel
   * @returns {void}
   */
  static createMedia = (MediaModel) =>
    new GalleryFactory(MediaModel, 'modalElement').template;

  /**
   * Set currentMedia
   * @param {Object} MediaModel
   * @returns {void}
   */
  createCurrentMedia = (MediaModel) => {
    this.currentMedia = LightBox.createMedia(MediaModel);
  };

  /**
   * Set nextMedia
   * @param {Object} MediaModel
   * @returns {void}
   */
  createNextMedia = (MediaModel) => {
    this.nextMedia = LightBox.createMedia(MediaModel);
  };

  /**
   * Set previousMedia
   * @param {Object} MediaModel
   * @returns {void}
   */
  createPreviousMedia = (MediaModel) => {
    this.previousMedia = LightBox.createMedia(MediaModel);
  };

  /**
   * Set eventListeners for LightBox navigation
   * @returns {void}
   */
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

  /**
   * Perform backwards navigation
   * Calls LighboxContext method
   * @returns {void}
   */
  displayPreviousMedia = () => {
    this.LightboxContext.moveBackwards();
    this.currentMedia.figure.focus();
  };

  /**
   * Perform forwards navigation
   * Calls LighboxContext method
   * @returns {void}
   */
  displayNextMedia = () => {
    this.LightboxContext.moveForwards();
    this.currentMedia.figure.focus();
  };

  /**
   * Remove Objects on close modal
   * @returns {void}
   */
  removeMediaObjects = () => {
    this.previousMedia = null;
    this.nextMedia = null;
    this.currentMedia = null;
  };
}
