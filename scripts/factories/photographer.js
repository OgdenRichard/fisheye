function photographerFactory(data) {
  const { id, name, portrait } = data;

  const picture = `assets/images/photographers/compressed/${id}/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figcaption.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
