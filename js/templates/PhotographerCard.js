/* eslint-disable import/extensions */
import PhotographerTemplate from './PhotographerTemplate.js';

export default class PhotographerCard extends PhotographerTemplate {
  constructor(photographer) {
    super(photographer);
    this.buildCard();
  }

  render = () => this.article;

  buildCard = () => {
    this.article.id = `${this.photographer.id}`;
    this.article.ariaLabel = `${this.photographer.name}`;
    this.buildFigure();
    this.article.appendChild(this.figure);
  };

  buildFigure = () => {
    this.figure.setAttribute('aria-labelledby', this.article.id);
    this.figure.setAttribute('tabindex', '0');
    this.figure.appendChild(this.buildLink());
    this.figure.appendChild(this.buildFigcaption());
  };

  buildFigcaption = () => {
    const figcaption = document.createElement('figcaption');
    figcaption.ariaLabel = `about ${this.photographer.name}`;
    figcaption.appendChild(this.buildTitle('h3'));
    figcaption.appendChild(this.buildParagraph('tagline'));
    figcaption.appendChild(this.buildParagraph('price'));
    return figcaption;
  };

  buildLink = () => {
    const linkContainer = document.createElement('a');
    linkContainer.href = `./photographer.html?photographer_id=${this.photographer.id}`;
    linkContainer.classList.add('photographer__link');
    linkContainer.ariaLabel = `lien vers la page de ${this.photographer.name}`;
    linkContainer.appendChild(this.buildImg());
    linkContainer.appendChild(this.buildTitle('h2'));
    return linkContainer;
  };

  buildTitle = (tag) => {
    const title = document.createElement(tag);
    title.textContent =
      tag === 'h2'
        ? this.photographer.name
        : `${this.photographer.city}, ${this.photographer.country}`;
    return title;
  };

  buildImg = () => super.buildImg();

  buildParagraph = (type) => super.buildParagraph(type);
}
