/* eslint-disable import/extensions */
import PhotographerFactory from '../factories/PhotographerFactory.js';
import PhotographerModel from '../models/PhotographerModel.js';
import GridSubject from '../observers/GridSubject.js';
import Dropdown from '../components/Dropdown.js';
import GridBuilder from '../components/GridBuilder.js';
import ContactForm from '../components/ContactForm.js';
import LightBoxContext from '../state/LightBoxContext.js';

/**
 * Retrieve photographer and media data from json
 * @returns {Array<Object>}
 */
async function getPhotographer() {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('photographer_id'), 10);
  const response = await fetch('./data/photographers.json');
  const jsonData = await response.json();
  return {
    photographer: {
      ...jsonData.photographers.filter(
        (photographer) => photographer.id === id
      ),
    },
    media: [...jsonData.media.filter((media) => media.photographerId === id)],
  };
}

/**
 * Create and append photographer data in DOM
 * @param {Array<Object>} photographer
 * @returns {void}
 */
function displayPhotographHeader(photographer) {
  const photographerHeader = document.querySelector('.photographer-header');
  try {
    const photographerResume = new PhotographerFactory(
      new PhotographerModel(photographer),
      'header'
    ).template;
    photographerHeader.prepend(photographerResume.renderArticle());
    photographerHeader.appendChild(photographerResume.renderFigure());
  } catch (error) {
    console.error(error);
  }
}

/**
 * Fetch API and populate DOM
 * Initialize components and LightBoxContext
 * @returns {void}
 */
async function init() {
  const main = document.getElementById('main');
  const { photographer, media } = await getPhotographer();
  const contactForm = new ContactForm(photographer[0]);
  const lightBoxContext = new LightBoxContext(media);
  const gridSubject = new GridSubject();
  const portfolio = new GridBuilder(media, gridSubject, lightBoxContext);
  const dropdown = new Dropdown(portfolio);
  const counterTab = new PhotographerFactory(
    photographer[0],
    'counter',
    gridSubject
  ).template;
  displayPhotographHeader(photographer[0]);
  portfolio.init();
  dropdown.setFilters();
  counterTab.buildTab();
  main.appendChild(counterTab.render());
}

init();
