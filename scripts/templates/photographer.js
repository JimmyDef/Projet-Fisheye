function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const paragraphe = document.createElement("p");
    paragraphe.innerHTML = `${country}, ${city}`;
    const slogan = document.createElement("p");
    slogan.textContent = tagline;
    const pricePerDay = document.createElement("p");
    pricePerDay.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(paragraphe);
    article.appendChild(slogan);
    article.appendChild(pricePerDay);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
