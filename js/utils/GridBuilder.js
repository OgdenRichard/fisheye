/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import GalleryFactory from '../factories/GalleryFactory.js';

export default class GridBuilder {
  constructor(medias, subject) {
    this.medias = medias;
    this.subject = subject;
    this.portfolio = document.querySelector('.gallery_section');
    this.sortBy = 'likes';
    this.sortPortfolio();
  }

  init = () => {
    this.buildPortfolio();
  };

  update = () => {
    this.portfolio.innerHTML = '';
    this.sortPortfolio();
    this.buildPortfolio();
  };

  sortPortfolio = () => {
    switch (this.sortBy) {
      case 'likes':
        this.sortByLikes();
        break;
      case 'title':
        this.sortByTitles();
        break;
      case 'date':
        this.sortByDates();
        break;
      default:
        console.error('Sort method undefined');
        break;
    }
  };

  sortByLikes = () => {
    this.medias.sort((a, b) => parseInt(a.likes, 10) - parseInt(b.likes, 10));
  };

  sortByTitles = () => {
    this.medias.sort((a, b) => a.title.localeCompare(b.title));
  };

  sortByDates = () => {
    this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  async buildPortfolio() {
    this.medias.forEach((media) => {
      try {
        const mediaModel = new MediaModel(media);
        mediaModel.type = media;
        mediaModel.filename = media;
        const gridElement = new GalleryFactory(
          mediaModel,
          'gridElement',
          this.subject
        ).template;
        this.portfolio.appendChild(gridElement.render());
      } catch (error) {
        console.error(error);
      }
    });
  }
}
