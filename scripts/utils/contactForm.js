const modal = document.getElementById("contact_modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const mainHeader = document.querySelector(".header-photographer");
const mainSection = document.querySelector("main");

openModal.addEventListener("click", function () {
  modal.style.display = "block";
  mainHeader.setAttribute("aria-hidden", "true");
  mainSection.setAttribute("aria-hidden", "true");
  modal.focus();
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  mainHeader.setAttribute("aria-hidden", "false");
  mainSection.setAttribute("aria-hidden", "false");
});
