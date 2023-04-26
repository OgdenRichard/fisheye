export default class LightBox {
  constructor(LightboxContext) {
    this.LightboxContext = LightboxContext;
    this.background = document.getElementById('background_modal');
    this.lightboxContainer = document.getElementById('lightbox');
    this.closebutton = document.getElementById('closelightbox');
    this.sliderContainer = document.getElementById('slider-container');
    this.backwardsBtn = document.getElementById('btn-backwards');
    this.forwardsBtn = document.getElementById('btn-forwards');
    this.displayNextMedia();
    this.displayPreviousMedia();
    this.closeModal();
  }

  openModal = () => {
    this.initMedias();
    this.background.style.display = 'block';
    this.lightboxContainer.style.display = 'block';
  };

  closeModal = () => {
    this.closebutton.addEventListener('click', () => {
      this.background.style.display = 'none';
      this.lightboxContainer.style.display = 'none';
      this.forwardsBtn.style.display = 'block';
      this.backwardsBtn.style.display = 'block';
      this.sliderContainer.innerHTML = '';
      this.removeMediaObjects();
    });
  };

  initMedias = () => {
    this.sliderContainer.appendChild(this.currentMedia.render());
    if (this.previousMedia) {
      this.sliderContainer.appendChild(this.previousMedia.render());
    } else {
      this.backwardsBtn.style.display = 'none';
    }
    if (this.nextMedia) {
      this.sliderContainer.appendChild(this.nextMedia.render());
    } else {
      this.forwardsBtn.style.display = 'none';
    }
  };

  addMedia = (MediaTemplate) => {
    this.sliderContainer.appendChild(MediaTemplate.render());
  };

  displayPreviousMedia = () => {
    this.backwardsBtn.addEventListener('click', () => {
      this.LightboxContext.moveBackwards();
    });
  };

  displayNextMedia = () => {
    this.forwardsBtn.addEventListener('click', () => {
      this.LightboxContext.moveForwards();
    });
  };

  removeMediaObjects = () => {
    this.previousMedia = null;
    this.nextMedia = null;
    this.currentMedia = null;
  };
}
