class mediaCard {
  constructor(data) {
    this.tile = data.getTitle;
    this.image = data.image;
    this.video = data.video;
    this.likes = data.likes;
    this.photographerId = data.photographerId;
    this.imageUrl = `assets/images/${photographerId}/${image}`;
    this.videoUrl = `assets/images/${photographerId}/${video}`;
  }
}
