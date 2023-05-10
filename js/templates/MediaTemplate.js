export default class MediaTemplate {
  constructor(media) {
    this.id = media.id;
    this.type = media.type;
    this.media = media.media;
    this.likes = media.likes;
    this.title = media.title;
    this.date = media.date;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
  }

  render() {
    return this.figure;
  }

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

  buildFigcaption() {
    const title = document.createElement('p');
    title.textContent = this.title;
    title.className = 'media-title';
    this.figcaption.className = 'media-info';
    this.figcaption.appendChild(title);
  }

  buildImg() {
    const img = document.createElement('img');
    img.setAttribute('src', this.media);
    img.role = 'link';
    img.alt = this.title;
    return img;
  }

  buildVideo() {
    const video = document.createElement('video');
    const subtitle = document.createElement('track');
    subtitle.setAttribute('src', './assets/subtitles/tryout.vtt');
    video.setAttribute('src', `${this.media}#t=0.5`);
    video.ariaLabel = this.title;
    video.appendChild(subtitle);
    return video;
  }
}
