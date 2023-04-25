/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import GalleryFactory from '../factories/GalleryFactory.js';

export default class GridBuilder {
  constructor(medias, subject, lightBoxContext) {
    this.medias = medias;
    this.subject = subject;
    this.lightBoxContext = lightBoxContext;
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
    this.updateMediaLikes(args[1], args[0]);
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

  updateMediaLikes = (id, increment) => {
    const mediaIndex = this.medias.findIndex((media) => media.id === id);
    if (mediaIndex >= 0) {
      this.medias[mediaIndex].likes += increment;
    }
  };

  sortGridElements = () => {
    switch (this.sortBy) {
      case 'likes':
        GridBuilder.sortByLikes(this.gridElements);
        GridBuilder.sortByLikes(this.medias);
        break;
      case 'title':
        GridBuilder.sortByTitles(this.gridElements);
        GridBuilder.sortByTitles(this.medias);
        break;
      case 'date':
        GridBuilder.sortByDates(this.gridElements);
        GridBuilder.sortByDates(this.medias);
        break;
      default:
        console.error('undefined sort method');
        break;
    }
  };

  static sortByLikes = (property) => {
    property.sort((a, b) => parseInt(a.likes, 10) - parseInt(b.likes, 10));
  };

  static sortByTitles = (property) => {
    property.sort((a, b) => a.title.localeCompare(b.title));
  };

  static sortByDates = (property) => {
    property.sort((a, b) => new Date(b.date) - new Date(a.date));
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
        // calling mediaModel setters
        mediaModel.type = media;
        mediaModel.filename = media;
        const gridElement = new GalleryFactory(
          mediaModel,
          'gridElement',
          this.subject,
          this.lightBoxContext
        ).template;
        this.gridElements.push(gridElement);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
