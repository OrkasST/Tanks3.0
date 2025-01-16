import { GameObject } from "../GameObject.js";

export class Bullet extends GameObject {
    constructor({ image, sx= 10, sy = 10, rotation, time = 0, lifeTime = 4000, speed = 0.5 }) {
        super({
            type: "projectile",
            image,
            x: sx,
            y: sy,
            width: 128,
            height: 128,
            rotation,
            time,
            lifeTime,
            speed,
            isStatic: false,
            isDestructive: true,
            // isCollidable: true
        })
        // this.image[0].frame({deltaTime: 0, rotation: this.rotation})
        // console.log(this);

        this.movement = {
            x: this.speed * Math.cos(this.rotation),
            y: this.speed * Math.sin(this.rotation),
        }
    }

    update(time) {
        // this.height   
        // console.log('this.height: ', this.height);
        // console.log('this.width: ', this.width);
        // console.log("BULLET UPDATE");
        this.image.update(time, this.rotation)
        // console.log('this.rotation: ', this.rotation);
        super.update(time)
    }

    // move(time) {
    //     // console.log(this);
    //     this.x += this.movement.speed * Math.cos(this.rotation) * time - this.lastUpdateTime;
    //     this.y += this.movement.speed * Math.sin(this.rotation) * time - this.lastUpdateTime;
    //   }

}