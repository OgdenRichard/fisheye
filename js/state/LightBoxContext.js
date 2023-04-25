/* eslint-disable import/extensions */
import CurrentMedia from './CurrentMedia.js';
import NextMedia from './NextMedia.js';
import PreviousMedia from './PreviousMedia.js';

export default class LightBoxContext {
  constructor(medias, startId) {
    this.medias = medias;
    this.currentIndex = medias.findIndex((media) => media.id === startId);
  }

  init = () => {
    if (this.currentIndex >= 0) {
      let nextMediaModel = null;
      let previousMediaModel = null;
      this.currentMediaState = new CurrentMedia(
        this,
        this.medias[this.currentIndex]
      );
      if (this.currentIndex + 1 <= this.medias.length()) {
        nextMediaModel = this.medias[this.currentIndex + 1];
      }
      if (this.currentIndex - 1 >= 0) {
        previousMediaModel = this.medias[this.currentIndex - 1];
      }
      this.nextMediaState = new NextMedia(this, nextMediaModel);
      this.previousMediaState = new PreviousMedia(previousMediaModel);
    }
  };

  // TODO : incrémenter / décrémenter this.currentIndex on change
}
