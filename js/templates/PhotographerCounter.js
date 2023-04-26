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
