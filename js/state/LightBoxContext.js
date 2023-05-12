/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import LightBox from '../components/LightBox.js';

/**
 * State Pattern
 * Initialize LightBox
 * Perform object swap on navigation forwards or backwards
 * Update DOM on navigation
 * @class LigthBoxContext
 */
export default class LightBoxContext {
  constructor(medias) {
    this.mediaModels = [];
    this.LightBox = new LightBox(this);
    this.setMediaModels(medias);
  }

  /**
   * Initialize array of MediaModels
   * @returns {(void|Error)}
   */
  setMediaModels = (medias) => {
    medias.forEach((media) => {
      const mediaModel = new MediaModel(media);
      // calling mediaModel setters
      try {
        mediaModel.type = media;
        mediaModel.filename = media;
        this.mediaModels.push(mediaModel);
      } catch (error) {
        console.error(error);
      }
    });
  };

  /**
   * Initialize current element in mediaModels array
   * Set Current, Previous and Next elements in modal on Lightbox opening
   * @returns {void}
   */
  init = (startId) => {
    this.currentIndex = this.mediaModels.findIndex(
      (media) => media.id === startId
    );
    if (this.currentIndex >= 0) {
      let nextMediaModel = null;
      let previousMediaModel = null;
      this.LightBox.createCurrentMedia(this.mediaModels[this.currentIndex]);
      if (this.currentIndex + 1 < this.mediaModels.length) {
        nextMediaModel = this.mediaModels[this.currentIndex + 1];
      }
      if (this.currentIndex > 0) {
        previousMediaModel = this.mediaModels[this.currentIndex - 1];
      }
      if (nextMediaModel) {
        this.LightBox.createNextMedia(nextMediaModel);
        this.LightBox.nextMedia.setNext();
      }
      if (previousMediaModel) {
        this.LightBox.createPreviousMedia(previousMediaModel);
        this.LightBox.previousMedia.setPrevious();
      }
      this.LightBox.openModal();
    }
  };

  /**
   * Update LightBox nextMedia on change
   * @returns {void}
   */
  updateNextMedia = (nextIndex) => {
    if (nextIndex < this.mediaModels.length) {
      this.LightBox.createNextMedia(this.mediaModels[nextIndex]);
      this.LightBox.nextMedia.setNext();
      this.LightBox.appendMedia(this.LightBox.nextMedia);
      this.LightBox.backwardsBtn.style.display = 'block';
    } else {
      this.LightBox.forwardsBtn.style.display = 'none';
      this.LightBox.nextMedia = null;
    }
  };

  /**
   * Update LightBox previous Media on change
   * @returns {void}
   */
  updatePreviousMedia = (previousIndex) => {
    if (previousIndex >= 0) {
      this.LightBox.createPreviousMedia(this.mediaModels[previousIndex]);
      this.LightBox.previousMedia.setPrevious();
      this.LightBox.appendMedia(this.LightBox.previousMedia);
      this.LightBox.forwardsBtn.style.display = 'block';
    } else {
      this.LightBox.backwardsBtn.style.display = 'none';
      this.LightBox.previousMedia = null;
    }
  };

  /**
   * Remove LightBox previousMedia on change
   * Used when navigation reaches first element of mediaModels array
   * @returns {void}
   */
  removePreviousMedia = () => {
    this.LightBox.previousMedia.figure.remove();
  };

  /**
   * Remove LightBox previousMedia on change
   * Used when navigation reaches last element of mediaModels array
   * @returns {void}
   */
  removeNextMedia = () => {
    this.LightBox.nextMedia.figure.remove();
  };

  /**
   * Perform forwards navigation
   * Update Objects and DOM elements
   * @returns {void}
   */
  moveForwards = () => {
    if (this.LightBox.previousMedia && this.currentIndex) {
      this.removePreviousMedia();
    }
    this.currentIndex += 1;
    this.LightBox.currentMedia.setPrevious();
    this.LightBox.nextMedia.setCurrent('next');
    this.LightBox.previousMedia = this.LightBox.currentMedia;
    this.LightBox.currentMedia = this.LightBox.nextMedia;
    this.updateNextMedia(this.currentIndex + 1);
  };

  /**
   * Perform backwards navigation
   * Update Objects and DOM elements
   * @returns {void}
   */
  moveBackwards = () => {
    if (
      this.LightBox.nextMedia &&
      this.currentIndex + 1 < this.mediaModels.length
    ) {
      this.removeNextMedia();
    }
    this.currentIndex -= 1;
    this.LightBox.currentMedia.setNext();
    this.LightBox.previousMedia.setCurrent('previous');
    this.LightBox.nextMedia = this.LightBox.currentMedia;
    this.LightBox.currentMedia = this.LightBox.previousMedia;
    this.updatePreviousMedia(this.currentIndex - 1);
  };
}
