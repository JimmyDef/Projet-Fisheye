import { sanitizeForXSS } from "./modules.js";
// Dom elements ----------------------------------------
const contactModal = document.getElementById("contact_modal");
const modalForm = document.getElementById("modal-form");
const mainHeader = document.querySelector(".header-photographer");
const mainSection = document.querySelector("main");
const firstNameInput = document.getElementById("fistname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

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

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isFormValid()) {
    const firstError = document.querySelector("[aria-invalid = true]");

    firstError.focus();
    return;
  }
  onCloseModal(contactModal);
  openModalBtn.focus();

  const userMsg = {
    firstName: sanitizeForXSS(modalForm.fistname.value),
    lastName: sanitizeForXSS(modalForm.lastname.value),
    email: sanitizeForXSS(modalForm.email.value),
    message: sanitizeForXSS(modalForm.message.value),
  };

  console.log("🚀 ~ userMsg:", userMsg);
  modalForm.reset();
});

// -----------------------------------------------------
// Test validation des champs
// -----------------------------------------------------
const emailRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const textRegEx = new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]{2,}$/i);
const textAreaRegEx = new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ-' \n\r\t]{10,}$/i);

firstNameInput.addEventListener("change", () => {
  isInputValid(firstNameInput, textRegEx);
});

lastNameInput.addEventListener("change", () => {
  isInputValid(lastNameInput, textRegEx);
});
emailInput.addEventListener("change", () => {
  isInputValid(emailInput, emailRegEx);
});
messageInput.addEventListener("change", () => {
  isInputValid(messageInput, textAreaRegEx);
});

// -----------------------------------------------------
// Fonction générique validation des champs
// -----------------------------------------------------
const isInputValid = (input, regEx) => {
  const errorMsg = input.nextElementSibling;
  if (regEx.test(input.value)) {
    errorMsg.style.display = "none";
    input.setAttribute("aria-invalid", "false");
    input.setAttribute("aria-describedby", "");

    return true;
  }

  input.setAttribute("aria-invalid", "true");
  errorMsg.style.display = "block";
  input.focus();
};

// -----------------------------------------------------
// Fonction validation du formulaire
// -----------------------------------------------------
const isFormValid = () => {
  isInputValid(firstNameInput, textRegEx);
  isInputValid(lastNameInput, textRegEx);
  isInputValid(emailInput, emailRegEx);
  isInputValid(messageInput, textAreaRegEx);
  if (
    isInputValid(firstNameInput, textRegEx) &&
    isInputValid(lastNameInput, textRegEx) &&
    isInputValid(emailInput, emailRegEx) &&
    isInputValid(messageInput, textAreaRegEx)
  ) {
    return true;
  }
};

export { onOpenModal, onCloseModal };
