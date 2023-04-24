/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

export default class ModalElement extends MediaTemplate {
  constructor(media, lightbox) {
    super(media);
    this.lightbox = lightbox;
    this.figure.className = 'media-container';
    this.buildFigure();
    this.buildFigcaption();
  }

  render = () => super.render();

  buildFigure = () => super.buildFigure();

  buildFigcaption = () => super.buildFigcaption();
}
