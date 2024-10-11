import { MediaLoader } from "../../utils/MediaLoader.js";
import { Scene } from "../Scene.js";

export class Loading extends Scene {
    constructor(data, nextScene, startTime, background) {
        console.log('loading.constructor >>>>\n\tdata: ', data);
        super({
            name: "Game Loading",
            objects: [
                {
                    type: "text",
                    name: "lable",
                    x: window.innerWidth * 0.2,
                    y: window.innerHeight * 0.8,
                    isUpdatable: false,
                    font: "40px TimesNewRoman",
                    color: "#FFFFFF",
                    text: "Loading..."
                },
                {
                    type: "block",
                    name: "logo",
                    x: window.innerWidth / 2 - 0,
                    y: window.innerHeight / 2 - 0,
                    width: 0,
                    height: 0,
                    isUpdatable: false,
                    color: "#101010"
                },
                {
                    type: "block",
                    name: "loadbar_back",
                    x: window.innerWidth * 0.15,
                    y: window.innerHeight * 0.87,
                    width: window.innerWidth * 0.75,
                    height: window.innerHeight * 0.03,
                    isUpdatable: false,
                    color: "#757575"
                },
                {
                    type: "block",
                    name: "loadbar_front",
                    x: window.innerWidth * 0.15,
                    y: window.innerHeight * 0.87,
                    width: 0,
                    height: window.innerHeight * 0.03,
                    isUpdatable: false,
                    color: "#DDDDDD"
                }
            ],
            data,
            time: 10000, // Infinity
            nextScene,
            startTime,
            background
        });
        this.loadAmmount = this.data.sceneImages.length;
        this.alreadyLoaded = 0;

        this.loader = new MediaLoader();
        this.loader.setMedia(this.data.sceneImages);
        console.log('this.data.sceneImages: ', this.data.sceneImages);
        this.loader.loadMedia().then(
            (value) => {
                console.log(this.loader.loadedMedia);
                this.data.sceneImages = this.loader.loadedMedia;
            },
            (reason) => {
                console.clear();
                console.log(reason);
            }
        );
        this.loadingStep = 0;
        this.textUpdateLastTime = 0;
    }

    _updateLoadbar(length) {
        this.objects[3].width = this.objects[2].width / this.loadAmmount * length;
        this.alreadyLoaded = length;
    }

    _updateText(time) {
        if (time - this.textUpdateLastTime < 200 && this.textUpdateLastTime > 0) return;
        this.objects[0].text = "Loading" + ".".repeat(this.loadingStep++);
        if(this.loadingStep > 3) this.loadingStep = 0;
        this.textUpdateLastTime = time;
    }

    update(time) {
        this._updateLoadbar(this.loader.percentLoaded);
        this._updateText(time);
        if (this.loadAmmount === this.alreadyLoaded) {
            this.isFinished = true;
            this.onFinish();
        }
        this.lastTime = time;
    }
}