export default class PhotographerCounter {
  constructor(price) {
    this.likes = 0;
    this.price = price;
    this.buildLikesElement();
  }

  set totalLikes(nbLikes) {
    this.likes += nbLikes;
    this.likesElement.textContent = `${this.likes}`;
  }

  buildTab = () => {
    this.stickyTab = document.createElement('article');
    this.stickyTab.className = 'sticky-info';
    this.stickyTab.id = 'rates';
    this.stickyTab.appendChild(this.likesElement);
    this.stickyTab.appendChild(this.buildPriceElement());
  };

  buildLikesElement = () => {
    this.likesElement = document.createElement('p');
    this.likesElement.className = 'total-likes';
  };

  buildPriceElement = () => {
    const priceElement = document.createElement('p');
    priceElement.className = 'photographer_price';
    priceElement.textContent = `${this.price}€ / jour`;
    return priceElement;
  };
}
