class PhotographerFactory {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.portrait = data.portrait;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.picture = `assets/images/photographers/compressed/${this.id}/${this.portrait}`;
  }
}
