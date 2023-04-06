export default class GalleryFactory {
  constructor(model, type) {
    if (type === 'gridElement') {
      this.viewTemplate = new GridElement(model);
    } else if (type === 'modalElement') {
      this.viewTemplate = new ModalElement(model);
    } else {
      this.viewTemplate = null;
      throw new Error('unknown template');
    }
  }

  get template() {
    return this.viewTemplate;
  }
}
