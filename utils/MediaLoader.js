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
      this._loadAmmount = this.mediaToLoad.length;
    }
  
    loadMedia(isSendingImage) {
      for (let i = 0; i < this._loadAmmount; i++) {
        this.promises.push(this._setup(this.mediaToLoad[i][0], this.mediaToLoad[i][1], isSendingImage));
      }
      return Promise.all(this.promises);
    }

    _step() {
        this.percentLoaded++;
        if(this.callback)this.callback(this.percentLoaded);
    }
  
    _setup(name, src, isSendingImage) {
      return new Promise((resolve, reject) => {
        const img =
          this.type === "video"
            ? document.createElement("video")
            : name.split("_")[0] === "music"
            ? document.createElement("audio")
            : new Image();
  
        this.loadedMedia[name] = img;
        this.type === "video"
          ? (img.oncanplaythrough = () => {this._step(); resolve(isSendingImage ? img : name)})
          : name.split("_")[0] === "music"
          ? (img.oncanplaythrough = () => {this._step(); resolve(isSendingImage ? img : name)})
          : (img.onload = () => {this._step(); resolve(isSendingImage ? img : name)});
        img.onerror = (error) => reject(error);
        // console.log(window.location.origin + src);
        img.src = src;
      });
    }
  }
  