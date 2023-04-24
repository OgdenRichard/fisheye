/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import GalleryFactory from '../factories/GalleryFactory.js';

export default class GridBuilder {
  constructor(medias, subject, lightbox) {
    this.medias = medias;
    this.subject = subject;
    this.lightbox = lightbox;
    this.portfolio = document.querySelector('.gallery_section');
    this.gridElements = [];
    this.sortBy = 'likes';
  }

  init = () => {
    this.buildGridElements();
    this.sortGridElements();
    this.buildPortfolio();
    // add GridBuilder to GridSubject observers
    this.subject.subscribe(this);
  };

  update = (...args) => {
    const mediaIndex = this.medias.findIndex((media) => media.id === args[1]);
    if (mediaIndex >= 0) {
      this.medias[mediaIndex].likes += args[0];
    }
    if (this.sortBy === 'likes') {
      const currentFigure = this.gridElements.filter(
        (element) => element.id === args[1]
      );
      if (currentFigure) {
        const index = this.gridElements.findIndex(
          (gridElement) => gridElement.id === args[1]
        );
        if (index > -1) {
          const previous = this.gridElements[index - 1];
          const next = this.gridElements[index + 1];
          if (
            (previous && currentFigure[0].likes < previous.likes) ||
            (next && currentFigure[0].likes > next.likes)
          ) {
            this.refresh();
          }
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
        this.sortByLikes(this.gridElements);
        this.sortByLikes(this.medias);
        break;
      case 'title':
        this.sortByTitles(this.gridElements);
        this.sortByTitles(this.medias);
        break;
      case 'date':
        this.sortByDates(this.gridElements);
        this.sortByDates(this.medias);
        break;
      default:
        console.error('undefined sort method');
        break;
    }
  };

  sortByLikes = (property) => {
    property.sort((a, b) => parseInt(a.likes, 10) - parseInt(b.likes, 10));
    console.log(property);
  };

  sortByTitles = (property) => {
    property.sort((a, b) => a.title.localeCompare(b.title));
    console.log(property);
  };

  sortByDates = (property) => {
    property.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(property);
  };

  buildPortfolio = () => {
    this.gridElements.forEach((gridElement) => {
      this.portfolio.appendChild(gridElement.render());
    });
  };

  buildGridElements() {
    this.medias.forEach((media) => {
      try {
        const mediaModel = new MediaModel(media);
        mediaModel.type = media;
        mediaModel.filename = media;
        const gridElement = new GalleryFactory(
          mediaModel,
          'gridElement',
          this.subject,
          this.lightbox
        ).template;
        this.gridElements.push(gridElement);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
