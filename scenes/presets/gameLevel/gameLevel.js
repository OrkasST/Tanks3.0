import { Animation } from "../../../utils/Animation.js";
import { ObjectCreator } from "../../../utils/ObjectCreator.js";
import { Scene } from "../../Scene.js";
import { PauseMenu } from "./pages/pauseMenu.js";

export class GameLevel extends Scene {
    constructor(name, startTime, data) {
        console.log('GameLevel.constructor>>>>>>>>>>startTime: ', startTime);
        // console.log('GameLevel.constructor>>>>>>>>>>data: ', data);
        // gger;
        super({
            name,
            objects: data.dataList,
            startTime,
            background: data.sceneImages.background
        });
        // console.log('GameLevel.constructor>>>>>>>>>>data: ', data);

        this.camera = this.objects.camera;
        this.player = this.objects.player;
        this.levelMap = this.objects.levelMap;
        this.cursor = this.objects.cursor;
        this.creator = new ObjectCreator();


        this.player.setPosition(this.levelMap.currentPlayerSpawnPoint)
        this.camera.setModifiers()
        this.camera.setFocus(this.player)
        console.log('GameLevel.constructor>>>>>>>>>>data: ', data);

        this.enemies = this.levelMap.enemyDefaultPositions.map((position, ind) => {
            // console.log(ind + ' position: ', position);
            let enemy = this.creator.create("enemy", position);
            // debugger;
            enemy.appendTexture("enemy_tank_tower", new Animation({...data.sceneImages["enemy_tank_tower"], startTime: 0}), startTime)
            enemy.appendTexture("enemy_tank_hull", new Animation({...data.sceneImages["enemy_tank_hull"], startTime: 0}), startTime)
            console.log('enemy: ', enemy.hull.image, enemy.tower.image);
            return enemy
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
            {
                type: "text",
                name: "TIMER",
                x: 93,
                y: 100,
                isUpdatable: true,
                font: "40px TimesNewRoman",
                color: "#FFFFFF",
                text: "Time: 0",
                update: function (time) {
                    this.text = `Time: ${time}`.split(".")[0].slice(0, -2)+"00"
                }
            }
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
                console.log("SHOOOT");
                let bullet = this.player.shoot(time, this.creator.create)
                if (bullet) {
                    this.objects.splice(1, 0, bullet)
                    this.cursor.startRefill(this.player.tower.reloadDuration)
                }
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
                this.cursor.updatePosition(
                    lastMouseEvent.clientX - this.cursor.width / 2,
                    lastMouseEvent.clientY - this.cursor.height / 2
                )
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