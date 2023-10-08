const modal = document.getElementById("contact_modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");

openModal.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});
