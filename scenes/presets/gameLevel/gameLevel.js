import { GameObject } from "../../../objects/GameObject.js";
import { ObjectCreator } from "../../../utils/ObjectCreator.js";
import { Scene } from "../../Scene.js";
import { PauseMenu } from "./pages/pauseMenu.js";

export class GameLevel extends Scene {
    constructor(name, startTime, data) {
        // console.log('GameLevel.constructor>>>>>>>>>>data: ', data);
        // gger;
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

        this.cursor = new GameObject({ type: "UI", color: "#ff00ff", width: 10, height: 10 })

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
            ...this.enemies,
            this.cursor,
            this.camera,
        ]
        
        this.mainPage = [...this.objects];
        this.pages = {
            pauseMenu: PauseMenu(
                data,
                () => {
                    // console.clear()
                    console.log("YOU HOOOO");
                    this.switchScene("game_menu")
                    data.hideCursor = false
                    // console.log('switchScene: ', this.switchScene);
                }
            )
        }

        this.objectsForDestruction = [];
    }

    // changePage(page) {
    //     this.objects = this.pages[page];
    // }

    update(time, data) {
        super.update(time, data)

        if (!data.hideCursor && this.currentPage === "main") data.hideCursor = true;
        else if (this.currentPage !== "main") data.hideCursor = false

        if (data.events.mouse.length > 0) {
            let lastMouseEvent = data.events.mouse[data.events.mouse.length - 1];

            if (
                lastMouseEvent.type === "contextmenu"
            ) {
                // console.log("gameLevel.update >>>>\n\tdata:\n", data);
                lastMouseEvent.preventDefault();
            }

            if (lastMouseEvent.type === "click" && this.currentPage === "main") {
                let bullet = this.player.shoot(time, this.creator.create)
                if (bullet) this.objects.splice(this.objects.length - 2, 0, bullet)
            }

            for (let i = 0; i < this.objects.length; i++) {
                if (this.objects[i].isInteractive &&
                    this.objects[i].isUnderPointer(
                        lastMouseEvent.clientX,
                        lastMouseEvent.clientY
                    ) &&
                    lastMouseEvent.type === "click"
                ) {
                    this.objects[i].action();
                }
            }
            if (lastMouseEvent.type === "mousemove") {
                this.cursor.x = lastMouseEvent.clientX - this.cursor.width / 2
                this.cursor.y = lastMouseEvent.clientY - this.cursor.height / 2
                this.player.onMouseMove(
                    lastMouseEvent.clientX, lastMouseEvent.clientY,
                    this.camera.position.x, this.camera.position.y
                )
            }
        }

        let MoveForward = data.gameSettings.keyBindings.MoveForward
        let MoveBackward = data.gameSettings.keyBindings.MoveBackward
        let TurnClockwise = data.gameSettings.keyBindings.TurnClockwise
        let TurnCounterclockwise = data.gameSettings.keyBindings.TurnCounterclockwise

        if (data.events.keyboard.length > 0) {
            // console.log('data.events.keyboard: ', data.events.keyboard);
            let event = data.events.keyboard
            for (let i = 0; i < event.length; i++) {

                // data.events.keyboard[data.events.keyboard.length-1];
                if (event[i].code === "Escape") {
                    console.log("ESCAPE");
                }
                if (event[i].code === data.gameSettings.keyBindings.PauseMenu.code && event[i].type === "keyup") {
                    if (this.currentPage === "main") {
                        console.log("TO pause");
                        this.changePage("pauseMenu");
                    }
                    else {
                        console.log("TO main");
                        this.changePage("main");
                    }
                }
                if (this.currentPage === "main") {
                    if (MoveForward.status || MoveBackward.status)
                        this._hadlePlayerInput("MoveForward", "MoveBackward", data)
                    else this.player.stopMovement()
                    if (TurnClockwise.status || TurnCounterclockwise.status)
                        this._hadlePlayerInput("TurnClockwise", "TurnCounterclockwise", data)
                    else this.player.stopHullRotation()
                }
            }

            // console.log('data.events.keyboard: ', data.events.keyboard);
        }


        if (this.creator.deleteDeadObjects(this.objects)) {
            this.objects = [...this.creator.getUpdatedObjectList()]
        }

        this.objects.forEach((obj, ind) => {
            if (obj.update) obj.update(time);
        })

        if (this.isFinished) {
            data.nextScene = this.nextScene;
            data.hideCursor = false;
            // console.log('>>>>>>>>>>>>>>>>>GameLevel.update >>>>>\n\tdata: ', data);
        }

    }

    _hadlePlayerInput(nameA, nameB, data) {
        let actionA = data.gameSettings.keyBindings[nameA]
        let actionB = data.gameSettings.keyBindings[nameB]
        let type = ""

        if (actionA.status && actionB.status) {
            if (actionA.lastChange > actionB.lastChange) {
                type = nameA
            } else {
                type = nameB
            }
        } else {
            type = actionA.status ? nameA : nameB
        }

        this.player.onControlButtonEvent(type)
    }

}