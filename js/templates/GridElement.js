export default class GridElement {
  constructor(media, GridSubject) {
    this.media = media;
    this.id = media.id;
    this.likes = media.likes;
    this.title = media.title;
    this.date = media.date;
    this.GridSubject = GridSubject;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
    this.likesCounter = document.createElement('div');
    this.buildFigure();
    this.buildLikesCounter();
    this.buildFigcaption();
    this.updateLikesCounter();
  }

  render = () => this.figure;

  buildFigure() {
    if (this.media.type === 'picture') {
      this.figure.appendChild(this.buildImg());
    } else if (this.media.type === 'video') {
      this.figure.appendChild(this.buildVideo());
    }
    this.figure.appendChild(this.figcaption);
  }

  buildFigcaption() {
    const title = document.createElement('p');
    title.textContent = this.media.title;
    title.className = 'media-title';
    this.figcaption.className = 'media-info';
    this.figcaption.appendChild(title);
    this.figcaption.appendChild(this.likesCounter);
  }

  buildLikesCounter() {
    const p = document.createElement('p');
    p.textContent = this.media.likes;
    p.className = 'media-likes';
    p.ariaLabel = 'nombre de likes';
    this.likesCounter.role = 'button';
    this.likesCounter.ariaPressed = 'false';
    this.likesCounter.appendChild(p);
  }

  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.media.media);
    return img;
  }

  buildVideo() {
    const video = document.createElement('video');
    video.setAttribute('src', this.media.media);
    return video;
  }

  updateLikesCounter = () => {
    let userliked = false;
    let { likes } = this.media;
    this.GridSubject.fire(likes);
    this.likesCounter.addEventListener('click', () => {
      userliked = !userliked;
      const nb = userliked ? 1 : -1;
      this.likes += nb;
      likes += nb;
      this.likesCounter.lastChild.className = userliked
        ? 'user-liked'
        : 'media-likes';
      this.likesCounter.lastChild.textContent = likes;
      this.likesCounter.ariaPressed = `${userliked}`;
      this.GridSubject.fire(nb, this.id);
    });
  };
}
