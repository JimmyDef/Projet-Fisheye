import { getData } from "../utils/modules.js";

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

//-----------------------------------------------------
// Fonction création des infos photographe
//-----------------------------------------------------

const displayPhotographer = (photographer) => {
  photographerTemplate(photographer).userInfo();
};

//-----------------------------------------------------
// Fonction création  des cards
//-----------------------------------------------------

const displayMedia = async (media) => {
  const mediaSection = document.getElementById("media-section");
  const userMedia = media.filter((media) => media.photographerId == id);

  userMedia.forEach((data) => {
    const mediaModel = mediaTemplate(data);

    const mediaCardDom = mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDom);
  });
};

//-----------------------------------------------------
// Fonction gestion des Likes
//-----------------------------------------------------
const displaylikes = () => {
  const mediaLike = document.querySelectorAll(".media__likes-number");

  mediaLike.forEach((elt) => {
    const likesBox = elt.closest(".media__likes");
    let isLiked = false;
    likesBox.addEventListener("click", function () {
      if (isLiked) {
        elt.textContent = parseInt(elt.textContent) - 1;
        isLiked = !isLiked;
      } else {
        elt.textContent = parseInt(elt.textContent) + 1;
        isLiked = !isLiked;
      }
      totalCounted();
    });
  });

  const totalCounted = () => {
    const mediaLikeArray = Array.from(mediaLike);

    const likesTotal = mediaLikeArray.reduce(
      (a, b) => parseInt(b.textContent) + a,
      0
    );
    document.getElementById("total").textContent = likesTotal;
  };
  totalCounted();
};

//-----------------------------------------------------
// Fonction initialisation de la page
//-----------------------------------------------------
const init = async () => {
  const { photographers, media } = await getData(
    "./../../data/photographers.json"
  );
  const photographer = photographers.find((data) => data.id !== id);

  displayPhotographer(photographer);
  displayMedia(media);
  displaylikes();
};

init();
