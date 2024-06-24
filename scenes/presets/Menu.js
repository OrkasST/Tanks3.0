import { Scene } from "../Scene.js";

export class Menu extends Scene {
    constructor(startTime, data) {
        super({
            name: "Game Menu",
            objects: [
                {
                    type: "block",
                    name: "logo",
                    x: window.innerWidth * 0.5 - 128,
                    y: window.innerHeight * 0.2,
                    width: 256,
                    height: 171,
                    isUpdatable: false,
                    color: data["lable_image"]
                },
                {
                    type: "text",
                    name: "lable",
                    x: window.innerWidth * 0.5 - 93,
                    y: window.innerHeight * 0.3,
                    isUpdatable: false,
                    font: "40px TimesNewRoman",
                    color: "#FFFFFF",
                    text: "Main Menu"
                },
                
            ],
            startTime
        });
    }

    update(time) {}
}