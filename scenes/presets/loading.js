import { MediaLoader } from "../../utils/MediaLoader.js";
import { Scene } from "../Scene.js";

export class Loading extends Scene {
    constructor(imagesList, nextScene, startTime) {
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
            data: imagesList,
            time: 10000, // Infinity
            nextScene,
            startTime
        });
        this._onFinish = () => console.log("Loading is finished!");
        this.loadAmmount = Object.keys(this.data).length;
        this.alreadyLoaded = 0;

        this.loader = new MediaLoader();
        this.loader.setMedia(this.data);
        this.loader.loadMedia().then(
            (value) => console.log(this.loader.loadedMedia),
            (reason) => {
                console.clear();
                console.log(reason);
            }
        );
    }

    _updateLoadbar(length) {
        this.objects[3].width = this.objects[2].width / Object.keys(this.data).length * length;
        this.alreadyLoaded = length;
    }

    update(time) {
        this._updateLoadbar(this.loader.percentLoaded);
        if (this.loadAmmount === this.alreadyLoaded) {
            this.isFinished = true;
            this._onFinish();
        }
    }
}