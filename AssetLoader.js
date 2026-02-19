export default class AssetLoader {
  constructor() {
    this.images = {};
  }

  // Load a single image and wait until fully decoded
  loadImage(key, src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img
        .decode()
        .then(() => {
          this.images[key] = img;
          resolve(img);
        })
        .catch(() => reject(`Failed to load image: ${src}`));
    });
  }

  // Load multiple images
  loadAllImages(imageList) {
    const promises = imageList.map((imgData) =>
      this.loadImage(imgData.key, imgData.src),
    );
    return Promise.all(promises);
  }

  // Get a loaded image
  getImage(key) {
    return this.images[key];
  }
}
