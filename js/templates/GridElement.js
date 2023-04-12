export default class GridElement {
  constructor(media, LikesSubject) {
    this.media = media;
    this.LikesSubject = LikesSubject;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
    this.likesCounter = document.createElement('div');
    this.buildFigure();
    this.buildLikesCounter();
    this.buildFigcaption();
    this.updateLikesCounter();
  }

  // TODO ajouter tabindex

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
    this.LikesSubject.fire(likes);
    this.likesCounter.addEventListener('click', () => {
      if (!userliked) {
        likes += 1;
        userliked = true;
        this.likesCounter.lastChild.className = 'user-liked';
        this.LikesSubject.fire(1);
      } else {
        likes -= 1;
        userliked = false;
        this.likesCounter.lastChild.className = 'media-likes';
        this.LikesSubject.fire(-1);
      }
      this.likesCounter.ariaPressed = `${userliked}`;
      this.likesCounter.lastChild.textContent = likes;
    });
  };
}
