/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

export default class GridElement extends MediaTemplate {
  constructor(media, GridSubject, LightBoxContext) {
    super(media);
    this.GridSubject = GridSubject;
    this.LightBoxContext = LightBoxContext;
    this.likesCounter = document.createElement('div');
    this.isActive = false;
    this.buildFigure();
    this.setThumbnail();
    this.setMediaAriaAttributes();
    this.buildFigcaption();
    this.buildLikesCounter();
    this.figcaption.appendChild(this.likesCounter);
    this.updateLikesCounter();
    this.arrowsNavigation();
    this.openInLightbox();
  }

  render = () => super.render();

  buildFigure = () => super.buildFigure();

  buildFigcaption = () => super.buildFigcaption();

  setThumbnail = () => {
    if (this.type === 'picture') {
      this.figure.firstChild.src = this.thumbnail;
    }
  };

  setMediaAriaAttributes = () => {
    this.figure.firstChild.ariaLabel = `${this.title}, closeup view`;
  };

  buildLikesCounter = () => {
    const p = document.createElement('p');
    p.textContent = this.likes;
    p.className = 'media-likes';
    this.likesCounter.role = 'button';
    this.likesCounter.ariaPressed = 'false';
    this.likesCounter.setAttribute('tabindex', '0');
    this.likesCounter.ariaLabel = `${this.title} ${this.likes} likes`;
    this.likesCounter.appendChild(p);
  };

  updateLikesCounter = () => {
    let userliked = false;
    let { likes } = this;
    this.GridSubject.fire(likes);
    ['click', 'keydown'].forEach((e) =>
      this.likesCounter.addEventListener(
        e,
        (event) => {
          if ((e === 'keydown' && event.key === 'Enter') || e === 'click') {
            userliked = !userliked;
            const nb = userliked ? 1 : -1;
            likes += nb;
            this.likesCounter.lastChild.className = userliked
              ? 'user-liked'
              : 'media-likes';
            this.likesCounter.lastChild.textContent = likes;
            this.likesCounter.ariaLabel = `${this.title} ${likes} likes`;
            this.likesCounter.ariaPressed = `${userliked}`;
            event.stopPropagation();
            this.GridSubject.fire(nb, this.id);
            this.likesCounter.focus();
          }
        },
        false
      )
    );
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
    this.figure.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Enter') {
          this.LightBoxContext.init(this.id);
        }
      },
      false
    );
  };

  arrowsNavigation = () => {
    this.figure.addEventListener('keydown', (event) => {
      const previous = this.figure.previousElementSibling;
      this.isActive = document.activeElement === this.figure;
      if (this.isActive && event.key === 'ArrowLeft' && previous) {
        previous.focus();
      }
    });
    this.figure.addEventListener('keydown', (event) => {
      const next = this.figure.nextElementSibling;
      this.isActive = document.activeElement === this.figure;
      if (this.isActive && event.key === 'ArrowRight' && next) {
        next.focus();
      }
    });
  };
}
