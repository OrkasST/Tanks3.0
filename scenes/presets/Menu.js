import { Button } from "../../UI/Button.js";
import { LevelChoiseButton } from "../../UI/LevelChoiseButton.js";
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
                    x: window.innerWidth * 0.5 - 64,
                    y: window.innerHeight * 0.2 + 250,
                    width: 128,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 16,
                    action: () => this.changePage("levels")
                }),
                new Button({
                    name: "Game Settings",
                    text: "Settings",
                    x: window.innerWidth * 0.5 - 64,
                    y: window.innerHeight * 0.2 + 310,
                    width: 128,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 7,
                    action: () => this.changePage("settings")
                })


            ],
            startTime,
            background: "#000000"
        });
        this.mainPage = [...this.objects];
        this.pages = {
            levels: [
                new Button({
                    name: "Return",
                    text: "Back",
                    x: window.innerWidth * 0.1,
                    y: window.innerHeight * 0.1,
                    width: 88,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 8,
                    action: () => this.changePage('main')
                }),
                new LevelChoiseButton(() => this.chooseLevel("level_1"), "Level 1", data['levels']),
                new LevelChoiseButton(() => this.chooseLevel("level_2"), "Level 2", data['levels'], false, { x: 180, y: 0 }),
                new LevelChoiseButton(() => this.chooseLevel("level_3"), "Level 3", data['levels'], false, { x: 180 * 2, y: 0 }),
                new LevelChoiseButton(() => this.chooseLevel("level_4"), "Level 4", data['levels'], false, { x: 180 * 3, y: 0 }),
                new LevelChoiseButton(() => this.chooseLevel("level_5"), "Level 5", data['levels'], false, { x: 0, y: 50 }),
                new LevelChoiseButton(() => this.chooseLevel("level_6"), "Level 6", data['levels'], false, { x: 180, y: 50 }),

            ],
            settings: [
                new Button({
                    name: "Return",
                    text: "Back",
                    x: window.innerWidth * 0.1,
                    y: window.innerHeight * 0.1,
                    width: 88,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 8,
                    action: () => this.changePage('main')
                }),
                new Button({
                    name: "Toggle fullscreen",
                    text: "Fullscreen: ON",
                    x: window.innerWidth * 0.5 - 64,
                    y: window.innerHeight * 0.2 + 310,
                    width: 240,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: data['levels'],
                    textColor: "#FFFFFF",
                    textX: 14,
                    isActive: false,
                    action: () => {
                        //data.changeSettings.toggleFullscreen(); //not ready (11:09 05.10.2024)
                    }
                })
            ]
        }
        this.nextScene = null;
    }

    // changePage(page) {
    //     if (page !== "main") this.objects = this.pages[page];
    //     else this.objects = this.mainPage;

    //     console.log(this.objects);
    //     console.log(typeof this.objects);
    // }

    chooseLevel(levelName) {
        this.nextScene = levelName;
        this.isFinished = true;
    }

    update(time, data) {
        if (!this.isFinished && data.events.mouse.length > 0) {
            if (data.events.mouse[data.events.mouse.length - 1].type !== "contextmenu")
                for (let i = 0; i < this.objects.length; i++) {
                    if (this.objects[i].isInteractive &&
                        this.objects[i].isUnderPointer(
                            data.events.mouse[data.events.mouse.length - 1].clientX,
                            data.events.mouse[data.events.mouse.length - 1].clientY
                        )
                    ) {
                        this.objects[i].action();
                    }
                }
        }
        if (this.isFinished) { data.nextScene = this.nextScene; }
    }
}