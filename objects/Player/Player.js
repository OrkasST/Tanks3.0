import { Tank } from "../Tank/Tank.js";

export class Player extends Tank {
    constructor({ time, speed = 120, rotation = 270, reloadDuration = 2000, turningSpeed = 0.001 }) {
        console.log("___PLAYER");
        super({
            color: "#FFFFFF",
            width: 200, height: 200,
            isStatic: false,
            time,
            speed, rotation, turningSpeed,
            reloadDuration
        })
        this.images = {}
        this.isPlayer = true;
        console.log("Player params >>>>>>>>\n\t", "x: ",this.x, "\ty: ",this.y);
        console.log("___PLAYER___END");
        // player dev started
    }

    onMouseMove(mouseX, mouseY, cameraX, cameraY) {
        // console.clear();
        // console.log("ROTATE!!");
        let distX = mouseX - (this.x + cameraX + this.width / 2);
        // console.log('distX: ', distX);
        let distY = mouseY - (this.y + cameraY + this.height / 2);
        // console.log('distY: ', distY);
        if (distX == 0 && distY == 0) return;
        let deg = Math.atan(distY / distX);
        // console.log("deg: ", deg);
        let count = 0;
        if (distX < 0) count = 2;
        if (distX >= 0 && distY < 0) count = 4;
        // console.log("count: ", count);
        // console.log("count+deg: ", count + deg);
        this.tower.rotation = (Math.PI / 2) * count + deg;
        // console.log('rotation: ', this.tower.rotation);
    }

    onControlButtonEvent(type) {
        if (type == "MoveForward") {
            this.move(1)
            this.isNotMoving = false
        }
        else if (type == "MoveBackward") {
            this.move(-1)
            this.isNotMoving = false
        }
        else if (type == "TurnCounterclockwise") this.turn(-1)
        else if (type == "TurnClockwise") this.turn(1)
    }

    stopMovement() {
        if (this.isNotMoving) return
        this.movement.x = 0
        this.movement.y = 0
        this.isNotMoving = true
    }

    stopHullRotation() {
        this.turn(0)
    }

    update(time) {
        super.update(time)
    }
}