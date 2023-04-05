class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
    this.article = document.createElement('article');
    this.figure = document.createElement('figure');
    this.buildCard();
  }

  render = () => this.article;

  buildCard = () => {
    this.article.id = `photographe ${this.photographer.id}`;
    this.article.role = 'article';
    this.article.ariaLabel = `photographe ${this.photographer.name}`;
    this.buildFigure();
    this.article.appendChild(this.figure);
  };

  buildFigure = () => {
    this.figure.setAttribute('aria-labelledby', this.article.id);
    this.figure.appendChild(this.buildLink());
    this.figure.appendChild(this.buildFigcaption());
  };

  buildFigcaption = () => {
    const figcaption = document.createElement('figcaption');
    figcaption.ariaLabel = `informations sur ${this.photographer.name}`;
    figcaption.appendChild(this.buildTitle('h3'));
    figcaption.appendChild(this.buildParagraph('tagline'));
    figcaption.appendChild(this.buildParagraph('price'));
    return figcaption;
  };

  buildLink = () => {
    const linkContainer = document.createElement('a');
    linkContainer.href = `./photographer.html?photographer_id=${this.photographer.id}`;
    linkContainer.classList.add('photographer__link');
    linkContainer.role = 'link';
    linkContainer.ariaLabel = `lien vers la page de ${this.photographer.name}`;
    linkContainer.setAttribute('tabindex', '0');
    linkContainer.appendChild(this.buildImg());
    linkContainer.appendChild(this.buildTitle('h2'));
    return linkContainer;
  };

  buildImg = () => {
    const img = document.createElement('img');
    img.setAttribute('src', this.photographer.thumbnail);
    img.setAttribute('alt', `${this.photographer.name}`);
    return img;
  };

  buildTitle = (tag) => {
    const title = document.createElement(tag);
    title.textContent =
      tag === 'h2'
        ? this.photographer.name
        : `${this.photographer.city}, ${this.photographer.country}`;
    return title;
  };

  buildParagraph = (type) => {
    const p = document.createElement('p');
    p.classList.add(`photographer__${type}`);
    p.textContent =
      type === 'tagline'
        ? this.photographer.tagline
        : `${this.photographer.price}€/jour`;
    return p;
  };
}
