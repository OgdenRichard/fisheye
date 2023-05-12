/**
 * Build HTML Elements for photographer info display
 * Parent of PhotographerHeader | PhotographerCard
 * @class PhotographerTemplate
 */
export default class PhotographerTemplate {
  /**
   * @param {Object} photographer
   */
  constructor(photographer) {
    this.photographer = photographer;
    this.article = document.createElement('article');
    this.figure = document.createElement('figure');
  }

  /**
   * Build img HTML Element
   * @returns {void}
   */
  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.photographer.thumbnail);
    img.setAttribute('alt', `${this.photographer.name}`);
    return img;
  }

  /**
   * Build p HTML Element
   * Populate with photograher info
   * @param {string} type
   * @returns {HTMLElement}
   */
  buildParagraph(type) {
    const p = document.createElement('p');
    p.classList.add(`photographer__${type}`);
    p.textContent =
      type === 'tagline'
        ? this.photographer.tagline
        : `${this.photographer.price}€ / jour`;
    return p;
  }
}
