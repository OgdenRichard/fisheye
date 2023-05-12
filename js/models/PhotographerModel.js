/**
 * @class PhotographerModel
 * Hydrate object model from API photographer data
 */
export default class PhotographerModel {
  /**
   * @param {Object} data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
  }

  /**
   * Getter for fullsize picture
   * @returns {string}
   */
  get picture() {
    return `assets/images/photographers/fullsize/${this.id}/${this.portrait}`;
  }

  /**
   * Getter for thumbnail picture
   * @returns {string}
   */
  get thumbnail() {
    return `assets/images/photographers/compressed/${this.id}/${this.portrait}`;
  }
}
