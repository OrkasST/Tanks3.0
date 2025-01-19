import { Tank } from "../Tank/Tank.js";

export class Enemy extends Tank {
    constructor({x, y, spawnerId = 0}){
        console.log("ENEMY!");
        super({x, y, color: "#FF00CC"});
        this.spawnerId = spawnerId;
        this.isEnemy = true;
    }
}