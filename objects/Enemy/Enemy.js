import { Tank } from "../Tank/Tank.js";

export class Enemy extends Tank {
    constructor({x, y, spawnerId = 0}){
        super({color: "#FF00CC", isStatic: true});
        this.spawnerId = spawnerId;
        this.isEnemy = true;

        this.x = x;
        this.y = y;
    }

    update(time) {
        super.update(time);
    }
}