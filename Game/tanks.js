import { Menu } from "../scenes/presets/Menu.js";
import { Loading } from "../scenes/presets/loading.js";
import { Drawer } from "../utils/Drawer.js";
import { EventHandler } from "../utils/EventHandler.js";
import { MediaLoader } from "../utils/MediaLoader.js";
import { SceneChanger } from "../utils/SceneChanger.js";

class TanksGame {
    constructor(data = null) {
        this.data = data;

        this.SCREEN = null;
        this.drawer = null;

        this.currentScene = null;

        this.START_BTN = document.createElement("button");
        this.START_BTN.innerText = "Start";
        this.START_BTN.className = "basicBtn";
        this.START_BTN.disabled = true;
        document.body.appendChild(this.START_BTN);

        this.loader = new MediaLoader();
        this.loader.setMedia([['back', '../media/images/loading/pexels-hristo-fidanov-1252890.jpg']]);
        this.loader.loadMedia(true).then((image) => {
            console.log('image: ', image);
            this.sceneChanger = new SceneChanger(image);
            this.START_BTN.disabled = false;
        }, (error) => console.log(error));

        this.START_BTN.addEventListener("click", () => {
            this.setup();
            this.START_BTN.disabled = true;
            this.START_BTN.hidden = true;
        });

        this.gameId = null;
        this.deltaTime = 0;

        let a = "9";
        for (let i = 0; i < 38-17; i++) {
            a= a + "9";
        }
        console.log(a);
    }

    loop(data, time) {
        this.update(data, time);
        this.render(data, time);
        this.gameId = requestAnimationFrame((time) => this.loop(data, time));
    }

    update(data, time) {
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
            if (element.type === "text") this.drawer.text(element);
            else if (element.type === "button") this.drawer.button(element);
            else if (typeof element.color === 'string') {
                this.drawer.rect(element);
            }
            else {
                this.drawer.image(element);
            }
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

        this.eventHandler = new EventHandler();

        this.loop(this.data, 0);
    }

    createDataObject() {
        return {
            player: {},
            gameSettings: {},
        }
    }
}

const OrkasTanks = new TanksGame({});