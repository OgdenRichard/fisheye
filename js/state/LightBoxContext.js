/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import LightBox from '../components/LightBox.js';
import GalleryFactory from '../factories/GalleryFactory.js';

export default class LightBoxContext {
  constructor(medias) {
    this.mediaModels = [];
    this.LightBox = new LightBox(this);
    this.setMediaModels(medias);
  }

  // call on Lightbox opening
  setCurrentIndex = (startId) => {
    this.currentIndex = this.mediaModels.findIndex(
      (media) => media.id === startId
    );
  };

  setMediaModels = (medias) => {
    medias.forEach((media) => {
      const mediaModel = new MediaModel(media);
      // calling mediaModel setters
      mediaModel.type = media;
      mediaModel.filename = media;
      this.mediaModels.push(mediaModel);
    });
  };

  init = (startId) => {
    this.setCurrentIndex(startId);
    if (this.currentIndex >= 0) {
      let nextMediaModel = null;
      let previousMediaModel = null;
      this.LightBox.currentMedia = new GalleryFactory(
        this.mediaModels[this.currentIndex],
        'modalElement'
      ).template;
      if (this.currentIndex + 1 < this.mediaModels.length) {
        nextMediaModel = this.mediaModels[this.currentIndex + 1];
      }
      if (this.currentIndex > 0) {
        previousMediaModel = this.mediaModels[this.currentIndex - 1];
      }
      if (nextMediaModel) {
        this.LightBox.nextMedia = new GalleryFactory(
          nextMediaModel,
          'modalElement'
        ).template;
        this.LightBox.nextMedia.setNext();
      }
      if (previousMediaModel) {
        this.LightBox.previousMedia = new GalleryFactory(
          previousMediaModel,
          'modalElement'
        ).template;
        this.LightBox.previousMedia.setPrevious();
      }
      this.LightBox.openModal();
    }
  };

  // TODO manage in LightBox
  updateNextMedia = (nextIndex) => {
    if (nextIndex < this.mediaModels.length) {
      this.LightBox.nextMedia = new GalleryFactory(
        this.mediaModels[nextIndex],
        'modalElement'
      ).template;
      this.LightBox.nextMedia.setNext();
      this.LightBox.addMedia(this.LightBox.nextMedia);
      this.LightBox.backwardsBtn.style.display = 'block';
    } else {
      this.LightBox.forwardsBtn.style.display = 'none';
    }
  };

  updatePreviousMedia = (previousIndex) => {
    if (previousIndex >= 0) {
      this.LightBox.previousMedia = new GalleryFactory(
        this.mediaModels[previousIndex],
        'modalElement'
      ).template;
      this.LightBox.previousMedia.setPrevious();
      this.LightBox.addMedia(this.LightBox.previousMedia);
      this.LightBox.forwardsBtn.style.display = 'block';
    } else {
      this.LightBox.backwardsBtn.style.display = 'none';
    }
  };

  removePreviousMedia = () => {
    this.LightBox.previousMedia.figure.remove();
  };

  removeNextMedia = () => {
    this.LightBox.nextMedia.figure.remove();
  };

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
