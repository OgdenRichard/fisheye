export default class ContactForm {
  constructor(photographer) {
    this.name = photographer.name;
    this.form = document.getElementById('modalform');
    this.headline = document.getElementById('contact-headline');
    this.contactButton = document.getElementById('launchform');
    this.closeButton = document.getElementById('closeform');
    this.background = document.getElementById('background_modal');
    this.submit = document.getElementById('sendform');
    this.buildHeadline();
    this.disableForm();
    this.displayModal();
    this.closeModal();
  }

  buildHeadline = () => {
    this.headline.innerText += `
    ${this.name}`;
  };

  displayModal = () => {
    this.contactButton.addEventListener('click', () => {
      this.background.style.display = 'block';
    });
  };

  closeModal = () => {
    this.closeButton.addEventListener('click', () => {
      this.background.style.display = 'none';
    });
  };

  disableForm = () => {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  };
}
