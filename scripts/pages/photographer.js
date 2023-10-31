import { getData } from "./../utils/modules.js";
import { onOpenModal, onCloseModal } from "./../utils/contact_modal.js";
export { userMedia, renderMedia, openLightboxOnClick, displaylikes };

// Elements du DOM--------------------
const mediaSection = document.getElementById("media-section");
const mediaWrapper = document.getElementById("media-wrapper");
const lightboxModal = document.getElementById("lightbox");
// Dom Buttons  ----------
const prevBtn = document.getElementById("prev-media");
const nextBtn = document.getElementById("next-media");
const closeLightboxBtn = document.getElementById("close-lightbox");
const sorterBtn = document.getElementById("sorter");

// -----------------------------------
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let userMedia = [];
let mediaIndex;

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

  //--------------------------------------
  // Création des infos photographe
  photographerTemplate(photographer).userInfo();
  // --------------------------------------
  renderMedia();
  displaylikes();
  openLightboxOnClick();
  sorterBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
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
      updateLikes();
    });
    likesBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        updateLikes();
      }
    });
    //-------------------------------------
    // Fonction mise a jour compte de Like
    const updateLikes = () => {
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
    };
  });
  const updateTotalLikes = () => {
    const likesTotal = userMedia.reduce((a, b) => parseInt(b.likes) + a, 0);
    document.getElementById("total").textContent = likesTotal;
  };
  updateTotalLikes();
};

//-----------------------------------------------------
// Fonction media précédent
//-----------------------------------------------------
const previousMedia = (Index) => {
  if (Index === 0) {
    mediaIndex = userMedia.length - 1;
    mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
  } else {
    mediaIndex--;
    mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
  }
  mediaWrapper.focus();
};

//-----------------------------------------------------
// Fonction media suivant
//-----------------------------------------------------
const nextMedia = (Index) => {
  if (Index === userMedia.length - 1) {
    mediaIndex = 0;
    mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
  } else {
    mediaIndex++;
    mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
  }
  mediaWrapper.focus();
};

//-----------------------------------------------------
// Fonction gestion lightbox
//-----------------------------------------------------
const openLightboxOnClick = () => {
  const links = document.querySelectorAll(".lightbox__link");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      onOpenModal(lightboxModal);

      const mediaId = link.dataset.id;
      mediaIndex = userMedia.findIndex((elt) => elt.id == mediaId);
      mediaTemplate(userMedia[mediaIndex]).getLightboxCard();
    });
  });
};
// -----------------------------------------------------
// Ecoute des boutons lightbox
prevBtn.addEventListener("click", () => {
  previousMedia(mediaIndex);
});
nextBtn.addEventListener("click", () => {
  nextMedia(mediaIndex);
});
closeLightboxBtn.addEventListener("click", () => {
  onCloseModal(lightboxModal);
  focusLastMedia();
});
// -----------------------------------------------------
// Gestion navigation clavier lightox

const focusLastMedia = () => {
  const lastMediaId = userMedia[mediaIndex].id;
  const lastMediaOpened = document.querySelector(`[data-id="${lastMediaId}"]`);
  lastMediaOpened.focus();
};

document.addEventListener("keydown", (e) => {
  const isModalOpen = lightboxModal.getAttribute("aria-hidden");
  if (isModalOpen === "false" && e.key === "ArrowLeft") {
    previousMedia(mediaIndex);
  }
  if (isModalOpen === "false" && e.key === "ArrowRight") {
    nextMedia(mediaIndex);
  }
  if (isModalOpen === "false" && e.key === "Escape") {
    onCloseModal(lightboxModal);
    focusLastMedia();
  }
});

initPage();
