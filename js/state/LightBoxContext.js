/* eslint-disable import/extensions */
import CurrentMedia from './CurrentMedia.js';

export default class LightBoxContext {
  constructor(medias) {
    this.medias = medias;
    this.currentMediaState = new CurrentMedia(this);
  }
}
