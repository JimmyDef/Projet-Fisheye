import { onOpenModal, onCloseModal } from "./contact_modal.js";

// Dom elements ----------
const lightboxModal = document.getElementById("lightbox");

// Dom Buttons  ----------
const closeLightboxBtn = document.getElementById("close-lightbox");

export const openLightbox = () => {
  onOpenModal(lightboxModal);
};
closeLightboxBtn.addEventListener("click", () => {
  onCloseModal(lightboxModal);
});

// -----------------------------------------------------
// Ecoute "Echape" pour fermer modal
document.addEventListener("keydown", (e) => {
  const isModalOpen = lightboxModal.getAttribute("aria-hidden");
  if (isModalOpen === "false" && e.key === "Escape") {
    onCloseModal(lightboxModal);
  }
});
