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
    this.article.id = `photographe ${this.photographer.id}`;
    this.article.role = 'article';
    this.article.ariaLabel = `photographe ${this.photographer.name}`;
    this.article.appendChild(this.buildTitle('h1'));
    this.article.appendChild(this.buildTitle('h2'));
    this.article.appendChild(this.buildParagraph('tagline'));
  };

  buildFigure = () => {
    this.figure.appendChild(this.buildImg());
  };

  // TODO : créer méthode dans classe mère
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
