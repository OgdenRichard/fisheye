/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class CurrentMedia {
  constructor(LightboxContext, mediaModel) {
    this.LightboxContext = LightboxContext;
    this.MediaTemplate = new GalleryFactory(
      mediaModel,
      'modalElement'
    ).template;
    this.backwardsBtn = document.getElementById('btn-backwards');
    this.forwardsBtn = document.getElementById('btn-forwards');
    this.displayNextMedia();
    this.displayPreviousMedia();
  }

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
}
