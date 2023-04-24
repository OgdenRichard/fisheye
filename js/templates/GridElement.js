export default class GridElement {
  constructor(media, GridSubject, LightBox) {
    this.media = media;
    this.GridSubject = GridSubject;
    this.LightBox = LightBox;
    this.id = media.id;
    this.type = media.type;
    this.media = media.media;
    this.likes = media.likes;
    this.title = media.title;
    this.date = media.date;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
    this.likesCounter = document.createElement('div');
    this.buildFigure();
    this.buildLikesCounter();
    this.buildFigcaption();
    this.updateLikesCounter();
    this.openInLightbox();
  }

  render = () => this.figure;

  buildFigure() {
    this.figure.id = this.id;
    if (this.type === 'picture') {
      this.figure.appendChild(this.buildImg());
    } else if (this.type === 'video') {
      this.figure.appendChild(this.buildVideo());
    }
    this.figure.appendChild(this.figcaption);
  }

  buildFigcaption() {
    const title = document.createElement('p');
    title.textContent = this.title;
    title.className = 'media-title';
    this.figcaption.className = 'media-info';
    this.figcaption.appendChild(title);
    this.figcaption.appendChild(this.likesCounter);
  }

  buildLikesCounter() {
    const p = document.createElement('p');
    p.textContent = this.likes;
    p.className = 'media-likes';
    p.ariaLabel = 'nombre de likes';
    this.likesCounter.role = 'button';
    this.likesCounter.ariaPressed = 'false';
    this.likesCounter.appendChild(p);
  }

  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.media);
    return img;
  }

  buildVideo() {
    const video = document.createElement('video');
    video.setAttribute('src', this.media);
    return video;
  }

  updateLikesCounter = () => {
    let userliked = false;
    this.GridSubject.fire(this.likes);
    this.likesCounter.addEventListener('click', () => {
      userliked = !userliked;
      const nb = userliked ? 1 : -1;
      this.likes += nb;
      this.likesCounter.lastChild.className = userliked
        ? 'user-liked'
        : 'media-likes';
      this.likesCounter.lastChild.textContent = this.likes;
      this.likesCounter.ariaPressed = `${userliked}`;
      this.GridSubject.fire(nb, this.id);
    });
  };

  openInLightbox = () => {
    const domMedia = this.figure.firstChild;
    domMedia.addEventListener('click', () => {
      this.LightBox.openModal();
    });
  };
}
