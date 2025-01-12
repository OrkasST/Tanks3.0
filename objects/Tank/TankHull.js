import { Part } from "./TankPart.js";

export class Hull extends Part {
    constructor(data, turningSpeed= 0.1) {
        super({
            ...data,
            color: "#0000FF",
            offsetX: -40,
            offsetY: -60,
            width: 200,
            height: 120,
        })
        console.log("this.rotation", this.rotation);
        this.turningSpeed = turningSpeed
        this.movementMultiply = {
            x: 0,
            y: 0
        }
        this.edges = [
            Math.PI / 2,     //0
            Math.PI,         //1
            Math.PI * 1.5,  //2
            Math.PI * 2      //3
        ]
    }

    drive(direction = 1) { // 1 -- forward, -1 -- backward, 0 -- stop
        if (this.rotation < this.edges[0]) {
            this.movementMultiply.x = 1 * direction
            this.movementMultiply.y = 1 * direction
        } else if (this.rotation < this.edges[1]) {
            this.movementMultiply.x = -1 * direction
            this.movementMultiply.y = 1 * direction
        } else if (this.rotation < this.edges[2]) {
            this.movementMultiply.x = -1 * direction
            this.movementMultiply.y = -1 * direction
        } else if (this.rotation < this.edges[3]) {
            this.movementMultiply.x = 1 * direction
            this.movementMultiply.y = -1 * direction
        }
    }

    turn(direction = 1) { // 1 -- clockwise, -1 -- counterclockwise
        this.rotation += this.turningSpeed * direction
        if (this.rotation >= this.edges[3]) this.rotation = this.rotation - this.edges[3]
        else if (this.rotation <= 0) this.rotation = this.edges[3] - this.rotation
    }

    update(time) {
        super.update(time);
        this.rotate(this.rotation)
    }
}