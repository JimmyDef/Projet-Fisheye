// Dom elements ----------------------------------------
const contactModal = document.getElementById("contact_modal");
const modalForm = document.getElementById("modal-form");
const mainHeader = document.querySelector(".header-photographer");
const mainSection = document.querySelector("main");

// Dom Buttons  ----------------------------------------
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const submitBtn = document.getElementById("submitBtn");

// -----------------------------------------------------
// Fonction affichage modal contact
// -----------------------------------------------------

const onOpenModal = (DOMElement) => {
  DOMElement.style.display = "block";
  mainHeader.setAttribute("aria-hidden", "true");
  mainSection.setAttribute("aria-hidden", "true");
  DOMElement.setAttribute("aria-hidden", "false");
  DOMElement.focus();
};

// -----------------------------------------------------
// Fonction fermer  modal contact
// -----------------------------------------------------

const onCloseModal = (DOMElement) => {
  DOMElement.style.display = "none";
  mainHeader.setAttribute("aria-hidden", "false");
  mainSection.setAttribute("aria-hidden", "false");
  DOMElement.setAttribute("aria-hidden", "true");
};

// -----------------------------------------------------
// Ecoute des boutons ouvrir/fermer modal

openModalBtn.addEventListener("click", () => {
  onOpenModal(contactModal);
});

closeModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  onCloseModal(contactModal);
  openModalBtn.focus();
});
// -----------------------------------------------------
// Ecoute "Echape" pour fermer modal
document.addEventListener("keydown", (e) => {
  const isModalOpen = contactModal.getAttribute("aria-hidden");
  if (isModalOpen === "false" && e.key === "Escape") {
    onCloseModal(contactModal);
    openModalBtn.focus();
  }
});

// -----------------------------------------------------
// Validation du formulaire

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  onCloseModal(contactModal);
  openModalBtn.focus();

  const userMsg = {
    firstName: modalForm.fistname.value,
    lastName: modalForm.lastname.value,
    email: modalForm.email.value,
    message: modalForm.message.value,
  };

  console.log("🚀 ~ userMsg:", userMsg);
  modalForm.reset();
});

// const emailRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
// const nameRegEx = new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]{2,}$/i);
// const isFirstNameValid = () => {
//   if (modalForm.fistname.value.test(nameRegEx)) {
//     return true
//   }

// }
// const isLastNameValid = () => {}
// const isEmailValid = () => {}
// const isMsgValid = () => {}

// const isFormValid = () => {
//   modalForm.lastname.value.test(nameRegEx);
//   modalForm.email.value.test(emailRegEx);
// }

export { onOpenModal, onCloseModal };
