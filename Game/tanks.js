import { Loading } from "../scenes/presets/loading.js";
import { Drawer } from "../utils/Drawer.js";
import { MediaLoader } from "../utils/MediaLoader.js";

class TanksGame {
    constructor(data = null) {
        this.data = data;

        this.SCREEN = null;
        this.drawer = null;

        this.currentScene = null;

        this.START_BTN = document.createElement("button");
        this.START_BTN.innerText = "Start";
        this.START_BTN.className = "basicBtn";
        document.body.appendChild(this.START_BTN);

        this.loader = new MediaLoader((percent) => {
            console.log('Loading (' + percent + ' / 216)...');
        });
        this.START_BTN.addEventListener("click", () => this.setup());

        this.gameId = null;
        this.deltaTime = 0;
    }

    loop(data, time) {
        this.update(data, time);
        this.render(data, time);
        this.gameId = requestAnimationFrame((time) => this.loop(data, time));
    }

    update(data, time) {
        // console.log('time: ', time);
        if (!this.currentScene) return;
        this.currentScene.update(time);
        if(this.currentScene.isFinished) this.currentScene = null;
    }

    render(data, time) {
        this.drawer.clear();
        if (!this.currentScene) return;
        if (typeof this.currentScene.background === 'string') 
            this.drawer.rect({
                x:0, y:0, width:this.SCREEN.width, height:this.SCREEN.height, color:this.currentScene.background
            });
        this.currentScene.objects.forEach(element => {
            // console.log('element: ', element);
            if (element.type === "text") this.drawer.text(element);
            else if (typeof element.color === 'string') {
                this.drawer.rect(element);
                // if (element.name === "loadbar_back") debugger;
            }
            else {
                this.drawer.image(element);
                // if (element.name === "loadbar_back") debugger;
            }
        });
    }

    setup() {
        let images = {};
        for (let i = 1; i <= 216; i++) {
            images[i] = '../media/images/test/0' + (i < 10 ? '00' + i : i < 100 ? '0' + i : i) + '.png';
        }
        // this.loader.setMedia(images);
        //console.log(this.loader.loadMedia());
        // this.loader.loadMedia().then(
        //     (value) => console.log(value),
        //     (reason) => {
        //         console.clear();
        //         console.log(reason);
        //     }
        // );

        if(!this.data) this.data = this.createDataObject();

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
            console.log('this.drawer.screen.width: ', this.drawer.screen.width);
            console.log('this.drawer.screen.height: ', this.drawer.screen.height);
        });

        this.drawer = new Drawer(this.SCREEN);
        this.currentScene = new Loading(images, "gameMenu", 0);
        console.log('this.currentScene: ', this.currentScene.name);
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