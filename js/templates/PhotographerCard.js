class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
    this.article = document.createElement('article');
    this.buildCard();
  }

  render = () => this.article;

  buildCard = () => {
    this.article.id = `photographe ${this.photographer.id}`;
    this.article.role = 'article';
    this.article.ariaLabel = `photographe ${this.photographer.name}`;
    this.article.appendChild(this.buildFigure());
  };

  buildFigure = () => {
    const figure = document.createElement('figure');
    figure.setAttribute('aria-labelledby', this.article.id);
    figure.appendChild(this.buildLink());
    figure.appendChild(this.buildFigcaption());
    return figure;
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
    linkContainer.href = `./photographer.html?${this.photographer.name}`;
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
    img.setAttribute('alt', `portrait de ${this.photographer.name}`);
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
