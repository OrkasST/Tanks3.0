import { Scene } from "../../Scene.js";
import { PauseMenu } from "../gameLevel/pages/pauseMenu.js";
import { KeyBindings } from "./pages/keyBindings.js";
import { Levels } from "./pages/levels.js";
import { Settings } from "./pages/Settings.js";
import { StartMenu } from "./pages/startMenu.js";

export class Menu extends Scene {
    constructor(startTime, data, gameSettings) {
        console.log('gameSettings: ', gameSettings);
        console.log('data: ', data);
        super({
            name: "Game Menu",
            objects: StartMenu(data, () => this.changePage("levels"), () => this.changePage("settings")),
            startTime,
            background: "#000000"
        });
        this.mainPage = [...this.objects];
        // console.log('Menu.constructor>>>this.objects: ', this.objects);

        this.editKeys = gameSettings.settingsFunctions.changeBinding;

        this.pages = {
            levels: Levels(
                data,
                () => this.changePage("main"),
                () => this.chooseLevel("level_1"),
                () => this.chooseLevel("level_2"),
                () => this.chooseLevel("level_3"),
                () => this.chooseLevel("level_4"),
                () => this.chooseLevel("level_5"),
                () => this.chooseLevel("level_6"),
            ),
            settings: Settings(
                data,
                gameSettings,
                () => this.changePage('main'),
                () => {
                    //data.changeSettings.toggleFullscreen(); //not ready (11:09 05.10.2024)
                },
                () => this.changePage('keyBindings')
            ),
            keyBindings: KeyBindings(
                data,
                gameSettings.keyBindings,
                () => this.changePage("settings"),
                () => {
                    // gameSettings.keyBindings["PauseMenu"][0] = ''
                    console.log("ON KEYCHANGE click >>>", this);
                    this.editKeys()()
                    this.isKeyEditing = true;
                }
            )
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
        super.switchScene(levelName)
        // this.nextScene = levelName;
        // this.isFinished = true;
    }

    update(time, data) {
        console.log(">>>>> Menu Is Updating");
        if (this.isFinishing) {
            console.log("<<<<<<< Menu Is Finished");
            data.nextScene = this.nextScene;
            this.isFinished = true;
            return;
        }
        if (data.events.mouse.length > 0) {
            if (data.events.mouse[data.events.mouse.length - 1].type === "click")
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
        if (data.events.keyboard.length > 0 && this.isKeyEditing) {
            // this.
        }
        console.log("<<<<< Menu Stopped Updating");
    }
}