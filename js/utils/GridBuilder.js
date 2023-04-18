/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import GalleryFactory from '../factories/GalleryFactory.js';

export default class GridBuilder {
  constructor(medias, subject) {
    this.medias = medias;
    this.subject = subject;
    this.portfolio = document.querySelector('.gallery_section');
    this.gridElements = [];
    this.sortBy = 'likes';
  }

  init = () => {
    this.buildGridElements();
    this.sortGridElements();
    this.buildPortfolio();
  };

  update = (...args) => {
    // TODO : subscribe after init
    const current = this.gridElements.filter(
      (element) => element.id === args[1]
    );
    if (current) {
      const index = this.gridElements.findIndex(
        (gridElement) => gridElement.id === args[1]
      );
      if (index > -1) {
        const previous = this.gridElements[index - 1];
        const next = this.gridElements[index + 1];
        if (
          (previous && current[0].likes < previous.likes) ||
          (next && current[0].likes > next.likes)
        ) {
          this.refresh();
        }
      }
    }
  };

  refresh = () => {
    this.portfolio.innerHTML = '';
    this.sortGridElements();
    this.buildPortfolio();
  };

  sortGridElements = () => {
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
    this.gridElements.sort(
      (a, b) => parseInt(a.likes, 10) - parseInt(b.likes, 10)
    );
  };

  sortByTitles = () => {
    this.gridElements.sort((a, b) => a.title.localeCompare(b.title));
  };

  sortByDates = () => {
    this.gridElements.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  buildPortfolio = () => {
    this.gridElements.forEach((gridElement) => {
      this.portfolio.appendChild(gridElement.render());
    });
  };

  async buildGridElements() {
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
        this.gridElements.push(gridElement);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
