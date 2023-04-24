export default class ModalElement {
  constructor(media) {
    this.id = media.id;
    this.title = media.title;
    this.type = media.type;
    this.is_last = false;
    this.is_first = false;
    this.figure = document.createElement('figure');
    this.figcaption = document.createElement('figcaption');
  }

  buildFigure = () => {
    this.figure.id = this.id;
  };
}
