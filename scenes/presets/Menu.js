import { Button } from "../../UI/Button.js";
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
                new Button({
                    name: "Level Choose",
                    text: "Levels",
                    x: window.innerWidth * 0.5 - 60,
                    y: window.innerHeight * 0.2 + 250,
                    width: 120,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 12,
                    action: () => this.changePage("levels")
                })
                
            ],
            startTime,
            background: "#000000"
        });
        this.mainPage = {...this.objects};
        this.pages = {
            levels: [
                new Button({
                    name: "Level Start",
                    text: "Level 1",
                    x: window.innerWidth * 0.3,
                    y: window.innerHeight * 0.3,
                    width: 120,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 12
                })
            ]
        }
    }

    changePage(page) {
        this.objects = this.pages[page];
    }

    update(time) {}
}