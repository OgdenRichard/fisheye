/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';
import MediaModel from '../models/MediaModel.js';
import PhotographerFactory from '../factories/PhotographerFactory.js';
import PhotographerModel from '../models/PhotographerModel.js';
import LikesSubject from '../observers/LikesSubject.js';

const dropdownTrigger = document.getElementById('filter-trigger');
let expanded = false;
let display = 'none';
dropdownTrigger.addEventListener('click', () => {
  const arrow = document.getElementById('dropdown-arrow');
  const options = document.getElementsByClassName('filter-toggle');
  expanded = !expanded;
  if (expanded) {
    arrow.classList.add('arrow-down');
  } else {
    arrow.classList.remove('arrow-down');
  }
  display = expanded ? 'block' : 'none';
  dropdownTrigger.ariaExpanded = `${expanded}`;
  for (let index = 0; index < options.length; index += 1) {
    const option = options[index];
    option.style.display = display;
  }
});

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

async function displayPhotographHeader(photographer) {
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
 *
 * @param {} medias
 * @param {PhotographerCounter} counter
 */
async function displayPortfolio(medias, subject) {
  const gallerySection = document.querySelector('.gallery_section');
  medias.forEach((media) => {
    try {
      const mediaModel = new MediaModel(media);
      mediaModel.type = media;
      mediaModel.filename = media;
      const gridElement = new GalleryFactory(mediaModel, 'gridElement', subject)
        .template;
      gallerySection.appendChild(gridElement.render());
    } catch (error) {
      console.error(error);
    }
  });
}

async function init() {
  const main = document.getElementById('main');
  const { photographer, media } = await getPhotographer();
  const likesSubject = new LikesSubject();
  const counterTab = new PhotographerFactory(photographer[0], 'counter')
    .template;
  likesSubject.subscribe(counterTab);
  displayPhotographHeader(photographer[0]);
  displayPortfolio(media, likesSubject);
  counterTab.buildTab();
  main.appendChild(counterTab.render());
}

init();
