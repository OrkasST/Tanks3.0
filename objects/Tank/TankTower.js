import { Part } from "./TankPart.js";

export class Tower extends Part {
    constructor(data) {
        super({
            ...data,
            color: "#00FF00",
            offsetX: -20,
            offsetY: -20,
            width: 200,
            height: 40,
        })
    }
    
    shoot() {

    }
    reload() {

    }
}