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
            isCollidable: true
        })
        // this.image[0].frame({deltaTime: 0, rotation: this.rotation})
        // console.log(this);

        this.movement = {
            x: this.speed * Math.cos(this.rotation),
            y: this.speed * Math.sin(this.rotation),
        }

        // this.timeToStop = 100
        this.lifeLog = []
    }

    isDying(time) {
        // this.lifeLog = this.lifeLog.join("\n\t")
        let average = this.lifeLog.reduce((pr, cur) => pr+cur)/this.lifeLog.length
        console.log('average: ', average);
        let diffs = this.lifeLog.map((el,i) => el > average+0.3 ? `${i}: ${el}` : 0).filter(el => el !== 0)
        console.log('diffs: ', diffs);
        
        console.log("~~~ I'll be back. Bullet ;) ~~~");
    }

    update(time) {
        this.lifeLog.push(Number((time - this.lastUpdateTime).toFixed(2)))
        this.image.update(time, this.rotation)
        this.collisionBody.move(this.x, this.y)
        // if (time - this.creationTime >= this.timeToStop) this.stopMovement()
        super.update(time)
    }

    // move(time) {
    //     // console.log(this);
    //     this.x += this.movement.speed * Math.cos(this.rotation) * time - this.lastUpdateTime;
    //     this.y += this.movement.speed * Math.sin(this.rotation) * time - this.lastUpdateTime;
    //   }

    stopMovement() {
        if (this.isNotMoving) return
        this.movement.x = 0
        this.movement.y = 0
        this.isNotMoving = true
    }

}