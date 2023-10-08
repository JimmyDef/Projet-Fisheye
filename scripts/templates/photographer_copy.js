function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.href = `./photographer.html?id=${id}`;
    link.setAttribute("aria-label", name);
    link.innerHTML = ` <div class="card__img-wrapper">
      <img src="${picture}" alt="${name}" class="card__img" />
    </div>
    <h2 class="card__h2">${name}</h2>`;

    const txtWrapper = document.createElement("section");
    txtWrapper.className = "card__txt-wrapper";
    txtWrapper.setAttribute("tabindex", "0");
    txtWrapper.innerHTML = ` <p class="card__location"> ${city}, ${country}</p>
    <p class="card__tagline">${tagline}</p>
    <p class="card__price" aria-hidden="true">${price}€/jour</p>
    <p class="card__sr-only">${price}€ par jour</p>`;

    // ---------------------------------
    article.appendChild(link);
    article.appendChild(txtWrapper);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
