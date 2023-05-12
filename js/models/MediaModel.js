export default class MediaModel {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
  }

  get type() {
    return this.mediaType;
  }

  set type(media) {
    if (media.image) {
      this.mediaType = 'picture';
    } else if (media.video) {
      this.mediaType = 'video';
    } else {
      this.mediaType = null;
      throw new Error('unknown media type');
    }
  }

  /**
   * @param {(arg0: any) => void} media
   */
  set filename(media) {
    if (this.mediaType) {
      this.file = this.mediaType === 'picture' ? media.image : media.video;
    }
  }

  get media() {
    return `assets/images/portfolios/fullsize/${this.photographerId}/${this.file}`;
  }

  get thumbnail() {
    return `assets/images/portfolios/thumbnails/${this.photographerId}/${this.file}`;
  }
}
