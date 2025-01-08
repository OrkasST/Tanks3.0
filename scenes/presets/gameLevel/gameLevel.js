import { Button } from "../../../UI/Button.js";
import { Window } from "../../../UI/Window.js";
import { ObjectCreator } from "../../../utils/ObjectCreator.js";
import { Scene } from "../../Scene.js";
import { PauseMenu } from "./pages/pauseMenu.js";

export class GameLevel extends Scene {
    constructor(name, startTime, data) {
        console.log('GameLevel.constructor>>>>>>>>>>data: ', data);
        // debugger;
        super({
            name,
            objects: data.dataList,
            startTime,
            background: data.sceneImages.background
        });

        this.camera = this.objects.camera;
        this.player = this.objects.player;
        this.levelMap = this.objects.levelMap;
        this.creator = new ObjectCreator();

        this.player.setPosition(this.levelMap.currentPlayerSpawnPoint)
        this.camera.setModifiers()
        this.camera.setFocus(this.player)

        this.enemies = this.levelMap.enemyDefaultPositions.map(position => {
            return this.creator.create("enemy", position)
        })
        this.enemySpawners = this.levelMap.enemySpawners.map(position => {
            return this.creator.create("spawner", {
                position, type: "enemy",
                createFunction: this.creator.create,
                data: {},
                time: startTime,
                source: this.enemies
            })
        })
        
        this.objects = [
            this.levelMap,
            this.player,
            // this.camera,
            ...this.enemies
        ]
        this.mainPage = [];
        this.pages = {
            pauseMenu: PauseMenu(
                data,
                () => {
                    console.clear()
                    this.switchScene("game_menu")
                    console.log('switchScene: ', this.switchScene);
                }
            )
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
            console.log('data.events.keyboard: ', data.events.keyboard);
            let event = data.events.keyboard
            for (let i = 0; i < event.length; i++) {

                // data.events.keyboard[data.events.keyboard.length-1];
                if (event[i].code === "Escape") {
                    console.log("ESCAPE");
                }
                if (event[i].code === data.gameSettings.keyBindings.PauseMenu) {
                    if (this.currentPage === "main") this.changePage("pauseMenu");
                    else this.changePage("main");
                }
                if (event[i].code === "KeyS") {
                    // this.camera.position.y -= 10;
                    this.camera.isMoving("y", event[i].type === "keydown" ? -10 : 0)
                }
                if (event[i].code === "KeyW") {
                    // this.camera.position.y += 10;
                    this.camera.isMoving("y", event[i].type === "keydown" ? 10 : 0)
                }
                if (event[i].code === "KeyA") {
                    // this.camera.position.x += 10;
                    this.camera.isMoving("x", event[i].type === "keydown" ? 10 : 0)
                }
                if (event[i].code === "KeyD") {
                    // this.camera.position.x -= 10;
                    this.camera.isMoving("x", event[i].type === "keydown" ? -10 : 0)
                }
            }

            // console.log('data.events.keyboard: ', data.events.keyboard);
        }

        this.objects.forEach(obj => {
            if (obj.update) obj.update();
        })

        if (this.isFinished) {
            data.nextScene = this.nextScene;
            // console.log('>>>>>>>>>>>>>>>>>GameLevel.update >>>>>\n\tdata: ', data);
        }

    }


}