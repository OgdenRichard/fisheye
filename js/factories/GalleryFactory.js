/* eslint-disable import/extensions */
import GridElement from '../templates/GridElement.js';

export default class GalleryFactory {
  constructor(model, type, subject = null) {
    if (type === 'gridElement') {
      this.viewTemplate = new GridElement(model, subject);
    } else if (type === 'modalElement') {
      this.viewTemplate = new ModalElement(model);
    } else {
      this.viewTemplate = null;
      throw new Error('unknown template');
    }
  }

  get template() {
    return this.viewTemplate;
  }
}
