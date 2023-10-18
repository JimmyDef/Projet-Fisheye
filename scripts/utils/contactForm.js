const modal = document.getElementById("contact_modal");
const modalForm = document.getElementById("modal-form");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const mainHeader = document.querySelector(".header-photographer");
const mainSection = document.querySelector("main");
const submitBtn = document.getElementById("submitBtn");

const onOpenModal = () => {
  modal.style.display = "block";
  mainHeader.setAttribute("aria-hidden", "true");
  mainSection.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  modal.focus();
};

const onCloseModal = () => {
  modal.style.display = "none";
  mainHeader.setAttribute("aria-hidden", "false");
  mainSection.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
};

openModal.addEventListener("click", function () {
  onOpenModal();
});

closeModal.addEventListener("click", function () {
  onCloseModal();
});
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  onCloseModal();

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
