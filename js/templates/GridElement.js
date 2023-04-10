export default class GridElement {
  constructor(media) {
    this.media = media;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
    this.buildFigcaption();
    this.buildFigure();
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
    const likes = document.createElement('p');
    title.textContent = this.media.title;
    title.className = 'media-title';
    likes.textContent = this.media.likes;
    likes.className = 'media-likes';
    this.figcaption.className = 'media-info';
    this.figcaption.appendChild(title);
    this.figcaption.appendChild(likes);
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
}
