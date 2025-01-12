import { Part } from "./TankPart.js";

export class Hull extends Part {
    constructor(data) {
        super({
            ...data,
            color: "#0000FF",
            offsetX: -40,
            offsetY: -60,
            width: 200,
            height: 120,
        })
        console.log("this.rotation", this.rotation);
    }

    drive(direction = 1) {
        
    }

    update(time) {
        super.update(time);
        this.rotate(this.rotation)
    }
}