import { GameObject } from "../GameObject.js";

export class MapImage extends GameObject {
    constructor(image, width, height) {
        super({
            tag: "special",
            x: 0,
            y: 0,
            width,
            height,
            
        })
    }
}