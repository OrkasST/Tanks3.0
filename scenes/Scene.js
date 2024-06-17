export class Scene {
  constructor({
    name = "Default Loading Scene",
    type = "loading", // "gameLevel" | "loading" | "video" | "menu"
    background = "#000000", // Map() | Texture()
    objects = [],
    /*
    {
      type: "block", // "text"
      name: "logo",
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      isUpdatable: false, // true
      font: "40px TimesNewRoman",
      text: "Loading...",
      color: "#000000" // Image()
    },
  */
    data = {},
    time = 2000,
    nextScene = "",
    startTime = 0,
    _onFinish = () => { },
    _update = null,
    physicIsOn = false,
  }) {
    this.name = name;
    this.type = type;
    this.background = background;
    this.objects = objects;
    this.time = time;
    this.isFinished = false;
    this.data = data;
    // this.media = media;
    this.nextScene = nextScene;
    this.startTime = null;
    this._onFinish = _onFinish;
    this.physicIsOn = physicIsOn;
    if (_update) this.update = _update;
  }

  setStartTime(time) {
    // console.group("Set Start Time");
    // console.log("start time set");
    // console.log("time: ", time);
    this.startTime = time || 0;
    // console.log("startTime: ", this.startTime);
    // console.groupEnd();
  }

  setData(data) {
    this.data = data;
  }

  update(time) {
    if (time - this.startTime >= this.time) {
      this.isFinished = true;
      this._onFinish();
    }
  }
}

//start 17.06.2024 22:03