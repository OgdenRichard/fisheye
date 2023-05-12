/* eslint-disable import/extensions */
import PhotographerCard from '../templates/PhotographerCard.js';
import PhotographerCounter from '../templates/PhotographerCounter.js';
import PhotographerHeader from '../templates/PhotographerHeader.js';

/**
 * Create proper template from PhotographerModel
 * @class PhotographerFactory
 * @throws Will throw an error if argument type doesn't exist
 */
export default class PhotographerFactory {
  /**
   * @param {Object} model
   * @param {string} type
   * @param {object} subject
   */
  constructor(model, type, subject) {
    if (type === 'card') {
      this.viewTemplate = new PhotographerCard(model);
    } else if (type === 'header') {
      this.viewTemplate = new PhotographerHeader(model);
    } else if (type === 'counter') {
      this.viewTemplate = new PhotographerCounter(model, subject);
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
