/**
 * @class ContactForm
 * Render contact form modal
 */
export default class ContactForm {
  constructor(photographer) {
    this.name = photographer.name;
    this.header = document.getElementById('banner-header');
    this.main = document.getElementById('main');
    this.form = document.getElementById('contact-form');
    this.headline = document.getElementById('contact-headline');
    this.contactButton = document.getElementById('launchform');
    this.closeButton = document.getElementById('closeform');
    this.background = document.getElementById('background_modal');
    this.submit = document.getElementById('sendform');
    this.isActive = false;
    this.buildHeadline();
    this.displayModal();
    this.validateForm();
    this.addCloseModalListeners();
  }

  /**
   * Append photographer name to main title
   * @returns {void}
   */
  buildHeadline = () => {
    this.headline.innerText += `
    ${this.name}`;
  };

  /**
   * Open modal on click on contact form
   * @returns {void}
   */
  displayModal = () => {
    this.contactButton.addEventListener('click', () => {
      this.isActive = true;
      this.setAriaHidden();
      this.background.style.display = 'block';
      this.background.classList.add('transparent');
      this.form.style.display = 'block';
      this.initFocus();
      this.focusLoop();
    });
  };

  /**
   * Close modal on events
   * @returns {void}
   */
  addCloseModalListeners = () => {
    this.closeButton.addEventListener('click', () => {
      this.closeModal();
    });
    this.closeButton.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.closeModal();
      }
    });
    this.form.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  };

  /**
   * Close modal process
   * Hides modal on close
   * @returns {void}
   */
  closeModal = () => {
    this.isActive = false;
    this.background.style.display = 'none';
    this.background.classList.remove('transparent');
    this.form.style.display = 'none';
    this.setAriaHidden();
    this.contactButton.focus();
  };

  /**
   * Log inputs content and close modal
   * @returns {void}
   */
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
      this.closeModal();
    });
  };

  /**
   * Toggle aria-hidden property on modal and main content
   * @returns {void}
   */
  setAriaHidden = () => {
    this.form.ariaHidden = !this.isActive;
    this.form.ariaModal = this.isActive;
    this.header.ariaHidden = this.isActive;
    this.main.ariaHidden = this.isActive;
  };

  /**
   * Initialize focus on open modal
   * @returns {void}
   */
  initFocus = () => {
    this.form.focus();
  };

  /**
   * Focus loop through modal elements while modal is open
   * @returns {void}
   */
  focusLoop = () => {
    this.form.addEventListener('keydown', (event) => {
      const tabPressed = event.key === 'Tab';
      if (tabPressed && document.activeElement === this.closeButton) {
        this.form.focus();
      }
    });
  };
}
