import { Animation } from "../../utils/Animation.js";
import { GameObject } from "../GameObject.js";
import { Hull } from "./TankHull.js";
import { Tower } from "./TankTower.js";

export class Tank extends GameObject {
    constructor(data = { color, width, height, isStatic, time, speed, rotation: 90}) {
        super(data)
        this.hull = new Hull({
            sourceX: this.x, sourceY: this.y,
            width: data.width, height: data.height,
            name: "hull",
            time: this.time,
            speed: data.speed,
            rotation: (data.rotation *  Math.PI / 180)
        });
        this.tower = new Tower({
            sourceX: this.x, sourceY: this.y,
            width: data.width, height: data.height,
            name: "tower",
            time: this.time,
            rotation: (data.rotation *  Math.PI / 180),
            reloadDuration: 2000
        });
        this.image = [
            this.hull,
            this.tower
        ]
    }

    move(direction) {
        this.hull.drive(direction)
        this.isMoving(this.hull.movementMultiply)
    }
    turn(direction) {
        this.hull.turn(direction)
    }

    shoot(time, createFunction) {
        if (this.tower.isReloading) return;
        console.log("Tank Shoot At: ", time);
        this.tower.shoot(time)
        console.log('this.tower.rotation: ', this.tower.rotation);
        return createFunction(
            "bullet",
            {
                image: new Animation({...this.tower.textures["tower_bullet"], startTime: time}),
                sx: this.x + this.width/2 + (this.tower.width/2)*Math.sin(this.tower.rotation),
                sy: this.y + this.height/2 + (this.tower.width/2)*Math.cos(this.tower.rotation),
                rotation: this.tower.rotation,
                speed: 1
            },
            time
        )
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
        if (image.update) image.update(0, image.rotation);
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