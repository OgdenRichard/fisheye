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

async function display(photographer) {
  console.log(photographer);
}

async function init() {
  // Récupère les datas des photographes
  const { photographer, media } = await getPhotographer();
  console.log(photographer);
  console.log(media);
  // display(photographer);
}

init();
