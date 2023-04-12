/* eslint-disable import/extensions */
import GalleryFactory from '../factories/GalleryFactory.js';
import MediaModel from '../models/MediaModel.js';
import PhotographerFactory from '../factories/PhotographerFactory.js';
import PhotographerModel from '../models/PhotographerModel.js';
import PhotographerCounter from '../templates/PhotographerCounter.js';

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

async function displayPortfolio(medias, counter) {
  const gallerySection = document.querySelector('.gallery_section');
  medias.forEach((media) => {
    try {
      const mediaModel = new MediaModel(media);
      mediaModel.type = media;
      mediaModel.filename = media;
      counter.totalLikes = media.likes;
      const gridElement = new GalleryFactory(mediaModel, 'gridElement')
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
  const mainCounterTab = new PhotographerCounter();
  mainCounterTab.photographerPrice = photographer[0].price;
  displayPhotographHeader(photographer[0]);
  displayPortfolio(media, mainCounterTab);
  mainCounterTab.buildTab();
  main.appendChild(mainCounterTab.render());
}

init();
