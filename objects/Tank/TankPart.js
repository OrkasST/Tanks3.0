import { GameObject } from "../GameObject.js";

export class Part extends GameObject {
    constructor({
        width = 200, height = 40,
        sorceX = 0, sourceY = 0,
        offsetX = -20, offsetY = -20,
        name = "",
        color = "#000000",
        time = 0,
        rotation = (90 * Math.PI / 180)
    }) {
        super({
            color,
            x: sorceX + offsetX,
            y: sourceY + offsetY,
            width,
            height,
            time,
            rotation
        })
        this.image = null;
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.name = name;
        // console.log('>>>>>>>>>>>>\nname: ', name);
    }

    appendTexture(name, image) {
        super.appendTexture(name, image)
        if (name === this.name) this.image = image;
    }

    update(x, y, time) {
        super.update(time)
        this.x = x + this.offsetX
        this.y = y + this.offsetY
    }
}