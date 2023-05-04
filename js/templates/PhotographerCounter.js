export default class PhotographerCounter {
  constructor(photographer, subject) {
    this.price = photographer.price;
    this.subject = subject;
    this.likes = 0;
    this.buildLikesElement();
    // add PhotographerCounter to GridSubject observers
    this.subject.subscribe(this);
  }

  render = () => this.stickyTab;

  update(...args) {
    this.likes += args[0];
    this.likesElement.textContent = `${this.likes}`;
    this.likesElement.ariaLabel = `${this.likes} likes total`;
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
    this.likesElement.setAttribute('tabindex', '0');
  };

  buildPriceElement = () => {
    const priceElement = document.createElement('p');
    priceElement.className = 'photographer_price';
    priceElement.textContent = `${this.price}€ / jour`;
    priceElement.ariaLabel = `photographer daily rate`;
    priceElement.setAttribute('tabindex', '0');
    return priceElement;
  };
}
