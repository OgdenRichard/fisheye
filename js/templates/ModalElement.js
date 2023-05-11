/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

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

  render = () => super.render();

  buildFigure = () => super.buildFigure();

  buildFigcaption = () => super.buildFigcaption();

  customize_id = () => {
    this.figure.id = `modal_${this.figure.id}`;
  };

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

  removeLinkRole = () => {
    this.figure.firstChild.removeAttribute('role');
  };

  setCurrent = (classname) => {
    this.figure.classList.remove(classname);
  };

  setNext = () => {
    this.figure.classList.add('next');
  };

  setPrevious = () => {
    this.figure.classList.add('previous');
  };
}
