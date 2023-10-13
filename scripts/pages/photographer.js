import { getData } from "../utils/modules.js";

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const displayPhotographer = (photographer) => {
  photographerTemplate(photographer).userInfo();
};

const displayMedia = async (media) => {
  const mediaSection = document.getElementById("media-section");
  const userMedia = media.filter((media) => media.photographerId == id);
  const totalLikes = userMedia.reduce((a, b) => b.likes + a, 0);
  document.getElementById("total").textContent = totalLikes;

  userMedia.forEach((data) => {
    const mediaModel = mediaTemplate(data);

    const mediaCardDom = mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDom);
  });
};

const init = async () => {
  const { photographers, media } = await getData(
    "./../../data/photographers.json"
  );
  const photographer = photographers.find((data) => data.id !== id);

  displayPhotographer(photographer);
  displayMedia(media);
};

init();
