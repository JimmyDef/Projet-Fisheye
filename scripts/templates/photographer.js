const photographerTemplate = (data) => {
  const { name, portrait, id, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const txtWrapper = document.createElement("div");
    const locationTxt = document.createElement("p");
    const taglines = document.createElement("p");
    const pricePerDay = document.createElement("p");
    const priceSrOnly = document.createElement("p");
    // ------------------
    link.href = `./photographer.html?id=${id}`;
    link.setAttribute("aria-label", name);
    imgWrapper.className = "card__img-wrapper";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.className = "card__img";
    // ----------

    h2.textContent = name;
    h2.className = "card__h2";
    // ------------
    txtWrapper.className = "card__txt-wrapper";
    txtWrapper.setAttribute("tabindex", "0");
    // ----------

    locationTxt.className = "card__location";
    locationTxt.textContent = `${city}, ${country} `;
    // -------------
    taglines.className = "card__tagline";
    taglines.textContent = tagline;
    // --------
    pricePerDay.textContent = `${price}€/jour`;
    pricePerDay.className = "card__price";
    pricePerDay.setAttribute("aria-hidden", "true");
    priceSrOnly.textContent = `${price}€ par jour`;
    priceSrOnly.className = "card__sr-only";
    // ---------------------------------
    article.appendChild(link);
    article.appendChild(txtWrapper);

    link.appendChild(imgWrapper);
    link.appendChild(h2);
    imgWrapper.appendChild(img);

    txtWrapper.appendChild(locationTxt);
    txtWrapper.appendChild(taglines);
    txtWrapper.appendChild(pricePerDay);
    txtWrapper.appendChild(priceSrOnly);
    return article;
  };

  const userInfo = () => {
    document.getElementById("h1").textContent = name;

    document.querySelector(
      "#photographer  .photographer__location"
    ).textContent = `${city}, ${country}`;
    document.querySelector(
      "#photographer  .photographer__tagline"
    ).textContent = tagline;
    const img = document.querySelector("#photographer  .photographer__img");
    img.src = picture;
    img.setAttribute("aria-labelledby", "h1");
  };

  return { name, picture, getUserCardDOM, userInfo };
};
