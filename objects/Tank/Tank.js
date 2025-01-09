import { GameObject } from "../GameObject.js";
import { Hull } from "./TankHull.js";
import { Tower } from "./TankTower.js";

export class Tank extends GameObject {
    constructor(data = { color, width, height, isStatic, time}) {
        super(data)
        this.hull = new Hull({
            sourceX: this.x, sourceY: this.y,
            width: data.width, height: data.height,
            name: "hull",
            time: this.time
        });
        this.tower = new Tower({
            sourceX: this.x, sourceY: this.y,
            width: data.width, height: data.height,
            name: "tower",
            time: this.time
        });
        this.image = [
            this.hull.image,
            this.tower.image
        ]
    }
s
    appendTexture(name, image) {
        // console.log('name: ', name);

        let nameKeys = name.split("_")
        let imageType = nameKeys[2]
        if (this[imageType]) this[imageType].appendTexture(
            nameKeys.slice(2, nameKeys.length).join("_"),
            image,
            this.width, this.height
        )
        else if (imageType === "bullet") this.bulletImage = image
    }

    update(time) {
        super.update();
        this.hull.update(this.x, this.y, time)
        this.tower.update(this.x, this.y, time)

        this.lastUpdateTime = time;
        if (this.lastUpdateTime - this.creationTime >= this.lifeTime) {
            this.isToBeDestroyed = true;
        }
    }
}