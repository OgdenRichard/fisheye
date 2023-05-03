/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

export default class GridElement extends MediaTemplate {
  constructor(media, GridSubject, LightBoxContext) {
    super(media);
    this.GridSubject = GridSubject;
    this.LightBoxContext = LightBoxContext;
    this.likesCounter = document.createElement('div');
    this.buildFigure();
    this.buildFigcaption();
    this.buildLikesCounter();
    this.figcaption.appendChild(this.likesCounter);
    this.updateLikesCounter();
    this.openInLightbox();
  }

  render = () => super.render();

  buildFigure = () => super.buildFigure();

  buildFigcaption = () => super.buildFigcaption();

  buildLikesCounter = () => {
    const p = document.createElement('p');
    p.textContent = this.likes;
    p.className = 'media-likes';
    p.ariaLabel = 'nombre de likes';
    this.likesCounter.role = 'button';
    this.likesCounter.ariaPressed = 'false';
    this.likesCounter.appendChild(p);
  };

  updateLikesCounter = () => {
    let userliked = false;
    let { likes } = this;
    this.GridSubject.fire(likes);
    this.likesCounter.addEventListener('click', () => {
      userliked = !userliked;
      const nb = userliked ? 1 : -1;
      likes += nb;
      this.likesCounter.lastChild.className = userliked
        ? 'user-liked'
        : 'media-likes';
      this.likesCounter.lastChild.textContent = likes;
      this.likesCounter.ariaPressed = `${userliked}`;
      this.GridSubject.fire(nb, this.id);
    });
  };

  togglePointerEvents = (disable = false) => {
    const switcher = disable ? 'none' : 'all';
    if (this.type === 'video') {
      this.figure.firstChild.style.pointerEvents = switcher;
    }
  };

  openInLightbox = () => {
    const domMedia = this.figure.firstChild;
    domMedia.addEventListener('click', () => {
      this.LightBoxContext.init(this.id);
    });
  };
}
