export default class LikesSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  fire(nbLikes) {
    this.observers.forEach((observer) => observer.update(nbLikes));
  }
}
