const mediaTemplate = (data) => {
  let { title, image, video, likes, photographerId, id } = data;
  const imageUrl = `assets/images/${photographerId}/${image}`;
  const videoUrl = `assets/images/${photographerId}/${video}`;

  // --------------------
  // Fonction gestion du type de média
  // --------------------

  const switchMediaType = () => {
    if (data.image) {
      return `<img src="${imageUrl}" alt="${title}" />`;
    }
    if (data.video) {
      return ` <video   />
            <source src="${videoUrl}" >
            </video>`;
    }
    throw new Error("Absence de fichier media");
  };
  // ---------------------
  // Fonction création du contenu des cards
  // ---------------------

  const getMediaCardDom = () => {
    const article = document.createElement("article");
    article.className = "media__article";
    article.innerHTML = ` 
          <div class="media__wrapper" data-id=${id}>
          ${switchMediaType()}
          </div>
          <div class="media__info">
            <h2 class="media__title">${title}</h2>
            <div class="media__likes">
              <span class='media__likes-number'>${likes}  </span> <i class="fa-solid fa-heart media__heart " > 
              </i>
              

            </div>
          </div>
          `;

    return article;
  };
  const getLightboxCard = () => {
    const article = document.createElement("article");
    article.className = "lightbox__article";
    article.innerHTML = ` 
          <div class="media__wrapper" data-id=${id}>
          ${switchMediaType()}
          </div>
          <div class="media__info">
            <h2 class="media__title">${title}</h2>
            <div class="media__likes">
              <span class='media__likes-number'>${likes}  </span> <i class="fa-solid fa-heart media__heart " > 
              </i>
              

            </div>
          </div>
          `;

    return article;
  };

  return { getMediaCardDom, getLightboxCard };
};
