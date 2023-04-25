/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';

export default class LightBoxMedia {
  constructor(LightboxContext, mediaModel) {
    this.LightboxContext = LightboxContext;
    this.MediaTemplate = new GalleryFactory(
      mediaModel,
      'modalElement'
    ).template;
    this.backwardsBtn = document.getElementById('btn-backwards');
    this.forwardsBtn = document.getElementById('btn-forwards');
  }

  setCurrent = (classname) => {
    this.MediaTemplate.figure.classList.remove(classname);
  };

  setNext = () => {
    this.MediaTemplate.figure.classList.add('next');
  };

  setPrevious = () => {
    this.MediaTemplate.figure.classList.add('previous');
  };
}
