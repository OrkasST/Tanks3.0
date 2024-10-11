import { GameObject } from "../GameObject.js";

export class MapImage extends GameObject {
    constructor(image) {
        super({
            tag: "map_image",
        })
    }
}