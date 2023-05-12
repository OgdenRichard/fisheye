/**
 * Display photographer daily rate and total number of likes
 * Display those information on a sticky tab
 * @class PhotographerCounter
 */
export default class PhotographerCounter {
  constructor(photographer, subject) {
    this.price = photographer.price;
    this.subject = subject;
    this.likes = 0;
    this.buildLikesElement();
    // add PhotographerCounter to GridSubject observers
    this.subject.subscribe(this);
  }

  /**
   * Render sticky tab article in DOM
   * @returns {void}
   */
  render = () => this.stickyTab;

  /**
   * Update counter on user action
   * Fired by GridSubject
   * @returns {void}
   */
  update(...args) {
    this.likes += args[0];
    this.likesElement.textContent = `${this.likes}`;
    this.likesElement.ariaLabel = `${this.likes} likes total`;
  }

  /**
   * Build article HTML Element
   * @returns {void}
   */
  buildTab = () => {
    this.stickyTab = document.createElement('article');
    this.stickyTab.className = 'sticky-info';
    this.stickyTab.id = 'rates';
    this.stickyTab.appendChild(this.likesElement);
    this.stickyTab.appendChild(this.buildPriceElement());
  };

  /**
   * Build global likes counter
   * @returns {void}
   */
  buildLikesElement = () => {
    this.likesElement = document.createElement('p');
    this.likesElement.className = 'total-likes';
    this.likesElement.setAttribute('tabindex', '0');
  };

  /**
   * Build daily rate HTML Element
   * @returns {HTMLElement}
   */
  buildPriceElement = () => {
    const priceElement = document.createElement('p');
    priceElement.className = 'photographer_price';
    priceElement.textContent = `${this.price}€ / jour`;
    priceElement.ariaLabel = `photographer daily rate`;
    priceElement.setAttribute('tabindex', '0');
    return priceElement;
  };
}
