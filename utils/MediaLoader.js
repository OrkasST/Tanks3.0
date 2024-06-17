export class MediaLoader {
    constructor(callback) {
      this.mediaToLoad = null;
      this.loadedMedia = {};
      this.promises = [];
      this.type = 'image';
      this.percentLoaded = 0;
      this.callback = callback;
    }
  
    setMedia(media, type = null) {
      this.mediaToLoad = media;
      if (type) this.type = type;
      this.loadedMedia = {};
      this.promises = [];
      this._loadAmmount = Object.keys(this.mediaToLoad).length;
    }
  
    loadMedia() {
      for (let name in this.mediaToLoad) {
        this.promises.push(this._setup(name, this.mediaToLoad[name]));
      }
      return Promise.all(this.promises);
    }

    _step() {
        this.percentLoaded++;
        this.callback(this.percentLoaded);
    }
  
    _setup(name, src) {
      return new Promise((resolve, reject) => {
        const img =
          this.type === "video"
            ? document.createElement("video")
            : name.split("_")[0] === "music"
            ? document.createElement("audio")
            : new Image();
  
        this.loadedMedia[name] = img;
        this.type === "video"
          ? (img.oncanplaythrough = () => {this._step(); resolve(name)})
          : name.split("_")[0] === "music"
          ? (img.oncanplaythrough = () => {this._step(); resolve(name)})
          : (img.onload = () => {this._step(); resolve(name)});
        img.onerror = (error) => reject(error);
        // console.log(window.location.origin + src);
        img.src = src;
      });
    }
  }
  