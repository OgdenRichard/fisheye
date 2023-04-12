/* eslint-disable import/extensions */
import PhotographerCard from '../templates/PhotographerCard.js';
import PhotographerCounter from '../templates/PhotographerCounter.js';
import PhotographerHeader from '../templates/PhotographerHeader.js';

export default class PhotographerFactory {
  constructor(model, type) {
    if (type === 'card') {
      this.viewTemplate = new PhotographerCard(model);
    } else if (type === 'header') {
      this.viewTemplate = new PhotographerHeader(model);
    } else if (type === 'counter') {
      this.viewTemplate = new PhotographerCounter(model);
    } else {
      this.viewTemplate = null;
      throw new Error('unknown template');
    }
  }

  get template() {
    return this.viewTemplate;
  }
}
