import { getData } from "../utils/modules.js";
const mediaSection = document.getElementById("media-section");
const selectBtn = document.getElementById("sorter");

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const { photographers, media } = await getData(
  "./../../data/photographers.json"
);
const photographer = photographers.find((data) => data.id == id);
let userMedia = media.filter((media) => media.photographerId == id);

console.log("🚀 ~ userMedia:", userMedia);

//--------------------------------------
// Création des infos photographe
photographerTemplate(photographer).userInfo();

// ------------
// Fonction qui génère les cards dans le DOM
// ------------

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
// ------------

selectBtn.addEventListener("change", function () {
  console.log("🚀 change:", userMedia);
  if (selectBtn.value == "title") {
    userMedia = userMedia.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }
  if (selectBtn.value == "popularity") {
    userMedia = userMedia.sort(function (a, b) {
      return b.likes - a.likes;
    });
  }
  if (selectBtn.value == "date") {
    userMedia = userMedia.sort(function (a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB - dateA;
    });
  }
  console.log("🚀  trie:", userMedia);
  renderMedia();
  displaylikes();
});
//-----------------------------------------------------
// Fonction création  des cards
//-----------------------------------------------------

const displayMedia = () => {
  // ------------
  // Tri popularité par défault
  userMedia.sort(function (a, b) {
    return b.likes - a.likes;
  });

  renderMedia();
  displaylikes();
};

//-----------------------------------------------------
// Fonction gestion des Likes
//-----------------------------------------------------

const displaylikes = () => {
  const likesPerMedia = document.querySelectorAll(".media__likes-number");

  likesPerMedia.forEach((likesNb) => {
    const likesBox = likesNb.closest(".media__likes");
    const heart = likesNb.nextElementSibling;
    const dataId = likesBox.dataset.id;
    const media = userMedia.find((elt) => elt.id == dataId);
    // const mediaIndex = userMedia.findIndex((elt) => elt.id == dataId);

    likesBox.addEventListener("click", function () {
      if (media.isLiked === undefined || media.isLiked === false) {
        likesNb.textContent = parseInt(likesNb.textContent) + 1;
        media.likes++;
        media.isLiked = true;
        heart.classList.toggle("media__heart--isLiked");
        totalCounted();
        return;
      }
      if (media.isLiked === true) {
        likesNb.textContent = parseInt(likesNb.textContent) - 1;
        media.likes--;
        media.isLiked = false;
        heart.classList.toggle("media__heart--isLiked");
        totalCounted();
        return;
      }
      // userMedia[mediaIndex] = { ...media };
    });
  });
  const totalCounted = () => {
    const likesTotal = userMedia.reduce((a, b) => parseInt(b.likes) + a, 0);

    document.getElementById("total").textContent = likesTotal;
  };
  totalCounted();
};

//-----------------------------------------------------
// Fonction initialisation de la page
//-----------------------------------------------------
// const init = async () => {};

// init();
displayMedia(media);
