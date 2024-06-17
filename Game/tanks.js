import { Drawer } from "../utils/Drawer.js";
import { MediaLoader } from "../utils/MediaLoader.js";

class TanksGame {
    constructor(data) {
        this.data = data;

        this.SCREEN = null;
        this.drawer = null;

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

    }

    render(data, time) {
        this.drawer.clear();
    }

    setup() {
        let images = {};
        for (let i = 1; i <= 216; i++) {
            images[i] = '../media/images/test/0' + (i < 10 ? '00' + i : i < 100 ? '0' + i : i) + '.png';
        }
        this.loader.setMedia(images);
        //console.log(this.loader.loadMedia());
        this.loader.loadMedia().then(
            (value) => console.log(value),
            (reason) => {
                console.clear();
                console.log(reason);
            }
        );

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
    }
}

const OrkasTanks = new TanksGame({});