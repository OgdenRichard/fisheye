/* eslint-disable import/extensions */
import PhotographerTemplate from './PhotographerTemplate.js';

/**
 * Build HTML Elements for photographer page
 * @class PhotographerHeader
 */
export default class PhotographerHeader extends PhotographerTemplate {
  constructor(photographer) {
    super(photographer);
    this.buildArticle();
    this.buildFigure();
  }

  /**
   * Render Article in DOM
   * @returns {void}
   */
  renderArticle = () => this.article;

  /**
   * Render figure in DOM
   * @returns {void}
   */
  renderFigure = () => this.figure;

  /**
   * Build article HTML Element
   * @returns {void}
   */
  buildArticle = () => {
    this.article.id = `${this.photographer.id}`;
    this.article.ariaLabel = `photographe ${this.photographer.name}`;
    this.article.setAttribute('tabindex', '0');
    this.article.appendChild(this.buildTitle('h1'));
    this.article.appendChild(this.buildTitle('h2'));
    this.article.appendChild(this.buildParagraph('tagline'));
  };

  /**
   * Build figure HTML Element
   * @returns {void}
   */
  buildFigure = () => {
    this.figure.appendChild(this.buildImg());
    this.figure.setAttribute('tabindex', '0');
  };

  /**
   * Build title HTML Element
   * Populate with photograher info
   * @param {string} tag
   * @returns {HTMLElement}
   */
  buildTitle = (tag) => {
    const title = document.createElement(tag);
    title.textContent =
      tag === 'h1'
        ? this.photographer.name
        : `${this.photographer.city}, ${this.photographer.country}`;
    return title;
  };

  /**
   * Build img HTML Element
   * @returns {void}
   */
  buildImg = () => super.buildImg();

  /**
   * Build p HTML Element
   * Populate with photograher info
   * @param {string} type
   * @returns {HTMLElement}
   */
  buildParagraph = (type) => super.buildParagraph(type);
}
