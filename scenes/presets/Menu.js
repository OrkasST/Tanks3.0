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
                new LevelChoiseButton(() => this.changePage('main'), "Level 2", data['levels'], false, { x: 180, y: 0 }),

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