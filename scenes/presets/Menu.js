import { Scene } from "../Scene.js";

export class Menu extends Scene {
    constructor(startTime) {
        super({
            name: "Game Menu",
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
    }

    update(time) {
        this._updateLoadbar(this.loader.percentLoaded);
        if (this.loadAmmount === this.alreadyLoaded) {
            this.isFinished = true;
            this._onFinish();
        }
    }
}