/**
 * Observer Pattern
 * Manages likes update on user action and GridElements display if needed
 * @class GridSubject
 */
export default class GridSubject {
  constructor() {
    this.observers = [];
  }

  /**
   * Add new observer
   * @returns {void}
   */
  subscribe(observer) {
    this.observers.push(observer);
  }

  /**
   * Remove observer
   * @returns {void}
   */
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  /**
   * Fire observers update method
   * @returns {void}
   */
  fire(...args) {
    this.observers.forEach((observer) => observer.update(...args));
  }
}
