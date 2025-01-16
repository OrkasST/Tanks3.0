import { GameObject } from "../GameObject.js";

export class Bullet extends GameObject {
    constructor({ image, sx= 10, sy = 10, rotation, time = 0, lifeTime = 3000, speed = 10 }) {
        console.log('BULLET: rotation: ', rotation);
        super({
            type: "projectile",
            image,
            // : [{
            //     x: sx,
            //     y: sy,
            //     // log: true,
            //     width: 5,
            //     height: 5,
            //     filled: true,
            //     color: "#FFFFFF"
            // }],
            x: sx,
            y: sy,
            width: 128,
            height: 128,
            rotation,
            time,
            // lifeTime,
            speed,
            isStatic: false,
            // isDestructive: true,
            // isCollidable: true
        })
        // this.image[0].frame({deltaTime: 0, rotation: this.rotation})
        console.log(this);
    }

    update(time) {
        // // this.height   
        // console.log('this.height: ', this.height);
        // console.log('this.width: ', this.width);
        // console.log("BULLET UPDATE");
        this.image.update(time, this.rotation)
        // console.log('this.rotation: ', this.rotation);
        super.update(time)
    }

    // move(time) {
    //     // console.log(this);
    //     this.x += this.movement.speed * Math.cos(this.rotation); // * time;
    //     this.y += this.movement.speed * Math.sin(this.rotation); // * time;
    //   }

}