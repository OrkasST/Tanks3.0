import { Tank } from "../Tank/Tank.js";

export class Player extends Tank {
    constructor({time}) {
        super({color: "#FFFFFF", width: 512, height: 512, isStatic: false, time})
        this.images = {}
        this.isPlayer = true;
        // console.log("Player params >>>>>>>>\n\t", "w: ",this.width, "\th: ",this.height);
        // player dev started
    }

    update(time) {
        super.update(time)
    }
}