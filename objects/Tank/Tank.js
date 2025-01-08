import { GameObject } from "../GameObject.js";
import { Hull } from "./TankHull.js";
import { Tower } from "./TankTower.js";

export class Tank extends GameObject{
    constructor(data = {color, width, height, isStatic}) {
        super(data)
        this.hull = new Hull({color: data.color});
        this.tower = new Tower({color: data.color});
        this.machine = [
            this.hull,
            this.tower
        ]
    }

    appendTexture(name, image) {
        console.log('name: ', name);

        
        let imageType = name.split("_")[2]
        if (imageType === "hull") this.hull.appendTexture(name, image);
        else if (imageType === "tower") this.tower.appendTexture(name, image)
        else if (imageType === "bullet") this.bulletImage = image
    }
}