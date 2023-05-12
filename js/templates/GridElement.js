/* eslint-disable import/extensions */
import MediaTemplate from './MediaTemplate.js';

/**
 * Hydrate object from MediaModel
 * Create new figure in DOM
 * Launch LightBox modal on click
 * @class GridElement
 */
export default class GridElement extends MediaTemplate {
  /**
   * @param {Object} media
   * @param {Object} GridSubject
   * @param {Object} LightBoxContext
   */
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
   * Parent method overload to get thumbnail rather than fullsize picture
   * Used for pictures only
   * @returns {void}
   */
  setThumbnail = () => {
    if (this.type === 'picture') {
      this.figure.firstChild.src = this.thumbnail;
    }
  };

  /**
   * aria label for image or video
   * @returns {void}
   */
  setMediaAriaAttributes = () => {
    this.figure.firstChild.ariaLabel = `${this.title}, closeup view`;
  };

  /**
   * initialize local likes counter
   * @returns {void}
   */
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

  /**
   * update local and global likes counters
   * also initialize global likes counter on page load
   * @returns {void}
   */
  updateLikesCounter = () => {
    let userliked = false;
    let { likes } = this;
    this.GridSubject.fire(likes);
    ['click', 'keydown'].forEach((e) =>
      this.likesCounter.addEventListener(e, (event) => {
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
      })
    );
  };

  /**
   * disable pointer on videos if needed
   * e.g : pointer may click through dropdown menu if media is a video
   * @param {boolean} disable
   * @returns {void}
   */
  togglePointerEvents = (disable = false) => {
    const switcher = disable ? 'none' : 'all';
    if (this.type === 'video') {
      this.figure.firstChild.style.pointerEvents = switcher;
    }
  };

  /**
   * Add eventListeners to open LightBox modal
   * @returns {void}
   */
  openInLightbox = () => {
    const domMedia = this.figure.firstChild;
    domMedia.addEventListener('click', () => {
      this.LightBoxContext.init(this.id);
    });
    this.figure.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.LightBoxContext.init(this.id);
      }
    });
  };

  /**
   * Add eventListeners for arrow navigation
   * @returns {void}
   */
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
