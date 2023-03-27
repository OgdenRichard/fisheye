function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/images/photographers/compressed/${id}/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    article.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(h2);
    figure.appendChild(figcaption);
    figcaption.appendChild(h3);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
