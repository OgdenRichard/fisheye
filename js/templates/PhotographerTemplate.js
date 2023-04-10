export default class PhotographerTemplate {
  constructor(photographer) {
    this.photographer = photographer;
    this.article = document.createElement('article');
    this.figure = document.createElement('figure');
  }

  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.photographer.thumbnail);
    img.setAttribute('alt', `${this.photographer.name}`);
    return img;
  }

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
