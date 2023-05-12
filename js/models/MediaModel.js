/**
 * @class MediaModel
 * Hydrate object model from API media data
 */
export default class MediaModel {
  /**
   * @param {Object} media
   */
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
  }

  /**
   * getter for mediaType
   * @returns {string}
   */
  get type() {
    return this.mediaType;
  }

  /**
   * set media type
   * @param {Object} media
   * @returns {(void|Error)}
   */
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
   * set filename according to media type
   * @param {Object} media
   * @returns {void}
   */
  set filename(media) {
    if (this.mediaType) {
      this.file = this.mediaType === 'picture' ? media.image : media.video;
    }
  }

  /**
   * Get uncompressed media
   * @returns {string}
   */
  get media() {
    return `assets/images/portfolios/fullsize/${this.photographerId}/${this.file}`;
  }

  /**
   * Get picture thumbnail
   * @returns {string}
   */
  get thumbnail() {
    return `assets/images/portfolios/thumbnails/${this.photographerId}/${this.file}`;
  }
}
