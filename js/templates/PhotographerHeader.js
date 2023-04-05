class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
    this.article = document.createElement('article');
    this.figure = document.createElement('figure');
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

  // TODO : créer méthode dans classe mère
  buildImg = () => {
    const img = document.createElement('img');
    img.setAttribute('src', this.photographer.thumbnail);
    img.setAttribute('alt', `${this.photographer.name}`);
    return img;
  };

  // TODO : créer méthode dans classe mère
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
