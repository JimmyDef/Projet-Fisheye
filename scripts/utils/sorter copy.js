import {
  userMedia,
  renderMedia,
  openLightboxOnClick,
  displaylikes,
} from "./../pages/photographer.js";

// Dom elements ----------------------------------------
const sorterBtn = document.getElementById("sorter");
const sorterUl = document.getElementById("sorter-options");
const chevronImg = document.querySelector(".media__sorter-chevron");
let sorterList = document.querySelectorAll("#sorter-options li");
const sorterSelected = document.querySelector("[aria-selected='true']");
const ariaExpanded = document.querySelector("#sorter[aria-expanded]");

console.log("🚀 ~ ariaExpanded:", ariaExpanded);

//-----------------------------------------------------
// Fonction pour trier les Cards
//-----------------------------------------------------

const sortMedia = (string) => {
  if (string === "Titre") {
    userMedia.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (string === "Populaire") {
    userMedia.sort((a, b) => b.likes - a.likes);
  }
  if (string === "Date") {
    userMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  renderMedia();
  displaylikes();
  openLightboxOnClick();
};

// -----------------------------------------------------
// Fonction ajustement ordre des noms de la liste
const orderList = () => {
  for (let li of sorterList) {
    const ariaSelected = li.getAttribute("aria-selected");
    if (ariaSelected === "true") {
      li.remove();
      sorterUl.insertBefore(li, sorterUl.firstChild);
    }
  }
};
// -----------------------------------------------------
// Fonction ouvrir la liste
const openList = () => {
  sorterBtn.setAttribute("aria-expanded", "true");
  sorterBtn.style.display = "none";
  sorterUl.style.display = "block";
  chevronImg.classList.add("media__sorter-chevron--up");
  sorterList[0].focus();
};
// -----------------------------------------------------
// Fonction fermer la liste
const closeList = (sorterName) => {
  sorterBtn.setAttribute("aria-expanded", "false");
  sorterBtn.style.display = "block";
  sorterBtn.innerText = sorterName;
  sorterUl.style.display = "none";
  chevronImg.classList.remove("media__sorter-chevron--up");
  sorterBtn.focus();
};

sorterBtn.addEventListener("click", () => {
  sorterList = document.querySelectorAll("#sorter-options li");
  openList();
});
const updateList = (li) => {
  const ariaSelected = li.getAttribute("aria-selected");
  if (ariaSelected === "false") {
    sortMedia(li.innerText);
    sorterList.forEach((li) => {
      li.setAttribute("aria-selected", "false");
    });

    li.setAttribute("aria-selected", "true");
    orderList();
    closeList(li.innerText);
  } else {
    closeList(li.innerText);
  }
};
// -----------------------------------------------------
// Ecoute "Echape" pour fermer la liste
document.addEventListener("keydown", (e) => {
  const isListOpen = ariaExpanded.getAttribute("aria-expanded");
  const actualSorter = document.querySelector("[aria-selected='true']");
  if (isListOpen === "true") {
    if (e.key === "Tab") {
      closeList(actualSorter.innerText);
    }
    if (e.key === "Escape") {
      closeList(actualSorter.innerText);
    }
    if (e.key === "Enter") {
      const focusedElement = document.activeElement;
      updateList(focusedElement);
    }
  }
});

sorterList.forEach((li) => {
  li.addEventListener("click", () => {
    updateList(li);
  });
});
