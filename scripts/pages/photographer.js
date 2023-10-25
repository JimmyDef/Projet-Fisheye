import { getData } from "../utils/modules.js";
import { openLightbox } from "./../utils/lightbox_modal.js";

// Elements du DOM--------------------
const mediaSection = document.getElementById("media-section");
const prevBtn = document.getElementById("prev-media");
const nextBtn = document.getElementById("next-media");
const mediaWrapper = document.getElementById("media-wrapper");
const lightboxModal = document.getElementById("lightbox");

// -----------------------------------
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let userMedia = [];
const selectBtn = document.getElementById("sorter");

//-----------------------------------------------------
// Fonction initialisation de la page
// -----------------------------------------------------
const initPage = async () => {
  const { photographers, media } = await getData(
    "./../../data/photographers.json"
  );
  const photographer = photographers.find((data) => data.id == id);
  userMedia = media.filter((media) => media.photographerId == id);
  // Tri popularité par défault
  userMedia.sort((a, b) => b.likes - a.likes);
  // --------------------------
  //--------------------------------------
  // Création des infos photographe
  photographerTemplate(photographer).userInfo();
  // --------------------------------------
  renderMedia();
  displaylikes();

  openLightboxOnClick();
  selectBtn.addEventListener("change", sortMedia);
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

  console.log('"test');
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
  openLightboxOnClick();
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

    likesBox.addEventListener("click", () => {
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

//-----------------------------------------------------
// Fonction gestion lightbox
//-----------------------------------------------------

const openLightboxOnClick = () => {
  const links = document.querySelectorAll(".lightbox__link");

  let mediaIndex = null;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox();
      const mediaId = link.dataset.id;
      mediaIndex = userMedia.findIndex((elt) => elt.id == mediaId);
      mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
    });
  });
  const previousMedia = () => {
    if (mediaIndex === 0) {
      mediaIndex = userMedia.length - 1;
      mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
    } else {
      mediaIndex--;
      mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
    }
    mediaWrapper.focus();
  };
  const nextMedia = () => {
    if (mediaIndex === userMedia.length - 1) {
      mediaIndex = 0;
      mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
    } else {
      mediaIndex++;
      mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
    }
    mediaWrapper.focus();
  };

  prevBtn.addEventListener("click", () => {
    previousMedia();
  });
  nextBtn.addEventListener("click", () => {
    nextMedia();
  });
  // -----------------------------------------------------
  // Ecoute "Echape" pour fermer modal
  document.addEventListener("keydown", (e) => {
    const isModalOpen = lightboxModal.getAttribute("aria-hidden");
    if (isModalOpen === "false" && e.key === "ArrowLeft") {
      console.log("test");
      previousMedia();
    }
    if (isModalOpen === "false" && e.key === "ArrowRight") {
      nextMedia();
    }
  });
};

initPage();
