import { getData } from "../utils/modules.js";

//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

//

const displayPhotographer = (photographers) => {
  const photographer = photographers.find((data) => data.id == id);
  photographerTemplate(photographer).userInfo();
};
const init = async () => {
  const { photographers } = await getData("./../../data/photographers.json");

  displayPhotographer(photographers);
};

init();
