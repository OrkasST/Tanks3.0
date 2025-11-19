import { Animation } from "../../utils/Animation.js";
import { GameObject } from "../GameObject.js";
import { Hull } from "./TankHull.js";
import { Tower } from "./TankTower.js";

export class Tank extends GameObject {
    constructor({
        color = "#FF0011",
        width = 200, height = 200, 
        isStatic = false,
        time, speed = 120, rotation= 90, turningSpeed,
        reloadDuration= 2000,
        collisionBody = null
    }) {
        super({type: "entity", subtype: "tank", color, width, height, isStatic, time, speed, rotation})
        // console.log("this.type: ", this.type);
        // console.log('turningSpeed: ', turningSpeed);
        this.hull = new Hull({
            sourceX: this.x, sourceY: this.y,
            width, height,
            name: "hull",
            time,
            speed,
            rotation: (rotation *  Math.PI / 180),
            turningSpeed
        });
        this.tower = new Tower({
            sourceX: this.x, sourceY: this.y,
            width, height,
            name: "tower",
            time,
            rotation: (rotation *  Math.PI / 180),
            reloadDuration
        });
        this.image = [
            this.hull,
            this.tower
        ]

        
        // console.log("Creating Tank", this);
    }

    move(direction) {
        this.hull.drive(direction)
        this.isMoving(this.hull.movementMultiply)
        // console.log('this.hull.movementMultiply: ', this.hull.movementMultiply);
    }
    turn(direction) {
        this.hull.turn(direction)
    }

    shoot(time, createFunction, addColliderFnction) {
        if (this.tower.isReloading) return;
        this.tower.shoot(time)
        // debugger;
        let bullet = createFunction(
            "bullet",
            {
                image: new Animation({...this.tower.textures["tower_bullet"], startTime: time}),
                sx: this.x + this.width/2 - 64 + (this.tower.width/2 + 10)*Math.cos(this.tower.rotation), // Dehardcode measures !!!!
                sy: this.y + this.height/2 - 64 + (this.tower.width/2 + 10)*Math.sin(this.tower.rotation), // of the bullet      !!!!
                rotation: this.tower.rotation,
                speed: 900,
                lifeTime: 1200
            },
            time
        )
        addColliderFnction(bullet)
        // debugger
        return bullet
    }
s
    appendTexture(name, image, time = 0) {
        // console.log('time: ', time);
        // console.log('name: ', name);

        let nameKeys = name.split("_")
        let imageType = nameKeys[2]
        if (this[imageType]) this[imageType].appendTexture(
            nameKeys.slice(2, nameKeys.length).join("_"),
            image,
            this.width, this.height
        )
        else if (imageType === "bullet") this.bulletImage = image
        if (image.update) image.update(time, image.rotation);
    }

    update(time) {
        super.update(time);
        this.hull.update(this.x, this.y, time)
        this.tower.update(this.x, this.y, time)
        this.collisionBody.move(this.x, this.y)
        // console.log('this.collisionBody: ', this.collisionBody);

        // this.lastUpdateTime = time;
        if (this.lastUpdateTime - this.creationTime >= this.lifeTime) {
            this.isToBeDestroyed = true;
        }
    }

    stopMovement() {
        if (this.isNotMoving) return
        this.movement.x = 0
        this.movement.y = 0
        this.isNotMoving = true
    }

    stopHullRotation() {
        this.turn(0)
    }
}