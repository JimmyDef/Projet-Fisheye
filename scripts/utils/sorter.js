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
const ariaExpanded = document.querySelector("#sorter[aria-expanded]");

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
  sorterUl.style.display = "none";
  sorterBtn.style.display = "block";
  sorterBtn.innerText = sorterName;
  chevronImg.classList.remove("media__sorter-chevron--up");
  sorterBtn.focus();
};
// -----------------------------------------------------
// Actualisation de  la liste puis ouverture
sorterBtn.addEventListener("click", () => {
  sorterList = document.querySelectorAll("#sorter-options li");
  openList();
});

// -----------------------------------------------------
// Ecoute "Echape" pour fermer la liste
document.addEventListener("keydown", (e) => {
  const isListOpen = ariaExpanded.getAttribute("aria-expanded");
  const actualSorter = document.querySelector("[aria-selected='true']");
  const currentFocus = document.activeElement;
  const nextFocus = currentFocus.nextElementSibling;
  const previousFocus = currentFocus.previousElementSibling;
  const firstUlChild = document.querySelector("ul > li");
  const lastUlChild = document.querySelector("ul > li:last-child");

  if (currentFocus === sorterBtn) {
    switch (e.key) {
      case "ArrowUp":
        openList();
        lastUlChild.focus();

        break;
      case "ArrowDown":
        openList();
        firstUlChild.focus();
        break;
    }
    return;
  }

  if (isListOpen === "true") {
    e.preventDefault();
    switch (e.key) {
      case "Tab":
        closeList(actualSorter.innerText);
        break;
      case "Escape":
        closeList(actualSorter.innerText);
        sorterBtn.focus();
        break;
      case "Enter":
        // const focusedElement = document.activeElement;
        updateList(currentFocus);
        break;
      case "ArrowDown":
        if (currentFocus === lastUlChild) {
          firstUlChild.focus();
        } else {
          nextFocus.focus();
        }
        break;
      case "ArrowUp":
        if (currentFocus === firstUlChild) {
          lastUlChild.focus();
        } else {
          previousFocus.focus();
        }
        break;
    }
    return;
  }
});

sorterList.forEach((li) => {
  li.addEventListener("click", () => {
    updateList(li);
  });
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
