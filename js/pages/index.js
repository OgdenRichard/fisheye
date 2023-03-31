async function getPhotographers() {
  const response = await fetch('./data/photographers.json');
  const jsonData = await response.json();
  return {
    photographers: [...jsonData.photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerCard = new PhotographerCard(
      new PhotographerModel(photographer)
    );
    photographersSection.appendChild(photographerCard.render());
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
