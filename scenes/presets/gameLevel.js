import { Scene } from "../Scene.js";

export class GameLevel extends Scene {
    constructor(name, startTime, data) {
        console.log('gamelevel.constructor >>> data: ', data);
        super({
            name,
            objects: [

            ],
            startTime,
            background: data.sceneImages.background
        });
        this.mainPage = { ...this.objects };
        this.pages = {
            pauseMenu: []
        }
    }

    // changePage(page) {
    //     this.objects = this.pages[page];
    // }

    update(time, data) {
        if (data.events.mouse.length > 0) {
            if (
                data.events.mouse[data.events.mouse.length - 1].type === "contextmenu"
            ) {
                console.log("gameLevel.update >>>>\n\tdata:\n", data);
                data.events.mouse[data.events.mouse.length - 1].preventDefault();
            }
            for (let i = 0; i < this.objects.length; i++) {
                if (this.objects[i].isInteractive &&
                    this.objects[i].isUnderPointer(
                        data.events.mouse[data.events.mouse.length - 1].clientX,
                        data.events.mouse[data.events.mouse.length - 1].clientY
                    ) &&
                    data.events.mouse[data.events.mouse.length - 1].type !== "contextmenu"
                ) {
                    this.objects[i].action();
                }
            }
        }

        if (data.events.keyboard.length > 0) {
            // data.events.keyboard[data.events.keyboard.length-1];
            if (data.events.keyboard[data.events.keyboard.length - 1].code === "Escape") {
            }

            console.log('data.events.keyboard: ', data.events.keyboard);
        }
    }
}