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
  const selectBtn = document.getElementById("sorter");
  const userMedia = media.filter((media) => media.photographerId == id);

  console.log("🚀 ~ displayMedia ~ userMedia:", userMedia);

  // ------------
  // Tri popularité par défault
  userMedia.sort(function (a, b) {
    return b.likes - a.likes;
  });

  // ------------
  // Fonction qui génère les cards dans le DOM

  const renderMedia = () => {
    mediaSection.innerHTML = " ";
    userMedia.forEach((data) => {
      const mediaModel = mediaTemplate(data);

      const mediaCardDom = mediaModel.getMediaCardDom();
      mediaSection.appendChild(mediaCardDom);
    });
  };
  // ------------
  // Ecoute des boutons pour trier les Cards
  selectBtn.addEventListener("change", function () {
    if (selectBtn.value == "title") {
      userMedia.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }
    if (selectBtn.value == "popularity") {
      userMedia.sort(function (a, b) {
        return b.likes - a.likes;
      });
    }
    if (selectBtn.value == "date") {
      userMedia.sort(function (a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      });
    }
    renderMedia();
    displaylikes();
  });
  renderMedia();
  displaylikes();
};

//-----------------------------------------------------
// Fonction gestion des Likes
//-----------------------------------------------------
const displaylikes = () => {
  const mediaLike = document.querySelectorAll(".media__likes-number");

  mediaLike.forEach((likesNb) => {
    const likesBox = likesNb.closest(".media__likes");
    const heart = likesNb.nextElementSibling;

    let isLiked = false;
    likesBox.addEventListener("click", function () {
      if (isLiked) {
        likesNb.textContent = parseInt(likesNb.textContent) - 1;
        isLiked = !isLiked;
        heart.classList.toggle("media__heart--isLiked");
      } else {
        likesNb.textContent = parseInt(likesNb.textContent) + 1;
        isLiked = !isLiked;
        heart.classList.toggle("media__heart--isLiked");
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
  const photographer = photographers.find((data) => data.id == id);

  displayPhotographer(photographer);
  displayMedia(media);
};

init();
