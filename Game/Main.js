import { BINDIGS } from "../media/data/common/Bindings.js";
import { eventList } from "../media/data/common/events.js";
import { Drawer } from "../utils/Drawer.js";
import { EventHandler } from "../utils/EventHandler.js";
import { MediaLoader } from "../utils/MediaLoader.js";
import { SceneChanger } from "../utils/SceneChanger.js";

class TanksGame {
    constructor(data = null) {
        this.data = data;
        this.lastTime = 0;
        this.timerTime = 0;

        this.LOGGER = {
            value: 1
        }

        this.SCREEN = null;
        this.drawer = null;

        this.currentScene = null;

        this.START_BTN = document.createElement("button");
        this.START_BTN.innerText = "Start";
        this.START_BTN.className = "basicBtn";
        this.START_BTN.disabled = true;
        document.body.appendChild(this.START_BTN);

        this.loader = new MediaLoader();
        this.loader.setMedia([['back', 'media/images/loading/pexels-hristo-fidanov-1252890.jpg']]);
        this.loader.loadMedia(true).then((image) => {
            // console.log('image: ', image);
            this.sceneChanger = new SceneChanger(image);
            this.START_BTN.disabled = false;
        }, (error) => console.log(error));

        this.START_BTN.addEventListener("click", () => {
            document.documentElement.requestFullscreen();
            this.setup();
            this.START_BTN.disabled = true;
            this.START_BTN.hidden = true;
        });

        this.gameId = null;
        this.deltaTime = 0;
    }

    loop(data, time) {
        this.update(data, time);
        this.render(data, time);
        this.lastTime = time;
        this.gameId = requestAnimationFrame((time) => this.loop(data, time));
    }

    update(data, time) {
        // console.log('data: ', data);/
        // console.log('time: ', time);
        if (!this.currentScene) return;
        data.events = this.eventHandler.getLastEvents();
        this.currentScene.update(time, data);
        if (this.currentScene.isFinished) {
            this.currentScene = this.currentScene.name === "Game Loading"
                ? this.sceneChanger.finishScene(this.currentScene)
                : this.sceneChanger.prepareScene(data.nextScene, time);
            // this.currentScene.onFinish();
            // this.currentScene = null;
        }
        this.LOGGER.value += 1
    }

    render(data, time) {
        this.drawer.clear();
        if (!this.currentScene) return;
        if (typeof this.currentScene.background === 'string')
            this.drawer.rect({
                x: 0, y: 0, width: this.SCREEN.width, height: this.SCREEN.height, color: this.currentScene.background
            });

        else {
            this.drawer.image({ x: 0, y: 0, width: this.SCREEN.width, height: this.SCREEN.height, color: this.currentScene.background });
        }
        this.currentScene.objects.forEach(element => {
            // console.log('element: ', element);
            if (this.currentScene.name.split("_")[0] === "level") {
                // console.log(element.y + this.currentScene.camera.position.y);
                if (element.image && Array.isArray(element.image)) {
                    // console.log('RENDER>>>>>>>\n\telement.image: ', element.image);
                    element.image.forEach(img => img.image ? this.drawer.image({
                        ...element,
                        x: element.x + this.currentScene.camera.position.x,
                        y: element.y + this.currentScene.camera.position.y,
                    }) : this.drawer.rect({
                        ...img,
                        x: img.x + this.currentScene.camera.position.x,
                        y: img.y + this.currentScene.camera.position.y
                    })
                    )
                }else if (element.image) this.drawer.image({
                    ...element,
                    x: element.x + this.currentScene.camera.position.x,
                    y: element.y + this.currentScene.camera.position.y,
                });
                else if (element.drawDebug) {
                    if (element.triggerFrame) {
                        this.drawer.rect({
                            x: element.triggerFrame.x1,
                            y: element.triggerFrame.y1,
                            width: element.triggerFrame.x2 - element.triggerFrame.x1,
                            height: element.triggerFrame.y2 - element.triggerFrame.y1,
                            color: "#acf233",
                            filled: false,
                        })
                    }
                    if (element.startTriggerFrame) {
                        this.drawer.rect({
                            x: element.startTriggerFrame.x1,
                            y: element.startTriggerFrame.y1,
                            width: element.startTriggerFrame.x2 - element.startTriggerFrame.x1,
                            height: element.startTriggerFrame.y2 - element.startTriggerFrame.y1,
                            color: "#38cf68",
                            filled: false,
                        })
                    }
                }
                else this.drawer.rect({
                    ...element,
                    x: element.x + this.currentScene.camera.position.x,
                    y: element.y + this.currentScene.camera.position.y
                });
            } else if (element.type === "text") this.drawer.text(element);
            else if (element.type === "button" || element.type === "window") this.drawer.button(element);
            else if (element.color && typeof element.color === 'string') {
                this.drawer.rect(element);
            } else this.drawer.image(element);
        });
        // debugger;
    }

    setup() {
        let images = {};
        for (let i = 1; i <= 216; i++) {
            images[i] = '../media/images/test/0' + (i < 10 ? '00' + i : i < 100 ? '0' + i : i) + '.png';
        }

        if (!this.data) this.data = this.createDataObject();

        this.SCREEN = document.createElement("canvas");
        this.SCREEN.width = window.innerWidth;
        this.SCREEN.height = window.innerHeight;
        this.SCREEN.style.position = "absolute";
        this.SCREEN.style.top = "0";
        this.SCREEN.style.left = "0";
        document.body.appendChild(this.SCREEN);

        window.addEventListener("resize", () => {
            this.SCREEN.width = window.innerWidth;
            this.SCREEN.height = window.innerHeight;
            // console.log('this.drawer.screen.width: ', this.drawer.screen.width);
            // console.log('this.drawer.screen.height: ', this.drawer.screen.height);
        });

        this.drawer = new Drawer(this.SCREEN);
        this.currentScene = this.sceneChanger.prepareScene("game_menu", 0);

        this.eventHandler = new EventHandler(eventList, BINDIGS, this.getTime.bind(this));

        // console.log('Game.data: ', this.data);
        this._tick();
        this.loop(this.data, 0);
    }

    async _tick() {
        setInterval(() => {
            this.timerTime += 1;
        }, 1)
    }

    getTime() {
        return this.timerTime;
    }

    createDataObject() {
        // console.log("Create Data >>>>\n\tKey Bindings", BINDIGS);
        return {
            player: {},
            gameSettings: {
                keyBindings: { ...BINDIGS }
            },
        }
    }
}

const OrkasTanks = new TanksGame();