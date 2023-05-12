/* eslint-disable import/extensions */
import GridElement from '../templates/GridElement.js';
import ModalElement from '../templates/ModalElement.js';

export default class GalleryFactory {
  /**
   * @param {Object} model
   * @param {string} type
   * @param {null|Object} subject
   * @param {null|Object} lightbox
   */
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

  /**
   * Getter for viewTemplate
   * @returns {Object}
   */
  get template() {
    return this.viewTemplate;
  }
}
