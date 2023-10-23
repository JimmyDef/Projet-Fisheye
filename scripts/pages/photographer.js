import { getData } from "../utils/modules.js";
const mediaSection = document.getElementById("media-section");
const selectBtn = document.getElementById("sorter");

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let userMedia = [];

//-----------------------------------------------------
// Fonction initialisation de la page
// -----------------------------------------------------
const initPage = async () => {
  const { photographers, media } = await getData(
    "./../../data/photographers.json"
  );
  const photographer = photographers.find((data) => data.id == id);
  userMedia = media.filter((media) => media.photographerId == id);

  //--------------------------------------
  // Création des infos photographe
  photographerTemplate(photographer).userInfo();
  // --------------------------------------
  renderMedia();
  displaylikes();
  sortMedia();
};

//-----------------------------------------------------
// Fonction qui génère les cards dans le DOM
//-----------------------------------------------------

const renderMedia = () => {
  mediaSection.innerHTML = " ";
  userMedia.forEach((data) => {
    const mediaModel = mediaTemplate(data);

    const mediaCardDom = mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDom);
  });
};

//-----------------------------------------------------
// Fonction pour trier les Cards
//-----------------------------------------------------

const sortMedia = () => {
  const selectedValue = selectBtn.value;

  // Tri popularité par défault
  userMedia.sort((a, b) => b.likes - a.likes);
  // --------------------------

  selectBtn.addEventListener("change", function () {
    if (selectedValue == "title") {
      userMedia.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (selectedValue == "popularity") {
      userMedia.sort((a, b) => b.likes - a.likes);
    }
    if (selectedValue == "date") {
      userMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderMedia();
    displaylikes();
  });
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
        updateTotalLikes();
        return;
      }
      if (media.isLiked === true) {
        likesNb.textContent = parseInt(likesNb.textContent) - 1;
        media.likes--;
        media.isLiked = false;
        heart.classList.toggle("media__heart--isLiked");
        updateTotalLikes();
        return;
      }
    });
  });
  const updateTotalLikes = () => {
    const likesTotal = userMedia.reduce((a, b) => parseInt(b.likes) + a, 0);

    document.getElementById("total").textContent = likesTotal;
  };
  updateTotalLikes();
};

initPage();
