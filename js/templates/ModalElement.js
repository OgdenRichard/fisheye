/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

/**
 * Initialize HTML Element for LighBox modal
 * @class ModalElement
 */
export default class ModalElement extends MediaTemplate {
  constructor(media) {
    super(media);
    this.figure.className = 'media-container';
    this.buildFigure();
    this.customize_id();
    this.enhanceVideo();
    this.removeLinkRole();
    this.buildFigcaption();
  }

  /**
   * Render figure in DOM
   * @returns {void}
   */
  render = () => super.render();

  /**
   * initialize figure
   * @returns {void}
   */
  buildFigure = () => super.buildFigure();

  /**
   * initialize figcaption
   * @returns {void}
   */
  buildFigcaption = () => super.buildFigcaption();

  /**
   * Parent method overload to avoid duplicates ids
   * @returns {void}
   */
  customize_id = () => {
    this.figure.id = `modal_${this.figure.id}`;
  };

  /**
   * Parent method overload to add attributes to video medias
   * @returns {void}
   */
  enhanceVideo = () => {
    if (this.type === 'video') {
      const video = this.figure.firstChild;
      const subtitle = document.createElement('track');
      video.setAttribute('controls', 'controls');
      subtitle.kind = 'subtitles';
      subtitle.src = `./assets/subtitles/${this.id}.vtt`;
      subtitle.srclang = 'fr';
      subtitle.label = 'Français';
      video.appendChild(subtitle);
    }
  };

  /**
   * Parent method overload to add attributes to remove link role
   * @returns {void}
   */
  removeLinkRole = () => {
    this.figure.firstChild.removeAttribute('role');
  };

  /**
   * Remove additional class name
   * Element display is then 'block'
   * @returns {void}
   */
  setCurrent = (classname) => {
    this.figure.classList.remove(classname);
  };

  /**
   * Add class next to element ClassList
   * Element display is then set to 'none'
   * @returns {void}
   */
  setNext = () => {
    this.figure.classList.add('next');
  };

  /**
   * Add class previous to element ClassList
   * Element display is then set to 'none'
   * @returns {void}
   */
  setPrevious = () => {
    this.figure.classList.add('previous');
  };
}
