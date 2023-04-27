export default class ContactForm {
  constructor(photographer) {
    this.name = photographer.name;
    this.form = document.getElementById('contact-form');
    this.headline = document.getElementById('contact-headline');
    this.contactButton = document.getElementById('launchform');
    this.closeButton = document.getElementById('closeform');
    this.background = document.getElementById('background_modal');
    this.submit = document.getElementById('sendform');
    this.buildHeadline();
    this.displayModal();
    this.validateForm();
    this.closeModal();
  }

  buildHeadline = () => {
    this.headline.innerText += `
    ${this.name}`;
  };

  displayModal = () => {
    this.contactButton.addEventListener('click', () => {
      this.background.style.display = 'block';
      this.background.classList.add('transparent');
      this.form.style.display = 'block';
    });
  };

  closeModal = () => {
    this.closeButton.addEventListener('click', () => {
      this.background.style.display = 'none';
      this.background.classList.remove('transparent');
      this.form.style.display = 'none';
    });
  };

  validateForm = () => {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formInputs = document.getElementsByTagName('input');
      const textarea = document.getElementById('message');
      if (formInputs) {
        for (let index = 0; index < formInputs.length; index += 1) {
          const input = formInputs[index];
          const label = input.previousElementSibling;
          console.log(`${label.textContent} : ${input.value}`);
        }
      }
      if (textarea) {
        console.log(`Message : ${textarea.value}`);
      }
    });
  };
}
