/* eslint-disable import/extensions */
import PhotographerCard from '../templates/PhotographerCard.js';
import PhotographerHeader from '../templates/PhotographerHeader.js';

export default class PhotographerFactory {
  constructor(data, type) {
    if (type === 'card') {
      this.viewTemplate = new PhotographerCard(data);
    } else if (type === 'header') {
      this.viewTemplate = new PhotographerHeader(data);
    } else if (type === 'gallery') {
      this.viewTemplate = new PhotographerGallery(data);
    } else {
      this.viewTemplate = null;
      throw new Error('unknown template');
    }
  }

  get template() {
    return this.viewTemplate;
  }
}
