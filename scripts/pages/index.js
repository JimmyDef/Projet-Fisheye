import { getData } from "./../utils/modules.js";
import { photographerTemplate } from "./../templates/photographer.js";

const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

const init = async () => {
  // Récupère les datas des photographes
  const { photographers } = await getData(
    "./../../assets/data/photographers.json"
  );
  displayData(photographers);
};

init();
