/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

export default class ModalElement extends MediaTemplate {
  constructor(media) {
    super(media);
    this.figure.className = 'media-container';
    this.buildFigure();
    this.enhanceVideo();
    this.buildFigcaption();
  }

  render = () => super.render();

  buildFigure = () => super.buildFigure();

  buildFigcaption = () => super.buildFigcaption();

  enhanceVideo = () => {
    if (this.type === 'video') {
      this.figure.firstChild.setAttribute('controls', 'controls');
    }
  };

  setCurrent = (classname) => {
    this.figure.classList.remove(classname);
  };

  setNext = () => {
    this.figure.classList.add('next');
  };

  setPrevious = () => {
    this.figure.classList.add('previous');
  };
}
