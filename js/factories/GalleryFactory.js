/* eslint-disable import/extensions */
import LightBox from '../components/LightBox.js';
import GridElement from '../templates/GridElement.js';

export default class GalleryFactory {
  constructor(model, type, subject = null, lightbox = null) {
    if (type === 'gridElement') {
      this.viewTemplate = new GridElement(model, subject, lightbox);
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
