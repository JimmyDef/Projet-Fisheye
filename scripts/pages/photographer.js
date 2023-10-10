import { getData } from "../utils/modules.js";

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const displayPhotographer = (photographer) => {
  photographerTemplate(photographer).userInfo();
};

const displayMedia = async (media) => {
  const mediaSection = document.getElementById("media-section");
  const userMedia = media.filter((media) => media.photographerId == id);

  userMedia.forEach((data) => {
    // if (data.image) {
    //   const mediaCardDom = new MediaFactory(data, "img");
    //   mediaSection.appendChild(mediaCardDom);
    // }
    // if (data.video) {
    //   const mediaCardDom = new MediaFactory(data, "video");
    //   mediaSection.appendChild(mediaCardDom);
    // }
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
