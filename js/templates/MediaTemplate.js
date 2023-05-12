/**
 * Parent method for GridElement and ModalElement
 * @class MediaTemplate
 */
export default class MediaTemplate {
  constructor(media) {
    this.id = media.id;
    this.type = media.type;
    this.media = media.media;
    this.thumbnail = media.thumbnail;
    this.likes = media.likes;
    this.title = media.title;
    this.date = media.date;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
  }

  /**
   * Render figure in DOM
   * @returns {void}
   */
  render() {
    return this.figure;
  }

  /**
   * initialize figure
   * @returns {void}
   */
  buildFigure() {
    this.figure.id = this.id;
    this.figure.setAttribute('tabindex', '0');
    if (this.type === 'picture') {
      this.figure.appendChild(this.buildImg());
    } else if (this.type === 'video') {
      this.figure.appendChild(this.buildVideo());
    }
    this.figure.appendChild(this.figcaption);
  }

  /**
   * initialize figcaption
   * @returns {void}
   */
  buildFigcaption() {
    const title = document.createElement('p');
    title.textContent = this.title;
    title.className = 'media-title';
    this.figcaption.className = 'media-info';
    this.figcaption.appendChild(title);
  }

  /**
   * initialize img element
   * @returns {HTMLElement}
   */
  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.media);
    img.role = 'link';
    img.alt = this.title;
    return img;
  }

  /**
   * initialize video element
   * @returns {HTMLElement}
   */
  buildVideo() {
    const video = document.createElement('video');
    video.setAttribute('src', `${this.media}#t=0.5`);
    video.ariaLabel = this.title;
    return video;
  }
}
