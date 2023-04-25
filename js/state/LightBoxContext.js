/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import LightBox from '../components/LightBox.js';
import LightBoxMedia from './LightBoxMedia.js';

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
    console.log(this.mediaModels);
  };

  //  TODO partir plutôt de la view pour prendre en compte les changements?
  init = (startId) => {
    this.setCurrentIndex(startId);
    if (this.currentIndex >= 0) {
      let nextMediaModel = null;
      let previousMediaModel = null;
      this.LightBox.currentMedia = new LightBoxMedia(
        this,
        this.mediaModels[this.currentIndex]
      );
      if (this.currentIndex + 1 < this.mediaModels.length) {
        nextMediaModel = this.mediaModels[this.currentIndex + 1];
      }
      if (this.currentIndex - 1 >= 0) {
        previousMediaModel = this.mediaModels[this.currentIndex - 1];
      }
      this.LightBox.nextMedia = new LightBoxMedia(this, nextMediaModel);
      if (nextMediaModel) {
        this.LightBox.nextMedia.setNext();
      }
      this.LightBox.previousMedia = new LightBoxMedia(this, previousMediaModel);
      if (previousMediaModel) {
        this.LightBox.previousMedia.setPrevious();
      }
      this.LightBox.openModal();
    }
  };

  updateNextMedia = (nextIndex) => {
    if (nextIndex < this.mediaModels.length) {
      this.LightBox.nextMedia = new LightBoxMedia(
        this,
        this.mediaModels[nextIndex]
      );
      this.LightBox.nextMedia.setNext();
      this.LightBox.addMedia(this.LightBox.nextMedia.MediaTemplate);
    } else {
      this.LightBox.currentMedia.hideForwardsButton();
    }
  };

  moveForwards = () => {
    this.currentIndex += 1;
    this.LightBox.currentMedia.setPrevious();
    this.LightBox.nextMedia.setCurrent('next');
    this.LightBox.previousMedia = this.LightBox.currentMedia;
    this.LightBox.currentMedia = this.LightBox.nextMedia;
    this.updateNextMedia(this.currentIndex + 1);
  };

  moveBackwards = () => {
    this.currentIndex -= 1;
    this.LightBox.currentMedia.setNext();
    this.LightBox.previousMedia.setCurrent('previous');
    this.LightBox.nextMedia = this.LightBox.currentMedia;
    this.LightBox.currentMedia = this.LightBox.previousMedia;
  };

  // TODO : incrémenter / décrémenter this.currentIndex on change
  // TODO : ajouter / retirer au current les props isLast / isFirst en fonction de l'index
}
