const mediaTemplate = (data) => {
  let { title, image, video, likes, photographerId, id, isLiked } = data;
  const imageUrl = `assets/images/${photographerId}/${image}`;
  const videoUrl = `assets/images/${photographerId}/${video}`;

  // -----------------------------------------------------
  // Fonction gestion du type de média galerie
  // -----------------------------------------------------

  const mediaSwitcherGallery = () => {
    if (data.image) {
      return `<img src="${imageUrl}" alt="${title}" />`;
    }
    if (data.video) {
      return ` <video   />
            <source src="${videoUrl}" alt="${title}">
            </video>`;
    }
    throw new Error("Absence de fichier media");
  };

  // -----------------------------------------------------
  // Fonction création du contenu des cards
  // -----------------------------------------------------

  const getMediaCardDom = () => {
    const article = document.createElement("article");
    article.className = "media__article";
    article.innerHTML = ` <a href="#" class="lightbox__link" data-id=${id}>
          <div class="media__wrapper" >
          ${mediaSwitcherGallery()}
          </div> </a>
          <div class="media__info">
            <h2 class="media__title">${title}</h2>
           
            <div class="media__likes" data-id=${id}>
              <span class='media__likes-number'>${likes} 
               </span> <i aria-label="likes" class="fa-solid fa-heart media__heart ${
                 isLiked ? "media__heart--isLiked" : ""
               }" > 
              </i>
            </div>
          </div>
          `;

    return article;
  };

  // -----------------------------------------------------
  // Fonction gestion du type de média lightbox
  // -----------------------------------------------------

  const mediaSwitcherLightbox = () => {
    if (data.image) {
      return `<img src="${imageUrl}" alt="${title}" />`;
    }
    if (data.video) {
      return ` <video  controls >
            <source src="${videoUrl}" alt="${title}" >
            </video>`;
    }
    throw new Error("Absence de fichier media");
  };

  // -----------------------------------------------------
  // Fonction création du contenu lightbox
  // -----------------------------------------------------

  const getLightboxCard = () => {
    const h2 = document.getElementById("lightbox-title");
    h2.textContent = `${title}`;
    const mediaWrapper = document.getElementById("media-wrapper");
    mediaWrapper.innerHTML = ` ${mediaSwitcherLightbox()}`;
  };

  return { getMediaCardDom, getLightboxCard };
};
