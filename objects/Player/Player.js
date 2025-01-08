import { Tank } from "../Tank/Tank.js";

export class Player extends Tank {
    constructor({}) {
        super({color: "#FFFFFF", width: 128, height: 128})
        this.images = {}
        this.isPlayer = true;
        console.log("Player params >>>>>>>>\n\t", "w: ",this.width, "\th: ",this.height);
    }
}