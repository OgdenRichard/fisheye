/* eslint-disable import/extensions */
import PhotographerTemplate from './PhotographerTemplate.js';

export default class PhotographerCard extends PhotographerTemplate {
  /**
   * @param {Object} photographer
   */
  constructor(photographer) {
    super(photographer);
    this.buildCard();
    this.arrowsNavigation();
  }

  /**
   * @returns {HtmlElement}
   */
  render = () => this.article;

  /**
   * @returns {void}
   */
  buildCard = () => {
    this.article.id = `${this.photographer.id}`;
    this.article.ariaLabel = `${this.photographer.name}`;
    this.buildFigure();
    this.article.appendChild(this.figure);
  };

  /**
   * @returns {void}
   */
  buildFigure = () => {
    this.figure.setAttribute('aria-labelledby', this.article.id);
    this.figure.setAttribute('tabindex', '0');
    this.figure.appendChild(this.buildLink());
    this.figure.appendChild(this.buildFigcaption());
  };

  /**
   * @returns {void}
   */
  buildFigcaption = () => {
    const figcaption = document.createElement('figcaption');
    figcaption.ariaLabel = `À propos de ${this.photographer.name}`;
    figcaption.appendChild(this.buildTitle('h3'));
    figcaption.appendChild(this.buildParagraph('tagline'));
    figcaption.appendChild(this.buildParagraph('price'));
    return figcaption;
  };

  /**
   * @returns {void}
   */
  buildLink = () => {
    const linkContainer = document.createElement('a');
    linkContainer.href = `./photographer.html?photographer_id=${this.photographer.id}`;
    linkContainer.classList.add('photographer__link');
    linkContainer.ariaLabel = `lien vers la page de ${this.photographer.name}`;
    linkContainer.appendChild(this.buildImg());
    linkContainer.appendChild(this.buildTitle('h2'));
    return linkContainer;
  };

  /**
   * @param {string} tag
   * @returns {HTMLElement}
   */
  buildTitle = (tag) => {
    const title = document.createElement(tag);
    title.textContent =
      tag === 'h2'
        ? this.photographer.name
        : `${this.photographer.city}, ${this.photographer.country}`;
    return title;
  };

  /**
   * @returns {void}
   */
  arrowsNavigation = () => {
    this.article.addEventListener('keydown', (event) => {
      const previous = this.article.previousElementSibling;
      if (event.key === 'ArrowLeft' && previous) {
        previous.firstChild.focus();
      }
    });
    this.article.addEventListener('keydown', (event) => {
      const next = this.article.nextElementSibling;
      if (event.key === 'ArrowRight' && next) {
        next.firstChild.focus();
      }
    });
  };

  /**
   * @returns {void}
   */
  buildImg = () => super.buildImg();

  /**
   * @returns {void}
   */
  buildParagraph = (type) => super.buildParagraph(type);
}
