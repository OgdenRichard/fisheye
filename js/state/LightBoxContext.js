/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import CurrentMedia from './CurrentMedia.js';
import NextMedia from './NextMedia.js';
import PreviousMedia from './PreviousMedia.js';

export default class LightBoxContext {
  constructor(medias, LightBox) {
    this.mediaModels = [];
    this.LightBox = LightBox;
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

  //  TODO partir plutôt de la view pour prendre en compte les changements?
  init = (startId) => {
    this.setCurrentIndex(startId);
    if (this.currentIndex >= 0) {
      let nextMediaModel = null;
      let previousMediaModel = null;
      this.LightBox.currentMedia = new CurrentMedia(
        this,
        this.mediaModels[this.currentIndex]
      );
      if (this.currentIndex + 1 <= this.mediaModels.length) {
        nextMediaModel = this.mediaModels[this.currentIndex + 1];
      }
      if (this.currentIndex - 1 >= 0) {
        previousMediaModel = this.mediaModels[this.currentIndex - 1];
      }
      this.LightBox.nextMedia = new NextMedia(this, nextMediaModel);
      this.LightBox.previousMedia = new PreviousMedia(this, previousMediaModel);
      this.LightBox.openModal();
    }
  };

  // TODO : incrémenter / décrémenter this.currentIndex on change
  // TODO : ajouter / retirer au current les props isLast / isFirst en fonction de l'index
}
