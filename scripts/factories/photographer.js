function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/images/photographers/compressed/${id}/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.ariaLabel = `photographe ${name}`;
    article.id = `${id}`;
    const figure = document.createElement('figure');
    figure.setAttribute('aria-labelledby', article.id);
    const figcaption = document.createElement('figcaption');
    figcaption.ariaLabel = `informations sur ${name}`;
    const linkContainer = document.createElement('div');
    linkContainer.classList.add('photographer__link');
    linkContainer.role = 'link';
    linkContainer.ariaLabel = `lien vers la page de ${name}`;
    linkContainer.setAttribute('tabindex', '0');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `portrait de ${name}`);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const pTag = document.createElement('p');
    pTag.classList.add('photographer__tag');
    pTag.textContent = tagline;
    const pPrice = document.createElement('p');
    pPrice.classList.add('photographer__price');
    pPrice.textContent = `${price}€/jour`;
    article.appendChild(figure);
    figure.appendChild(linkContainer);
    linkContainer.appendChild(img);
    linkContainer.appendChild(h2);
    figure.appendChild(figcaption);
    figcaption.appendChild(h3);
    figcaption.appendChild(pTag);
    figcaption.appendChild(pPrice);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
