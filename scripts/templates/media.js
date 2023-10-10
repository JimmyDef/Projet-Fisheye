const mediaTemplate = (data) => {
  const { title, image, video, likes, photographerId } = data;
  const imageUrl = `assets/images/${photographerId}/${image}`;
  const videoUrl = `assets/images/${photographerId}/${video}`;

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
  };
  // ---------------------

  const getMediaCardDom = () => {
    const article = document.createElement("article");
    article.innerHTML = ` 
          <div class="media__wrapper">
          ${switchMediaType()}
          </div>
          <div class="media__info">
            <h2 class="media__title">${title}</h2>
            <div class="media__likes">
              <span>${likes} </span><i class="fa-solid fa-heart" class="media__heart"></i>
            </div>
          </div>
          `;
    return article;
  };

  return { getMediaCardDom };
};

// class MediaFactory {
//   constructor(data, type) {
//     if (type === "img") {
//       return new getImgCardDOm(data);
//     }
//     if (type === "video") {
//       return new getVideoCardDOm(data);
//     }
//     throw "Unknown format type";
//   }
// }
