export default class PhotographerModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
  }

  get picture() {
    return `assets/images/photographers/fullsize/${this.id}/${this.portrait}`;
  }

  get thumbnail() {
    return `assets/images/photographers/compressed/${this.id}/${this.portrait}`;
  }
}
