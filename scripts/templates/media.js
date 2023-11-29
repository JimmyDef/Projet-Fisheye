 export const mediaTemplate = (data) => {
  let { title, image, video, likes, photographerId, id, isLiked } = data;
  const imageUrl = `assets/images/${photographerId}/${image}`;
  const minifiedImageUrl = `assets/min-images/${photographerId}/${image}`;
  const videoUrl = `assets/images/${photographerId}/${video}`;

  // -----------------------------------------------------
  // Fonction gestion du type de média
  // -----------------------------------------------------

  const mediaSwitcher = (string) => {
    if (data.image) {
      if (!string) {
        return `<img src="${minifiedImageUrl}" alt="${title}" class="media__gallery-img"/>`;
      }
      return `<img src="${imageUrl}" alt="${title}" class="media__gallery-img"/>`;
    }
    if (data.video) {
      if (!string) {
        return ` <video  aria-label="${title}" tabindex="-1">
            <source src="${videoUrl}"  type="video/mp4">
            </video> <div class="media__video-ico-wrapper"><img src="./assets/icons/play-button.svg" class="media__video-ico" alt="logo video"/></div>
            `;
      }
      return ` <video  controls >
            <source src="${videoUrl}" alt="${title}" >
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
    article.innerHTML = ` 
          <a href="#" class="media__wrapper lightbox__link"  aria-label="${title}, vue rapprochée"data-id=${id} tabindex="0">
          ${mediaSwitcher()}
          </a> 
          <div class="media__info">
            <h2 class="media__title" >${title}</h2>
           
            <div class="media__likes" data-id=${id} tabindex="0" >
              <span class='media__likes-number' aria-live="polite" aria-atomic="true">${likes} 
               </span> <div class="media__heart-wrapper">
               <img alt="coeur"  src="./assets/icons/heart.svg" class="media__heart " />
               <img alt="coeur"  src="./assets/icons/heart-red.svg" class="media__heart media__heart--red ${
                 isLiked ? "media__heart--red-isLiked" : ""
               }" /> 
              
            </div>
            </div>
          </div>
          `;

    return article;
  };

  // -----------------------------------------------------
  // Fonction création du contenu lightbox
  // -----------------------------------------------------

  const getLightboxCard = () => {
    const h2 = document.getElementById("lightbox-title");
    h2.textContent = `${title}`;
    const mediaWrapper = document.getElementById("media-wrapper");
    mediaWrapper.innerHTML = ` ${mediaSwitcher("lightbox")}`;
  };

  return { getMediaCardDom, getLightboxCard };
};
