import { Tank } from "../Tank/Tank.js";

export class Player extends Tank {
    constructor({ time }) {
        super({ color: "#FFFFFF", width: 512, height: 512, isStatic: false, time })
        this.images = {}
        this.isPlayer = true;
        // console.log("Player params >>>>>>>>\n\t", "w: ",this.width, "\th: ",this.height);
        // player dev started
    }

    onMouseMove(mouseX, mouseY, modifierX, modifierY) {
        console.clear();
        // console.log("ROTATE!!");
        let distX = mouseX - (this.x + modifierX + this.width / 2);
        console.log('distX: ', distX);
        let distY = mouseY - (this.y + modifierY + this.height / 2);
        console.log('distY: ', distY);
        if (distX == 0 && distY == 0) return;
        let deg = Math.atan(distY / distX);
        console.log("deg: ", deg);
        let count = 0;
        if (distX < 0) count = 2;
        if (distX >= 0 && distY < 0) count = 4;
        console.log("count: ", count);
        console.log("count+deg: ", count + deg);
        this.tower.rotation = (Math.PI / 2) * count + deg;
        console.log('rotation: ', this.tower.rotation);
    }

    update(time) {
        super.update(time)
    }
}