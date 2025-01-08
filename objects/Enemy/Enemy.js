import { GameObject } from "../GameObject.js";

export class Enemy extends GameObject {
    constructor({x, y, spawnerId = 0}){
        super({x, y, color: "#FF00CC"});
        this.spawnerId = spawnerId;
    }
}