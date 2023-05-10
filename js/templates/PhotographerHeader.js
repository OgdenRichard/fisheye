/* eslint-disable import/extensions */
import PhotographerTemplate from './PhotographerTemplate.js';

export default class PhotographerHeader extends PhotographerTemplate {
  constructor(photographer) {
    super(photographer);
    this.buildArticle();
    this.buildFigure();
  }

  renderArticle = () => this.article;

  renderFigure = () => this.figure;

  buildArticle = () => {
    this.article.id = `${this.photographer.id}`;
    this.article.ariaLabel = `photographe ${this.photographer.name}`;
    this.article.setAttribute('tabindex', '0');
    this.article.appendChild(this.buildTitle('h1'));
    this.article.appendChild(this.buildTitle('h2'));
    this.article.appendChild(this.buildParagraph('tagline'));
  };

  buildFigure = () => {
    this.figure.appendChild(this.buildImg());
    this.figure.setAttribute('tabindex', '0');
  };

  buildTitle = (tag) => {
    const title = document.createElement(tag);
    title.textContent =
      tag === 'h1'
        ? this.photographer.name
        : `${this.photographer.city}, ${this.photographer.country}`;
    return title;
  };

  buildImg = () => super.buildImg();

  buildParagraph = (type) => super.buildParagraph(type);
}
