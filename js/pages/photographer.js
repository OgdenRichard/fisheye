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
  const photographer_header = document.querySelector('.photographer-header');
  try {
    const photographerResume = new PhotographerFactory(
      new PhotographerModel(photographer),
      'header'
    ).template;
    photographer_header.prepend(photographerResume.renderArticle());
    photographer_header.appendChild(photographerResume.renderFigure());
  } catch (error) {
    console.error(error);
  }
  //console.log(photographer);
}

async function init() {
  const { photographer, media } = await getPhotographer();
  displayPhotographHeader(photographer[0]);
  // display(photographer);
}

init();
