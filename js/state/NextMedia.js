/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class NextMedia {
  constructor(LightboxContext, mediaModel) {
    this.LightboxContext = LightboxContext;
    if (mediaModel) {
      this.MediaTemplate = new GalleryFactory(
        mediaModel,
        'modalElement'
      ).template;
      this.MediaTemplate.figure.classList.add('next');
    }
  }

  changeToCurrent = () => {
    this.MediaTemplate.figure.classList.remove('next');
  };
}
