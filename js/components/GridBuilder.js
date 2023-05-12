/* eslint-disable import/extensions */
import MediaModel from '../models/MediaModel.js';
import GalleryFactory from '../factories/GalleryFactory.js';

/**
 * @class GridBuilder
 * Display photographer portfolio
 * Initialize GridElements
 * Manage media sorting
 */
export default class GridBuilder {
  /**
   * @param {Array<Object>} medias
   * @param {Object} subject
   * @param {Object} LightBoxContext
   */
  constructor(medias, subject, LightBoxContext) {
    this.medias = medias;
    this.subject = subject;
    this.lightBoxContext = LightBoxContext;
    this.portfolio = document.querySelector('.gallery_section');
    this.gridElements = [];
    this.sortBy = 'likes';
  }

  /**
   * Initialize portfolio
   * @returns {void}
   */
  init = () => {
    this.buildGridElements();
    this.sortGridElements();
    this.buildPortfolio();
    // add GridBuilder to GridSubject observers
    this.subject.subscribe(this);
  };

  /**
   * Update GridElements on new like if needed
   * @param  {...number} args
   */
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

  /**
   * update order of GridElements
   * @returns {void}
   */
  refresh = () => {
    this.portfolio.innerHTML = '';
    this.sortGridElements();
    this.buildPortfolio();
  };

  /**
   * Update GridElement likes counter
   * @param {number} id
   * @param {number} increment
   * @returns {void}
   */
  updateMediaLikes = (id, increment) => {
    const index = this.gridElements.findIndex((element) => element.id === id);
    if (index >= 0) {
      this.gridElements[index].likes += increment;
      this.lightBoxContext.mediaModels[index].likes += increment;
    }
  };

  /**
   * Sort GridElements array and LightBoxContext mediaModels array
   * Enable sync between grid and modal view
   * @returns {void}
   */
  sortGridElements = () => {
    switch (this.sortBy) {
      case 'likes':
        GridBuilder.sortByLikes(this.gridElements);
        GridBuilder.sortByLikes(this.lightBoxContext.mediaModels);
        break;
      case 'title':
        GridBuilder.sortByTitles(this.gridElements);
        GridBuilder.sortByTitles(this.lightBoxContext.mediaModels);
        break;
      case 'date':
        GridBuilder.sortByDates(this.gridElements);
        GridBuilder.sortByDates(this.lightBoxContext.mediaModels);
        break;
      default:
        console.error('undefined sort method');
        break;
    }
  };

  /**
   * Ascending sort by numbers
   * @param {number} property
   * @returns {void}
   */
  static sortByLikes = (property) => {
    property.sort((a, b) => parseInt(a.likes, 10) - parseInt(b.likes, 10));
  };

  /**
   * Ascending sort by string
   * @param {string} property
   * @returns {void}
   */
  static sortByTitles = (property) => {
    property.sort((a, b) => a.title.localeCompare(b.title));
  };

  /**
   * Ascending sort by date
   * @param {string} property
   * @returns {void}
   */
  static sortByDates = (property) => {
    property.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  /**
   * Render GridElements in DOM
   * @param {Object} gridElement
   * @returns {void}
   */
  buildPortfolio = () => {
    this.gridElements.forEach((gridElement) => {
      this.portfolio.appendChild(gridElement.render());
    });
  };

  /**
   * Hydrate GridElements from MediaModels
   * @returns {void}
   */
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
